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
                res.render('tweetsList.ejs', {tweets})
            })
    },
    add: function (req, res, next) {
        db.User.findAll()
        .then(genres => {
            res.render('tweetsAdd', { allUsers: genres });
        })
        .catch(err => {
            console.error(err)
            next(err)
        }) 
        
    },
    create: function (req,res) {
        const tweetInfo = req.body
        console.log(tweetInfo)
        db.Tweet.create(tweetInfo)
            .then(tweetCreated => {
                console.log(tweetCreated);
                res.redirect('/tweets')
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
        res.render('tweetsEdit', { Tweet: tweet, allUsers })
        
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
        
        res.redirect('/tweets')
    }
}

module.exports = tweetController;