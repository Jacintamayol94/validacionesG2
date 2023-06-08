const { validationResult } = require ('express-validator');

const user = require('../model/user');

const bcryptjs = require('bcryptjs');

const controller = {
    register: (req, res) => {
        return res.render('userRegisterForm');
    },
    processRegister: (req, res) => {

            const resultValidation = validationResult(req);
            
            if (resultValidation.errors.length > 0) {
                return res.render('userRegisterForm', {
                    errors: resultValidation.mapped(),
                    oldData: req.body
                })
            }

            let userInDB = user.findByField('email', req.body.email);

            if (userInDB) {
                return res.render('userRegisterForm', {
                    errors: {email: {msg: 'Este email ya está registrado'}},
                    oldData: req.body})
            }

            let userToCreate = {
                ...req.body,
                password: bcryptjs.hashSync(req.body.password, 10),
                avatar: req.file.filename
            }

            let userCreated = user.create(userToCreate);
            return res.redirect('/user/login')
    },
    login: (req, res) => {
        return res.render('userLoginForm');
    },
    processLogin: (req, res) => {

        console.log(req.body);
        res.send('Se registró un usuario');

        let userToLogin = user.findByField('email', req.body.email);

        if (userToLogin){
            let isOkPass = bcrypt.compareSync(req.body.password, userToLogin.password)
            if (isOkPass) {
                return res.send ('Ok, puedes ingresar')
            }
            return res.render('userLoginForm', {
                errors: {
                    email: {
                    msg: 'Las credenciales son inválidas'
                }
            }
            });
        }
        
        return res.render('userLoginForm', {
            errors: {
                email: {
                msg: 'No se encuentra este email'
            }
        }
        });
    },

    profile: (req, res) => {
        return res.render('userProfile');
    }
}

module.exports = controller;

