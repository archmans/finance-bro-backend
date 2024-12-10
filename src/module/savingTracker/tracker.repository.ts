import database from "../../config/database";
import { DocumentReference, DocumentData } from "@google-cloud/firestore";

export const saveProfileToFirestore = async (uid: string, name: string, age: number, retireAge: number, retirePeriod: number, monthlyExpenses: number) => {
    const userRef: DocumentReference = database.collection("users").doc(uid);
    const userDoc: DocumentData = await userRef.get();
    const email = userDoc.get("email");
    await userRef.set({
        uid,
        email,
        name,
        age,
        retireAge,
        retirePeriod,
        monthlyExpenses,
    }), { merge: true };
};

export const getProfileFromFirestore = async (uid: string): Promise<{ name: string; age: number; retireAge: number; retirePeriod: number; monthlyExpenses: number; }> => {
    const userRef = database.collection("users").doc(uid);
    const userDoc = await userRef.get();
    const data: DocumentData | undefined = userDoc.data();
    if (!data) {
        throw new Error('User profile data is undefined');
    }
    const { name, age, retireAge, retirePeriod, monthlyExpenses } = data;
    return {
        name,
        age,
        retireAge,
        retirePeriod,
        monthlyExpenses,
    };
};

export const updateProfileInFirestore = async (uid: string, name: string, age: number, retireAge: number, retirePeriod: number, monthlyExpenses: number) => {
    const userRef: DocumentReference = database.collection("users").doc(uid);
    await userRef.update({
        name,
        age,
        retireAge,
        retirePeriod,
        monthlyExpenses,
    });
};