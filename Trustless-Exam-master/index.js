
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { decrypt, encrypt,key,iv} from './utils/crypto.js';
import Puzzle from 'crypto-puzzle';
import dotenv from 'dotenv'

dotenv.config();

const app = express();

const port = 3000;
const prisma = new PrismaClient();


// Middleware to parse JSON requests
app.use(express.json());

// Function to generate and solve puzzle
async function generateAndSolvePuzzle() {
    try {
        const puzzle = await Puzzle.generate({
            opsPerSecond: 1_300_000,
            duration: 10000, // Adjust duration to 10 seconds (10000 milliseconds)
            message: 'What is 2 + 2' // Message for the puzzle
        });

        const solution = await Puzzle.solve(puzzle);
        console.log('Puzzle solved:', solution);
        return solution;
    } catch (error) {
        console.error('Failed to generate or solve puzzle:', error);
        throw error; // Propagate the error for handling in the caller
    }
}

// Endpoint to create an admin (plaintext password storage is not recommended in production)
app.post('/admin', async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await prisma.admin.create({
            data: { username, password },          // Store plaintext password (not recommended in production)
        });
       
    } catch (error) {
        console.error('Failed to create admin:', error);
        res.status(500).json({ error: 'Failed to create admin' });
    }
});

// Endpoint for admin login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await prisma.admin.findUnique({
            where: { username }
        });

        if (admin && admin.password === password) {
            res.json({ adminId: admin.id });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Failed to login:', error);
        res.status(500).json({ error: 'Failed to login' });
    }
});

// Endpoint to post a question
app.post('/question', async (req, res) => {
    const { adminId, question, option1, option2, option3, option4, correctOption } = req.body;

    try {
        if (!adminId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const questionsCount = await prisma.question.count({
            where: { adminId }
        });

        if (questionsCount >= 5) {
            return res.status(400).json({ error: 'An admin can only post up to 5 questions.' });
        }

        // Encrypt all options and correct option individually
        const encryptedQuestion = encrypt(question,key,iv);
        const encryptedOption1 = encrypt(option1,key,iv);
        const encryptedOption2 = encrypt(option2,key,iv);
        const encryptedOption3 = encrypt(option3,key,iv);
        const encryptedOption4 = encrypt(option4,key,iv);
        const encryptedCorrectOption = encrypt(correctOption,key,iv);

        // Create a new question in the database
        const newQuestion = await prisma.question.create({
            data: {
                question: encryptedQuestion,
                option1: encryptedOption1,
                option2: encryptedOption2,
                option3: encryptedOption3,
                option4: encryptedOption4,
                correctOption: encryptedCorrectOption,
                admin: { connect: { id: adminId } }
            },
        });

        res.json(newQuestion);
    } catch (error) {
        console.error('Failed to create question:', error);
        res.status(500).json({ error: 'Failed to create. question' });
    }
});

// Endpoint to fetch and decrypt questions
app.get('/decryptedQuestions', async (req, res) => {
    try {

        //await generateAndSolvePuzzle()

        // Fetch all questions from the database
        const questions = await prisma.question.findMany();

        if (questions.length === 0) {
            return res.status(404).json({ error: 'No questions found' });
        }

        // Decrypt all questions
        const decryptedQuestions = questions.map(question => ({
            question: decrypt(question.question,key,iv),
            option1: decrypt(question.option1,key,iv),
            option2: decrypt(question.option2,key,iv),
            option3: decrypt(question.option3,key,iv),
            option4: decrypt(question.option4,key,iv),
        }));

        res.json(decryptedQuestions);
    } catch (error) {
        console.error('Failed to fetch and decrypt questions:', error);
        res.status(500).json({ error: 'Failed to fetch and decrypt questions' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


