const { validationResult } = require("express-validator");

const user = require("../model/user");

const bcrypt = require("bcryptjs");

const controller = {
  home: (req, res) => {
    return res.render("index");
  },

  register: (req, res) => {
    return res.render("userRegisterForm");
  },
  processRegister: (req, res) => {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.render("userRegisterForm", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }

    let userInDB = user.findByField("email", req.body.email);

    if (userInDB) {
      return res.render("userRegisterForm", {
        errors: { email: { msg: "Este email ya está registrado" } },
        oldData: req.body,
      });
    }

    let userToCreate = {
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 10),
      avatar: req.file.filename,
    };

    let userCreated = user.create(userToCreate);
    return res.redirect("/user/login");
  },
  login: (req, res) => {
    return res.render("userLoginForm");
  },
    processLogin: (req, res) => {

    let userToLogin = user.findByField("email", req.body.email);


    if (userToLogin) {
      let isOkPass = bcrypt.compareSync(
        req.body.password,
        userToLogin.password
      );

      if (isOkPass) {
        delete userToLogin.password;
        req.session.userLogged = userToLogin;

        if (req.body.remember_user) {
          res.cookie("userEmail", req.body.email, { maxAge: 1000 * 600 });
        }

        return res.redirect("/user/profile");
      }
      return res.render("userLoginForm", {
        errors: {
          email: {
            msg: "Las credenciales son inválidas",
          },
        },
      });
      }
      

    return res.render("userLoginForm", {
      errors: {
        email: {
          msg: "No se encuentra este email",
        },
      },
    });
  },

  profile: (req, res) => {
    return res.render("userProfile", {
      user: req.session.userLogged,
    });
  },

  logout: (req, res) => {
    res.clearCookie("userEmail");
    req.session.destroy();

    return res.redirect("/user");
  },
};

module.exports = controller;
