const fetchSelectedDoctors = async (specialization, location) => {
  try {
    const res = await fetch(`http://localhost:5000/api/doctorAccounts/search/filter?specialization=${encodeURIComponent(specialization)}&location=${encodeURIComponent(location)}`);

    if (!res.ok) {
      throw new Error('Failed to fetch selected doctors');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching selected doctors:', error);
    return [];
  }
};

export default fetchSelectedDoctors;
