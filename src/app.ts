import express from 'express';
import 'express-async-errors';
import carRouter from './routes/car';
import motocicleRouter from './routes/motorcycle';
import errorHandler from './middlewares/error';

const app = express();
app.use(express.json());
app.use(carRouter);
app.use(motocicleRouter);
app.use(errorHandler);

export default app;
