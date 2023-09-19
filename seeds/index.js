const seedUsers = require('./userData');
const seedGames = require('./gameData');
const seedRoles = require('./roleData');

const sequelize = require('../config/connection');

const seedAll = async() => {
    await sequelize.sync({force:true});
    console.log(`\n----------- DATABASE SYNCED -----------\n`);

    await seedUsers();
    console.log(`\n----------- USERS SEEDED -----------\n`);

    await seedRoles();
    console.log(`\n----------- ROLES SEEDED -----------\n`);

    await seedGames();
    console.log(`\n----------- GAMES SEEDED -----------\n`);

    process.exit(0);
}

seedAll();