// Imports
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');
const testJwtRouter = require("./controllers/test-jwt");
const verifyToken = require("./middleware/verify-token");
const userRouter = require("./controllers/users");
const authRouter = require('./controllers/auth');

dotenv.config();

const { MONGODB_URI, PORT = 3000, NODE_ENV } = process.env;
if (!MONGODB_URI) {
  console.error('Missing MONGODB_URI in .env');
  process.exit(1);
}

// DB
mongoose.connect(MONGODB_URI)
  .then(() => console.log(`Connected to MongoDB ${mongoose.connection.name}.`))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// App + middleware
app.use(cors());
app.use(express.json());
app.use(logger(NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(verifyToken);

// Routes
app.use('/auth', authRouter);
app.use('/test-jwt', testJwtRouter);
app.use("/users", verifyToken, userRouter);

// Start
app.listen(PORT, () => {
  console.log(`The express app is ready on http://localhost:${PORT}`);
});