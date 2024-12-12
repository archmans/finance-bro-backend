import database from "../../config/database";
import { DocumentReference, DocumentData } from "@google-cloud/firestore";

export const getUserData = async (uid: string) => {
    const userRef : DocumentReference = database.collection('users').doc(uid);
    const userDoc : DocumentData = await userRef.get();
    const data = userDoc.data();
    if (!data) {
        throw new Error('User data is undefined');
    }
    const { age, retireAge, retirePeriod, monthlyExpenses, name } = data;
    return { age, retireAge, retirePeriod, monthlyExpenses, name };
};

export const getTotalSavings = async (uid: string) => {
    const rekeningsCollectionRef = database.collection('users').doc(uid).collection('rekenings');
    const snapshot = await rekeningsCollectionRef.get();

    let totalSavings = 0;
    snapshot.forEach(doc => {
        totalSavings += doc.data().amount || 0;
    });
    return totalSavings;
};