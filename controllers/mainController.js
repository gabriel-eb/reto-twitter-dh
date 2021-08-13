const bcryptjs = require('bcryptjs');
const db = require('../db/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

function index(req, res) {
    res.render("index", {tweet:[]})
}

function index2(req, res) {
    res.render("index2", { tweet: [] })
}

function login(req, res) {
    res.render('login');
}

function signup(req,res){
    res.render('signup');
}

function registrar(req, res){
    // if (resultValidation.errors.length > 0) {
    //     return res.render('signup', {
    //         errors: resultValidation.mapped(),
    //         oldData: req.body,
    //     });
    // }
    let userInDB = db.User.findAll({
        where: { email: {[Op.like]: req.body.email} }
    })
    if (userInDB) {
        return res.render('signup'
        // , {
        //     errors: {
        //         email: {
        //             msg: 'Este email ya está registrado'
        //         }
        //     },
        //     oldData: req.body
        // }
        );
    }

    let userToCreate = {
        ...req.body,
        password: bcryptjs.hashSync(req.body.password, 10),
        avatar: req.file.filename || "default.jpg",
    }

    db.User.create(userToCreate).then(userCreated => {
        console.log(userCreated);
        res.redirect('/login');
    });
}

function edit(req,res){
    res.render('/index2');
}
function loggear(req, res) {
    res.render('/index2');
}

module.exports = { index, index2, login, signup, registrar, edit, loggear}