const express = require('express');
const router = express.Router();

// import controller
const { createUser } = require('../controllers/userController');
const { loginUser } = require('../controllers/userController');
// define route
router.post('/register', createUser);
router.post('/login', loginUser);
module.exports = router;
// This code defines a route for user registration in an Express application.
// It imports the necessary modules, sets up a router, and defines a POST route for user registration. fhemt sahbi ghassen?