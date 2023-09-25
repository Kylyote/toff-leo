const { Chat } = require("../models");

const chatData = [
  {
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    sender_id: 1,
    game_id: 1,
  },
  {
    content: "Ut enim ad minim veniam",
    sender_id: 4,
    game_id: 1,
  },
  {
    content:
      "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    sender_id: 4,
    game_id: 1,
  },
  {
    content:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    sender_id: 1,
    game_id: 1,
  },
  {
    content: "Excepteur sint occaecat cupidatat",
    sender_id: 4,
    game_id: 1,
  },
];

const seedChats = () => Chat.bulkCreate(chatData);

module.exports = seedChats;
