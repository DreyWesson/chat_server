const { COLORS_ARRAY } = require("./utils.js");

const clients = [];
let randomColors = 0;

function addClient(socket) {
  socket.write(
    `${COLORS_ARRAY[1]}Welcome to the chat server!${COLORS_ARRAY[0]}\n`
  );
  const clientId = clients.length + 1;
  const clientName = `Client ${clientId}`;
  const clientObject = { clientId, socket, clientName };
  clients.push(clientObject);

  return clientObject;
}

function removeClient(clientObject) {
  const { clientId, clientName } = clientObject;
  const index = clients.findIndex((client) => client.clientId === clientId);
  if (index !== -1) {
    clients.splice(index, 1);
    broadcastMessage(clientId, "Server", `${clientName} has left the chat.`);
    console.log(`${clientName} (client ${clientId}) disconnected`);
  }
}

function broadcastMessage(senderId, senderName, message) {
  clients.forEach((client) => {
    if (client.clientId !== senderId)
      client.socket.write(`${senderName}: ${message}`);
  });
}

function handleMessage(data, clientObject, socket) {
  const message = data.toString().trim();

  if (message.startsWith("NAME:"))
    clientObject = handleNameChange(message, clientObject, socket);
  else handleChatMessage(message, clientObject, socket);

  return clientObject;
}

function handleNameChange(message, clientObject, socket) {
  const newName = message.slice(5).trim();
  const {clientName: oldName} = clientObject;

  clientObject.clientName = newName;

  console.log(`Client ${clientObject.clientId} set name to ${newName}`);
  socket.write(`Your name has been changed to ${newName}\n`);
  broadcastMessage(clientObject.clientId, "Server", `${oldName} => ${newName}`);

  return clientObject;
}

function handleChatMessage(message, clientObject, socket) {
  randomColors++;
  const cleanMsg = message.slice(4).trim();

  console.log(
    `${COLORS_ARRAY[randomColors % COLORS_ARRAY.length]}${
      clientObject.clientName
    }${COLORS_ARRAY[0]}: ${cleanMsg}`
  );

  broadcastMessage(clientObject.clientId, clientObject.clientName, cleanMsg);
  socket.write(`You: ${cleanMsg}\n`);

  if (randomColors % 7 === 0) randomColors = 0;
}

module.exports = {
  addClient,
  removeClient,
  broadcastMessage,
  clients,
  handleMessage,
  handleChatMessage,
  handleNameChange,
};
