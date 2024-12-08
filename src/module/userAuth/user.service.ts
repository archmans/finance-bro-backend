import admin from '../../config/auth';
import { saveUserToFirestore } from './user.repository';
import { UserRecord } from 'firebase-admin/auth';

export const loginOrRegisterUser = async (body: { email: string }) => {
    const { email } = body;

    try {
        const user: UserRecord = await admin.auth().getUserByEmail(email);
        const token = await admin.auth().createCustomToken(user.uid);
        return { status: 200, data: { message: 'User logged in', token, uid: user.uid } };
    } catch (error: any) {
        if (error.code === 'auth/user-not-found') {
            return await registerUser(email);
        } else {
            throw new Error('Error logging in user: ' + error.message);
        }
    }
};

const registerUser = async (email: string) => {
    try {
        const newUser = await admin.auth().createUser({ email });
        const newUserData = { email: newUser.email, uid: newUser.uid };

        await saveUserToFirestore(newUser.uid, newUserData);

        const token = await admin.auth().createCustomToken(newUser.uid);
        return { status: 201, data: { message: 'User registered', token, uid: newUser.uid } };
    } catch (error: any) {
        throw new Error('Error registering user: ' + error.message);
    }
};
