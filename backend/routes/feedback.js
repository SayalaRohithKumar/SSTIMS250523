// backend/routes/feedback.js (or wherever your route handlers are)

const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

router.post('/api/feedback', async (req, res) => {
  const { name, message, rating } = req.body;

  if (!name || !message || !rating) {
    return res.status(400).json({ error: 'Name, message, and rating are required' });
  }

  // Optional: validate rating value
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }

  try {
    const newFeedback = new Feedback({ name, message, rating });
    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/api/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
