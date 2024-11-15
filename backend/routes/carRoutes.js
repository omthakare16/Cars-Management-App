const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Car = require('../models/Car');
const authMiddleware = require('../middleware/auth.js');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'cars', // The folder in cloudinary where images will be stored
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 1000, height: 1000, crop: 'limit' }] // Optional: resize images
    }
});

// Initialize multer with Cloudinary storage
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
            images, // Cloudinary URLs will be stored automatically
            user: req.user.id
        });

        await newCar.save();
        res.status(201).json(newCar);
    } catch (error) {
        console.error('Error creating car:', error);
        res.status(500).json({ error: 'Error creating car' });
    }
});

// Update a car's details with new images
router.put("/:id", authMiddleware, upload.array("newImages", 10), async (req, res) => {
    const { title, description, tags, existingImages } = req.body;
    let updateData = { title, description, tags };
  
    try {
      const existingCar = await Car.findOne({ _id: req.params.id, user: req.user.id });
      if (!existingCar) return res.status(404).json({ error: "Car not found" });
  
      // Preserve specified existing images
      updateData.images = JSON.parse(existingImages || "[]");
  
      // Add new images if uploaded
      if (req.files && req.files.length > 0) {
        const newImageUrls = req.files.map((file) => file.path);
        updateData.images = [...updateData.images, ...newImageUrls];
      }
  
      const updatedCar = await Car.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        updateData,
        { new: true }
      );
  
      res.status(200).json(updatedCar);
    } catch (error) {
      console.error("Error updating car:", error);
      res.status(500).json({ error: "Error updating car" });
    }
  });
  

// Delete a car and its images
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const car = await Car.findOne({ _id: req.params.id, user: req.user.id });
        if (!car) return res.status(404).json({ error: 'Car not found' });

        // Delete images from Cloudinary
        for (const imageUrl of car.images) {
            const publicId = imageUrl.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`cars/${publicId}`);
        }

        // Delete the car document
        await Car.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
        console.error('Error deleting car:', error);
        res.status(500).json({ error: 'Error deleting car' });
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

module.exports = router;
