import debug from 'debug';
import express from 'express';

const app = express();
const DEBUG = debug('dev');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).json({ status: 200 });
});

app.listen(PORT, () => DEBUG(`Server running on port ${PORT}`));

export default app;
