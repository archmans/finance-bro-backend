import { Firestore } from '@google-cloud/firestore';
import path from 'path';
const serviceKey = path.resolve('./serviceKey.json');

const database = new Firestore({
    projectId: 'c242-ps128-test-442602',
    keyFilename: serviceKey,
    databaseId: 'capstone-bangkit',
});

export default database;