const express = require ('express');

const router = express.Router();

const path = require ('path');


// Controller

const userController = require('../controllers/userController');

// Middlewares
const uploadFile = require('../middlewares/multerMiddleware.js');
const validations = require('../middlewares/validateRegisterMiddleware.js');
const guestMiddleware = require('../middlewares/guestMiddleware.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

// Home
router.get('/', userController.home);

// Formulario de registro
router.get('/register', guestMiddleware, userController.register);

// Procesar el registro
router.post('/register', uploadFile.single('avatar'), validations, userController.processRegister);

// Formulario de login 
router.get('/login', guestMiddleware, userController.login);

// Procesar el login
router.post('/login', userController.processLogin);

// Perfil de Usuario
router.get('/profile', authMiddleware, userController.profile);

// Perfil de Logout
router.get('/logout', userController.logout);

module.exports = router;