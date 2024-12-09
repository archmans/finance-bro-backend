import { createUser, findUserByEmail } from './user.repository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'capstoneguegacor';

export const registerUser = async (email: string, password: string) => {
    const existingUser = await findUserByEmail(email);
    if (existingUser) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    return createUser({ email, password: hashedPassword });
};

export const loginUser = async (email: string, password: string) => {
    const user = await findUserByEmail(email);
    if (!user) throw new Error('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid credentials');

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
    return { token };
};
