const { User } = require('../models');

const userData = [
    { username: 'Ragnar', password: 'ragnar123', win: 5, loss: 2 },
    { username: 'Lagertha', password: 'lagertha123', win: 3, loss: 1 },
    { username: 'Ivar', password: 'ivar123', win: 7, loss: 4 },
    { username: 'Bjorn', password: 'bjorn123', win: 6, loss: 1 },
    { username: 'Floki', password: 'floki123', win: 5, loss: 2 },
    { username: 'Sigurd', password: 'sigurd123', win: 3, loss: 2 },
    { username: 'Rollo', password: 'rollo123', win: 4, loss: 5 },
    { username: 'Ubbe', password: 'ubbe123', win: 5, loss: 3 },
    { username: 'Erik', password: 'erik123', win: 7, loss: 0 },
    { username: 'Olaf', password: 'olaf123', win: 6, loss: 4 },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;