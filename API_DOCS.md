# Healr API Documentation

This document describes the available API endpoints for the Healr backend. All endpoints are prefixed with `/api/`.

---

## Authentication & User Management

### POST `/api/auth/signup`
- **Description:** Register a new user (patient, doctor, or admin).
- **Body Parameters:**
  - `name` (string, required)
  - `email` (string, required)
  - `password` (string, required)
  - `role` (string, required: 'patient', 'doctor', or 'admin')
  - (Doctor only) `gender`, `specialization`, `highestDegree`, `experience`, `fee`, `waitTime`, `numberOfPatients`, `location`
- **Responses:**
  - `201 Created`: `{ message, user|doctor|admin }`
  - `400 Bad Request`: `{ error }`
  - `500 Internal Server Error`: `{ error }`

### POST `/api/auth/login`
- **Description:** Login as patient, doctor, or admin.
- **Body Parameters:**
  - `email` (string, required)
  - `password` (string, required)
  - `accountType` (string, optional: 'patient', 'doctor', 'admin')
- **Responses:**
  - `200 OK`: `{ message, user|doctor|admin }` or `{ message, user, doctor, hasBothAccounts }`
  - `400 Bad Request`: `{ error }`
  - `500 Internal Server Error`: `{ error }`

---

## Doctor Accounts

### GET `/api/doctorAccounts/`
- **Description:** Get all doctor accounts.
- **Responses:** Array of doctor objects.

### GET `/api/doctorAccounts/search?search=...`
- **Description:** Search doctors by name, specialization, or location (OR logic).
- **Query:** `search` (string)
- **Responses:** Array of doctor objects.

### GET `/api/doctorAccounts/search/filter?specialization=...&location=...`
- **Description:** Filter doctors by specialization and/or location (AND logic).
- **Query:** `specialization` (string), `location` (string)
- **Responses:** Array of doctor objects.

### GET `/api/doctorAccounts/search/selected?specialization=...&location=...`
- **Description:** Filter doctors by both specialization and location (both required).
- **Query:** `specialization` (string), `location` (string)
- **Responses:** Array of doctor objects.

### POST `/api/doctorAccounts/register`
- **Description:** Register a new doctor (alternative to `/auth/signup`).
- **Body:** Doctor object
- **Responses:**
  - `201 Created`: Doctor object
  - `500 Internal Server Error`: `{ error }`

### PUT `/api/doctorAccounts/:id`
- **Description:** Update a doctor's profile.
- **Body:** Fields to update
- **Responses:** Updated doctor object

### DELETE `/api/doctorAccounts/:id`
- **Description:** Delete a doctor account.
- **Responses:** `{ message }`

### GET `/api/doctorAccounts/:id`
- **Description:** Get a doctor by ID.
- **Responses:** Doctor object

### GET `/api/doctorAccounts/cities`
- **Description:** Get all unique cities from doctor profiles.
- **Responses:** Array of city names

### GET `/api/doctorAccounts/admin/all`
- **Description:** Get all doctors (admin use).
- **Responses:** Array of doctor objects

### PUT `/api/doctorAccounts/admin/verify/:id`
- **Description:** Verify/unverify a doctor.
- **Body:** `{ verified: true|false }`
- **Responses:** Updated doctor object

---

## Appointments

### POST `/api/appointments/`
- **Description:** Book a new appointment.
- **Body:** `{ patient, doctor, appointmentDate, timeSlot, reason }`
- **Responses:**
  - `201 Created`: `{ message, appointment }`
  - `400/404/500`: `{ message, error }`

### GET `/api/appointments/`
- **Description:** Get all appointments (admin/debug).
- **Responses:** Array of appointment objects

### GET `/api/appointments/patient/:id`
- **Description:** Get appointments for a specific patient.
- **Responses:** Array of appointment objects

### GET `/api/appointments/doctor/:id`
- **Description:** Get appointments for a specific doctor.
- **Responses:** Array of appointment objects

### PUT `/api/appointments/:id/status`
- **Description:** Update appointment status (confirmed, cancelled, completed).
- **Body:** `{ status }`
- **Responses:** `{ message, appointment }`

### DELETE `/api/appointments/:id`
- **Description:** Delete an appointment.
- **Responses:** `{ message }`

---

## Prescriptions

### POST `/api/prescriptions/create`
- **Description:** Create a new prescription.
- **Body:** Prescription object
- **Responses:** `{ message, prescription, prescriptionNumber }`

### GET `/api/prescriptions/doctor/:doctorId`
- **Description:** Get prescriptions for a doctor (with pagination and search).
- **Query:** `page`, `limit`, `search`
- **Responses:** `{ prescriptions, totalPages, currentPage, total }`

### GET `/api/prescriptions/:prescriptionId`
- **Description:** Get a single prescription by ID.
- **Responses:** Prescription object

### GET `/api/prescriptions/patient/history?phone=...&name=...`
- **Description:** Get a patient's prescription history by phone or name.
- **Responses:** `{ prescriptions, count }`

### PUT `/api/prescriptions/:prescriptionId`
- **Description:** Update a prescription.
- **Body:** Fields to update
- **Responses:** `{ message, prescription }`

### DELETE `/api/prescriptions/:prescriptionId`
- **Description:** Delete a prescription.
- **Responses:** `{ message }`

---

## Surgeries

### POST `/api/surgeries/`
- **Description:** Create a new surgery request.
- **Body:** Surgery object
- **Responses:** Surgery object

### GET `/api/surgeries/`
- **Description:** Get all surgery requests.
- **Responses:** Array of surgery objects

### GET `/api/surgeries/:id`
- **Description:** Get a single surgery request by ID.
- **Responses:** Surgery object

### PATCH `/api/surgeries/:id`
- **Description:** Update a surgery request (assign doctor, change status, etc).
- **Body:** Fields to update
- **Responses:** Updated surgery object

---

## Laboratories

### GET `/api/laboratories/`
- **Description:** Get all laboratories with their tests.
- **Responses:** Array of laboratory objects

### POST `/api/laboratories/`
- **Description:** Add a new laboratory.
- **Body:** `{ labId, labName, tests }`
- **Responses:** Laboratory object

---

## Medicine Search (External API)

### GET `https://api.fda.gov/drug/label.json?search=openfda.brand_name:<name>&limit=<number>`
- **Description:** Search for medicines by brand name using the openFDA public API. Used in the app for medicine lookup and details.
- **Parameters:**
  - `search` (string, required): e.g. `openfda.brand_name:Panadol*`
  - `limit` (integer, optional): Number of results to return (default varies)
- **Example:**
  - `https://api.fda.gov/drug/label.json?search=openfda.brand_name:Panadol*&limit=10`
- **Response:**
  - Array of drug label objects (see openFDA documentation for full schema)
- **Note:**
  - This is a public API provided by the US FDA, not by Healr. Data is for informational purposes only.

---

## Error Handling
- All endpoints return errors in the form `{ error: string }` or `{ message: string }` with appropriate HTTP status codes.

---

## Notes
- All endpoints accept and return JSON.
- Some endpoints require specific fields or object structures; see the respective model for details. 