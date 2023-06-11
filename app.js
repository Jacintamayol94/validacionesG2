const express = require('express');
const session = require('express-session');
const cookies = require('cookie-parser');
const methodOverride = require ('method-override');

const app = express();
app.set('view engine', 'ejs');

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware')

app.use(session({
    secret: "Shhh",
    resave: false,
    saveUninitialized: false,
}))

app.use(userLoggedMiddleware);

app.use(cookies());


const path = require('path');

// Middlewares
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));


// Routers

/*const mainRoutes = require ('./routes/mainRoutes');*/
const userRoutes = require ('./routes/userRoutes');
const productRoutes = require ('./routes/productRoutes');

/*app.use('/', mainRoutes);*/
app.use(userRoutes);
app.use('/product', productRoutes); 


app.listen(3000, () => console.log('Servidor levantado en el puerto 3000'));
