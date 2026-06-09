import React, { useEffect, useState } from 'react';
import styles from './RevenueReport.module.css';

const RevenueReport = ({ doctor }) => {
  const [revenueData, setRevenueData] = useState({
    totalEarnings: 0,
    monthlyEarnings: 0,
    completedAppointments: 0,
    confirmedAppointments: 0,
    cancelledAppointments: 0,
    totalAppointments: 0,
    pendingPayments: 0,
    totalSurgeries: 0,
    completedSurgeries: 0,
    confirmedSurgeries: 0,
    cancelledSurgeries: 0
  });
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const [apptRes, surgRes] = await Promise.all([
          fetch(`http://localhost:5000/api/appointments/doctor/${doctor._id}`),
          fetch(`http://localhost:5000/api/surgeries?doctorId=${doctor._id}`)
        ]);
        const appointments = await apptRes.json();
        const surgeries = (await surgRes.json()).filter(s => s.doctorId === doctor._id);
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const apptData = appointments.reduce((acc, appointment) => {
          const appointmentDate = new Date(appointment.appointmentDate);
          const isCompleted = appointment.status === 'completed';
          const isConfirmed = appointment.status === 'confirmed';
          const isCancelled = appointment.status === 'cancelled';
          const isPaid = appointment.isPaid;
          acc.totalAppointments++;
          if (isCompleted || isConfirmed) {
            const fee = Number(doctor.profile.fee) || 0;
            acc.totalEarnings += fee;
            if (appointmentDate >= startOfMonth) {
              acc.monthlyEarnings += fee;
            }
            if (isCompleted) acc.completedAppointments++;
            else if (isConfirmed) acc.confirmedAppointments++;
            if (isCompleted && !isPaid) acc.pendingPayments += fee;
          }
          if (isCancelled) acc.cancelledAppointments++;
          return acc;
        }, {
          totalEarnings: 0,
          monthlyEarnings: 0,
          completedAppointments: 0,
          confirmedAppointments: 0,
          cancelledAppointments: 0,
          totalAppointments: 0,
          pendingPayments: 0
        });

        const surgData = surgeries.reduce((acc, surgery) => {
          const surgeryDate = new Date(surgery.date);
          const isCompleted = surgery.status === 'completed';
          const isConfirmed = surgery.status === 'confirmed';
          const isCancelled = surgery.status === 'cancelled';
          acc.totalSurgeries++;
          let fee = 0;
          if (surgery.surgeryFee) {
            // Remove 'Rs.' and commas, parse as number
            fee = parseInt((surgery.surgeryFee + '').replace(/[^0-9]/g, '')) || 0;
          } else if (doctor.profile.surgeryFee) {
            fee = parseInt((doctor.profile.surgeryFee + '').replace(/[^0-9]/g, '')) || 0;
          }
          if (isCompleted || isConfirmed) {
            acc.totalEarnings += fee;
            if (surgeryDate >= startOfMonth) {
              acc.monthlyEarnings += fee;
            }
            if (isCompleted) acc.completedSurgeries++;
            else if (isConfirmed) acc.confirmedSurgeries++;
          }
          if (isCancelled) acc.cancelledSurgeries++;
          return acc;
        }, {
          totalSurgeries: 0,
          completedSurgeries: 0,
          confirmedSurgeries: 0,
          cancelledSurgeries: 0,
          totalEarnings: 0,
          monthlyEarnings: 0
        });

        setRevenueData({
          totalEarnings: apptData.totalEarnings + surgData.totalEarnings,
          monthlyEarnings: apptData.monthlyEarnings + surgData.monthlyEarnings,
          completedAppointments: apptData.completedAppointments,
          confirmedAppointments: apptData.confirmedAppointments,
          cancelledAppointments: apptData.cancelledAppointments,
          totalAppointments: apptData.totalAppointments,
          pendingPayments: apptData.pendingPayments,
          totalSurgeries: surgData.totalSurgeries,
          completedSurgeries: surgData.completedSurgeries,
          confirmedSurgeries: surgData.confirmedSurgeries,
          cancelledSurgeries: surgData.cancelledSurgeries
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching revenue data:", error);
        setLoading(false);
      }
    };

    if (doctor?._id) fetchRevenueData();
  }, [doctor]);

  if (!doctor) return <div className="p-5">Loading doctor data...</div>;

  return (
    <div className={styles['revenue-report-container']}>
      <div className={styles['revenue-header']}>
        <div className={styles['header-content']}>
          <h2>Revenue Report</h2>
          <p>Track your earnings and payment history</p>
        </div>
        <div className={styles['period-selector']}>
          <button
            className={selectedPeriod === 'month' ? styles.active : ''}
            onClick={() => setSelectedPeriod('month')}
          >
            This Month
          </button>
          <button
            className={selectedPeriod === 'all' ? styles.active : ''}
            onClick={() => setSelectedPeriod('all')}
          >
            All Time
          </button>
        </div>
      </div>

      {loading ? (
        <div className={styles['loading-state']}>
          <div className={styles['loading-spinner']}></div>
          <p>Loading revenue data...</p>
        </div>
      ) : (
        <>
          <div className={styles['stats-grid']}>
            <div className={styles['stat-card']}>
              <div className={styles['stat-icon']}>💰</div>
              <div className={styles['stat-info']}>
                <h3>₹{selectedPeriod === 'month' ? revenueData.monthlyEarnings : revenueData.totalEarnings}</h3>
                <p>{selectedPeriod === 'month' ? 'This Month' : 'Total Earnings'}</p>
              </div>
            </div>
            <div className={styles['stat-card']}>
              <div className={styles['stat-icon']}>📊</div>
              <div className={styles['stat-info']}>
                <h3>{revenueData.totalAppointments}</h3>
                <p>Total Appointments</p>
              </div>
            </div>
            <div className={styles['stat-card']}>
              <div className={styles['stat-icon']}>✅</div>
              <div className={styles['stat-info']}>
                <h3>{revenueData.confirmedAppointments}</h3>
                <p>Confirmed Appointments</p>
              </div>
            </div>
            <div className={styles['stat-card']}>
              <div className={styles['stat-icon']}>🏥</div>
              <div className={styles['stat-info']}>
                <h3>{revenueData.completedAppointments}</h3>
                <p>Completed Appointments</p>
              </div>
            </div>
            <div className={styles['stat-card']}>
              <div className={styles['stat-icon']}>❌</div>
              <div className={styles['stat-info']}>
                <h3>{revenueData.cancelledAppointments}</h3>
                <p>Cancelled Appointments</p>
              </div>
            </div>
            <div className={styles['stat-card']}>
              <div className={styles['stat-icon']}>💵</div>
              <div className={styles['stat-info']}>
                <h3>₹{doctor.profile.fee}</h3>
                <p>Fee per Appointment</p>
              </div>
            </div>
            <div className={styles['stat-card']}>
              <div className={styles['stat-icon']}>🩺</div>
              <div className={styles['stat-info']}>
                <h3>{revenueData.totalSurgeries}</h3>
                <p>Total Surgeries</p>
              </div>
            </div>
            <div className={styles['stat-card']}>
              <div className={styles['stat-icon']}>✅</div>
              <div className={styles['stat-info']}>
                <h3>{revenueData.confirmedSurgeries}</h3>
                <p>Confirmed Surgeries</p>
              </div>
            </div>
            <div className={styles['stat-card']}>
              <div className={styles['stat-icon']}>🏥</div>
              <div className={styles['stat-info']}>
                <h3>{revenueData.completedSurgeries}</h3>
                <p>Completed Surgeries</p>
              </div>
            </div>
            <div className={styles['stat-card']}>
              <div className={styles['stat-icon']}>❌</div>
              <div className={styles['stat-info']}>
                <h3>{revenueData.cancelledSurgeries}</h3>
                <p>Cancelled Surgeries</p>
              </div>
            </div>
            <div className={styles['stat-card']}>
              <div className={styles['stat-icon']}>💵</div>
              <div className={styles['stat-info']}>
                <h3>₹{doctor.profile.surgeryFee}</h3>
                <p>Fee per Surgery</p>
              </div>
            </div>
          </div>

          {revenueData.pendingPayments > 0 && (
            <div className={styles['pending-payments-section']}>
              <h3>Pending Payments</h3>
              <div className={styles['pending-payments-alert']}>
                <span className={styles['alert-icon']}>⚠️</span>
                <p>You have ₹{revenueData.pendingPayments} in pending payments</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RevenueReport;