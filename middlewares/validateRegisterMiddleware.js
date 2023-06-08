const path = require ('path');
const {body} = require ('express-validator')

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

module.exports = validations;