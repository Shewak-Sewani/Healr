import mongoose from 'mongoose';

const surgerySchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  patientContact: { type: String, required: true },
  patientEmail: { type: String, required: true },
  surgery: { type: String, required: true },
  date: { type: String, required: true },
  city: { type: String, required: true },
  specialization: { type: String },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'DoctorAccounts', default: null },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Surgery = mongoose.model('Surgery', surgerySchema);
export default Surgery; 