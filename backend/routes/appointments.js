import express from 'express';
import Appointment from '../models/Appointment.js'; // Assuming you named it Appointment.js
import DoctorAccounts from '../models/doctorAccounts.js';
import User from '../models/User.js';

const router = express.Router();

// Create a new appointment
router.post('/', async (req, res) => {
  try {
    const { patient, doctor, appointmentDate, timeSlot, reason } = req.body;

    // Check if doctor exists
    const doctorExists = await DoctorAccounts.findById(doctor);
    if (!doctorExists) return res.status(404).json({ message: 'Doctor not found' });

    //Check for existing booking at the same time
    const isSlotTaken = await Appointment.findOne({ doctor, appointmentDate, timeSlot });
    if (isSlotTaken) return res.status(400).json({ message: 'Time slot already booked' });

    const appointment = new Appointment({
      patient,
      doctor,
      appointmentDate,
      timeSlot,
      reason
    });

    await appointment.save();
    res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Error booking appointment', error: error.message });
  }
});

// Get all appointments (admin use or debugging)
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patient', 'name email')
      .populate('doctor', 'name email profile.specialization');
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error: error.message });
  }
});

// Get appointments for a specific patient
router.get('/patient/:id', async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.params.id })
      .populate('doctor', 'name profile.specialization');
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient appointments', error: error.message });
  }
});

// Get appointments for a specific doctor
router.get('/doctor/:id', async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.params.id })
      .populate('patient', 'name email');
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctor appointments', error: error.message });
  }
});

// Update appointment status (e.g., confirmed, cancelled, completed)
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Update status
    appointment.status = status;

    // If appointment is being confirmed, mark it as paid
    if (status === 'confirmed') {
      appointment.isPaid = true;
    }

    await appointment.save();

    res.status(200).json({ message: 'Status updated', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error: error.message });
  }
});

// Delete an appointment
router.delete('/:id', async (req, res) => {
  try {
    const result = await Appointment.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Appointment not found' });
    res.status(200).json({ message: 'Appointment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting appointment', error: error.message });
  }
});

export default router;
