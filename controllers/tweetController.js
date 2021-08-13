const path = require('path');
const db = require('../db/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Tweet = db.Tweet;
const User = db.User;


const tweetController = {
    'list': (req, res) => {
        db.Tweet.findAll({
            include:[{
                association: 'user_id',
                required: true
            }]
        })
            .then(tweets => {
                res.render('index.ejs', {tweets})
            })
    },
    create: function (req,res) {
        const tweetInfo = req.body
        console.log(tweetInfo)
        db.Tweet.create(tweetInfo)
            .then(tweetCreated => {
                console.log(tweetCreated);
                res.redirect('/index')
            })
    },
    edit: async function(req,res) {
        const tweetId = req.params.id
        const tweet =  await db.Tweet.findByPk(tweetId, {
            include: [{
                association: 'user_id'
            }]
        })
        const allUsers = await db.User.findAll()
        res.render('index', { Tweet: tweet, allUsers })
        
    },
    update: async function (req,res) {
        const tweetId = req.params.id
        const tweetInfo = req.body
        console.log(tweetInfo)
        const tweetActualizado = await db.Tweet.update(tweetInfo, {
            where: {
                id: tweetId
            }
        })
        
        res.redirect('/index')
    }
}

module.exports = tweetController;