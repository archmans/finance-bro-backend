import database from '../../config/database';
import { DocumentReference } from '@google-cloud/firestore';

export const saveUserToFirestore = async (uid: string, userData: any) => {
    const defaultUserData = {
        name: null,
        age: null,
        retireAge: null,
        retirePeriod: null,
        monthlyExpense: null,
        target: null,
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

export const deleteUserFromFirestore = async (uid: string) => {
    const userRef: DocumentReference = database.collection('users').doc(uid);
    await userRef.delete();
}