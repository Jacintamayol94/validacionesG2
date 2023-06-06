const express = require ('express');

const router = express.Router();

const path = require ('path');

const multer = require ('multer');

const {body} = require ('express-validator')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/avatars');
    },
    filename: (req, file, cb) => {
        let fileName = Date.now() + '-profileImg' + path.extname(file.originalname);
        cb(null, fileName);
    }
})

const uploadFile = multer ({storage});

const userController = require('../controllers/userController');

const validations = [
    body('fullName').notEmpty().withMessage('Escribir un nombre'),
    body('user').notEmpty().withMessage('Escribir un usuario'),
    body('password').notEmpty().withMessage('Escribir una contraseña'),
    body('email').notEmpty().withMessage('Escribir un email').bail()
    .isEmail().withMessage('Debes escribir un mail válido'),
    body('ciudad').notEmpty().withMessage('Escribir una ciudad'),
    body('avatar').custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];
        
        if(!file) {
            throw new Error('Subir una imagen')
        } else {
        let fileExtension = path.extname(file.originalname);
        if (!acceptedExtensions.includes(fileExtension)) {
            throw new Error ('Las extensiones permitidas son: ' + acceptedExtensions)
        }
        };
        return true;
    })
]

// Formulario de registro
router.get('/register', userController.register);

// Procesar el registro
router.post('/register', uploadFile.single('avatar'), validations, userController.processRegister);

// Formulario de login 
router.get('/login', userController.login);

// Perfil de Usuario
router.get('/profile/:userId', userController.profile);

module.exports = router;