import express from 'express';
import router from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  return res.status(200).json({
    status: 200,
    message: 'Welcome to Barefoot-Nomad API'
  });
});

app.use('/api/v1', router);

const port = process.env.PORT || 3000;

app.listen(port);

export default app;
