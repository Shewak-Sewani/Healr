import express from 'express';
import Prescription from '../models/Prescription.js';

const router = express.Router();

// Create new prescription
router.post('/create', async (req, res) => {
  try {
    const prescription = new Prescription(req.body);
    await prescription.save();

    res.status(201).json({
      message: 'Prescription created successfully',
      prescription,
      prescriptionNumber: prescription.prescriptionNumber
    });
  } catch (error) {
    console.error('Create prescription error:', error);
    res.status(500).json({ error: 'Failed to create prescription' });
  }
});

// Get doctor's prescriptions
router.get('/doctor/:doctorId', async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;

    const query = {
      'doctorInfo.doctorId': req.params.doctorId,
      ...(search && {
        $or: [
          { 'patientInfo.name': { $regex: search, $options: 'i' } },
          { 'patientInfo.phone': { $regex: search, $options: 'i' } },
          { prescriptionNumber: { $regex: search, $options: 'i' } }
        ]
      })
    };

    const prescriptions = await Prescription.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Prescription.countDocuments(query);

    res.json({
      prescriptions,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch prescriptions' });
  }
});

// Get single prescription
router.get('/:prescriptionId', async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.prescriptionId);
    if (!prescription) {
      return res.status(404).json({ error: 'Prescription not found' });
    }
    res.json(prescription);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch prescription' });
  }
});

// Get patient's prescription history
router.get('/patient/history', async (req, res) => {
  try {
    const { phone, name } = req.query;

    const prescriptions = await Prescription.find({
      $or: [
        { 'patientInfo.phone': phone },
        { 'patientInfo.name': { $regex: name, $options: 'i' } }
      ]
    })
      .sort({ createdAt: -1 })
      .populate('doctorInfo.doctorId', 'name profile.specialization');

    res.json({ prescriptions, count: prescriptions.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch patient history' });
  }
});

// Update prescription
router.put('/:prescriptionId', async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndUpdate(
      req.params.prescriptionId,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );

    if (!prescription) {
      return res.status(404).json({ error: 'Prescription not found' });
    }

    res.json({
      message: 'Prescription updated successfully',
      prescription
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update prescription' });
  }
});

// Delete prescription
router.delete('/:prescriptionId', async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndDelete(req.params.prescriptionId);

    if (!prescription) {
      return res.status(404).json({ error: 'Prescription not found' });
    }

    res.json({ message: 'Prescription deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete prescription' });
  }
});

export default router;