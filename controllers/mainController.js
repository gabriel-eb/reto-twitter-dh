const bcryptjs = require('bcryptjs');
const db = require('../db/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

function index(req, res) {
    res.render("index", {tweets:[]})
}

function index2(req, res) {
    res.render("index2", { tweets: [] })
}

function sendTweet(req, res) {
    res.render("index2", { tweets: [] })
}

function login(req, res) {
    res.render('login');
}

function signup(req,res){
    res.render('signup');
}
async function registrar(req, res){
    // if (resultValidation.errors.length > 0) {
    //     return res.render('signup', {
    //         errors: resultValidation.mapped(),
    //         oldData: req.body,
    //     });
    // }
    let userInDB = await db.User.findAll({
        where: { email: {[Op.like]: req.body.email} }
    });
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
        password: bcryptjs.hashSync(req.body.pass, 10),
    }

    db.User.create(userToCreate).then(userCreated => {
        console.log(userCreated);
        res.redirect('/login');
    });
}

function edit(req,res){
    res.render('/index2');
}

async function loggear(req, res) {
    let userToLogin = await db.User.findAll({
        where: { email: { [Op.like]: req.body.email } }
    });
    userToLogin = userToLogin[0].dataValues;
    console.log(userToLogin);
    if (userToLogin) {
        if (bcryptjs.compareSync(req.body.password, userToLogin.password)) {
            req.session.userId = userToLogin.id;
            return res.redirect("/");
        }
        return res.render("login");
    }
    return res.render("login");
}

module.exports = { index, index2, sendTweet, login, signup, registrar, edit, loggear}