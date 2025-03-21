import express from 'express';
import "dotenv/config"
import { dbConnect } from './db/db.js';
const app = express();


app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  dbConnect();
  console.log('Server is running on http://localhost:3000');
}
);  