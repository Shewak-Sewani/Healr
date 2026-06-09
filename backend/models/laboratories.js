import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
  testId: { type: String, required: true },
  testName: { type: String, required: true },
  fee: { type: Number, required: true },
  testType: { type: String, required: true }
});

const laboratorySchema = new mongoose.Schema({
  labId: { type: String, required: true, unique: true },
  labName: { type: String, required: true },
  tests: [testSchema]
});

const Laboratory = mongoose.model('Laboratory', laboratorySchema);
export default Laboratory;