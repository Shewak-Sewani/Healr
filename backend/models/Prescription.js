import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
  // Patient Information
  patientInfo: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // If patient is registered
  },

  // Doctor Information
  doctorInfo: {
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'DoctorAccounts', required: true },
    name: { type: String, required: true },
    specialization: { type: String }
  },

  // Hospital/Clinic Information
  hospital: {
    name: { type: String, required: true }
  },

  // Medical Information
  symptoms: [{ type: String }],
  diagnosis: { type: String },

  // Medications
  medications: [{
    name: { type: String, required: true },
    dosage: { type: String, required: true }, // e.g., "500mg"
    frequency: { type: String, required: true }, // e.g., "twice daily"
    duration: { type: String, required: true }, // e.g., "7 days"
    instructions: { type: String } // e.g., "Take after meals"
  }],

  // Instructions and Advice
  advice: { type: String },

  // Follow-up
  followUp: {
    required: { type: Boolean, default: false },
    period: { type: String }, // e.g., "3 days", "1 week"
    specificDate: { type: Date }
  },

  // Services and Charges
  services: [{
    name: { type: String },
    price: { type: Number }
  }],
  totalAmount: { type: Number, default: 0 },

  // Status and Metadata
  prescriptionNumber: { type: String, unique: true }, // Auto-generated

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Auto-generate prescription number
prescriptionSchema.pre('save', async function (next) {
  if (!this.prescriptionNumber) {
    const count = await this.constructor.countDocuments();
    this.prescriptionNumber = `RX-${Date.now()}-${(count + 1).toString().padStart(4, '0')}`;
  }
  this.updatedAt = Date.now();
  next();
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);
export default Prescription;