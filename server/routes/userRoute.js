const express = require('express');
const router = express.Router();

const { createUser, loginUser } = require('../controllers/userController');

router.use((req, res, next) => {
  console.log(`[ROUTE] users: ${req.method} ${req.path}`);
  next();
});

router.post('/register', createUser);
router.post('/login', loginUser);

module.exports = router;
