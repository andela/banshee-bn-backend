import '@babel/polyfill';
import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import logger from 'morgan';
import passport from 'passport';
import router from './routes';
import swaggerDoc from '../swagger.json';

const { NODE_ENV } = process.env;
const app = express();
dotenv.config();
if (NODE_ENV === 'development' || NODE_ENV === 'production') {
  app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.get('/', (req, res) => {
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
