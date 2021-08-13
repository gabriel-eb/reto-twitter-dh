module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
    };
    let config = {
        tableName: 'user',
        timestamps: false
    };
    const User = sequelize.define(alias, cols, config)

    User.associate = function(models) {
        User.hasMany(models.Tweet, {
            as: 'tweet',
            foreignKey: 'user_id'
        })
    }

    return User
}