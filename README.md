# Healr

Healr is an online healthcare website that helps people find medicines, view lab tests, and manage their health needs in one place. Users can search for FDA-approved medicines, check available medical tests from different labs, and add them to a cart for easy access. Patients can also book appointments with doctors available in major cities like Lahore, Karachi, and Islamabad.
Healr includes separate dashboards for patients, doctors, and the admin. Doctors can manage their profiles, while the admin can verify new doctors, manage surgeries, and handle all appointments. This system makes it easy for patients to connect with trusted doctors and get medical help from home.


## 🌟 Core Features

- **Signup/Login** with form validation using Formik & Yup
- **Medicine Search** using FDA API (with fallback data)
- **Lab Test Listings** with lab-wise filtering
- **Doctor Booking System** with filters:
  - By Disease
  - By Speciality
  - By City
- **Cart System** for medicines and tests
- **Video Consultation** support (under development)
- **Role-Based Dashboards** for patients, doctors, and admin
- **Admin Panel** to verify doctors and manage appointments

## 🛠️ Tech Stack

| Layer      | Technology        |
|------------|-------------------|
| Frontend   | ReactJS, Bootstrap |
| Backend    | Node.js, ExpressJS |
| Database   | MongoDB            |
| Forms      | Formik + Yup       |
| Deployment | Vercel (Frontend)  |
| Version Control | Git & GitHub  |

---

## Installation

### Prerequisites

- Node.js (v16+ recommended)
- npm
- MongoDB (local or Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/KaranTejwani/Healr.git
cd Healr
```

### 2. Install dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

---

## Running the Project Locally

### 1. Start MongoDB

Make sure your MongoDB server is running locally or update the connection string in `backend/server.js` or your `.env` file.

### 2. Start the Backend

```bash
cd backend
node server.js
```

The backend will run on [http://localhost:5000](http://localhost:5000).

### 3. Start the Frontend

```bash
cd ../frontend
npm run dev
```

The frontend will run on [http://localhost:5173](http://localhost:5173) (default Vite port).

### 4. (Optional) Seed Doctor Data

To seed doctor accounts, run the upload script in the backend:

```bash
cd backend/upload
node uploadDoctorAccounts.js
```

---

## Deployment

Both frontend and backend are ready for deployment on Vercel.  
- Frontend: [https://healr.vercel.app](https://healr.vercel.app)
- Backend: [https://healr-backend.vercel.app](https://healr-backend.vercel.app)
- if you want to run backend on vercel you need to run the server locally it will then run on vercel.

The frontend is configured to proxy `/api/*` requests to the backend using `vercel.json`.

---

## Example Credentials

### Doctor

- **Email:** karan@test.com
- **Password:** 111111

### Patient

- **Email:** kashish@test.com
- **Password:** 11223344

### Admin

- **Email:** qadir@test.com
- **Password:** 12121212

> If these accounts do not exist, you can sign up as a patient or create the admin/doctor directly in the database.

---

## Notes

- For production, make sure to use environment variables for sensitive data (MongoDB URI, etc.).
- Update the backend CORS settings if you change your frontend domain.
- For local development, you may want to set up a proxy in `vite.config.js` to forward `/api` requests to the backend.

---

## License

This project is licensed under the ISC License. 
