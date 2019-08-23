import '@babel/polyfill';
import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import logger from 'morgan';
import router from './routes';
import swaggerDoc from '../swagger.json';

const app = express();
dotenv.config();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/v1', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to Barefoot-Nomad'
  });
});

app.use('/api/v1', router);
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const port = process.env.PORT || 3000;

app.listen(port);

export default app;
