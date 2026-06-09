import express from 'express';
import mongoose from 'mongoose';
import DoctorAccounts from '../models/doctorAccounts.js';

const router = express.Router();

// Get all doctor accounts
router.get('/', async (req, res) => {
  try {
    const doctors = await DoctorAccounts.find();
    res.json(doctors);
  } catch (err) {
    console.error('Error fetching doctor accounts:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// General search (OR logic for name, specialization, location)
router.get('/search', async (req, res) => {
  const { search } = req.query;
  if (!search) return res.status(400).json({ error: "Search term required" });

  const regex = new RegExp(search, 'i'); // case-insensitive

  try {
    const doctors = await DoctorAccounts.find({
      $or: [
        { name: regex },
        { 'profile.specialization': regex },
        { 'profile.location': regex }
      ]
    });

    res.json(doctors);
  } catch (err) {
    console.error('Error in general search:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Filter doctors (AND logic)
router.get('/search/filter', async (req, res) => {
  const { specialization, location } = req.query;

  let query = {};
  if (specialization) query['profile.specialization'] = specialization;
  if (location) query['profile.location'] = location;

  try {
    const doctors = await DoctorAccounts.find(query);
    res.json(doctors);
  } catch (err) {
    console.error('Error filtering doctors:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Specific filter for both specialization and location (mandatory both)
router.get('/search/selected', async (req, res) => {
  const { specialization, location } = req.query;

  if (!specialization || !location) {
    return res.status(400).json({ error: "Both specialization and location are required" });
  }

  try {
    const doctors = await DoctorAccounts.find({
      'profile.specialization': specialization,
      'profile.location': location
    });

    res.json(doctors);
  } catch (err) {
    console.error('Error in selected search:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Register a new doctor
router.post('/register', async (req, res) => {
  try {
    const doctor = new DoctorAccounts(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    console.error('Error registering doctor:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a doctor's profile
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid doctor ID' });
  }

  try {
    const updatedDoctor = await DoctorAccounts.findByIdAndUpdate(
      id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    res.json(updatedDoctor);
  } catch (err) {
    console.error('Error updating doctor:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a doctor account
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid doctor ID' });
  }

  try {
    await DoctorAccounts.findByIdAndDelete(id);
    res.json({ message: 'Doctor deleted successfully' });
  } catch (err) {
    console.error('Error deleting doctor:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a doctor by ID (must be LAST to prevent route conflicts)
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid doctor ID' });
  }

  try {
    const doctor = await DoctorAccounts.findById(id);
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    res.json(doctor);
  } catch (err) {
    console.error('Error fetching doctor by ID:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all unique cities from doctor profiles
router.get('/cities', async (req, res) => {
  try {
    const cities = await DoctorAccounts.distinct('profile.location');
    // Remove empty/null/undefined and sort alphabetically
    const filteredCities = cities.filter(Boolean).sort((a, b) => a.localeCompare(b));
    res.json(filteredCities);
  } catch (err) {
    console.error('Error fetching cities:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all doctors (for admin)
router.get('/admin/all', async (req, res) => {
  try {
    const doctors = await DoctorAccounts.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
});

// Verify/unverify a doctor
router.put('/admin/verify/:id', async (req, res) => {
  const { id } = req.params;
  const { verified } = req.body;
  try {
    const updatedDoctor = await DoctorAccounts.findByIdAndUpdate(
      id,
      { 'profile.verified': verified },
      { new: true }
    );
    res.json(updatedDoctor);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update verification status' });
  }
});

export default router;
