# node cli poloniex-api 

the client will consume this: 

https://github.com/anmatika/poloniex-api


## init
set your apikeys into ./apikeys.js

## methods

### trading api

#### returnBalances
````
node index --returnBalances

````
#### returnTicker
````
node index --returnTicker
````

#### returnBoughSold
````
node index --returnBoughtSold --currencyPair "all"
````

#### buy
````
node index --buy --currencyPair BTC_ETH --amount 1 --rate 0.0058

````
#### sell
````
node index --sell --currencyPair BTC_ETH --amount 1 --rate 0.099

````

### stream api

#### ticker
````
node index --ticker --currencyPair BTC_ETH

````
#### market
````
node index --market --currencyPair BTC_ETH

````