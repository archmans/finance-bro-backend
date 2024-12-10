import { Firestore } from '@google-cloud/firestore';
import path from 'path';
import environment from '../utils/environment';
const serviceKey = path.resolve('./serviceKey.json');

const database = new Firestore({
    projectId: environment.PROJECT_ID,
    keyFilename: serviceKey,
    databaseId: environment.DATABASE_ID,
});

export default database;