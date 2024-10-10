import express, { Application } from 'express';
import 'express-async-errors';
import morgan from 'morgan';

import routes from '@routes/routes';
import { errorHandler } from '@middlewares/error-handler';
import { NotFoundError } from '@middlewares/not-found-error';

const app:Application = express();

app.use(express.json());
app.use(morgan('dev'));

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