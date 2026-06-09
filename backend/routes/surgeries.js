import express from 'express';
import Surgery from '../models/surgeries.js';

const router = express.Router();

// Create a new surgery request
router.post('/', async (req, res) => {
  try {
    const surgery = new Surgery(req.body);
    await surgery.save();
    res.status(201).json(surgery);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all surgery requests
router.get('/', async (req, res) => {
  try {
    const surgeries = await Surgery.find().sort({ createdAt: -1 });
    res.json(surgeries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single surgery request by ID
router.get('/:id', async (req, res) => {
  try {
    const surgery = await Surgery.findById(req.params.id);
    if (!surgery) return res.status(404).json({ error: 'Not found' });
    res.json(surgery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a surgery request (e.g., assign doctor, change status)
router.patch('/:id', async (req, res) => {
  try {
    const surgery = await Surgery.findByIdAndUpdate(
      req.params.id,
      { $set: req.body, updatedAt: new Date() },
      { new: true }
    );
    if (!surgery) return res.status(404).json({ error: 'Not found' });
    res.json(surgery);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router; 