const { Model, DataTypes } = require('sequelize');
const bcrypt = require ('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    //LOGIN: add check password logic with the bcrypt compareSync here...
}

User.init(
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type:DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6]
            }
        }
    },
    {
        hooks: {
            async beforeCreate(newUserData) {
                //Password Hashing
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'user'
    }
);

module.exports = User;