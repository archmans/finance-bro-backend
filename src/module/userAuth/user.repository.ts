import database from '../../config/database';
import { DocumentReference } from '@google-cloud/firestore';

export const saveUserToFirestore = async (uid: string, userData: any) => {
    const defaultUserData = {
        name: null,
        age: null,
        retireAge: null,
        retirePeriod: null,
        monthlyExpenses: null,
    };
    const finalUserData = { ...defaultUserData, ...userData };
    const userRef: DocumentReference = database.collection('users').doc(uid);
    await userRef.set(finalUserData);
    const rekeningsCollectionRef = userRef.collection('rekenings');
    await rekeningsCollectionRef.add({
        name: 'Tabungan',
        type: 'saving',
        amount: 0,
    });
    await rekeningsCollectionRef.add({
        name: 'Saham',
        type: 'investment',
        amount: 0,
    });
};

const deleteCollection = async (collectionPath: string) => {
    const collectionRef = database.collection(collectionPath);
    const snapshot = await collectionRef.get();

    const batch = database.batch();
    snapshot.forEach((doc) => {
        batch.delete(doc.ref);
    });

    await batch.commit();
};

export const deleteUserFromFirestore = async (uid: string) => {
    const userRef = database.collection('users').doc(uid);

    try {
        await deleteCollection(`users/${uid}/rekenings`);

        await userRef.delete();
    } catch (error: any) {
        throw new Error('Error deleting Firestore user and subcollections: ' + error.message);
    }
};