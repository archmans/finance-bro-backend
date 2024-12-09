import database from '../../config/database';

const userCollection = database.collection('users');

export const createUser = async (userData: { email: string; password: string }) => {
    const userDoc = userCollection.doc();
    await userDoc.set(userData);
    return { id: userDoc.id, ...userData };
};

export const findUserByEmail = async (email: string) => {
    const snapshot = await userCollection.where('email', '==', email).get();
    if (snapshot.empty) return null;
    return snapshot.docs[0].data();
};