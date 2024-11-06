const net = require("net");

const {
  promptName,
  handleResponse,
  closeConnection,
} = require("./serverManager");

const IP = "127.0.0.1";
const PORT = 4242;

const socket = net.createConnection({ port: PORT, host: IP }, async () => {
  console.log("Client connecting...");
  await promptName(socket);
});

socket.on("data", async (data) => {
  await handleResponse(data, socket);
});

socket.on("end", closeConnection);
