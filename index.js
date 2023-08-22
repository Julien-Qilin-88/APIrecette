import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import router from './app/router.js';

const apiRoot = '/api';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(apiRoot, router);


app.use(cors({
    origin: /http:\/\/localhost/,
}));
app.options('*', cors());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });

