import React, { useEffect, useState } from 'react';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('Doctor Verification');
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [surgeries, setSurgeries] = useState([]);
  const [loadingSurgeries, setLoadingSurgeries] = useState(true);
  const [allDoctors, setAllDoctors] = useState([]);
  const [assigning, setAssigning] = useState(null);

  const fetchDoctors = async () => {
    setLoading(true);
    const res = await fetch('http://localhost:5000/api/doctorAccounts/admin/all');
    const data = await res.json();
    setDoctors(data);
    setLoading(false);
  };

  const fetchSurgeries = async () => {
    setLoadingSurgeries(true);
    const res = await fetch('http://localhost:5000/api/surgeries');
    const data = await res.json();
    setSurgeries(data.filter(s => !s.doctorId));
    setLoadingSurgeries(false);
  };

  const fetchAllDoctorsForAssign = async () => {
    const res = await fetch('http://localhost:5000/api/doctorAccounts/admin/all');
    const data = await res.json();
    setAllDoctors(data);
  };

  useEffect(() => {
    if (activeSection === 'Doctor Verification') {
      fetchDoctors();
    } else if (activeSection === 'Surgery Requests') {
      fetchSurgeries();
      fetchAllDoctorsForAssign();
    }
  }, [activeSection]);

  const handleVerify = async (doctorId, currentStatus) => {
    await fetch(`http://localhost:5000/api/doctorAccounts/admin/verify/${doctorId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ verified: !currentStatus }),
    });
    fetchDoctors();
  };

  const handleAssignDoctor = async (surgeryId, doctorId) => {
    setAssigning(surgeryId);
    await fetch(`http://localhost:5000/api/surgeries/${surgeryId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ doctorId })
    });
    setAssigning(null);
    fetchSurgeries();
  };

  const sidebarOptions = [
    'Doctor Verification',
    'Surgery Requests',
    'Manage Users',
    'Manage Appointments',
    'Reports',
    'Settings',
  ];

  const filteredDoctors = doctors.filter(doc => {
    const q = search.toLowerCase();
    return (
      doc.name?.toLowerCase().includes(q) ||
      doc.email?.toLowerCase().includes(q) ||
      doc.profile?.specialization?.join(', ').toLowerCase().includes(q)
    );
  });

  const renderContent = () => {
    if (activeSection === 'Surgery Requests') {
      return (
        <div>
          <h2>Surgery Requests (Unassigned)</h2>
          <p>Assign a doctor to each surgery request.</p>
          {loadingSurgeries ? (
            <p>Loading surgery requests...</p>
          ) : surgeries.length === 0 ? (
            <p>No unassigned surgery requests.</p>
          ) : (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Surgery</th>
                    <th>Date</th>
                    <th>City</th>
                    <th>Assign Doctor</th>
                  </tr>
                </thead>
                <tbody>
                  {surgeries.map((surg) => (
                    <tr key={surg._id}>
                      <td>{surg.patientName}</td>
                      <td>{surg.patientEmail}</td>
                      <td>{surg.patientContact}</td>
                      <td>{surg.surgery}</td>
                      <td>{surg.date}</td>
                      <td>{surg.city}</td>
                      <td>
                        <select
                          defaultValue=""
                          onChange={e => handleAssignDoctor(surg._id, e.target.value)}
                          disabled={assigning === surg._id}
                        >
                          <option value="" disabled>Select Doctor</option>
                          {allDoctors.map(doc => (
                            <option key={doc._id} value={doc._id}>
                              {doc.name} ({doc.profile?.specialization?.join(', ')})
                            </option>
                          ))}
                        </select>
                        {assigning === surg._id && <span style={{ marginLeft: 8 }}>Assigning...</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      );
    }
    if (activeSection !== 'Doctor Verification') {
      return <h2>{activeSection} <span style={{ fontWeight: 400, fontSize: '0.9rem' }}>Coming soon...</span></h2>;
    }

    return (
      <div>
        <h2>Doctor Verification</h2>
        <p>Review and verify doctors. Only verified doctors appear in search results.</p>
        <input
          type="text"
          placeholder="Search doctors by name, email, or specialization..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={styles.searchInput}
          style={{ marginBottom: '1rem', width: '100%', maxWidth: 350 }}
        />
        {loading ? (
          <p>Loading doctors...</p>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Specialization</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.map((doc) => (
                  <tr key={doc._id}>
                    <td>
                      {doc.profile?.profilePicture ? (
                        <img src={doc.profile.profilePicture} alt="Profile" className={styles.profilePic} />
                      ) : (
                        <div className={styles.placeholder}>
                          {doc.name?.[0] || '?'}
                        </div>
                      )}
                    </td>
                    <td>{doc.name}</td>
                    <td className={styles.emailCell} title={doc.email}>{doc.email}</td>
                    <td>{doc.profile?.specialization?.join(', ')}</td>
                    <td>
                      {doc.profile?.verified ? (
                        <span className={styles.statusVerified}>Verified</span>
                      ) : (
                        <span className={styles.statusUnverified}>Not Verified</span>
                      )}
                    </td>
                    <td className={styles.actionCell}>
                      <button
                        onClick={() => handleVerify(doc._id, doc.profile?.verified)}
                        className={doc.profile?.verified ? styles.unverifyBtn : styles.verifyBtn}
                      >
                        {doc.profile?.verified ? '❌ Unverify' : '✅ Verify'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          Admin <span className={styles.textWarning}>Dashboard</span>
        </div>
        <nav className={styles.nav}>
          {sidebarOptions.map((option) => (
            <button
              key={option}
              className={`${styles.navButton} ${activeSection === option ? styles.active : ''}`}
              onClick={() => setActiveSection(option)}
            >
              {option}
            </button>
          ))}
        </nav>
      </aside>
      <main className={styles.main}>
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
