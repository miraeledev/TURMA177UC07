import express from 'express';
import 'dotenv/config';
import alunoRoutes from './src/routes/alunoRoutes.js';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/alunos', alunoRoutes);

app.get('/', (req, res) => {
  res.status(200).send(process.env.SAUDACAO);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});