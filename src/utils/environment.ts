import dotenv from 'dotenv';

dotenv.config();

const environment = {
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET,
    PROJECT_ID: process.env.PROJECT_ID,
    DATABASE_ID: process.env.DATABASE_ID,
    ML_API_URL: process.env.ML_API_URL,
};

export default environment;