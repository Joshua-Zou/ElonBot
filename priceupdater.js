const fetch = require("node-fetch");
var yahooStockPrices = require("yahoo-stock-prices")



async function main(x) {
    // crypto prices
    let prices = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cdogecoin%2Clitecoin&vs_currencies=usd")
    prices = await prices.json();
    global.cryptoPrices = prices;

    // stock prices
    let tsla = await yahooStockPrices.getCurrentData("TSLA");
    let rblx = await yahooStockPrices.getCurrentData("RBLX");
    let gme = await yahooStockPrices.getCurrentData("GME");
    let bb = await yahooStockPrices.getCurrentData("BB");
    global.stockPrices = {
        tsla: Number(tsla.price),
        rblx: Number(rblx.price),
        gme: Number(gme.price),
        bb: Number(bb.price)
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