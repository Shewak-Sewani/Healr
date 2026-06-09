import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ListFilteredDoctors from "./ListFilteredDoctors";
import SearchDoctor from "./SearchDoctor";
import fetchSelectedDoctors from "./fetchSelectedDoctors";

const SearchResultsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const query = searchParams.get("query") || "";
  const specialization = searchParams.get("specialization") || "";
  const city = searchParams.get("city") || "";

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      let results = [];

      if (specialization && city) {
        // Use fetchSelectedDoctors for dropdown search
        results = await fetchSelectedDoctors(specialization, city);
      } else if (query) {
        // Use SearchDoctor for text-based search
        results = await SearchDoctor(query);
      }

      setDoctors(results);
      setLoading(false);
    };

    // Fetch only if there's valid input
    if ((specialization && city) || query.trim()) {
      fetchResults();
    } else {
      setLoading(false);
    }
  }, [query, specialization, city]);

  // Create a readable message for what was searched
  const renderSearchInfo = () => {
    if (specialization && city) {
      return `Specialization: "${specialization}" in "${city}"`;
    } else if (query) {
      return `"${query}"`;
    }
    return "your search";
  };

  return (
    <div className="container mt-4">
      <h4>
        {doctors.length} Search Result{doctors.length !== 1 && "s"} for:{" "}
        <em>{renderSearchInfo()}</em>
      </h4>
      <hr />
      {loading ? (
        <p>Loading...</p>
      ) : doctors.length > 0 ? (
        <ListFilteredDoctors doctors={doctors} />
      ) : (
        <p className="text-muted">No doctors found.</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
