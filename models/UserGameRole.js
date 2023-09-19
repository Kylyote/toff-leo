const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserGameRole extends Model {};

UserGameRole.init(
    {
        role_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'role',
                key:'id'
            }
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
                model: 'game',
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