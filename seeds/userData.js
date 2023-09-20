const { User } = require("../models");

const userData = [
  {
    username: "Ragnar",
    password: "ragnar123",
    email: "ragnar@asgard.com",
    win: 5,
    loss: 2,
  },
  {
    username: "Lagertha",
    password: "lagertha123",
    email: "lagertha@asgard.com",
    win: 3,
    loss: 1,
  },
  {
    username: "Ivar",
    password: "ivar123",
    win: 7,
    email: "ivar@asgard.com",
    loss: 4,
  },
  {
    username: "Bjorn",
    password: "bjorn123",
    win: 6,
    email: "bjorn@asgard.com",
    loss: 1,
  },
  {
    username: "Floki",
    password: "floki123",
    win: 5,
    email: "floki@asgard.com",
    loss: 2,
  },
  {
    username: "Sigurd",
    password: "sigurd123",
    win: 3,
    email: "sigurd@asgard.com",
    loss: 2,
  },
  {
    username: "Rollo",
    password: "rollo123",
    win: 4,
    email: "rollo@asgard.com",
    loss: 5,
  },
  {
    username: "Ubbe",
    password: "ubbe123",
    win: 5,
    email: "ubbe@asgard.com",
    loss: 3,
  },
  {
    username: "Erik",
    password: "erik123",
    win: 7,
    email: "erik@asgard.com",
    loss: 0,
  },
  {
    username: "Olaf",
    password: "olaf123",
    win: 6,
    email: "olaf@asgard.com",
    loss: 4,
  },
];

//individual hooks = true will hash the seeded passwords
const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers;
