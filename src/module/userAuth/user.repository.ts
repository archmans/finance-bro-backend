import database from '../../config/database';
import { DocumentReference } from '@google-cloud/firestore';

export const saveUserToFirestore = async (uid: string, userData: any) => {
    const userRef: DocumentReference = database.collection('users').doc(uid);
    await userRef.set(userData);
};

export const deleteUserFromFirestore = async (uid: string) => {
    const userRef: DocumentReference = database.collection('users').doc(uid);
    await userRef.delete();
}
