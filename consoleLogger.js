const chalk = require('chalk');

function print(msg, title = 'message') {
  console.log(chalk.grey('-----------------'))
  console.log(chalk.green(title));
  console.log(chalk.grey('-----------------'))
  console.log(chalk.green(msg));
}

function printError(err) {
  console.log(chalk.red(`error occured ${err}`));
}

function printArrayLineByLine(arr) {
  let parsed;
  try {
    parsed = JSON.parse(arr);
  } catch (e) {
    parsed = arr;
  }

  parsed.forEach(m => console.log(m));
}

module.exports.print = print;
module.exports.printError = printError;
module.exports.printArrayLineByLine = printArrayLineByLine;
