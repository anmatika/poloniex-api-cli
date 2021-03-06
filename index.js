const chalk = require('chalk');
const TradingApi = require('poloniex-api').tradingApi;
const PublicApi = require('poloniex-api').publicApi;
const objectHelper = require('./objectHelper');
const commandLineOptions = require('./commandLineOptions');
const consoleLogger = require('./consoleLogger');
const pushApi = require('poloniex-api').pushApi;
const apikeys = require('./apikeys');
const tradeHistory = require('./apiCall/tradeHistory').create(apikeys);

const opts = commandLineOptions.get();
const currencyPair = opts.currencyPair;
const amount = opts.amount;
const rate = opts.rate;

const tradingApi = TradingApi.create(apikeys.poloniex_api_key, apikeys.poloniex_secret, true);
const publicApi = PublicApi.create(true);

if (opts.all || opts.returnBalances) {
  tradingApi.returnBalances()
    .then((msg) => {
      const objArray = objectHelper.getGreaterThanZeroValuesFromObject(JSON.parse(msg.body));
      consoleLogger.printArrayLineByLine(objArray);
    })
    .catch(err => consoleLogger.printError(err));
}

if (opts.all || opts.returnTradeHistory) {
  tradeHistory.returnAllTradeHistory(opts.currencyPair || 'all')
    .then((msg) => {
      let arr = [];
      if (Array.isArray(msg)) {
        Object.assign(arr, msg);
      } else {
        arr = objectHelper.objectToArray(msg);
      }
      consoleLogger.printArrayLineByLine(arr)
    })
    .catch(err => consoleLogger.printError(err))
}

if (opts.returnBoughtSold) {
  tradeHistory.returnBoughtSold(opts.currencyPair)
    .then((currencies) => {
      currencies.forEach((currency) => {
        consoleLogger.print(`bought ${currency.boughtAmount} pcs by ${currency.boughtValue}, average price: ${currency.averageValueBought}`, `${currency.name} purchases in BTC`);
        consoleLogger.print(`sold ${currency.soldAmount} pcs by ${currency.soldValue}, average price ${currency.averageValueSold}`, `${currency.name} sells in BTC`);
      });
    }, (err) => console.log(err));
}

if (opts.buy) {
  tradingApi.buy({
    currencyPair,
    amount,
    rate
  }).then(msg => consoleLogger.print(msg.body))
    .catch(err => console.log(err))
}

if (opts.sell) {
  tradingApi.sell({
    currencyPair,
    amount,
    rate
  }).then(msg => consoleLogger.print(msg.body))
    .catch(err => console.log(err))
}

if (opts.cancelOrder) {
  tradingApi.cancelOrder({
    orderNumber: opts.orderNumber
  }).then(msg => consoleLogger.print(msg.body))
    .catch(err => console.log(err))
}

if (opts.returnOpenOrders) {
  tradingApi.returnOpenOrders({
    currencyPair: opts.currencyPair
  }).then((msg) => {
    const objArray = objectHelper.getNonEmptyArrayValuesFromObject(JSON.parse(msg.body));
    consoleLogger.printArrayLineByLine(objArray);
  })
    .catch(err => console.log(err))
}

if (opts.returnTicker) {
  publicApi.returnTicker({
  }).then((msg) => {
    const objArray = objectHelper.objectToArray(JSON.parse(msg.body))
    .filter(x =>
      !opts.currencyPair
      || opts.currencyPair === 'all'
      || x.key === opts.currencyPair);
    consoleLogger.printArrayLineByLine(objArray);
  })
    .catch(err => console.log(err))
}

if (opts.ticker) {
  const api = pushApi.create({ subscriptionName: 'ticker', currencyPair: currencyPair || 'BTC_ETH', debug: true }, (obj) => {
    console.log(obj)
  });
}

if (opts.market) {
  const api = pushApi.create({ subscriptionName: 'market', currencyPair: currencyPair || 'BTC_ETH', debug: true }, (obj) => {
    console.log(obj)
  });
}

if (opts.trollbox) {
  const api = pushApi.create({ subscriptionName: 'trollbox', debug: true }, (obj) => {
    console.log(obj)
  });
}
