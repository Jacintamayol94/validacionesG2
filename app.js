const express = require('express');
const session = require('express-session');
const cookies = require('cookie-parser');
const path = require('path');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware')

/*const mainRoutes = require ('./routes/mainRoutes');*/
const userRoutes = require ('./routes/userRoutes');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "./public")));

app.use(session({
    secret: "Shhh",
    resave: false,
    saveUninitialized: false,
}))

app.use(userLoggedMiddleware);

app.use(cookies());

app.use(express.urlencoded({ extended: true }));
app.use(express.json())





/*app.use('/', mainRoutes);*/
app.use('/user', userRoutes); 

app.listen(3000, () => console.log('Servidor levantado en el puerto 3000'));
