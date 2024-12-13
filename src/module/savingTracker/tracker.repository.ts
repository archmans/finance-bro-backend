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

export const getAllSavings = async (uid: string) => {
    const rekeningsCollectionRef = database.collection('users').doc(uid).collection('rekenings');
    const snapshot = await rekeningsCollectionRef.get();

    const savings: { name: string; amount: number; type: string; }[] = [];
    snapshot.forEach(doc => {
        savings.push({
            name: doc.get('name'),
            amount: doc.get('amount'),
            type: doc.get('type'),
        });
    });
    return savings;
}

export const getAllNames = async (uid: string) => {
    const rekeningsCollectionRef = database.collection('users').doc(uid).collection('rekenings');
    const snapshot = await rekeningsCollectionRef.get();

    const names: string[] = [];
    snapshot.forEach(doc => {
        names.push(doc.get('name'));
    });
    return names;
}

export const getNamesByType = async (uid: string, type: string) => {
    const rekeningsCollectionRef = database.collection('users').doc(uid).collection('rekenings');
    const snapshot = await rekeningsCollectionRef.get();

    const names: string[] = [];
    snapshot.forEach(doc => {
        if (doc.get('type') === type) {
            names.push(doc.get('name'));
        }
    });
    return names;
}

export const getAmountByName = async (uid: string, name: string) => {
    const rekeningsCollectionRef = database.collection('users').doc(uid).collection('rekenings');
    const snapshot = await rekeningsCollectionRef.get();

    let amount = 0;
    snapshot.forEach(doc => {
        if (doc.get('name') === name) {
            amount = doc.get('amount');
        }
    });
    return amount;
}

export const addSavings = async (uid: string, name: string, amount: number, type: string) => {
    const rekeningsCollectionRef = database.collection('users').doc(uid).collection('rekenings');
    const snapshot = await rekeningsCollectionRef.get();
    let exists = false;
    snapshot.forEach(doc => {
        if (doc.get('name') === name) {
            exists = true;
        }
    });
    if (exists) {
        throw new Error('Name already exists');
    }
    await rekeningsCollectionRef.add({
        name,
        amount,
        type,
    });
    return { name, amount, type };
}

export const updateSavings = async (uid: string, name: string, amount: number, type: string) => {
    const rekeningsCollectionRef = database.collection('users').doc(uid).collection('rekenings');
    const snapshot = await rekeningsCollectionRef.get();

    let updated = false;
    let currentAmount = 0;

    snapshot.forEach(doc => {
        if (doc.get('name') === name) {
            currentAmount = doc.get('amount') || 0;
            updated = true;
        }
    });

    if (!updated) {
        throw new Error('Name not found');
    }

    const newAmount = currentAmount + amount;
    if (newAmount < 0) {
        throw new Error('Insufficient funds');
    }

    const rekeningDoc = snapshot.docs.find(doc => doc.get('name') === name);
    if (rekeningDoc) {
        await rekeningDoc.ref.update({
            amount: newAmount,
            type,
        });
    }

    return { name, amount, type };
};

export const updateSavingsInvest = async (uid: string, name: string, amount: number, type: string) => {

    const rekeningsCollectionRef = database.collection('users').doc(uid).collection('rekenings');
    const snapshot = await rekeningsCollectionRef.get();

    let updated = false;
    let currentAmount = 0;

    snapshot.forEach(doc => {
        if (doc.get('name') === name) {
            currentAmount = doc.get('amount') || 0;
            updated = true;
        }
    });

    if (!updated) {
        throw new Error('Name not found');
    }

    const newAmount = amount;
    if (newAmount < 0) {
        throw new Error('Insufficient funds');
    }

    const rekeningDoc = snapshot.docs.find(doc => doc.get('name') === name);
    if (rekeningDoc) {
        await rekeningDoc.ref.update({
            amount: newAmount,
            type,
        });
    }

    return { name, amount, type };
}

export const deleteSavings = async (uid: string, name: string) => {
    const rekeningsCollectionRef = database.collection('users').doc(uid).collection('rekenings');
    const snapshot = await rekeningsCollectionRef.get();
    let deleted = false;
    snapshot.forEach(doc => {
        if (doc.get('name') === name) {
            doc.ref.delete();
            deleted = true;
        }
    });
    if (!deleted) {
        throw new Error('Name not found');
    }
    return { name };
}