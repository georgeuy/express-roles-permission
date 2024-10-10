import routes from '@routes/routes';
import express, { Application, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';

const app:Application = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1', routes());

// not found
app.use('*', (req, res) => {
    res.status(404).json([{error:"Resource Not Found"}])
});

// general errors
app.use((err:any, req:Request, res:Response, next:NextFunction) => {
    const error = 'message' in err ? err.message : "Ha ocurrido un error imprevisto";
    const status = 'status' in err ? err.status : 500;
    res.status(status).json([{error}]);
})


export default app;