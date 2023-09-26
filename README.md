# Taflio 
TOFL Game App is a real-time multiplayer gaming platform where users can create, play, and chat with other players during the game. This platform offers a seamless and engaging gaming experience with live updates through Socket.IO, allowing users to view ongoing games and interact in real-time. The application is built using Node.js with Sequelize ORM and utilizes a MySQL database to store game state, user information, and chat messages. [View Deployed Application Here](https://toff-leo-6bd4612bd777.herokuapp.com/)

![Readme Image](./public/images/readme.png)

## Features 
* **User Authentication**: Secure sign-up and login functionalities.
* **Create and Join Games**: Users can create new games and join existing ones to play against other players.
* **Real-Time Chat**: In-game real-time chat functionality to communicate with opponents.
* **Live Game Updates**: View ongoing games with live updates through Socket.IO.
* **Game History**: Access previously played games and their results.

## Technologies Used
* **Frontend**: HTML, CSS, JavaScript, Handlebars
* **Backend**: Node.js, Express.js
* **Database**: MySQL
* **ORM**: Sequelize
* **Real-Time Communication**: Socket.IO

## Getting Started 
### Prerequesites 
* Node.js
* MySQL

### Installation 
1. Clone the Repo:
```
https://github.com/Kylyote/toff-leo.git
```
2. Install NPM Packages
```
npm i
```
3. Setup your MySQL database
```
source db/schema.sql
```
4. Seed the database 
```
npm run seed
```
5. Start the application 
```
npm start
```

## Usage 
1. **Create an Account or Login**: Start by creating an account or logging in if you already have one.
2. **Create or Join a Game**: Browse available games or create your own.
3. **Play the Game**: Engage with your opponent and play the game.
4. **Chat with Opponent**: Utilize the in-game chat feature to communicate with your opponent in real-time.
5. **View Ongoing Games**: Watch other ongoing games with live updates.
