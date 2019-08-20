import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import router from './routes';
import swaggerDoc from '../swagger.json';

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to Barefoot-Nomad API'
  });
});

/**
 * Tip from: https://blog.cloudboost.io/adding-swagger-to-existing-node-js-project-92a6624b855b
 */
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/api/v1', router);

const port = process.env.PORT || 3000;

app.listen(port);

export default app;
