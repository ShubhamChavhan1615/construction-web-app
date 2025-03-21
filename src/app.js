<<<<<<< HEAD
// ssnzxm
// krushna 
//jhatya hello
=======
import express from 'express';

const app = express();  

app.set('view engine', 'ejs');
// app.set('views', './src/views');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {    
    console.log('Server is running on http://localhost:3000');
    }
);  
>>>>>>> f8f06962dd8c8523f986f1911bd69cec393ffff3
