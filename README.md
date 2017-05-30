# node cli for consuming https://github.com/anmatika/poloniex-api

## init
set your apikeys into ./apikeys.js

## methods

### returnBalances
````
node index --returnBalances

````
### returnTicker
````
node index --returnTicker
````

### returnBoughSold
````
node index --returnBoughtSold --currencyPair "all"
````

### buy
````
node index --buy --currencyPair BTC_ETH --amount 1 --rate 0.0058

````
### sell
````
node index --sell --currencyPair BTC_ETH --amount 1 --rate 0.099

````