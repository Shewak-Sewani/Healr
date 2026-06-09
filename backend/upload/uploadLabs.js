// uploadLaboratories.js
import fs from 'fs';
import csv from 'csv-parser';
import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://karantejwani48:7tOMnYGpQrhmVcSh@cluster0.bb78w8c.mongodb.net/';
const dbName = 'healrDB';
const collectionName = 'laboratories';

const labMap = new Map();

fs.createReadStream('labs_test_data.csv')
  .pipe(csv())
  .on('data', (row) => {
    const labId = row['Lab ID'];
    const labName = row['Lab Name'];
    const test = {
      testId: row['Test ID'],
      testName: row['Test Name'],
      fee: parseFloat(row['Fee']) || 0,
      testType: row['Test Type']
    };

    if (!labMap.has(labId)) {
      labMap.set(labId, {
        labId,
        labName,
        tests: [test],
        createdAt: new Date(),
        updatedAt: new Date()
      });
    } else {
      labMap.get(labId).tests.push(test);
    }
  })
  .on('end', async () => {
    console.log('CSV file successfully processed.');

    const labs = Array.from(labMap.values());

    try {
      const client = new MongoClient(uri);
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      // Optional: Clean the collection first
      await collection.deleteMany({});

      const result = await collection.insertMany(labs);
      console.log(`Inserted ${result.insertedCount} lab documents.`);
      await client.close();
    } catch (err) {
      console.error('Error uploading to MongoDB:', err);
    }
  });
