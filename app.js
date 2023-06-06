const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true}));

const path = require('path');

app.use(express.static(path.join(__dirname, "./public")));

app.listen(3000, () => console.log('Servidor levantado en el puerto 3000'));

app.set('view engine', 'ejs');

/*const mainRoutes = require ('./routes/mainRoutes');*/
const userRoutes = require ('./routes/userRoutes');

/*app.use('/', mainRoutes);*/
app.use('/user', userRoutes); 

