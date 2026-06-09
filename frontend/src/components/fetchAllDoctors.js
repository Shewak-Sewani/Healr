const fetchAllDoctors = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/doctorAccounts");
    if (!res.ok) {
      throw new Error("Failed to fetch doctors");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
};

export default fetchAllDoctors;
