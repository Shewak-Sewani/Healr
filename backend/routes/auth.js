import express from 'express';
import User from '../models/User.js';
import DoctorAccounts from '../models/doctorAccounts.js';
import Admin from '../models/Admin.js';

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      gender,
      specialization,
      highestDegree,
      experience,
      fee,
      waitTime,
      numberOfPatients,
      location
    } = req.body;

    if (role === 'doctor') {
      const existingDoctor = await DoctorAccounts.findOne({ email });
      if (existingDoctor) {
        return res.status(400).json({ error: 'Doctor already exists' });
      }

      const doctor = new DoctorAccounts({
        name,
        email,
        password,
        role: 'doctor',
        profile: {
          specialization: specialization || [],
          highestDegree: highestDegree || '',
          degrees: highestDegree ? [highestDegree] : [],
          experience: experience || '',
          fee: fee || '',
          waitTime: waitTime || '',
          numberOfPatients: numberOfPatients || '0',
          rating: '0',
          location: location || '',
          availableSlots: [],
          verified: false,
          profilePicture: '',
        }
      });

      await doctor.save();
      return res.status(201).json({ message: 'Doctor created successfully', doctor });

    } else if (role === 'admin') {
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ error: 'Admin already exists' });
      }
      const admin = new Admin({ name, email, password, role: 'admin' });
      await admin.save();
      return res.status(201).json({ message: 'Admin created successfully', admin });
    } else {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const user = new User({ name, email, password, role: 'patient' });
      await user.save();
      return res.status(201).json({ message: 'User created successfully', user });
    }

  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ error: 'Signup failed' });
  }
});

// Login (common for all roles)
router.post('/login', async (req, res) => {
  const { email, password, accountType } = req.body;

  try {
    if (accountType === 'admin') {
      const admin = await Admin.findOne({ email, password });
      if (admin) {
        return res.status(200).json({ message: 'Login successful', admin });
      } else {
        return res.status(400).json({ error: 'Invalid admin credentials' });
      }
    }

    // Always check for admin, doctor, and patient if no accountType is provided
    const [admin, user, doctor] = await Promise.all([
      Admin.findOne({ email, password }),
      User.findOne({ email, password }),
      DoctorAccounts.findOne({ email, password })
    ]);

    if (admin) {
      return res.status(200).json({ message: 'Login successful', admin });
    }

    // If specific account type is requested (from account selection)
    if (accountType) {
      if (accountType === 'doctor' && doctor) {
        return res.status(200).json({ message: 'Login successful', doctor });
      }
      if (accountType === 'patient' && user) {
        return res.status(200).json({ message: 'Login successful', user });
      }
      return res.status(400).json({ error: 'Invalid account type or credentials' });
    }

    // Handle different account scenarios
    if (user && doctor) {
      // Both accounts exist - return both for frontend to handle
      return res.status(200).json({
        message: 'Multiple accounts found',
        user,
        doctor,
        hasBothAccounts: true
      });
    } else if (user) {
      // Only patient account
      return res.status(200).json({ message: 'Login successful', user });
    } else if (doctor) {
      // Only doctor account
      return res.status(200).json({ message: 'Login successful', doctor });
    } else {
      // No accounts found
      return res.status(400).json({ error: 'Invalid credentials' });
    }

  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;