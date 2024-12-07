import { Firestore } from '@google-cloud/firestore';

const database = new Firestore({
    projectId: 'c242-ps128-test-442602',
    keyFilename: './serviceKey.json',
    databaseId: 'capstone-bangkit',
});

export default database;