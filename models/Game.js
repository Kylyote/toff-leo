const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Board extends Model {};

//initial board game state
const initialBoardState = {
    a: [null, null, null,    0,    1,    2,    3,    4, null, null, null], 
    b: [null, null, null, null, null,    5, null, null, null, null, null],
    c: [null, null, null, null, null, null, null, null, null, null, null],
    d: [   6, null, null, null, null,   24, null, null, null, null,    7],
    e: [   8, null, null, null,   25,   26,   27, null, null, null,    9],
    f: [  10,   11, null,   28,   29,   36,   30,   31, null,   12,   13],
    g: [  14, null, null, null,   32,   33,   34, null, null, null,   15],
    h: [  16, null, null, null, null,   35, null, null, null, null,   17],
    i: [null, null, null, null, null, null, null, null, null, null, null],
    j: [null, null, null, null, null,   18, null, null, null, null, null],
    k: [ null, null, null,  19,   20,   21,   22,   23, null, null,  null]
}

Board.init ({
    id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    board_state: {
        //store the board as json string
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: initialBoardState
    },
    //store the attacker
    attacker_id:{
        type:DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    //store the defender 
    defender_id:{
        type:DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    }
},{
    sequelize,
    timestamps: true,
    freezeTableName:true,
    modelName: 'game'
});

module.exports = Game;