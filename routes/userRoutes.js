const express = require ('express');

const router = express.Router();

const path = require ('path');


// Controller

const userController = require('../controllers/userController');

// Middlewares
const uploadFile = require('../middlewares/multerMiddleware.js');
const validations = require('../middlewares/validateRegisterMiddleware.js')


// Formulario de registro
router.get('/register', userController.register);

// Procesar el registro
router.post('/register', uploadFile.single('avatar'), validations, userController.processRegister);

// Formulario de login 
router.get('/login', userController.login);

// Procesar el login
router.post('/login', userController.processLogin);

// Perfil de Usuario
router.get('/profile', userController.profile);

module.exports = router;