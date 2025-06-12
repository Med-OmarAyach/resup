const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authmiddleware'); // Import the authentication middleware

const {createReservation, getReservations, updateReservation, deleteReservation} = require('../controllers/resController');
// Define routes for reservations
router.post('/', authMiddleware, createReservation);
router.get('/', authMiddleware, getReservations);
router.put('/:id', authMiddleware, updateReservation);
router.delete('/:id', authMiddleware, deleteReservation);
module.exports = router; // Export the router to use in the main server file
// This code defines routes for managing reservations in an Express application.