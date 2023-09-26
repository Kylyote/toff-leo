const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class User extends Model {
  //LOGIN: add check password logic with the bcrypt compareSync here...
  checkPassword(loginPW) {
    return bcrypt.compareSync(loginPW, this.password);
  }
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      //passwords must be 6 chars long
      validate: {
        len: [6],
      },
    },
    win: {
      type: DataTypes.INTEGER,
      allowNull: false,
      //new players have zero wins
      defaultValue: 0,
    },
    loss: {
      type: DataTypes.INTEGER,
      allowNull: false,
      //new players have zero losses
      defaultValue: 0,
    },
    draw: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // new players have zero draws
      defaultValue: 0,
    },
    games_played: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // new players have zero games_played
      defaultValue: 0,
    },
  },
  {
    hooks: {
      async beforeCreate(newUserData) {
        //Password Hashing
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: "user",
  }
);

module.exports = User;
