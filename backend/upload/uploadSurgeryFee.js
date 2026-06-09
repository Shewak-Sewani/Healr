import mongoose from 'mongoose';
import DoctorAccounts from './models/doctorAccounts.js'; // Adjust the path as needed

const mongoURI = 'mongodb+srv://karantejwani48:7tOMnYGpQrhmVcSh@cluster0.bb78w8c.mongodb.net/healrDB';

// Remove all characters except digits
const extractNumericFee = (feeString) => {
  if (!feeString) return null;
  const cleaned = feeString.replace(/[^0-9]/g, ''); // Removes Rs., ., commas, etc.
  const numeric = parseInt(cleaned, 10);
  return isNaN(numeric) ? null : numeric;
};

const updateSurgeryFees = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    const doctors = await DoctorAccounts.find();

    for (const doctor of doctors) {
      const feeString = doctor.profile?.fee;
      const numericFee = extractNumericFee(feeString);

      if (numericFee === null) {
        console.warn(`⚠️ Skipping doctor ${doctor._id}: invalid fee "${feeString}"`);
        continue;
      }

      const surgeryFee = `Rs. ${numericFee * 75}`;

      doctor.profile.surgeryFee = surgeryFee;
      await doctor.save();
      console.log(`✅ Updated doctor ${doctor._id} with surgeryFee: ${surgeryFee}`);
    }

    console.log('🎉 All surgery fees updated successfully.');
    await mongoose.disconnect();
  } catch (err) {
    console.error('❌ Error updating surgery fees:', err);
    await mongoose.disconnect();
  }
};

updateSurgeryFees();
