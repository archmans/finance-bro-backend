import auth from '../../config/auth';
import { saveUserToFirestore, deleteUserFromFirestore } from './user.repository';
import { UserRecord } from 'firebase-admin/auth';
import jwt from 'jsonwebtoken';
import environment from '../../utils/environment';

export const loginOrRegisterUser = async (body: { email: string }) => {
    const { email } = body;

    try {
        const user: UserRecord = await auth.auth().getUserByEmail(email);
        const token = jwt.sign({ uid: user.uid }, environment.JWT_SECRET || '');
        return { status: 200, data: { message: 'User logged in', token } };
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
        const newUser = await auth.auth().createUser({ email });
        const newUserData = { email: newUser.email, uid: newUser.uid };

        await saveUserToFirestore(newUser.uid, newUserData);

        const token = jwt.sign({ uid: newUser.uid }, environment.JWT_SECRET || '');
        return { status: 201, data: { message: 'User registered', token } };
    } catch (error: any) {
        throw new Error('Error registering user: ' + error.message);
    }
};

export const deleteUser = async (body: { uid: string }) => {
    const { uid } = body;
    try {
        await auth.auth().deleteUser(uid);
        await deleteUserFromFirestore(uid);
        return { status: 200, data: { message: 'User deleted' } };
    } catch (error: any) {
        throw new Error('Error deleting user: ' + error.message);
    }
}