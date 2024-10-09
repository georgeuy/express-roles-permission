import router from '@routes/routes';
import express, { Application } from 'express';
import morgan from 'morgan';

const app:Application = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1', router);

export default app;