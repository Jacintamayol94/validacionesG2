const { validationResult } = require ('express-validator');

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
            return res.send("Ok")
    },
    login: (req, res) => {
        return res.render('userLoginForm');
    },
    processLogin: (req, res) => {
        const resultValidation = validationResult(req);
        
        if (resultValidation.errors.length > 0) {
            return res.render('userLoginForm', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }
        return res.send("Ok")
    },
    profile: (req, res) => {
        return res.render('userProfile');
    }
}

module.exports = controller;  