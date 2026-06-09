// uploadDoctors.js
import fs from 'fs';
import csv from 'csv-parser';
import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://karantejwani48:7tOMnYGpQrhmVcSh@cluster0.bb78w8c.mongodb.net/';
const dbName = 'healrDB';
const collectionName = 'doctoraccounts'; // Should match your schema/model name (lowercase in MongoDB)

const doctors = [];
const existingEmails = new Set();

fs.createReadStream('doctors.csv')
  .pipe(csv())
  .on('data', (row) => {
    const namePart = row.Name.toLowerCase().replace(/\s+/g, '').replace(/\./g, '');
    const specPart = row.Specialization.split(',')[0].toLowerCase().replace(/\s+/g, '').replace(/\./g, '');
    let baseEmail = `${namePart}_${specPart}`;
    let email = `${baseEmail}@example.com`;
    let counter = 1;

    // Ensure uniqueness within the batch
    while (existingEmails.has(email)) {
      email = `${baseEmail}${counter}@example.com`;
      counter++;
    }
    existingEmails.add(email);

    doctors.push({
      name: row.Name,
      email,
      password: '12345678', // 🔐 You can later hash this
      role: 'doctor',
      profile: {
        specialization: row.Specialization,
        highestDegree: row['Highest degree'] || '',
        degrees: row.Degrees,
        experience: row.Experience || 0,
        fee: row.Fee || 0,
        waitTime: row.Wait_time || '',
        numberOfPatients: row['Number of Patients'] || 0,
        rating: row.Rating || 0,
        location: row.Location || '',
        availableSlots: [],
        verified: false,
        profilePicture: ''
      },
      createdAt: new Date(),
      updatedAt: new Date()
    });
  })
  .on('end', async () => {
    console.log('CSV file successfully processed.');

    try {
      const client = new MongoClient(uri);
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      const result = await collection.insertMany(doctors);
      console.log(`Inserted ${result.insertedCount} documents.`);
      await client.close();
    } catch (err) {
      if (err.code === 11000) {
        console.error('Duplicate key error: likely due to existing email addresses.');
      }
      console.error('Error uploading to MongoDB:', err);
    }
  });
