const { Role } = require('../models');

const roleData = [
    { role_name: 'Attacker' },
    { role_name: 'Defender' },
    { role_name: 'Observer' }
];

const seedRoles = () => Role.bulkCreate(roleData);

module.exports = seedRoles;