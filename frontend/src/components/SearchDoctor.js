// src/components/searchDoctor.js

const SearchDoctor = async (query) => {
  try {
    const res = await fetch(`http://localhost:5000/api/doctorAccounts/search?search=${encodeURIComponent(query)}`);
    if (!res.ok) {
      throw new Error("Failed to fetch doctors");
    }
    const data = await res.json();
    return data; // this should be an array of doctor objects
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
};

export default SearchDoctor;