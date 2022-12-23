const fetch = require("node-fetch");
var yahooFinance = require('yahoo-finance');



async function main(x) {
    // crypto prices
    let prices = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cdogecoin%2Clitecoin&vs_currencies=usd")
    prices = await prices.json();
    global.cryptoPrices = prices;

    // stock prices
    let tsla = await getPrice("TSLA");
    let rblx = await getPrice("RBLX");
    let gme = await getPrice("GME");
    let bb = await getPrice("BB");
    global.stockPrices = {
        tsla: Number(tsla),
        rblx: Number(rblx),
        gme: Number(gme),
        bb: Number(bb)
    }
    if (x) await sleep(60000)
    else console.log("Started price updater service worker")
    main(true);
    return true;
}


module.exports = main;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function getPrice(ticker) {
    return new Promise(resolve => {
        yahooFinance.quote({
            symbol: ticker.toUpperCase(),
            modules: [ 'price' ] // see the docs for the full list
          }, function (err, quotes) {
            console.log(err, quotes)
            resolve(quotes.price.regularMarketPrice)
          });
    })
}