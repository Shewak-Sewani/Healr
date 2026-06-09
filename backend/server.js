import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Import CORS
import appointmentRoutes from './routes/appointments.js';
import authRoute from './routes/auth.js';
import doctorAccountsRoutes from './routes/doctorAccounts.js';
import laboratoryRoutes from './routes/laboratories.js';
import prescriptionRoutes from './routes/prescriptions.js';
import surgeriesRoute from './routes/surgeries.js';
import './utils/appointmentScheduler.js'; // Import the scheduler
import './utils/surgeryScheduler.js'; // Import the surgery scheduler

dotenv.config();
const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://healr.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { dbName: 'healrDB' })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Error:', err));

// Routes
app.use('/api/auth', authRoute);
app.use('/api/doctorAccounts', doctorAccountsRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/laboratories', laboratoryRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/surgeries', surgeriesRoute);


const PORT = process.env.PORT || 5000;

// Only start the server when not on Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export the app for Vercel
export default app;