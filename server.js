const net = require("net");
const { removeClient, addClient, handleMessage } = require("./clientManager");

const server = net.createServer();
const IP = "127.0.0.1";
const PORT = 4242;

server.on("connection", (socket) => {
  let clientObject = addClient(socket);

  socket.on("data", (data) => {
    clientObject = handleMessage(data, clientObject, socket);
  });

  socket.on("end", () => removeClient(clientObject));

  socket.on("error", (err) => {
    console.error(`Error for ${clientObject.clientName}: ${err.message}`);
    removeClient(clientObject);
  });
});

server.on("error", (err) => console.error(`Server error: ${err.message}`));

server.listen(PORT, IP, () => console.log(`Server listening on ${IP}:${PORT}`));
