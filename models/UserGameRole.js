const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserGameRole extends Model {};

UserGameRole.init(
    {
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        game_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'usergamerole'
    }
);

module.exports = UserGameRole;