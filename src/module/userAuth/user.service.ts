import auth from '../../config/auth';
import { saveUserToFirestore } from './user.repository';
import { UserRecord } from 'firebase-admin/auth';
import jwt from 'jsonwebtoken';
import environment from '../../utils/environment';

export const loginOrRegisterUser = async (body: { email: string }) => {
    const { email } = body;

    try {
        const user: UserRecord = await auth.auth().getUserByEmail(email);
        const token = jwt.sign({ uid: user.uid }, environment.JWT_SECRET || '', { expiresIn: '1h' });
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
        const newUser = await auth.auth().createUser({ email });
        const newUserData = { email: newUser.email, uid: newUser.uid };

        await saveUserToFirestore(newUser.uid, newUserData);

        const token = jwt.sign({ uid: newUser.uid }, environment.JWT_SECRET || '', { expiresIn: '1h' });
        return { status: 201, data: { message: 'User registered', token, uid: newUser.uid } };
    } catch (error: any) {
        throw new Error('Error registering user: ' + error.message);
    }
};
