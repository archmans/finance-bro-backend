import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running on http://localhost:${PORT}`);
});