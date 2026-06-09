// uploadDoctors.js
import fs from 'fs';
import csv from 'csv-parser';
import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://karantejwani48:7tOMnYGpQrhmVcSh@cluster0.bb78w8c.mongodb.net/'; // <-- Replace with your MongoDB URI
const dbName = 'healrDB'; // or any name you choose
const collectionName = 'doctors';

const doctors = [];

fs.createReadStream('doctors.csv')
  .pipe(csv())
  .on('data', (row) => {
    doctors.push({
      Name: row.Name,
      Specialization: row.Specialization,
      HighestDegree: row['Highest degree'],
      Experience: row.Experience,
      Fee: row.Fee,
      Degrees: row.Degrees,
      WaitTime: row.Wait_time,
      NumberOfPatients: row['Number of Patients'],
      Rating: row.Rating,
      Location: row.Location
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
      console.log(`Inserted ${result.insertedCount} documents`);
      await client.close();
    } catch (err) {
      console.error('Error uploading to MongoDB:', err);
    }
  });
