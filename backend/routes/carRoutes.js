const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Car = require('../models/Car');
const authMiddleware = require('../middleware/auth.js'); // Middleware for authentication

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Save uploaded images to 'uploads/' directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Generate unique file name using timestamp
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Create a new car with images
router.post('/', authMiddleware, upload.array('images', 10), async (req, res) => {
    const { title, description, tags } = req.body;
    const images = req.files ? req.files.map(file => file.path) : [];

    try {
        const newCar = new Car({
            title,
            description,
            tags,
            images,
            user: req.user.id
        });

        await newCar.save();
        res.status(201).json(newCar);
    } catch (error) {
        console.error('Error creating car:', error);
        res.status(500).json({ error: 'Error creating car' });
    }
});

// Get all cars for a user
router.get('/', authMiddleware, async (req, res) => {
    try {
        const cars = await Car.find({ user: req.user.id });
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching cars' });
    }
});

// Get a specific car by ID
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const car = await Car.findOne({ _id: req.params.id, user: req.user.id });
        if (!car) return res.status(404).json({ error: 'Car not found' });
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching car' });
    }
});

// Update a car's details
router.put('/:id', authMiddleware, upload.array('images', 10), async (req, res) => {
    const { title, description, tags } = req.body;
    const images = req.files ? req.files.map(file => file.path) : [];

    try {
        const updatedCar = await Car.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { title, description, tags, images },
            { new: true }
        );

        if (!updatedCar) return res.status(404).json({ error: 'Car not found' });
        res.status(200).json(updatedCar);
    } catch (error) {
        console.error('Error updating car:', error);
        res.status(500).json({ error: 'Error updating car' });
    }
});

// Delete a car
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const deletedCar = await Car.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!deletedCar) return res.status(404).json({ error: 'Car not found' });
        res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
        console.error('Error deleting car:', error);
        res.status(500).json({ error: 'Error deleting car' });
    }
});

module.exports = router;
