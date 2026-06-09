import Surgery from '../models/surgeries.js';

// Function to update surgery statuses
const updateSurgeryStatuses = async () => {
  try {
    const now = new Date();
    // Find all confirmed surgeries whose date has passed or is today
    const surgeries = await Surgery.find({
      status: 'confirmed',
      date: { $lte: now.toISOString().split('T')[0] }
    });
    for (const surgery of surgeries) {
      surgery.status = 'completed';
      await surgery.save();
    }
    // console.log(`Updated ${surgeries.length} surgeries to completed status`);
  } catch (error) {
    console.error('Error updating surgery statuses:', error);
  }
};

// Run the update every minute
setInterval(updateSurgeryStatuses, 60000);

export default updateSurgeryStatuses;

