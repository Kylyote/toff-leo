//Sockets
const socket = window.socket;

// renders chat on game load
const loadChat = async () => {
  const isLoggedIn = await fetch("/api/users/logged-in", {
    method: "GET",
  });

  const loggedIn = await isLoggedIn.json();

  if (loggedIn) {
    //gets my session id to compare
    const getMyId = await fetch("/api/users/my-id", {
      method: "GET",
    });

    const myId = await getMyId.json();

    const firstGameId = document.querySelector(".game-list-item").id;

    const dom = document.getElementById("gameboard-area");
    const domId = dom.parentNode.id;
    const thisGameId = domId == "" ? firstGameId : domId;

    //page load this checks to see if an id is stored in the dom. if not then it shows the first game in the list

    const getGame = await fetch(`/api/games/${thisGameId}`, {
      method: "GET",
    });

    const game = await getGame.json();

    // this will check to see if the user is one of the combatants.  If not the chat will not display
    const amCombatant =
      myId == game.attacker_id || myId == game.defender_id ? true : false;

    document.getElementById("chat-div").style.display = amCombatant
      ? ""
      : "none";

    // if amCombatant is true (user is one of the players) the chat will render.
    if (amCombatant) {
      game.chats.forEach((message) => {
        const messageContainer = document.getElementById("messages-render-div");
        const chatMessageDiv = document.createElement("div");
        const sender = document.createElement("h4");
        const messageBody = document.createElement("div");
        const messageBodyText = document.createElement("p");
        const messageTimeStamp = document.createElement("p");

        messageContainer.appendChild(chatMessageDiv);
        messageContainer.scrollTop = messageContainer.scrollHeight;

        chatMessageDiv.appendChild(sender);
        chatMessageDiv.appendChild(messageBody);
        messageBody.appendChild(messageBodyText);
        messageBody.appendChild(messageTimeStamp);

        // who sent this message
        const sentByMe = myId == message.sender_id ? true : false;

        // sets styling for messages that i have sent and ones i have received
        chatMessageDiv.classList.add(
          sentByMe ? "chat-message-sent" : "chat-message-received"
        );

        messageBody.classList.add("chat-message-body");
        messageBody.classList.add("chat-message");
        messageBody.id = `message-${message.id}`;
        messageBodyText.classList.add("medium-text");
        messageTimeStamp.classList.add("small-text");

        // label for the message sender
        sender.textContent = sentByMe
          ? "You"
          : game.Attacker.id == myId
          ? game.Defender.username
          : game.Attacker.username;

        messageBodyText.textContent = message.content;
        messageTimeStamp.textContent = `${message.createdAt}`; // need to refine this date format
      });
    }
  }
};

loadChat();

///// sending a message
const messageField = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");

const sendMessage = async () => {
  // checks to see if there is content in the type field
  if (messageField.value.trim() !== "") {
    console.log("test");
    // gets the id from the dom
    const firstGameId = document.querySelector(".game-list-item").id;
    const dom = document.getElementById("gameboard-area");
    const domId = dom.parentNode.id;
    const thisGameId = domId == "" ? firstGameId : domId;

    //gets the game id to send as the game_id
    const messageContent = messageField.value;

    const sendMessage = await fetch("/api/chats/", {
      method: "POST",
      body: JSON.stringify({ thisGameId, messageContent }),
      headers: { "Content-Type": "application/json" },
    });

    const thisNewMessage = await sendMessage.json();

    const getMyId = await fetch("/api/users/my-id", {
      method: "GET",
    });

    const myId = await getMyId.json();

    //Socket
    if (sendMessage.ok) {
      socket.emit("chat-updated", {
        senderId: myId,
        messageContent: messageContent,
      });
    }

    renderNewMessage(myId, messageContent);
    messageField.value = "";
  }
};

sendBtn.addEventListener("click", sendMessage);

//// rendering a new message in the list

const renderNewMessage = async (senderId, content) => {
  const firstGameId = document.querySelector(".game-list-item").id;
  const dom = document.getElementById("gameboard-area");
  const domId = dom.parentNode.id;
  const thisGameId = domId == "" ? firstGameId : domId;

  // gets my session id
  const getMyId = await fetch("/api/users/my-id", {
    method: "GET",
  });

  const myId = await getMyId.json();

  //page load this checks to see if an id is stored in the dom. if not then it shows the first game in the list

  const getGame = await fetch(`/api/games/${thisGameId}`, {
    method: "GET",
  });

  const game = await getGame.json();
  const amCombatant =
    myId == game.attacker_id || myId == game.defender_id ? true : false;

  document.getElementById("chat-div").style.display = amCombatant ? "" : "none";

  // if amCombatant is true (user is one of the players) the chat will render.
  if (amCombatant) {
    const messageContainer = document.getElementById("messages-render-div");
    const chatMessageDiv = document.createElement("div");
    const sender = document.createElement("h4");
    const messageBody = document.createElement("div");
    const messageBodyText = document.createElement("p");
    const messageTimeStamp = document.createElement("p");

    /// need to try to get the message to apend at the bottom of a div
    // const allMessages = document.querySelectorAll(".chat-message");
    // // const bottomMessage = allMessages[0];

    // console.log(allMessages[0].id);
    // const lastMessage = document.getElementById(`${allMessages[0].id}`);

    // console.log(lastMessage);

    // messageContainer.insertBefore(chatMessageDiv, lastMessage);
    messageContainer.append(chatMessageDiv);

    chatMessageDiv.appendChild(sender);
    chatMessageDiv.appendChild(messageBody);
    messageBody.appendChild(messageBodyText);
    messageBody.appendChild(messageTimeStamp);

    // who sent this message
    const sentByMe = myId == senderId ? true : false;

    // sets styling for messages that i have sent and ones i have received
    chatMessageDiv.classList.add(
      sentByMe ? "chat-message-sent" : "chat-message-received"
    );

    messageBody.classList.add("chat-message-body");
    messageBody.classList.add("chat-message");
    messageBodyText.classList.add("medium-text");
    messageTimeStamp.classList.add("small-text");

    // label for the message sender
    sender.textContent = sentByMe
      ? "You"
      : game.Attacker.id == myId
      ? game.Defender.username
      : game.Attacker.username;

    messageBodyText.textContent = content;

    const messageDateTime = new Date();
    messageTimeStamp.textContent = messageDateTime.toLocaleTimeString();
  }
};

socket.on("chat-updated", (data) => {
  renderNewMessage(data.senderId, data.messageContent);
  messageContainer.scrollTop = messageContainer.scrollHeight;
});

// Table size hide chat functionality
const showHideChatBtn = document.getElementById("show-chat");

showHideChatBtn.addEventListener("click", () => {
  let chatDrawer = document.getElementById("chat-div");
  let chatDivState = chatDrawer.getAttribute("data-state");
  let thisState = chatDivState == "hidden" ? true : false;

  chatDrawer.style.transform = thisState
    ? "translateY(0px)"
    : "translateY(296px)";
  chatDrawer.setAttribute("data-state", thisState ? "visable" : "hidden");
});
