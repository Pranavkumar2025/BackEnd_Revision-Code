"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jwt_1 = require("../utils/jwt");
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            const decoded = (0, jwt_1.verifyToken)(token);
            req.user = decoded;
            console.log(req.user);
            next();
        }
        catch (error) {
            return res.status(403).json({ message: 'Invalid token' });
        }
    }
    else {
        return res.status(401).json({ message: 'Authorization header missing' });
    }
};
exports.authenticateJWT = authenticateJWT;
