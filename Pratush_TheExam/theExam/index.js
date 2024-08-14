import express from 'express';
import { PrismaClient } from '@prisma/client';
import { decrypt, encrypt, key, iv } from './utils/crypto.js';
import cors from 'cors';
import Puzzle from 'crypto-puzzle';
import dotenv from 'dotenv';
import nacl from 'tweetnacl';
import naclUtil from 'tweetnacl-util';
dotenv.config();


const { decodeUTF8, encodeBase64, decodeBase64 } = naclUtil;
const app = express();
const port = 3000;
const prisma = new PrismaClient();



// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

async function generateAndSolvePuzzle() {
  try {
    // Calculate the delay (1 minute)
    const delayMinutes = 1;
    const delayMilliseconds = delayMinutes * 60 * 1000; // 1 minute in milliseconds

    // Generate and solve the puzzle
    const puzzle = await Puzzle.generate({
      opsPerSecond: 1_300_000,
      duration: delayMilliseconds, // Set the duration to the delay time
      message: 'What is 2 + 2'
    });

    const solution = await Puzzle.solve(puzzle);
    console.log('Puzzle solved:', solution);

    // Start the state machine after solving the puzzle
    startStateMachine();
    return solution;
  } catch (error) {
    console.error('Failed to generate or solve puzzle:', error);
    throw error;
  }
}



// Function to start the state machine
function startStateMachine() {
  if (startTime) {
      console.log("State machine already started");
      return;
  }

  startTime = Date.now();
  queue.push({ state: 'started', timestamp: startTime });

  setTimeout(() => {
      isFrozen = true;
  }, 3 * 60 * 1000); // 3 minutes in milliseconds

  console.log("State machine started");
}


// Endpoint to create an admin (plaintext password storage is not recommended in production)
app.post('/adminSignup', async (req, res) => {
    const { username, password } = req.body;
    try {
      const admin = await prisma.admin.create({
        data: { username, password }, // Store plaintext password (not recommended in production)
      });
      res.json(admin);
    } catch (error) {
      console.error('Failed to create admin:', error);
      res.status(500).json({ error: 'Failed to create admin' });
    }
  });
  

// Endpoint for admin login
app.post('/adminlogin', async (req, res) => {
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
        const encryptedQuestion = encrypt(question, key, iv);
        const encryptedOption1 = encrypt(option1, key, iv);
        const encryptedOption2 = encrypt(option2, key, iv);
        const encryptedOption3 = encrypt(option3, key, iv);
        const encryptedOption4 = encrypt(option4, key, iv);

        // Create a new question in the database
        const newQuestion = await prisma.question.create({
            data: {
                question: encryptedQuestion,
                option1: encryptedOption1,
                option2: encryptedOption2,
                option3: encryptedOption3,
                option4: encryptedOption4,
                admin: { connect: { id: adminId } }
            },
        });

        // Create a new answer in the database
        const newAnswer = await prisma.answer.create({
            data: {
                answer: encrypt(correctOption, key, iv),
                question: { connect: { id: newQuestion.id } }
            },
        });

        res.json({"msg":"your response has been submitted"});
    } catch (error) {
        console.error('Failed to create question:', error);
        res.status(500).json({ error: 'Failed to create question' });
    }
});

app.post('/studentSignup', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Save the student with plain text password
        await prisma.student.create({
            data: {
                username,
                password
            }
        });

        res.status(201).json({ message: 'Student created successfully' });
    } catch (error) {
        console.error('Failed to create student:', error);
        res.status(500).json({ error: 'Failed to create student' });
    }
});


app.post('/studentlogin', async (req, res) => {
  const { username, password } = req.body;
  try {
      const std = await prisma.student.findUnique({
          where: { username }
      });

      if (std && std.password === password) {
          res.json({ studentid: std.id });
      } else {
          res.status(401).json({ error: 'Invalid username or password' });
      }
  } catch (error) {
      console.error('Failed to login:', error);
      res.status(500).json({ error: 'Failed to login' });
  }
});

// server.js or your Express app file
app.get('/checkPuzzleStatus', async (req, res) => {
  try {
    const puzzleSolved = await generateAndSolvePuzzle();

    res.json({ puzzleSolvedStatus: !!puzzleSolved });
  } catch (error) {
    console.error('Failed to check puzzle status:', error);
    res.status(500).json({ error: 'Failed to check puzzle status' });
  }
});

app.get('/decryptedQuestions', async (req, res) => {
  try {
    await generateAndSolvePuzzle(); // Generate and solve puzzle

    // Fetch all questions from the database
    const questions = await prisma.question.findMany({
      include: { answer: true }
    });

    if (questions.length === 0) {
      return res.status(404).json({ error: 'No questions found' });
    }

    // Decrypt all questions
    const decryptedQuestions = questions.map(question => ({
      questionId: question.id,
      question: decrypt(question.question, key, iv),
      option1: decrypt(question.option1, key, iv),
      option2: decrypt(question.option2, key, iv),
      option3: decrypt(question.option3, key, iv),
      option4: decrypt(question.option4, key, iv),
    }));

    res.json(decryptedQuestions);
  } catch (error) {
    console.error('Failed to fetch and decrypt questions:', error.message);
    res.status(500).json({ error: 'Failed to fetch and decrypt questions', details: error.message });
  }
});







const keypair = nacl.sign.keyPair();
const queue = [];
let startTime = null;
let isFrozen = false;

// Middleware to check if the state machine is frozen
app.use((req, res, next) => {
  if (isFrozen && req.path !== '/verifyStateMachine' && req.method !== 'GET') {
    return res.status(403).json({ message: "State machine is frozen" });
  }
  next();
});


// Transition to a new state
app.post('/transition', (req, res) => {
  if (isFrozen) {
    return res.status(403).json({ message: "State machine is frozen. Cannot transition." });
  }

  const { studentId, questionId, response } = req.body;
  if (!studentId || !questionId || !response) {
    return res.status(400).json({ message: "studentId, questionId, and response are required" });
  }

  const timestamp = Date.now();
  const message = JSON.stringify({ studentId, questionId, response, timestamp });
  const messageBytes = decodeUTF8(message);
  const signature = nacl.sign.detached(messageBytes, keypair.secretKey);

  queue.push({ studentId, questionId, response, timestamp, signature: encodeBase64(signature) });
  res.json({ message: "Response recorded", studentId, questionId, response, timestamp });
});

// Verify a state transition
app.post('/verifyStateMachine', (req, res) => {
  const { studentId, questionId, response, timestamp, signature } = req.body;
  if (!studentId || !questionId || !response || !timestamp || !signature) {
    return res.status(400).json({ message: "studentId, questionId, response, timestamp, and signature are required" });
  }

  const message = JSON.stringify({ studentId, questionId, response, timestamp });
  const messageBytes = decodeUTF8(message);
  const signatureBytes = decodeBase64(signature);

  const isValid = nacl.sign.detached.verify(messageBytes, signatureBytes, keypair.publicKey);

  res.json({ isValid, studentId, questionId, response });
});



// Get the state queue
app.get('/queue', (req, res) => {
  res.json(queue);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
