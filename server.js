const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const sequelize = require("./config/connection");
const helpers = require("./utils/helpers");

//Socket
const { Server } = require("socket.io");
//--------

const SequelizeStore = require("connect-session-sequelize")(session.Store);

//Socket
const {createServer} = require('node:http');
//--------

const app = express();

//Socket
const server = createServer(app);
const io = new Server(server);
//--------

const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(require("./controllers/index"));

//Socket Broadcasting for Game Updates 
io.on('connection', (socket) => {
  //Game Updates
  socket.on('game-updated', (data) => {
    socket.broadcast.emit('game-updated', data); // broadcast sends GAME UPDATED to all clients EXCEPT the sender
  });
  //Gameover Updates
  socket.on('gameover', (data) => {
    socket.broadcast.emit('gameover', data); // broadcast sends GAME OVER message to all clients EXCEPT the sender
  });
  //Chat Updates
  socket.on('chat-updated', (data) => {
    socket.broadcast.emit('chat-updated', data); //broadcast sends chat updated to all clients EXPECT the sender
  });
});

// set to alter.  This will update the tables in the database if changes are made to the models.  set to default when deployed
sequelize.sync({ alter: true }).then(() => {
  server.listen(PORT, () => console.log(`Toff-leo is now listing on http://localhost:${PORT}`));
});
