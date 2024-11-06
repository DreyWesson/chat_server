const COLORS_ARRAY = [
  "\x1b[0m",  // RESET
  "\x1b[1m",  // BOLD
  "\x1b[32m", // GREEN
  "\x1b[33m", // YELLOW
  "\x1b[34m", // BLUE
  "\x1b[35m", // MAGENTA
  "\x1b[36m", // CYAN
  "\x1b[90m", // GRAY
  "\x1b[31m"  // RED
];

function promisify(callback) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function cb(err, value) {
        err ? reject(err) : resolve(value);
      }
      callback.call(this, ...args, cb);
    });
  };
}


module.exports = { COLORS_ARRAY, promisify };
