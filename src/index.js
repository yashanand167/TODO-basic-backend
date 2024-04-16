import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/index.js';
import morgan from 'morgan';
import router from './routes/users.route.js';

dotenv.config();
const app = express();
connectDB();

app.use(morgan('dev'));
app.use(express.json({ limit: '16kb' }));

app.get('/', (_, res) => {
  res.json({ message: 'successful' });
});

// app.use(urlencoded)

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server listening at http://localhost:' + port);
});

app.use("/users",router);

export default app;
