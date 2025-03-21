
import express from 'express';

const app = express();  

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  dbConnect();
  console.log('Server is running on http://localhost:3000');
}
);  

