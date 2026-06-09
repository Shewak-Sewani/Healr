import Appointment from '../models/Appointment.js';

// Function to update appointment statuses
const updateAppointmentStatuses = async () => {
  try {
    const now = new Date();
    
    // Find all confirmed appointments that have passed their time
    const appointments = await Appointment.find({
      status: 'confirmed',
      appointmentDate: { $lte: now }
    });

    // Update each appointment to completed status
    for (const appointment of appointments) {
      appointment.status = 'completed';
      appointment.isPaid = true; // Mark as paid when completed
      await appointment.save();
    }

    // console.log(`Updated ${appointments.length} appointments to completed status`);
  } catch (error) {
    console.error('Error updating appointment statuses:', error);
  }
};

// Run the update every minute
setInterval(updateAppointmentStatuses, 60000);

export default updateAppointmentStatuses; 