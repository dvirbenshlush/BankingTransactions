import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import matchRoutes from './routes/match.routes';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/match', matchRoutes);

app.listen(port, () => {
  console.log(`🚀 Job Matcher API running at http://localhost:${port}`);
});
