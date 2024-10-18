import express, { Application } from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import 'express-async-errors';
import morgan from 'morgan';

import routes from '@routes/routes';
import { errorHandler } from '@middlewares/error-handler';
import { NotFoundError } from '@middlewares/not-found-error';

const app:Application = express();

const allowedOrigins = [
    "http://localhost:4001",
    "http://localhost:4002",
    "http://localhost:4003",
    "http://localhost:4004",
    "http://localhost:4005",
    "http://localhost:4006",
    "http://localhost:4007",
    "http://localhost:4008",
    "http://localhost:4009",
    "http://localhost:4010",
    "http://localhost:4011"
];

app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? allowedOrigins : '*',
    credentials: process.env.NODE_ENV === 'production' // Solo si estás en producción
}));

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser())


app.get("/health", (req, res)=>{
    res.send("API Saludable");
});

app.use('/api/v1', routes());

// not found
app.use('*', async () => {
    throw new NotFoundError();
});

// general errors
app.use(errorHandler);


export default app;