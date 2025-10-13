import express from 'express';
import livroRoutes from './src/routes/livroRoules.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/livros', livroRoutes);

app.get('/', (req, res) => {
  res.status(200).send('Rota home');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});