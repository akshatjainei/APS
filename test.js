const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3000;

app.use(express.json());

const SECRET_KEY = 'your-secret-key';

// Mock user data
let users = [];

// Register endpoint
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    users.push({ username, password: hashedPassword });
    
    res.status(201).json({ message: 'User registered successfully' });
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Generate token
    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
});

// Protected route
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

// Middleware to authenticate token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        
        req.user = user;
        next();
    });
}

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});