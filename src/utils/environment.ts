import dotenv from 'dotenv';

dotenv.config();

const environment = {
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET
};

export default environment;