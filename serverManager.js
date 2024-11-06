const readline = require("readline/promises");
const { promisify } = require("./utils.js");

const userInput = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clearLine = promisify(process.stdout.clearLine.bind(process.stdout));
const moveCursor = promisify(process.stdout.moveCursor.bind(process.stdout));
async function clearPreviousLine() {
  await moveCursor(0, -1);
  await clearLine(0);
}

async function handleResponse(data, socket) {
  console.log();
  await clearPreviousLine();
  console.log(data.toString("utf-8"));
  await promptUserInput(socket);
}

async function promptName(socket) {
  const name = await userInput.question("Enter your name > ");
  await clearPreviousLine();
  socket.write(`NAME:${name}`);
  await promptUserInput(socket);
}

async function promptUserInput(socket) {
  const message = await userInput.question("Enter your message > ");
  await clearPreviousLine();
  socket.write(`MSG:${message}`);
}

async function closeConnection() {
  console.log();
  await clearPreviousLine();
  console.log("Connection ended!");
  process.exit(0);
}

module.exports = {
  handleResponse,
  promptName,
  promptUserInput,
  clearPreviousLine,
  closeConnection
};
