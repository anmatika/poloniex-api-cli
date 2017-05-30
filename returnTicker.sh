#!/usr/bin/env node
const shell = require('shelljs')

const currency = process.argv[2];
let command = 'node index.js --returnTicker';
if (currency) {
    command += ` --currencyPair BTC_${currency}`;
}

if (shell.exec(command).code !== 0) {
  shell.echo('Error: ');
  shell.exit(1);
}