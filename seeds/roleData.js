const { Role } = require('../models');

const roleData = [
    { name: 'Attacker' },
    { name: 'Defender' },
    { name: 'Observer' }
];

const seedRoles = () => Role.bulkCreate(roleData);

module.exports = seedRoles;