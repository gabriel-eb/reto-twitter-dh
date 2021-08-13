module.exports = (sequelize, dataTypes) => {
    let alias = 'Tweet';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: dataTypes.INTEGER
        },
        contenido: {
            type: dataTypes.TEXT
        },
        timestamp: {
            type: dataTypes.DATE
        },
    };
    let config = {
        tableName: 'tweet',
        timestamps: false
    };
    const Tweet = sequelize.define(alias, cols, config)
    
    Tweet.associate = function(models) {
        Tweet.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id'
        })
    }

    return Tweet
}