import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ListSurgeryDoctors from './ListSurgeryDoctors';
import fetchSelectedDoctors from './fetchSelectedDoctors';

const SurgeryResultsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  // Get the query parameter (which contains the specialization)
  const specialization = searchParams.get('query') || '';
  const city = searchParams.get('city') || '';
  
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { 
    const fetchDoctors = async () => {
      if (!specialization.trim()) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        let doctorsList = [];
        
        // If city is provided, use both specialization and city
        if (city.trim()) {
          doctorsList = await fetchSelectedDoctors(specialization, city);
        } else {
          // If no city, try to fetch with just specialization
          doctorsList = await fetchSelectedDoctors(specialization, '');
        }
        
        setDoctors(doctorsList || []);
      } catch (err) {
        console.error('Error fetching doctors:', err);
        setError('Failed to fetch doctors. Please try again.');
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [specialization, city]);

  // Create a readable search info message
  const renderSearchInfo = () => {
    if (specialization && city) {
      return `${specialization} specialists in ${city}`;
    } else if (specialization) {
      return `${specialization} specialists`;
    }
    return 'surgery specialists';
  };

  return (
    <div className="container mt-4">
      <h4>
        {doctors.length} Surgery Specialist{doctors.length !== 1 ? 's' : ''} found for:{' '}
        <em>{renderSearchInfo()}</em>
      </h4>
      <hr />
      
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Finding the best surgeons for you...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : doctors.length > 0 ? (
        <ListSurgeryDoctors doctors={doctors} />
      ) : (
        <div className="text-center mt-5">
          <p className="text-muted">No surgeons found for "{specialization}".</p>
          <p className="text-muted">Try searching for a different specialization or location.</p>
        </div>
      )}
    </div>
  );
};

export default SurgeryResultsPage;