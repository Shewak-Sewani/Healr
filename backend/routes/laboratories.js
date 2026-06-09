// routes/laboratories.js
import express from 'express';
import Laboratory from '../models/laboratories.js';

const router = express.Router();

// Get all laboratories with their tests
router.get('/', async (req, res) => {
  try {
    const labs = await Laboratory.find();
    res.json(labs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch laboratories' });
  }
});

// Add a new laboratory
router.post('/', async (req, res) => {
  const { labId, labName, tests } = req.body;

  try {
    const newLab = new Laboratory({ labId, labName, tests });
    await newLab.save();
    res.status(201).json(newLab);
  } catch (err) {
    res.status(400).json({ error: 'Error saving lab', details: err });
  }
});

export default router;
