
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
var yahooStockPrices = require("yahoo-stock-prices")
var falcon9price = 30000
var flamethrowerprice = 10000
var nftprice = 100000
var teslaprice =  30000
var goldprice = 10000
var houseprice = 30000
var twitterprice = 20000
var prefix = "el ";
var prefixlength = prefix.length;
const discord = require('discord.js');
const Discord = discord;
const client = new discord.Client({ disableMentions: 'everyone' });
const {MongoClient} = require('mongodb')
const uri = "mongodb client login";
const mongoclient = new MongoClient(uri, {poolSize: 10, bufferMaxEntries: 0, useNewUrlParser: true,useUnifiedTopology: true});
mongoclient.connect(async function(err, mongoclient){
client.login("discord client login");

var cooldowns = {}

client.once('ready', () => {

  console.log(`Logged in as ${client.user.username}. Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`);
  client.user.setActivity("Tweeting and manipulating the stock market");
})
client.on("message", message => {
  if (message.author.bot || message.channel.type === 'dm') return;
  if (message.content.toLowerCase().includes("undefined") || message.content.toLowerCase().includes("'undefined'") || message.content.toLowerCase().includes('"undefined"')) return;

  test3().catch(console.error);



  async function test3(){
  await main().catch(console.error);
  }
  

  async function main(){
  try {

    if (err) console.log(err); 
    // the reason we didn't add another key that was something like "serverId" was because this way, people can't spam with 100 different servers.
if (!cooldowns[message.author.id]){
    cooldowns[message.author.id] = {
        launder: 0,
        sue: 0,
        jobs: 0,
        work: 0,
        trade: 0,
        flame: 0,
        uber: 0,
        rent: 0,
        hobby: 0
    }
}

  const db = mongoclient.db("elonbot");
  if (message){

    let serverid = message.guild.id;
    await db.listCollections({name: serverid})
    .next(async function(err, collinfo){
      if (!collinfo){
        await createCollection(serverid);
      }
    })
 
    signup(mongoclient);

  }
  if (message.content.startsWith(prefix+"launder")|| message.content.toLowerCase() === prefix+"la"){
    if (cooldowns[message.author.id].launder < Date.now()){
      var add = 0;
      let user = await checkStuff(mongoclient, message.author.id);
      if (user.hobby === "hacker"){
        add = Math.floor(Math.random() * 200);
      }
        delete cooldowns[message.author.id].launder;
         
        var minute = 60000;
        var hour = minute * 24;
        //Set cooldown
        cooldowns[message.author.id].launder = Date.now() + 15000; //Set a 15 hour cooldown

        let x = Math.floor(Math.random() * 300);
        if (x<50){
            message.channel.send("No money for you");
            return;
         }else{
     message.channel.send("Your money laundering service produced you "+(x+add)+" dogecoin");
     }
        let previous = await checkStuff(mongoclient, message.author.id)
        await mongoclient.db("elonbot").collection(message.guild.id)
            .updateOne({name: message.author.id}, { $set: {currency:{doge: (previous.currency.doge+(x+add)), usd: previous.currency.usd, btc: previous.currency.btc, eth: previous.currency.eth}}})

        }

    else return message.channel.send("Spams not cool. Especailly when dealing with money. You still have to wait: "+ Math.round((cooldowns[message.author.id].launder-Date.now())/1000) +" seconds before you can use this command again")
  }
  if (message.content.startsWith(prefix+"sue")|| message.content.startsWith(prefix+"su")){
    if (cooldowns[message.author.id].sue < Date.now()){
      let userData = await checkStuff(mongoclient, message.author.id);
      let defendant = await checkStuff(mongoclient, message.mentions.users.first().id)
      var threshold = 400;
      if (userData.hobby === "lawyer"&&defendant.hobby === "lawyer"){
        threshold = 400;
      }else if (userData.hobby === "lawyer"){
         threshold = 600;
      }else if (defendant.hobby === "laywer"){
        threshold = 200;
      }
        if (!message.mentions.users.first()){
            return message.channel.send("You need to mention someone to sue!")
        }
        delete cooldowns[message.author.id].sue;
         
        var minute = 60000;
        //Set cooldown
        cooldowns[message.author.id].sue = Date.now() + 0; //Set a 60 sec cooldown

        let x = Math.floor(Math.random() * 1000);
        if (x<threshold){
            message.channel.send("You lost the case, and had to pay the defendent "+message.mentions.users.first().tag+ " `300` doge coin for the time that they wasted with you");
            let previous = await checkStuff(mongoclient, message.author.id)
            await mongoclient.db("elonbot").collection(message.guild.id)
                .updateOne({name: message.author.id}, { $set: {currency:{doge: (previous.currency.doge-300), usd: previous.currency.usd, btc: previous.currency.btc, eth: previous.currency.eth}}})
            let previousPerson = await checkStuff(mongoclient, message.mentions.users.first().id)
            if (!previousPerson) return message.channel.send("The person you tried to sue doesn't have their acount set up yet! To make this work, spam ping them and make them type a message")
       
            await mongoclient.db("elonbot").collection(message.guild.id)
                .updateOne({name: message.mentions.users.first().id}, { $set: {currency:{doge: (previousPerson.currency.doge+300), usd: previous.currency.usd, btc: previous.currency.btc, eth: previous.currency.eth}}})
                
            return;
         }else{

     let previous = await checkStuff(mongoclient, message.author.id)
     await mongoclient.db("elonbot").collection(message.guild.id)
         .updateOne({name: message.author.id}, { $set: {currency:{doge: (previous.currency.doge+x), usd: previous.currency.usd, btc: previous.currency.btc, eth: previous.currency.eth}}})
     let previousPerson = await checkStuff(mongoclient, message.mentions.users.first().id)
     if (!previousPerson) return message.channel.send("The person you tried to sue doesn't have their acount set up yet! To make this work, spam ping them and make them type a message")

     await mongoclient.db("elonbot").collection(message.guild.id)
         .updateOne({name: message.mentions.users.first().id}, { $set: {currency:{doge: (previousPerson.currency.doge-x), usd: previous.currency.usd, btc: previous.currency.btc, eth: previous.currency.eth}}})
         
     message.channel.send("Nice! You won the case and got paid `"+x+ "`doge coin!");

     }
        }

    else return message.channel.send("Spams not cool. Especailly when dealing with money. You still have to wait: "+ Math.round((cooldowns[message.author.id].sue-Date.now())/1000) +" seconds before you can use this command again")
  }
  if (message.content.toLowerCase() === prefix+"bal"|| message.content.toLowerCase() === prefix+"balance"){
    let balance = await checkStuff(mongoclient, message.author.id);

    let btcprice = await CoinGeckoClient.coins.fetch("bitcoin");
    let ethprice = await CoinGeckoClient.coins.fetch("ethereum");
    let dogeprice = await CoinGeckoClient.coins.fetch("dogecoin");


    let output = new Discord.MessageEmbed()
    .setTitle(message.author.tag+"'s current wallet")
    .setColor("#9098a6")
    .addFields(
        {name: balance.currency.doge.toString()+ " Doge coin",  value: "= "+Math.round(dogeprice.data.market_data.current_price.usd * balance.currency.doge)+" usd" },
        {name: balance.currency.usd.toString()+ " USD",       value: "= "+Math.round(balance.currency.usd)+ " usd"},
        {name: balance.currency.btc.toString()+" BTC",   value: "= "+Math.round(btcprice.data.market_data.current_price.usd * balance.currency.btc)+" usd" },
        {name: balance.currency.eth.toString()+" ETH",  value: "= "+Math.round(ethprice.data.market_data.current_price.usd * balance.currency.eth)+" usd" },
        {name: "Total in USD",  value:  Math.round((Number(btcprice.data.market_data.current_price.usd) * Number(balance.currency.btc))+(Number(btcprice.data.market_data.current_price.usd) * Number(balance.currency.btc))+(Number(dogeprice.data.market_data.current_price.usd) * Number(balance.currency.doge))+Number(balance.currency.usd))},
    )
    message.channel.send(output)
  }
  if (message.content.toLowerCase().startsWith(prefix+"job")){
    if (cooldowns[message.author.id].jobs < Date.now()){
      delete cooldowns[message.author.id].jobs;
         
        var minute = 60000;
        //Set cooldown
        cooldowns[message.author.id].jobs = Date.now() + 7200000; //Set a 2 hour cooldown
        let output = new Discord.MessageEmbed()
        .setTitle("Choose a Job")
        .setColor("#9098a6")
        .addFields(
          { name: "SpaceX jobs", value: "1. Coder - <:dogecoin:825188367636627456> 1,000\n2. Accountant - <:dogecoin:825188367636627456> 600\n3. Flight Computer - <:dogecoin:825188367636627456> 10,000 ||Half chance of dying||" },
          { name: "Tesla Jobs", value: "4. Engineer - <:dogecoin:825188367636627456> 950\n5. Accountant - <:dogecoin:825188367636627456> 650\n6. Test Driver - <:dogecoin:825188367636627456> 8,000 ||Quarter chance of dying||" },
          { name: "Miscelanious", value: "7. Babysiting X Æ A-XII - <:dogecoin:825188367636627456> 850" },
          { name: "Additional Info", value: "-To choose a job send the message corresponding to it (or type cancel to cancel the operation)" },
        )
      message.channel.send(output)
    //let x = await selOption();
    for (var x = 0; x<5; x++){
      if (x === 3){
        message.channel.send("Too many failed attempts, please retype the command!");
        return;
      }
    let option = await selOption();
    if (option === "cancel"){
      cooldowns[message.author.id].jobs = 0;
      message.channel.send("Canceled.");
      return;
    }
    if (Number(option)<1 || Number(option)>7){
      message.channel.send("That isn't an option, enter a valid number");
      cooldowns[message.author.id].jobs = 0;
      return;
    }else{
      updateDocumentSet(mongoclient, message.author.id, {job: Number(option)})
      if (Number(option)<4){
        if (option === "1") message.channel.send("You are now working at SpaceX as an coder, making 1000 doge an hour");
        if (option === "2") message.channel.send("You are now working at SpaceX as an accountant, making 600 doge an hour");
        if (option === "3") message.channel.send("You are now working at SpaceX as a flight computer, making 10k doge an hour");
       }else if(Number(option)<7){
        if (option === "4") message.channel.send("You are now working at Tesla as an engineer, making 950 doge an hour");
        if (option === "5") message.channel.send("You are now working at Tesla as an accountant, making 650 doge an hour");
        if (option === "6") message.channel.send("You are now working at Tesla as a test driver, making 8k doge an hour");
       }else if (option === "7") message.channel.send("You are now working for Elon as a baby siter, making 850 doge an hour");
       else{
        message.channel.send("That isn't an option, enter a valid number");
        cooldowns[message.author.id].jobs = 0;
        return;
       }
       break;
    }

  }
    function selOption(){
      return new Promise(resolve => {
        message.channel.awaitMessages(m => m.author.id === message.author.id,
        {max: 1, time: 30000}).then(collected => {
          resolve(collected.first().content);
        }).catch(() => {
        message.channel.send('No answer after 30 seconds, operation canceled.');
        });
      });
    } 
  }  else return message.channel.send("To get a new job, you have to wait: "+ Math.round((cooldowns[message.author.id].jobs-Date.now())/60000) +" minutes before you can use this command again")

  }
  if (message.content.toLowerCase().startsWith(prefix+"work")){
    if (cooldowns[message.author.id].work < Date.now()){
      delete cooldowns[message.author.id].work;
         
        var minute = 60000;
        //Set cooldown
        cooldowns[message.author.id].work = Date.now() + 3600000; //Set a 1 hour cooldown
        let person = await checkStuff(mongoclient, message.author.id);
        let boost = (person.inventory.twitter*0.05)+1
        let jobNum = person.job;
        if (jobNum === 1){
          var code = ['if (user.cookies.accept) cookies.record() else cookies.record()', 'python sucks', 'return halp;', 'c++ is king', 'visual studios', 'bugs suck'];
          let x = Math.floor(Math.random() * 6);
          
           message.channel.send("Quick! Type the following words in the chat: \n`"+code[x]+"`");
           let response = await selOption();
           let elon = await checkStuff(mongoclient, message.author.id);
           if (elon.hobby === "elon"){
             message.channel.send("since your elon's child, you get an extra 200 doge!")
             await mongoclient.db("elonbot").collection(message.guild.id)
               .updateOne({name: message.author.id}, { $set: {currency:{doge: (elon.currency.doge+200), usd: elon.currency.usd, btc: elon.currency.btc, eth: elon.currency.eth}}})
           }
           if (response.toLowerCase() === code[x]){
             let increase = 1000*boost
             message.channel.send("Great job! For that hour of work, you get "+increase+" Doge!");
             let previous = await checkStuff(mongoclient, message.author.id)
             await mongoclient.db("elonbot").collection(message.guild.id)
            .updateOne({name: message.author.id}, { $set: {currency:{doge: (previous.currency.doge+increase), usd: previous.currency.usd, btc: previous.currency.btc, eth: previous.currency.eth}}})
           }else{
             let increase = 322*boost
             message.channel.send("How did you mess up that simple of a task?! I'm only giving you "+increase+" doge for that hour of work. I'm expecting to not see this mistake happen ever again." );
             let previous = await checkStuff(mongoclient, message.author.id)
             await mongoclient.db("elonbot").collection(message.guild.id)
               .updateOne({name: message.author.id}, { $set: {currency:{doge: (previous.currency.doge+increase), usd: previous.currency.usd, btc: previous.currency.btc, eth: previous.currency.eth}}})
           }
           function selOption(){
            return new Promise(resolve => {
              message.channel.awaitMessages(m => m.author.id === message.author.id,
              {max: 1, time: 30000}).then(collected => {
                resolve(collected.first().content);
              }).catch(() => {
              resolve("bad")
              });
            });
          }
        }else if (jobNum === 2){
          let elon = await checkStuff(mongoclient,message.author.id)
          let x = Math.floor(Math.random() * 11);
          let y = Math.floor(Math.random() * 11);
          message.channel.send("Time to crunch some numbers! Enter the solution to the equation below: \n "+ x+"x"+y);
          let response = await selOption();
          if (elon.hobby === "elon"){
            message.channel.send("since your elon's child, you get an extra 200 doge!")
            await mongoclient.db("elonbot").collection(message.guild.id)
              .updateOne({name: message.author.id}, { $set: {currency:{doge: (elon.currency.doge+200), usd: elon.currency.usd, btc: elon.currency.btc, eth: elon.currency.eth}}})
          }
          if (Number(response) === x*y){
            let increase = 600*boost
            message.channel.send("Great job! You get "+increase+" doge for that hour of work!");
            let previous = await checkStuff(mongoclient, message.author.id)
            await mongoclient.db("elonbot").collection(message.guild.id)
            .updateOne({name: message.author.id}, { $set: {currency:{doge: (previous.currency.doge+increase), usd: previous.currency.usd, btc: previous.currency.btc, eth: previous.currency.eth}}})
          }else{
            let increase = 100*boost
            message.channel.send("What the heck? How did you mess that up?! I'm only giving you "+increase+" doge for that hour of work");
            let previous = await checkStuff(mongoclient, message.author.id)
            await mongoclient.db("elonbot").collection(message.guild.id)
            .updateOne({name: message.author.id}, { $set: {currency:{doge: (previous.currency.doge+100), usd: previous.currency.usd, btc: previous.currency.btc, eth: previous.currency.eth}}})
          }
          function selOption(){
            return new Promise(resolve => {
              message.channel.awaitMessages(m => m.author.id === message.author.id,
              {max: 1, time: 30000}).then(collected => {
                resolve(collected.first().content);
              }).catch(() => {
              resolve("halp")
              });
            });
          }
        }else if (jobNum === 3){
          let elon = await checkStuff(mongoclient,message.author.id)
          let x = Math.floor(Math.random() * 100);

            let edit = await message.channel.send("3...")
            await sleep(1000);
            await edit.edit("2...");
            await sleep(1000);
            await edit.edit("1...")
            await sleep(1000);
            await message.channel.send("And liftoff!")
            await sleep(5000);
            if (x<50){
            await message.channel.send("Wait nvm, it crashed. Welp, time to hire another flight computer since our other one died.")
            let lifesaver = await checkStuff(mongoclient, message.author.id)
            let num = lifesaver.inventory.gold;
            if (num>0){
              message.channel.send("At least you had a life saver (gold) You didn't die");
              previous = lifesaver;
              await mongoclient.db("elonbot").collection(message.guild.id)
                .updateOne({name: message.author.id}, { $set: {inventory:{rockets: previous.inventory.rockets, flamthrowers: previous.inventory.flamthrowers, nft: previous.inventory.nft, teslas: previous.inventory.teslas, gold: previous.inventory.gold-1, houses: previous.inventory.houses, twitter: previous.inventory.twitter}}})
              return;
            }
            await mongoclient.db("elonbot").collection(message.guild.id)
                .updateOne({name: message.author.id}, { $set: {
                  currency: {
                    usd: 0,
                    doge: 0,
                    btc: 0,
                    eth: 0,
                 },
                 stocks: {
                    tesla: 0,
                    space: 0,
                    roblox: 0,
                    boring: 0,
                    gameStonks: 0,
                    elonstock: 0
                 },
                 inventory: {
                     rockets: 0,
                     flamthrowers: 0,
                     nft: 0,
                     teslas: 0,
                     gold: 0,
                     houses: 0,
                     twitter: 0
                 }
                }})
            }else{
              let increasesmall = 10*boost;
              let increase = 10000*boost
              await message.channel.send("Mission Success! Our flight computer just got paid "+increasesmall+"k doge.");
              if (elon.hobby === "elon"){
                message.channel.send("since your elon's child, you get an extra 200 doge!")
                await mongoclient.db("elonbot").collection(message.guild.id)
                  .updateOne({name: message.author.id}, { $set: {currency:{doge: (elon.currency.doge+200), usd: elon.currency.usd, btc: elon.currency.btc, eth: elon.currency.eth}}})
              }
              let previous = await checkStuff(mongoclient, message.author.id)
              await mongoclient.db("elonbot").collection(message.guild.id)
                .updateOne({name: message.author.id}, { $set: {currency:{doge: (previous.currency.doge+increase), usd: previous.currency.usd, btc: previous.currency.btc, eth: previous.currency.eth}}})
            }
        }else if (jobNum === 4){
          let elon = await checkStuff(mongoclient,message.author.id)
          let phrases = ["braking", "self driving cars", "batteries", "right to repair is a joke", "machine learning is great for self driving cars", "cruise control is great"];
          let x = Math.floor(Math.random() * 6);
          message.channel.send("For this hour of work, type the following phrases into chat: \n `"+phrases[x]+"`");
          let response = await selOption();
          if (elon.hobby === "elon"){
            message.channel.send("since your elon's child, you get an extra 200 doge!")
            await mongoclient.db("elonbot").collection(message.guild.id)
              .updateOne({name: message.author.id}, { $set: {currency:{doge: (elon.currency.doge+200), usd: elon.currency.usd, btc: elon.currency.btc, eth: elon.currency.eth}}})
          }
          if (response.toLowerCase() === phrases[x]){
            let increase = 950*boost;
            message.channel.send("great job! For that hour of work, you get "+increase+" Doge coins");
            let previous = await checkStuff(mongoclient, message.author.id)
            await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.author.id}, { $set: {currency:{doge: (previous.currency.doge+increase), usd: previous.currency.usd, btc: previous.currency.btc, eth: previous.currency.eth}}})
          }else{
            let fire = Math.floor(Math.random() * 6);
            if (fire<3){
            message.channel.send("Wow, you failed at the most simple task! Ur fired. ")
            updateDocumentSet(mongoclient, message.author.id, {job: 100})
            }else{
              message.channel.send("Seriously, how did you mess *that* up? I'm only giving you 10 doge for that hour of work");
              let previous = await checkStuff(mongoclient, message.author.id)
                await mongoclient.db("elonbot").collection(message.guild.id)
            .updateOne({name: message.author.id}, { $set: {currency:{doge: (previous.currency.doge+10), usd: previous.currency.usd, btc: previous.currency.btc, eth: previous.currency.eth}}})
            }
          }
          function selOption(){
            return new Promise(resolve => {
              message.channel.awaitMessages(m => m.author.id === message.author.id,
              {max: 1, time: 30000}).then(collected => {
                resolve(collected.first().content);
              }).catch(() => {
              resolve("bad")
              });
            });
          }
        }else if (jobNum === 5){  
          let elon = await checkStuff(mongoclient,message.author.id)
          let x = Math.floor(Math.random() * 99);
          let y = Math.floor(Math.random() * 99);
          message.channel.send("Time to crunch some numbers! Enter the solution to the equation below: \n "+ x+"x"+y);
          let response = await selOption();
          if (elon.hobby === "elon"){
            message.channel.send("since your elon's child, you get an extra 200 doge!")
            await mongoclient.db("elonbot").collection(message.guild.id)
              .updateOne({name: message.author.id}, { $set: {currency:{doge: (elon.currency.doge+200), usd: elon.currency.usd, btc: elon.currency.btc, eth: elon.currency.eth}}})
          }
          if (Number(response) === x*y){
            let increase = 650*boost
            message.channel.send("Great job! You get "+increase+" doge for that hour of work!");
            let previous = await checkStuff(mongoclient, message.author.id)
            await mongoclient.db("elonbot").collection(message.guild.id)
            .updateOne({name: message.author.id}, { $set: {currency:{doge: (previous.currency.doge+increase), usd: previous.currency.usd, btc: previous.currency.btc, eth: previous.currency.eth}}})
          }else{
            let increase = 100*boost
            message.channel.send("What the heck? How did you mess that up?! I'm only giving you "+increase+" doge for that hour of work");
            let previous = await checkStuff(mongoclient, message.author.id)
            await mongoclient.db("elonbot").collection(message.guild.id)
            .updateOne({name: message.author.id}, { $set: {currency:{doge: (previous.currency.doge+increase), usd: previous.currency.usd, btc: previous.currency.btc, eth: previous.currency.eth}}})
          }
          function selOption(){
            return new Promise(resolve => {
              message.channel.awaitMessages(m => m.author.id === message.author.id,
              {max: 1, time: 30000}).then(collected => {
                resolve(collected.first().content);
              }).catch(() => {
              resolve("halp")
              });
            });
          }
        }else if (jobNum === 6){
          let elon = await checkStuff(mongoclient,message.author.id)
          let x = Math.floor(Math.random() * 100);
          if (elon.hobby === "elon"){
            message.channel.send("since your elon's child, you get an extra 200 doge!")
            await mongoclient.db("elonbot").collection(message.guild.id)
              .updateOne({name: message.author.id}, { $set: {currency:{doge: (elon.currency.doge+200), usd: elon.currency.usd, btc: elon.currency.btc, eth: elon.currency.eth}}})
          }
          if (x<25){
          message.channel.send("You were a test driver for Tesla (keyword: `were`)")
          let lifesaver = await checkStuff(mongoclient, message.author.id)
            let num = lifesaver.inventory.gold;
            if (num>0){
              message.channel.send("At least you had a life saver (gold) You didn't die");
              previous = lifesaver;
              await mongoclient.db("elonbot").collection(message.guild.id)
                .updateOne({name: message.author.id}, { $set: {inventory:{rockets: previous.inventory.rockets, flamthrowers: previous.inventory.flamthrowers, nft: previous.inventory.nft, teslas: previous.inventory.teslas, gold: previous.inventory.gold-1, houses: previous.inventory.houses, twitter: previous.inventory.twitter}}})
              return;
            }
          await mongoclient.db("elonbot").collection(message.guild.id)
                .updateOne({name: message.author.id}, { $set: {
                  currency: {
                    usd: 0,
                    doge: 0,
                    btc: 0,
                    eth: 0,
                 },
                 stocks: {
                    tesla: 0,
                    space: 0,
                    roblox: 0,
                    boring: 0,
                    gameStonks: 0,
                    elonstock: 0
                 },
                 inventory: {
                     rockets: 0,
                     flamthrowers: 0,
                     nft: 0,
                     teslas: 0,
                     gold: 0,
                     houses: 0,
                     twitter: 0
                 }
                }})
          }else{
            let increasesmall = 8*boost;
            let increase = 8000*boost
            message.channel.send("Congrats! You survived! You get "+increasesmall+"k doge for that hour of work!");
            let previous = await checkStuff(mongoclient, message.author.id)
              await mongoclient.db("elonbot").collection(message.guild.id)
                .updateOne({name: message.author.id}, { $set: {currency:{doge: (previous.currency.doge+increase), usd: previous.currency.usd, btc: previous.currency.btc, eth: previous.currency.eth}}})
          }
        }else if (jobNum === 7){
          let elon = await checkStuff(mongoclient,message.author.id)
          if (elon.hobby === "elon"){
            message.channel.send("since your elon's child, you get an extra 200 doge!")
            await mongoclient.db("elonbot").collection(message.guild.id)
              .updateOne({name: message.author.id}, { $set: {currency:{doge: (elon.currency.doge+200), usd: elon.currency.usd, btc: elon.currency.btc, eth: elon.currency.eth}}})
          }
          message.channel.send("Quick! X Æ A-XII is starting to cry! Type the following phrase into the chat: \n `Rock-a-bye baby in the tree top. When the wind blows the cradle will rock. When the bough breaks, the cradle will fall. And down will come Baby, Cradle and all.`")
          let response = await selOption();
          if (response === "Rock-a-bye baby in the tree top. When the wind blows the cradle will rock. When the bough breaks, the cradle will fall. And down will come Baby, Cradle and all."){
            let increase = 850*boost;
            message.channel.send("Congrats! The baby is now asleep and Elon comes in and rewards you with "+increase+" Doge!");
            let previous = await checkStuff(mongoclient, message.author.id)
              await mongoclient.db("elonbot").collection(message.guild.id)
                .updateOne({name: message.author.id}, { $set: {currency:{doge: (previous.currency.doge+increase), usd: previous.currency.usd, btc: previous.currency.btc, eth: previous.currency.eth}}})
          }else{
            let increase = 80*boost
            message.channel.send("X Æ A-XII is now rampaging through Elon's mansion, and then Elon comes in and is 'sorely disappointed' You only get "+increase+" Doge for that hour of grueling work");
            let previous = await checkStuff(mongoclient, message.author.id)
              await mongoclient.db("elonbot").collection(message.guild.id)
                .updateOne({name: message.author.id}, { $set: {currency:{doge: (previous.currency.doge+increase), usd: previous.currency.usd, btc: previous.currency.btc, eth: previous.currency.eth}}})
          }
          function selOption(){
            return new Promise(resolve => {
              message.channel.awaitMessages(m => m.author.id === message.author.id,
              {max: 1, time: 30000}).then(collected => {
                resolve(collected.first().content);
              }).catch(() => {
              resolve("halp")
              });
            });
          }
        }else{
          return message.channel.send("You currently don't have a job! To get one, do `el jobs`")
        }
    }else return message.channel.send("To get work again, you have to wait: "+ Math.round((cooldowns[message.author.id].work-Date.now())/60000) +" minutes before you can use this command again")
  }
  if (message.content.toLowerCase().startsWith(prefix+"trade")){
    if (cooldowns[message.author.id].trade < Date.now()){
      delete cooldowns[message.author.id].trade;
         
        var minute = 60000;
        //Set cooldown
        cooldowns[message.author.id].trade = Date.now() + 60000; //Set a 1 hour cooldown
        if (message.content.toLowerCase().match(/\d+/) === null){
          cooldowns[message.author.id].trade = 0;
          return message.channel.send("I didn't detect a number in there! The correct syntax is: `el trade **thing** **amount**`")
 
        }
    thenum = message.content.toLowerCase().match(/\d+/)[0]
      
    var coin;

    if (message.content.toLowerCase().includes("doge")){
       message.channel.send("OK! What do you want to use to buy your "+thenum+" doge with?")
       coin = "doge"
    }else if (message.content.toLowerCase().includes("bit")|| message.content.toLowerCase().includes("btc")){
      message.channel.send("OK! What do you want to buy your "+thenum+" Bitcoin with?")
      coin = "btc"
    }else if (message.content.toLowerCase().includes("eth")){
      message.channel.send("OK! What do you want to buy your "+thenum+" Ethereum with?");
      coin = "eth"
    }else if (message.content.toLowerCase().includes("usd")){
      message.channel.send("OK! What do you want to buy your "+thenum+" United states Dollar with?");
      coin = "usd"
    }else if (message.content.toLowerCase().includes("tesla")){
      message.channel.send("OK! What do you want to buy your "+thenum+" tesla stocks with?");
      coin = "tesla"
    }else if (message.content.toLowerCase().includes("space")){
      message.channel.send("OK! What do you want to buy your "+thenum+" SpaceX stocks with?");
      coin = "space"
    }else if (message.content.toLowerCase().includes("bor")){
      message.channel.send("OK! What do you want to buy your "+thenum+" Boring Company stocks with?");
      coin = "bor"
    }else if (message.content.toLowerCase().includes("elon")){
      message.channel.send("OK! What do you want to buy your "+thenum+" elon stocks with?");
      coin = "ingame"
    }else if (message.content.toLowerCase().includes("roblox")){
      message.channel.send("OK! What do you want to buy your "+thenum+" Roblox stocks with?");
      coin = "roblox"
    }else if (message.content.toLowerCase().includes("game")||message.content.toLowerCase().includes("gme")){
      message.channel.send("OK! What do you want to buy your "+thenum+" Game stop stocks  with?");
      coin = "game"
    }
      let options = new Discord.MessageEmbed()
      .setTitle("Menu")
      .setColor("#9098a6")
      .addFields(
          {name: "Currencies",  value: " 1. Dogecoin\n2. USD \n3. BTC\n4. ETH" },
          {name: "Stocks",       value: "5. Tesla\n6. SpaceX (not public yet)\n7. Roblox\n8. Boring Company (Not public yet)\n9. Game Stonks\n10. Elon Stocks"},
      )
      message.channel.send(options)
    let x = await selOption();
    if (Number(x).toString().toLowerCase() === "nan"){
      return message.channel.send("That wasn't a valid option, please try again.");
    }else{
      if (Number(x)>10 || Number(x)<1){
        return message.channel.send("That wasn't a valid option, please try again.")
      }
      // put stuff here
      let currentWal = await checkStuff(mongoclient, message.author.id);
      var requestedAmount = 0;
      if (x.toString() === "1") {requestedAmount = currentWal.currency.doge;}
      else if (x.toString() === "2") requestedAmount = currentWal.currency.usd;
      else if (x.toString() === "3") requestedAmount = currentWal.currency.btc;
      else if (x.toString() === "4") requestedAmount = currentWal.currency.eth;
      else if (x.toString() === "5") requestedAmount = currentWal.stocks.tesla;
      else if (x.toString() === "6") return message.channel.send("SpaceX is currently not a publicly listed company, so you can't buy it.")
      else if (x.toString() === "7") requestedAmount = currentWal.stocks.roblox;
      else if (x.toString() === "8") return message.channel.send("The Boring Company is currently not a publicly listed company, so you can't buy it.")
      else if (x.toString() === "9") requestedAmount = currentWal.stocks.gameStonks;
      else if (x.toString() === "10") requestedAmount = currentWal.stocks.elonstock;

      let amountToBuy = await func1(thenum);
      async function func1(thenum){
        var amountToBuy = 0;
      if (coin === "doge"){
        let temp = await CoinGeckoClient.coins.fetch("dogecoin");
        amountToBuy = temp.data.market_data.current_price.usd*Number(thenum);
      }else if (coin === "btc"){
        let temp = await CoinGeckoClient.coins.fetch("bitcoin");
        amountToBuy = temp.data.market_data.current_price.usd*Number(thenum);
      }else if (coin === "eth"){
        let temp = await CoinGeckoClient.coins.fetch("ethereum");
        amountToBuy = temp.data.market_data.current_price.usd*Number(thenum);
      }else if (coin === "tesla"){
        let data = await yahooStockPrices.getCurrentData("TSLA");
        amountToBuy = data.price*Number(thenum)
      }else if (coin === "game"){
        let data = await yahooStockPrices.getCurrentData("GME");
        amountToBuy = data.price*Number(thenum)
      }else if (coin === "roblox"){
        let data = await yahooStockPrices.getCurrentData("RBLX");
        amountToBuy = data.price*Number(thenum)
      }else if (coin === "ingame"){
        amountToBuy = Math.floor(Math.random() * 300)*Number(thenum);
      }else if (coin === "usd"){
        amountToBuy = Number(thenum)
      }
      return amountToBuy;
    }

      //_________________________________________________________________
      // amounttobuy is the amount that they want to buy converted to usdt
      // totalAmount is the amount that they are going to spend in their requested currency
      let totalAmount = await func2(amountToBuy);
      async function func2(amountToBuy){
        var totalAmount;
      if (x.toString() === "1"){
        let temp1 = await CoinGeckoClient.coins.fetch("dogecoin");
        totalAmount = amountToBuy/(temp1.data.market_data.current_price.usd);
      }else if (x.toString() === "2"){
        totalAmount = amountToBuy;
      }else if (x.toString() === "3"){
        let temp1 = await CoinGeckoClient.coins.fetch("bitcoin");
        totalAmount = amountToBuy/temp1.data.market_data.current_price.usd
      }else if (x.toString() === "4"){
        let temp1 = await CoinGeckoClient.coins.fetch("ethereum");
        totalAmount = amountToBuy/temp1.data.market_data.current_price.usd
      }else if (x.toString() === "5"){
        let temp1 = await yahooStockPrices.getCurrentData("TSLA");
        totalAmount = amountToBuy/temp1.price
      }else if (x.toString() === "7"){
        let temp1 = await yahooStockPrices.getCurrentData("RBLX");
        totalAmount = amountToBuy/temp1.price
      }else if (x.toString() === "9"){
        let temp1 = await yahooStockPrices.getCurrentData("GME");
        totalAmount = amountToBuy/temp1.price
      }else if (x.toString() === "10"){
        totalAmount = amountToBuy/Math.floor(Math.random() * 300)
      }
      return totalAmount;
    }

      if (totalAmount>requestedAmount){
        cooldowns[message.author.id].trade = 0;
        return message.channel.send("You don't have enough money lol imagine being poor.")
      }
      
      console.log(totalAmount); // take away this num
      console.log(Number(thenum)) // add this num

      totalAmount = Number(totalAmount);
      thenum = Number(thenum)
      //console.log(x) //deduct the currency X

      //taking away stuff
      if (x.toString() === "1"){
        let previous = await checkStuff(mongoclient, message.author.id)
        await mongoclient.db("elonbot").collection(message.guild.id)
            .updateOne({name: message.author.id}, { $set: {currency:{doge: (previous.currency.doge-totalAmount), usd: previous.currency.usd, btc: previous.currency.btc, eth: previous.currency.eth}}})
      }else if (x.toString() === "2"){
        let previous = await checkStuff(mongoclient, message.author.id)
        await mongoclient.db("elonbot").collection(message.guild.id)
            .updateOne({name: message.author.id}, { $set: {currency:{doge: previous.currency.doge, usd: (previous.currency.usd-totalAmount), btc: previous.currency.btc, eth: previous.currency.eth}}})
      }else if (x.toString() === "3"){
        let previous = await checkStuff(mongoclient, message.author.id)
        await mongoclient.db("elonbot").collection(message.guild.id)
            .updateOne({name: message.author.id}, { $set: {currency:{doge: previous.currency.doge, usd: previous.currency.usd, btc: previous.currency.btc-totalAmount, eth: previous.currency.eth}}})
      }else if (x.toString() === "4"){
        let previous = await checkStuff(mongoclient, message.author.id)
        await mongoclient.db("elonbot").collection(message.guild.id)
            .updateOne({name: message.author.id}, { $set: {currency:{doge: previous.currency.doge, usd: previous.currency.usd, btc: previous.currency.btc, eth: previous.currency.eth-totalAmount}}})
      }else if (x.toString() === "5"){
        let previous = await checkStuff(mongoclient, message.author.id)
        await mongoclient.db("elonbot").collection(message.guild.id)
            .updateOne({name: message.author.id}, { $set: {stocks:{tesla: (previous.stocks.tesla-totalAmount), space: previous.stocks.space, roblox: previous.stocks.roblox, boring: previous.stocks.boring, gameStonks: previous.stocks.gameStonks, elonstock: previous.stocks.elonstock}}})
      }else if (x.toString() === "7"){
        let previous = await checkStuff(mongoclient, message.author.id)
        await mongoclient.db("elonbot").collection(message.guild.id)
            .updateOne({name: message.author.id}, { $set: {stocks:{tesla: previous.stocks.tesla, space: previous.stocks.space, roblox: previous.stocks.roblox-totalAmount, boring: previous.stocks.boring, gameStonks: previous.stocks.gameStonks, elonstock: previous.stocks.elonstock}}})
      }else if (x.toString() === "9"){
        let previous = await checkStuff(mongoclient, message.author.id)
        await mongoclient.db("elonbot").collection(message.guild.id)
            .updateOne({name: message.author.id}, { $set: {stocks:{tesla: previous.stocks.tesla, space: previous.stocks.space, roblox: previous.stocks.roblox, boring: previous.stocks.boring, gameStonks: previous.stocks.gameStonks-totalAmount, elonstock: previous.stocks.elonstock}}})
      }else if (x.toString() === "10"){
        let previous = await checkStuff(mongoclient, message.author.id)
        await mongoclient.db("elonbot").collection(message.guild.id)
            .updateOne({name: message.author.id}, { $set: {stocks:{tesla: previous.stocks.tesla, space: previous.stocks.space, roblox: previous.stocks.roblox, boring: previous.stocks.boring, gameStonks: previous.stocks.gameStonks, elonstock: previous.stocks.elonstock-totalAmount}}})
      }
      //end of taking away stuff

      //start of adding stuff
      if (message.content.toLowerCase().includes("doge")){
        let previous = await checkStuff(mongoclient, message.author.id)
        await mongoclient.db("elonbot").collection(message.guild.id)
            .updateOne({name: message.author.id}, { $set: {currency:{doge: (previous.currency.doge+thenum), usd: previous.currency.usd, btc: previous.currency.btc, eth: previous.currency.eth}}})
     }else if (message.content.toLowerCase().includes("bit")|| message.content.toLowerCase().includes("btc")){
      let previous = await checkStuff(mongoclient, message.author.id)
      await mongoclient.db("elonbot").collection(message.guild.id)
          .updateOne({name: message.author.id}, { $set: {currency:{doge: previous.currency.doge, usd: previous.currency.usd, btc: previous.currency.btc+thenum, eth: previous.currency.eth}}})
     }else if (message.content.toLowerCase().includes("eth")){
      let previous = await checkStuff(mongoclient, message.author.id)
      await mongoclient.db("elonbot").collection(message.guild.id)
          .updateOne({name: message.author.id}, { $set: {currency:{doge: previous.currency.doge, usd: previous.currency.usd, btc: previous.currency.btc, eth: previous.currency.eth+thenum}}})
     }else if (message.content.toLowerCase().includes("usd")){
      let previous = await checkStuff(mongoclient, message.author.id)
      await mongoclient.db("elonbot").collection(message.guild.id)
          .updateOne({name: message.author.id}, { $set: {currency:{doge: previous.currency.doge, usd: previous.currency.usd+thenum, btc: previous.currency.btc, eth: previous.currency.eth}}})
     }else if (message.content.toLowerCase().includes("tesla")){
      let previous = await checkStuff(mongoclient, message.author.id)
      await mongoclient.db("elonbot").collection(message.guild.id)
          .updateOne({name: message.author.id}, { $set: {stocks:{tesla: previous.stocks.tesla+thenum, space: previous.stocks.space, roblox: previous.stocks.roblox, boring: previous.stocks.boring, gameStonks: previous.stocks.gameStonks, elonstock: previous.stocks.elonstock}}})
     }else if (message.content.toLowerCase().includes("space")){
      let previous = await checkStuff(mongoclient, message.author.id)
      await mongoclient.db("elonbot").collection(message.guild.id)
          .updateOne({name: message.author.id}, { $set: {stocks:{tesla: previous.stocks.tesla, space: previous.stocks.space+thenum, roblox: previous.stocks.roblox, boring: previous.stocks.boring, gameStonks: previous.stocks.gameStonks, elonstock: previous.stocks.elonstock}}})
     }else if (message.content.toLowerCase().includes("bor")){
      let previous = await checkStuff(mongoclient, message.author.id)
      await mongoclient.db("elonbot").collection(message.guild.id)
          .updateOne({name: message.author.id}, { $set: {stocks:{tesla: previous.stocks.tesla, space: previous.stocks.space, roblox: previous.stocks.roblox, boring: previous.stocks.boring+thenum, gameStonks: previous.stocks.gameStonks, elonstock: previous.stocks.elonstock}}})
     }else if (message.content.toLowerCase().includes("elon")){
      let previous = await checkStuff(mongoclient, message.author.id)
      await mongoclient.db("elonbot").collection(message.guild.id)
          .updateOne({name: message.author.id}, { $set: {stocks:{tesla: previous.stocks.tesla, space: previous.stocks.space, roblox: previous.stocks.roblox, boring: previous.stocks.boring, gameStonks: previous.stocks.gameStonks, elonstock: previous.stocks.elonstock+thenum}}})
     }else if (message.content.toLowerCase().includes("roblox")){
      let previous = await checkStuff(mongoclient, message.author.id)
      await mongoclient.db("elonbot").collection(message.guild.id)
          .updateOne({name: message.author.id}, { $set: {stocks:{tesla: previous.stocks.tesla, space: previous.stocks.space, roblox: previous.stocks.roblox+thenum, boring: previous.stocks.boring, gameStonks: previous.stocks.gameStonks, elonstock: previous.stocks.elonstock}}})
     }else if (message.content.toLowerCase().includes("game")||message.content.toLowerCase().includes("gme")){
      let previous = await checkStuff(mongoclient, message.author.id)
      await mongoclient.db("elonbot").collection(message.guild.id)
          .updateOne({name: message.author.id}, { $set: {stocks:{tesla: previous.stocks.tesla, space: previous.stocks.space, roblox: previous.stocks.roblox, boring: previous.stocks.boring, gameStonks: previous.stocks.gameStonks+thenum, elonstock: previous.stocks.elonstock}}})
     }
     message.channel.send("Succesful transaction!")
    }

    //}
    function selOption(){
      return new Promise(resolve => {
        message.channel.awaitMessages(m => m.author.id === message.author.id,
        {max: 1, time: 30000}).then(collected => {
          resolve(collected.first().content);
        }).catch(() => {
        message.channel.send('No answer after 30 seconds, operation canceled.');
        });
      });
    } 
  }else{
    message.channel.send("manipulating the stonk market isn't cool... that is if you aren't elon musk. You still have to wait: "+ Math.round((cooldowns[message.author.id].trade-Date.now())/1000) +" seconds before you can use this command again");
    return;
  }


  }
  if (message.content.toLowerCase().includes(prefix+"inv")&&!message.content.toLowerCase().includes("stock")){
    let user = await checkStuff(mongoclient, message.author.id);
    let owned = user.inventory;
    let embed = new Discord.MessageEmbed()
            .setColor('#9098a6')
            .setTitle(message.member.user.tag + "'s" + " inventory")

            if (owned.teslas !== 0) embed.addFields({name: ':blue_car: Teslas - ' + '<:dogecoin:825188367636627456> ' + owned.teslas, value: "="+30000*owned.teslas+" Doge"})
            if (owned.rockets !== 0) embed.addFields({name: ':rocket: Falcon 9 - ' + '<:dogecoin:825188367636627456> ' + owned.rockets, value: "="+30000*owned.rockets+" Doge"})
            if (owned.flamthrowers !== 0) embed.addFields({ name: ':fire: Flamethrower - ' + '<:dogecoin:825188367636627456> ' + owned.flamthrowers, value: "="+10000*owned.flamthrowers+" Doge"})
            if (owned.nft !== 0) embed.addFields({name: ':coin: NFT - ' + '<:dogecoin:825188367636627456> ' + owned.nft, value: 100000*owned.nft+ "Doge"});
            if (owned.gold !== 0) embed.addFields({ name: '<:gold:825217757918396446> Gold - ' + '<:dogecoin:825188367636627456> ' + owned.gold, value: "="+10000*owned.gold+ "Doge"});
            if (owned.houses !== 0) embed.addFields({ name: ':house_with_garden: House - ' + '<:dogecoin:825188367636627456> ' + owned.houses, value: "="+30000*owned.houses+ " Doge"});
            if (owned.twitter !== 0) embed.addFields({ name: ' <:twitter:825218272005062696> Twitter Followers - ' + '<:dogecoin:825188367636627456> ' + owned.twitter+"k", value: "="+20000*owned.twitter +" Doge"});
          message.channel.send(embed);
  }
  if (message.content.toLowerCase().includes(prefix)&& message.content.toLowerCase().includes("stock")&&message.content.toLowerCase().includes("inv")){
    let user = await checkStuff(mongoclient, message.author.id);
    let temp1 = await yahooStockPrices.getCurrentData("TSLA");
    let tsla = Number(temp1.price)
    temp1 = await yahooStockPrices.getCurrentData("RBLX");
    let rblx = Number(temp1.price)
    temp1 = await yahooStockPrices.getCurrentData("GME");
    let gme = Number(temp1.price)
    let elonStock = Math.floor(Math.random() * 300);


    let dogeData = await CoinGeckoClient.coins.fetch("dogecoin");
    let dogePrice = dogeData.data.market_data.current_price.usd
    tsla = tsla/dogePrice;
    rblx = rblx/dogePrice;
    gme = gme/dogePrice;
    elonStock = elonStock/dogePrice;
    let userStocks = user.stocks;
    console.log(userStocks.tesla + "="+tsla*userStocks.tesla)
    let embed = new Discord.MessageEmbed()
            .setColor('#9098a6')
            .setTitle("Stocks")
            .addFields(
              { name: "Stocks", value: "<:tesla:825390575523856395> Tesla - " + '<:dogecoin:825188367636627456> ' + Math.round(userStocks.tesla) + "="+Math.round(tsla*userStocks.tesla)+' Doge \n' + ":rocket: SpaceX - " + '<:dogecoin:825188367636627456> ' + Math.round(userStocks.space)+ "= `(n/a)`"+'\n' + "<:roblox:825394994655395840> Roblox - " + '<:dogecoin:825188367636627456> ' + Math.round(userStocks.roblox) + "="+Math.round(rblx*userStocks.roblox)+' Doge\n' + "<:theBoringCompany:825390794922786876> Boring Company - " + '<:dogecoin:825188367636627456> ' + Math.round(userStocks.boring) + ' = `(n/a)`\n' + "<:elon:825390986984161330> Elon - " + '<:dogecoin:825188367636627456> ' + Math.round(userStocks.elonstock)+ "="+Math.round(elonStock*userStocks.elonstock)+' Doge\n' + ":video_game:  GameStonks - " + '<:dogecoin:825188367636627456> ' + Math.round(userStocks.gameStonks) + "="+Math.round(gme*userStocks.gameStonks)+' Doge'}
            )
          message.channel.send(embed);
  }
  if (message.content.toLowerCase() === prefix + 'stock' || message.content.toLowerCase() === prefix + 'stocks' || message.content.toLowerCase() === prefix+"stock list") {
    let dogeCoin = await CoinGeckoClient.coins.fetch("dogecoin");
    let priceOfDoge = dogeCoin.data.market_data.current_price.usd

    let btc = await CoinGeckoClient.coins.fetch("bitcoin");
    let priceOfBtc = btc.data.market_data.current_price.usd

    let eth = await CoinGeckoClient.coins.fetch("ethereum");
    let priceOfEth = btc.data.market_data.current_price.usd

    let stockPrice = await yahooStockPrices.getCurrentData("TSLA");
    let totalAmount = stockPrice.price
    let teslaConverted = Math.round(totalAmount/priceOfDoge)

    
    let robloxstockPrice = await yahooStockPrices.getCurrentData("RBLX");
    let robloxtotalAmount = robloxstockPrice.price
    let robloxConverted = Math.round(robloxtotalAmount/priceOfDoge)
    let elonStock = Math.floor(Math.random() * 300);

    let embed = new Discord.MessageEmbed()
      .setColor('#9098a6')
      .setTitle("Stocks").addFields(

        { name: 'Currencies', value: "<:doge:825396246931046412> Dogecoin - " + '<:dogecoin:825188367636627456> ' + "1" + '\n' + ":dollar: USD - " + '<:dogecoin:825188367636627456> ' + Math.round(1/priceOfDoge) + '\n' + "<:bitcoin:825388613285576775> Bitcoin - " + '<:dogecoin:825188367636627456> ' + priceOfBtc + '\n' + "<:ethereum:825388795054391296> Ethereum - " + '<:dogecoin:825188367636627456> ' + priceOfEth },
        { name: "Stocks", value: "<:tesla:825390575523856395> Tesla - " + '<:dogecoin:825188367636627456> ' + teslaConverted + '\n' + ":rocket: SpaceX - " + '<:dogecoin:825188367636627456> ' + 'N/A' + '\n' + "<:roblox:825394994655395840> Roblox - " + '<:dogecoin:825188367636627456> ' + robloxConverted + '\n' + "<:theBoringCompany:825390794922786876> Boring Company - " + '<:dogecoin:825188367636627456> ' + "N/A" + '\n' + "<:elon:825390986984161330> Elon - " + '<:dogecoin:825188367636627456> ' + elonStock },
        { name: "Additional Info", value: '-For more information about each stock just use the ``el help stock [STOCK NAME]`` command'}
        )
    message.channel.send(embed);
  }
  if (message.content.toLowerCase() === prefix + 'shop' || message.content.toLowerCase() === prefix + 'store') {

    let embed = new Discord.MessageEmbed()
            .setColor('#9098a6')
            .setTitle(message.member.user.tag + "'s" + " inventory").addFields(

              { name: ':rocket: Falcon 9 - ' + '<:dogecoin:825188367636627456> ' + falcon9price, value: "Board the Falcon 9 for a chance to earn Doge...or die trying" },

              { name: ':fire: Flamethrower - ' + '<:dogecoin:825188367636627456> ' + flamethrowerprice, value: "Use the flamethrower to *try* and kill someone, but beware; you might die too" },
              { name: '<:gold:825217757918396446> Gold - ' + '<:dogecoin:825188367636627456> ' + goldprice, value: "Money can't buy you happiness, but it can save your life" }, { name: '<:twitter:825218272005062696> Twitter Followers - ' + '<:dogecoin:825188367636627456> ' + twitterprice, value: "Get a pay raise; just don't get cancelled by your followers" },
              { name: ':house_with_garden: House - ' + '<:dogecoin:825188367636627456> ' + houseprice, value: "Rent out your house to Elon so he can have parties in it" },
              { name: ':blue_car: Tesla - ' + '<:dogecoin:825188367636627456> ' + teslaprice, value: "Use you Tesla as an Uber driver and earn some extra Dogecoin" },
              { name: ':coin: NFT - ' + '<:dogecoin:825188367636627456> ' + nftprice, value: "A useless collectible to show off to your friends if you're rich (just like a real NFT)" }, { name: 'Additional Info', value: "-To find out more about each item say ``el help [ITEM NAME]``" + '\n' + "-Say ``el buy [ITEM NAME] [AMOUNT]`` to buy the item" + '\n' + "-Say ``el use [ITEM NAME]`` to active the item" }

            )
          message.channel.send(embed);
  }
  if (message.content.toLowerCase().startsWith(prefix+"buy item")||message.content.toLowerCase().includes(prefix+"buy")){
    var prices = {
      rocket: 30000,
      flamthrowers: 10000,
      nft: 100000,
      teslas: 30000,
      gold: 10000,
      houses: 30000,
      twitter: 20000
    }
    var item = "none";
    if (message.content.toLowerCase().includes("falcon")) item = "rocket";
    else if (message.content.toLowerCase().includes("flame")) item = "flamthrowers"; //and yes it's spelled wrong but I'm too lazy to change it because then I have to delete mongodb entry and I don't want to do that
    else if (message.content.toLowerCase().includes("gold")) item = "gold";
    else if (message.content.toLowerCase().includes("twitter")||message.content.toLowerCase().includes("follow")) item = "twitter";
    else if (message.content.toLowerCase().includes("house")) item = "houses";
    else if (message.content.toLowerCase().includes("tesla")||message.content.toLowerCase().includes("car")) item = "teslas";
    else if (message.content.toLowerCase().includes("nft")) item = "nft";
    else return message.channel.send("That wasn't a valid item from the shop! To see the currently available items, do: `"+prefix+"shop`");
var quant;
    if (message.content.toLowerCase().match(/\d+/) === null) quant = 1;
    else quant = message.content.toLowerCase().match(/\d+/)[0];
quant = Number(quant)
    if (Number(quant).toString().toLowerCase() === "nan") quant = 1;
    message.channel.send("Ok! Are you sure that you would like to buy `"+quant+"` `"+item+"s` for `"+prices[item]*quant+"` Doge? (Type yes if you would)")
    
    let user = await checkStuff(mongoclient, message.author.id);
    let response  = await selOption();
    if (response.toLowerCase() !== "yes") return message.channel.send("Ok! Canceled")
    if (user.currency.doge < prices[item]*quant) return message.channel.send("Tough luck! You don't have enough doge! To buy in a different currency, first exchange to doge.")

    let previous = await checkStuff(mongoclient, message.author.id)
    await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.author.id}, { $set: {currency:{doge: (previous.currency.doge-prices[item]*quant), usd: previous.currency.usd, btc: previous.currency.btc, eth: previous.currency.eth}}})

    previous = await checkStuff(mongoclient, message.author.id)
    if (item === "rocket"){
    await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.author.id}, { $set: {inventory:{rockets: previous.inventory.rockets+quant, flamthrowers: previous.inventory.flamthrowers, nft: previous.inventory.nft, teslas: previous.inventory.teslas, gold: previous.inventory.gold, houses: previous.inventory.houses, twitter: previous.inventory.twitter}}})
    }else if (item === "flamthrowers"){
    await mongoclient.db("elonbot").collection(message.guild.id)
      .updateOne({name: message.author.id}, { $set: {inventory:{rockets: previous.inventory.rockets, flamthrowers: previous.inventory.flamthrowers+quant, nft: previous.inventory.nft, teslas: previous.inventory.teslas, gold: previous.inventory.gold, houses: previous.inventory.houses, twitter: previous.inventory.twitter}}})
    }else if (item === "nft"){
      await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.author.id}, { $set: {inventory:{rockets: previous.inventory.rockets, flamthrowers: previous.inventory.flamthrowers, nft: previous.inventory.nft+quant, teslas: previous.inventory.teslas, gold: previous.inventory.gold, houses: previous.inventory.houses, twitter: previous.inventory.twitter}}})
      }else if (item === "teslas"){
        await mongoclient.db("elonbot").collection(message.guild.id)
          .updateOne({name: message.author.id}, { $set: {inventory:{rockets: previous.inventory.rockets, flamthrowers: previous.inventory.flamthrowers, nft: previous.inventory.nft, teslas: previous.inventory.teslas+quant, gold: previous.inventory.gold, houses: previous.inventory.houses, twitter: previous.inventory.twitter}}})
        }else if (item === "gold"){
          await mongoclient.db("elonbot").collection(message.guild.id)
            .updateOne({name: message.author.id}, { $set: {inventory:{rockets: previous.inventory.rockets, flamthrowers: previous.inventory.flamthrowers, nft: previous.inventory.nft, teslas: previous.inventory.teslas, gold: previous.inventory.gold+quant, houses: previous.inventory.houses, twitter: previous.inventory.twitter}}})
          }else if (item === "houses"){
            await mongoclient.db("elonbot").collection(message.guild.id)
              .updateOne({name: message.author.id}, { $set: {inventory:{rockets: previous.inventory.rockets, flamthrowers: previous.inventory.flamthrowers, nft: previous.inventory.nft, teslas: previous.inventory.teslas, gold: previous.inventory.gold, houses: previous.inventory.houses+quant, twitter: previous.inventory.twitter}}})
            }else if (item === "twitter"){
              await mongoclient.db("elonbot").collection(message.guild.id)
                .updateOne({name: message.author.id}, { $set: {inventory:{rockets: previous.inventory.rockets, flamthrowers: previous.inventory.flamthrowers, nft: previous.inventory.nft, teslas: previous.inventory.teslas, gold: previous.inventory.gold, houses: previous.inventory.houses, twitter: previous.inventory.twitter+quant}}})
              }
    message.channel.send("OK! The transaction has finished")
    function selOption(){
      return new Promise(resolve => {
        message.channel.awaitMessages(m => m.author.id === message.author.id,
        {max: 1, time: 30000}).then(collected => {
          resolve(collected.first().content);
        }).catch(() => {
        message.channel.send('No answer after 30 seconds, operation canceled.');
        });
      });
    } 
  }
  if (message.content.toLowerCase().startsWith(prefix+"sell item")||message.content.toLowerCase().includes(prefix+"sell")){
    var prices = {
      rocket: 2400,
      flamthrowers: 8000,
      nft: 100000,
      teslas: 24000,
      gold: 8000,
      houses: 24000,
      twitter: 16000
    }
    var item = "none";
    var quant;
    if (message.content.toLowerCase().match(/\d+/) === null) quant = 1;
    else quant = message.content.toLowerCase().match(/\d+/)[0];
quant = Number(quant)
    if (Number(quant).toString().toLowerCase() === "nan") quant = 1;

    if (message.content.toLowerCase().includes("falcon")) item = "rocket";
    else if (message.content.toLowerCase().includes("flame")) item = "flamthrowers"; //and yes it's spelled wrong but I'm too lazy to change it because then I have to delete mongodb entry and I don't want to do that
    else if (message.content.toLowerCase().includes("gold")) item = "gold";
    else if (message.content.toLowerCase().includes("twitter")||message.content.toLowerCase().includes("follow")) item = "twitter";
    else if (message.content.toLowerCase().includes("house")) item = "houses";
    else if (message.content.toLowerCase().includes("tesla")||message.content.toLowerCase().includes("car")) item = "teslas";
    else return message.channel.send("That item isn't even a real thing! What were you even thinking? (You can't sell nft's) ");
    
    let userData = await checkStuff(mongoclient, message.author.id);
    if (userData.inventory[item] < quant) return message.channel.send("You don't have enough of that item in your inventory! To buy something, do `el buy item gold` for example");
    
    message.channel.send("Are you sure you would like to sell`"+quant+"` `"+item+"`s for `"+quant*prices[item]+"` Doge? Type yes/no")
    let response = await selOption()
    if (response.toLowerCase() !== "yes") return message.channel.send("Ok, nothing was changed")

    let previous = await checkStuff(mongoclient, message.author.id)

    await mongoclient.db("elonbot").collection(message.guild.id)
    .updateOne({name: message.author.id}, { $set: {currency:{doge: (previous.currency.doge+prices[item]*quant), usd: previous.currency.usd, btc: previous.currency.btc, eth: previous.currency.eth}}})


    if (item === "rocket"){
      await mongoclient.db("elonbot").collection(message.guild.id)
          .updateOne({name: message.author.id}, { $set: {inventory:{rockets: previous.inventory.rockets-quant, flamthrowers: previous.inventory.flamthrowers, nft: previous.inventory.nft, teslas: previous.inventory.teslas, gold: previous.inventory.gold, houses: previous.inventory.houses, twitter: previous.inventory.twitter}}})
      }else if (item === "flamthrowers"){
      await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.author.id}, { $set: {inventory:{rockets: previous.inventory.rockets, flamthrowers: previous.inventory.flamthrowers-quant, nft: previous.inventory.nft, teslas: previous.inventory.teslas, gold: previous.inventory.gold, houses: previous.inventory.houses, twitter: previous.inventory.twitter}}})
      }else if (item === "nft"){
        await mongoclient.db("elonbot").collection(message.guild.id)
          .updateOne({name: message.author.id}, { $set: {inventory:{rockets: previous.inventory.rockets, flamthrowers: previous.inventory.flamthrowers, nft: previous.inventory.nft-quant, teslas: previous.inventory.teslas, gold: previous.inventory.gold, houses: previous.inventory.houses, twitter: previous.inventory.twitter}}})
        }else if (item === "teslas"){
          await mongoclient.db("elonbot").collection(message.guild.id)
            .updateOne({name: message.author.id}, { $set: {inventory:{rockets: previous.inventory.rockets, flamthrowers: previous.inventory.flamthrowers, nft: previous.inventory.nft, teslas: previous.inventory.teslas-quant, gold: previous.inventory.gold, houses: previous.inventory.houses, twitter: previous.inventory.twitter}}})
          }else if (item === "gold"){
            await mongoclient.db("elonbot").collection(message.guild.id)
              .updateOne({name: message.author.id}, { $set: {inventory:{rockets: previous.inventory.rockets, flamthrowers: previous.inventory.flamthrowers, nft: previous.inventory.nft, teslas: previous.inventory.teslas, gold: previous.inventory.gold-quant, houses: previous.inventory.houses, twitter: previous.inventory.twitter}}})
            }else if (item === "houses"){
              await mongoclient.db("elonbot").collection(message.guild.id)
                .updateOne({name: message.author.id}, { $set: {inventory:{rockets: previous.inventory.rockets, flamthrowers: previous.inventory.flamthrowers, nft: previous.inventory.nft, teslas: previous.inventory.teslas, gold: previous.inventory.gold, houses: previous.inventory.houses-quant, twitter: previous.inventory.twitter}}})
              }else if (item === "twitter"){
                await mongoclient.db("elonbot").collection(message.guild.id)
                  .updateOne({name: message.author.id}, { $set: {inventory:{rockets: previous.inventory.rockets, flamthrowers: previous.inventory.flamthrowers, nft: previous.inventory.nft, teslas: previous.inventory.teslas, gold: previous.inventory.gold, houses: previous.inventory.houses, twitter: previous.inventory.twitter-quant}}})
                }
        message.channel.send("Transaction Successful!")
    
    function selOption(){
      return new Promise(resolve => {
        message.channel.awaitMessages(m => m.author.id === message.author.id,
        {max: 1, time: 30000}).then(collected => {
          resolve(collected.first().content);
        }).catch(() => {
        message.channel.send('No answer after 30 seconds, operation canceled.');
        });
      });
    } 
  }
  if (message.content.toLowerCase().includes(prefix + "help")) {
    if (message.content.toLowerCase() === prefix + "help stock tesla" || message.content.toLowerCase() === prefix + "help stock teslas" || message.content.toLowerCase() === prefix + "help stocks tesla" || message.content.toLowerCase() === prefix + "help stocks teslas") {
      let dogeCoin = await CoinGeckoClient.coins.fetch("dogecoin");
      let priceOfDoge = dogeCoin.data.market_data.current_price.usd


      let stockPrice = await yahooStockPrices.getCurrentData("TSLA");
      let totalAmount = stockPrice.price
      let teslaConverted = Math.round(totalAmount / priceOfDoge)

      let embed = new Discord.MessageEmbed()
        .setColor('#9098a6')
        .setTitle("Tesla Stock Information").addFields(
          { name: 'Price', value: '<:dogecoin:825188367636627456> ' + teslaConverted },
          { name: 'Description', value: "Price is derived from the [real Tesla Stocks](https://finance.yahoo.com/quote/TSLA/) and then converted to Dogecoin. Invest in the stock and sell it whenever you want." }
        )
      message.channel.send(embed);
    }

    if (message.content.toLowerCase() === prefix + "help stock roblox" || message.content.toLowerCase() === prefix + "help stocks roblox") {
      let dogeCoin = await CoinGeckoClient.coins.fetch("dogecoin");
      let priceOfDoge = dogeCoin.data.market_data.current_price.usd




      let robloxstockPrice = await yahooStockPrices.getCurrentData("RBLX");
      let robloxtotalAmount = robloxstockPrice.price
      let robloxConverted = Math.round(robloxtotalAmount / priceOfDoge)

      let embed = new Discord.MessageEmbed()
        .setColor('#9098a6')
        .setTitle("Roblox Stock Information").addFields(
          { name: 'Price', value: '<:dogecoin:825188367636627456> ' + robloxConverted },
          { name: 'Description', value: "Price is derived from the [real Roblox stocks](https://finance.yahoo.com/quote/RBLX/) and then converted to Dogecoin. Invest in the stock and sell it whenever you want." }
        )
      message.channel.send(embed);
    }

    if (message.content.toLowerCase() === prefix + "help stock elon" || message.content.toLowerCase() === prefix + "help stocks elon") {
      let dogeCoin = await CoinGeckoClient.coins.fetch("dogecoin");
      let priceOfDoge = dogeCoin.data.market_data.current_price.usd


      let elonStock = Math.floor(Math.random() * 300);


      let embed = new Discord.MessageEmbed()
        .setColor('#9098a6')
        .setTitle("Roblox Stock Information").addFields(
          { name: 'Price', value: '<:dogecoin:825188367636627456> ' + elonStock },
          { name: 'Description', value: "Price is derived from a random number generator. It literally fuctuates 24/7" }
        )
      message.channel.send(embed);
    }






    if (message.content.toLowerCase() === prefix + "help gold") {
      let embed = new Discord.MessageEmbed()
        .setColor('#9098a6')
        .setTitle("Gold Information").addFields(
          { name: 'Buy', value: '<:dogecoin:825188367636627456> ' + goldprice },
          { name: 'Sell', value: '<:dogecoin:825188367636627456> ' + Math.round(goldprice * .8) },
          { name: 'Description', value: "Buy some gold and whenever you die your life will be spared (by bribing the asassin? idk games never make sense) but you will lose the gold." }
        )
      message.channel.send(embed);
    }
    if (message.content.toLowerCase() === prefix + "help falcon9" || message.content.toLowerCase() === prefix + "help falcon 9" || message.content.toLowerCase() === prefix + "help falcon") {
      let embed = new Discord.MessageEmbed()
        .setColor('#9098a6')
        .setTitle("Falcon 9 Information").addFields(
          { name: 'Buy', value: '<:dogecoin:825188367636627456> ' + falcon9price },
          { name: 'Sell', value: '<:dogecoin:825188367636627456> ' + Math.round(falcon9price * .8) },
          { name: 'Description', value: "When you use this item you have a 40% chance of earning [69,420](https://twitter.com/elonmusk/status/1316454051693895680?lang=en) Dogecoins, a 30% chance of the rocket crashing and you dying, and a 30% chance that nothing happens." }
        )
      message.channel.send(embed);
    }


    if (message.content.toLowerCase() === prefix + "help house" || message.content.toLowerCase() === prefix + "help home" || message.content.toLowerCase() === prefix + "help houses" || message.content.toLowerCase() === prefix + "help homes") {
      let embed = new Discord.MessageEmbed()
        .setColor('#9098a6')
        .setTitle("House Information").addFields(
          { name: 'Buy', value: '<:dogecoin:825188367636627456> ' + houseprice },
          { name: 'Sell', value: '<:dogecoin:825188367636627456> ' + Math.round(houseprice * .8) },
          { name: 'Description', value: "Elon needs places to host his parties, which is why he's renting our house. Use the ``el rent`` command to rent out your house to Elon and earn Doge." }
        )
      message.channel.send(embed);
    }



    if (message.content.toLowerCase() === prefix + "help nft") {
      let embed = new Discord.MessageEmbed()
        .setColor('#9098a6')
        .setTitle("NFT Information").addFields(
          { name: 'Buy', value: '<:dogecoin:825188367636627456> ' + nftprice },
          { name: 'Sell', value: "NFT's cannot be sold, but if you wish to trade them with your friends you can use the gift command." },
          { name: 'Description', value: "If you ever want to show off your wealth to your friends, NFT's are the way to go." }
        )
      message.channel.send(embed);
    }
    if (message.content.toLowerCase() === prefix + "help tesla") {
      let embed = new Discord.MessageEmbed()
        .setColor('#9098a6')
        .setTitle("Tesla Information").addFields(
          { name: 'Buy', value: '<:dogecoin:825188367636627456> ' + teslaprice },
          { name: 'Sell', value: '<:dogecoin:825188367636627456> ' + Math.round(teslaprice * .8) },
          { name: 'Description', value: "You can use your Tesla as an Uber driver. Every minute you can use the ``el uber`` command to uber someone and earn some Doge." }
        )
      message.channel.send(embed);
    }

    if (message.content.toLowerCase() === prefix + "help twitter" || message.content.toLowerCase() === prefix + "help twitter follower" || message.content.toLowerCase() === prefix + "help twitter followers" || message.content.toLowerCase() === prefix + "help follower" || message.content.toLowerCase() === prefix + "help followers") {
      let embed = new Discord.MessageEmbed()
        .setColor('#9098a6')
        .setTitle("Twitter Followers Information").addFields(
          { name: 'Buy', value: '<:dogecoin:825188367636627456> ' + twitterprice },
          { name: 'Sell', value: '<:dogecoin:825188367636627456> ' + Math.round(twitterprice * .8) },
          { name: 'Description', value: "Gain 1000 new Twitter followers by buying this, which will give you a 5% raise with your job. But beware, the more followers you have, the higher chance you have of getting cancelled/dying." }
        )
      message.channel.send(embed);
    }


    if (message.content.toLowerCase() === prefix + "help flamethrower" || message.content.toLowerCase() === prefix + "help flame" || message.content.toLowerCase() === prefix + "help thrower") {
      let embed = new Discord.MessageEmbed()
        .setColor('#9098a6')
        .setTitle("Flamethrower Information").addFields(
          { name: 'Buy', value: '<:dogecoin:825188367636627456> ' + flamethrowerprice },
          { name: 'Sell', value: '<:dogecoin:825188367636627456> ' + Math.round(flamethrowerprice * .8) },
          { name: 'Description', value: "Use the Boring Company Flamethrower to attack someone. There's a 55% chance your target will die, and there's a 45% chance you will die." }
        )
      message.channel.send(embed);
    }

    if (message.content.toLowerCase() === prefix + 'help') {
      let embed = new Discord.MessageEmbed()
        .setColor('#9098a6')
        .setTitle("Bot commands").addFields(
          { name: prefix + "help fun", value: 'All the fun commands for the bot', inline: true },
          { name: prefix + "help info", value: 'Get started, bot website, community server, etc.', inline: true }
        )
      message.channel.send(embed);
    }

    if (message.content.toLowerCase() === prefix + 'help launder' || message.content.toLowerCase() === prefix + 'help la') {
      let embed = new Discord.MessageEmbed()
        .setColor('#9098a6')
        .setTitle("launder information").addFields(
          { name: 'Description', value: "Use this command to get money. There is a chance you won't get any, there's a small chance you'll get a ton, and there's a fat chance you'll get a little." },
          { name: 'Usage', value: "``el launder``" },
          { name: 'Aliases', value: "``la``" }
        )
      message.channel.send(embed);
    }

    if (message.content.toLowerCase() === prefix + 'help get hobby' || message.content.toLowerCase() === prefix + 'help get hobbies') {
      let embed = new Discord.MessageEmbed()
        .setColor('#9098a6')
        .setTitle("get hobby information").addFields(
          { name: 'Description', value: "Use this command to get a hobby. Just send the number corresponding with the hobby you want." },
          { name: 'Usage', value: "``el get hobby``" },
          { name: 'Aliases', value: "``get hobbies``" }
        )
      message.channel.send(embed);
    }
    if (message.content.toLowerCase() === prefix + 'help elon' || message.content.toLowerCase() === prefix + "help elon's"|| message.content.toLowerCase() === prefix + "help elon's son"|| message.content.toLowerCase() === prefix + "help elons son"|| message.content.toLowerCase() === prefix + "help son") {
      let embed = new Discord.MessageEmbed()
        .setColor('#9098a6')
        .setTitle("elon's son information").addFields(
          { name: 'Chances', value: "There's a 1% chance you'll get this hobby when you request it, but there's a 99% chance you won't get it and that you'll lose your currenty hobby." },
          { name: 'Description', value: "Every time you have a transaction (that isn't stock related one because you shouldn't manipulate the stock market ||unless you're Elon or r/wallstreetbets||) you'll get an extra 200 Dogecoins." },
                )
      message.channel.send(embed);
    }

    if (message.content.toLowerCase() === prefix + 'help lawyer') {
      let embed = new Discord.MessageEmbed()
        .setColor('#9098a6')
        .setTitle("lawyer information").addFields(
          { name: 'Chances', value: "There's a 50% chance you'll get this hobby when you request it, but there's also a 50% chance you won't get it and that you'll lose your currenty hobby." },
          { name: 'Description', value: "Every time you sue someone or are being sued you have a 50% higher chance of winning." },
                )
      message.channel.send(embed);
    }

    if (message.content.toLowerCase() === prefix + 'help hacker'||message.content.toLowerCase() === prefix + 'help hack') {
      let embed = new Discord.MessageEmbed()
        .setColor('#9098a6')
        .setTitle("hacker information").addFields(
          { name: 'Chances', value: "There's a 33% chance you'll get this hobby when you request it, but there's also a 66% chance you won't get it and that you'll lose your currenty hobby." },
          { name: 'Description', value: "Every time you launder your payout is increased by a max of 200 Doge." },
                )
      message.channel.send(embed);
    }

    if (message.content.toLowerCase() === prefix + 'help inventory item' || message.content.toLowerCase() === prefix + 'help inv item' || message.content.toLowerCase() === prefix + 'help inventory items' || message.content.toLowerCase() === prefix + 'help inv items') {
      let embed = new Discord.MessageEmbed()
        .setColor('#9098a6')
        .setTitle("inventory information").addFields(
          { name: 'Description', value: "Use this command to see all the items you own." },
          { name: 'Usage', value: "``el inventory items``" },
          { name: 'Aliases', value: "``inv items``" }
        )
      message.channel.send(embed);
    }

    if (message.content.toLowerCase() === prefix + 'help uber') {
      let embed = new Discord.MessageEmbed()
        .setColor('#9098a6')
        .setTitle("uber information").addFields(
          { name: 'Description', value: "Use this command to to get money as an Uber driver. You can only do this command if you have bought a Tesla from the store." },
          { name: 'Usage', value: "``el uber``" },
          { name: 'Aliases', value: "none" }
        )
      message.channel.send(embed);
    }

    if (message.content.toLowerCase() === prefix + 'help rent') {
      let embed = new Discord.MessageEmbed()
        .setColor('#9098a6')
        .setTitle("uber information").addFields(
          { name: 'Description', value: "Use this command to to get money as a landlord. You can only do this command if you have bought a house from the store." },
          { name: 'Usage', value: "``el rent``" },
          { name: 'Aliases', value: "none" }
        )
      message.channel.send(embed);
    }


    if (message.content.toLowerCase() === prefix + 'help inventory stock' || message.content.toLowerCase() === prefix + 'help inv stock' || message.content.toLowerCase() === prefix + 'help inventory stocks' || message.content.toLowerCase() === prefix + 'help inv stocks') {
      let embed = new Discord.MessageEmbed()
        .setColor('#9098a6')
        .setTitle("inventory information").addFields(
          { name: 'Description', value: "Use this command to see all the stocks you own." },
          { name: 'Usage', value: "``el inventory stocks``" },
          { name: 'Aliases', value: "``inv stocks``" }
        )
      message.channel.send(embed);
    }

    if (message.content.toLowerCase() === prefix + 'help hobbies' || message.content.toLowerCase() === prefix + 'help hobby list' || message.content.toLowerCase() === prefix + 'help hobby' || message.content.toLowerCase() === prefix + 'help hobbies list') {
      let embed = new Discord.MessageEmbed()
        .setColor('#9098a6')
        .setTitle("hobbies information").addFields(
          { name: 'Description', value: "Use this command to see all the hobbies that you can get. Hobbies give you special abilities like higher chances of winning a lawsuit or getting extra money from laundering." },
          { name: 'Usage', value: "``el hobbies``" },
          { name: 'Aliases', value: "``hobby``, ``hobby list``, ``hobbies list``" }
        )
      message.channel.send(embed);
    }


    if (message.content.toLowerCase() === prefix + 'help sue' || message.content.toLowerCase() === prefix + 'help su') {
      let embed = new Discord.MessageEmbed()
        .setColor('#9098a6')
        .setTitle("sue information").addFields(
          { name: 'Description', value: "If you want to get rich quick (and lose friends in the process) use the sue command, which will help you steal you're friend's money. But beware, they might countersue and take your money :eyes:" },
          { name: 'Usage', value: "``el sue [@USER]``" },
          { name: 'Aliases', value: "su" }
        )
      message.channel.send(embed);
    }
    if (message.content.toLowerCase() === prefix + 'help work') {
      let embed = new Discord.MessageEmbed()
        .setColor('#9098a6')
        .setTitle("work information").addFields(
          { name: 'Description', value: "Laundering isn't the only way to earn money. Find a job using the ``work list`` command and start working using the work command to become richer than your friends (and eventually become Elon Musk)." },
          { name: 'Usage', value: "``el work``" },
          { name: 'Aliases', value: "none" }
        )
      message.channel.send(embed);
    }

    if (message.content.toLowerCase() === prefix + 'help jobs' || message.content.toLowerCase() === prefix + 'help jobs' || message.content.toLowerCase() === prefix + 'help job list' || message.content.toLowerCase() === prefix + 'help jobs list') {
      let embed = new Discord.MessageEmbed()
        .setColor('#9098a6')
        .setTitle("work list information").addFields(
          { name: 'Description', value: "Become Elon's employee here. Send the number that corresponds to the job you want after executing this command." },
          { name: 'Usage', value: "``el jobs``" },
          { name: 'Aliases', value: "``job``, ``job list``, ``jobs list``" }
        )
      message.channel.send(embed);
    }

    if (message.content.toLowerCase() === prefix + 'help shop' || message.content.toLowerCase() === prefix + 'help store') {
      let embed = new Discord.MessageEmbed()
        .setColor('#9098a6')
        .setTitle("shop information").addFields(
          { name: 'Description', value: "Buy items/powerups from the shop. This command displays a list of the items, what they do, and how much they cost." },
          { name: 'Usage', value: "``el shop``" },
          { name: 'Aliases', value: "``store``" }
        )
      message.channel.send(embed);
    }

    if (message.content.toLowerCase() === prefix + 'help stock' || message.content.toLowerCase() === prefix + 'help stocks' || message.content.toLowerCase() === prefix + 'help stocks list' || message.content.toLowerCase() === prefix + 'help stock list') {
      let embed = new Discord.MessageEmbed()
        .setColor('#9098a6')
        .setTitle("stock information").addFields(
          { name: 'Description', value: "Buy and invest in stocks or currencies to earn or lose money. (If you're a true fan of Elon you'll invest in Dogecoin)" },
          { name: 'Usage', value: "``el stocks``" },
          { name: 'Aliases', value: "``stock``, ``stock list``, ``stocks list``" }
        )
      message.channel.send(embed);
    }

    if (message.content.toLowerCase() === prefix + 'help buy') {
      let embed = new Discord.MessageEmbed()
        .setColor('#9098a6')
        .setTitle("buy information").addFields(
          { name: 'Description', value: "Use this command to buy items from the shop." },
          { name: 'Usage', value: "``el buy [ITEM NAME] [AMOUNT]``" },
          { name: 'Aliases', value: "none" }
        )
      message.channel.send(embed);
    }

    if (message.content.toLowerCase() === prefix + 'help trade') {
      let embed = new Discord.MessageEmbed()
              .setColor('#9098a6')
              .setTitle("trade information").addFields(
                { name: 'Description', value: "Use this command to buy and tell stocks/currencies." },
                { name: 'Usage', value: "``el trade [STOCK YOU'RE SELLING OR BUYING] [AMOUNT]``" },
                { name: 'Aliases', value: "none" }
              )
            message.channel.send(embed);
    }

    if (message.content.toLowerCase() === prefix + 'help fun') {
      let embed = new Discord.MessageEmbed()
        .setColor('#9098a6')
        .setTitle("Fun commands").addFields(
          { name: 'Dogecoin/Money', value: "``balance``, ``launder``, ``sue``, ``give``" },
          { name: 'Roles', value: "``work``, ``jobs``, ``hobbies``,``get hobby``, ``uber``, ``rent``" },
          { name: 'Items', value: "``shop``, ``inventory items``, ``use``, ``gift``, ``buy``, ``sell``" },
          { name: 'Stocks', value: "``stock list``, ``trade``, ``inventory stocks``" },
          { name: 'Additional Information', value: "-For more information about each of these commands use " + prefix + "help " + "``command name``" + '\n' + "-Use el before each command" }
        )
      message.channel.send(embed);
    }
    if (message.content.toLowerCase() === prefix + 'help gift') {
      let embed = new Discord.MessageEmbed()
        .setColor('#9098a6')
        .setTitle("gift information").addFields(
          { name: 'Description', value: "Use this command to gift items from the shop. ALl you need to do is specify what item you're giving away, how many you're giving away, and who you're giving it to." },
          { name: 'Usage', value: "``el gift [ITEM NAME] [NUMBER OF ITEMS] [@USER]``" },
          { name: 'Aliases', value: "none" }
        )
      message.channel.send(embed);
    }
    if (message.content.toLowerCase() === prefix + 'help give') {
      let embed = new Discord.MessageEmbed()
        .setColor('#9098a6')
        .setTitle("give information").addFields(
          { name: 'Description', value: "Use this command to give Dogecoins to ~~charity like elon does~~ your friends. ALl you need to do is specify how much you're giving and who you're giving it to." },
          { name: 'Usage', value: "``el give [AMOUNT OF DOGECOIN] [@USER]``" },
          { name: 'Aliases', value: "none" }
        )
      message.channel.send(embed);
    }

    if (message.content.toLowerCase() === prefix + 'help sell item' ||message.content.toLowerCase().includes(prefix+'sell')) {
            let embed = new Discord.MessageEmbed()
              .setColor('#9098a6')
              .setTitle("sell items information").addFields(
                { name: 'Description', value: "Use this command to sell items from the shop. You'll be refunded with 80% of what the item is worth." },
                { name: 'Usage', value: "``el sell [ITEM NAME] [AMOUNT]``" },
                { name: 'Aliases', value: "none" }
              )
            message.channel.send(embed);
  }

    if (message.content.toLowerCase() === prefix + 'help sell stock' || message.content.toLowerCase() === prefix + 'help sell stocks') {
      let embed = new Discord.MessageEmbed()
        .setColor('#9098a6')
        .setTitle("sell stocks information").addFields(
          { name: 'Description', value: "Use this command to sell stocks. You'll be given the amount of Dogecoin that the stock is currently worth." },
          { name: 'Usage', value: "``el sell [STOCK NAME] [AMOUNT]``" },
          { name: 'Aliases', value: "none" }
        )
      message.channel.send(embed);
    }

    if (message.content.toLowerCase() === prefix + 'help use') {
      let embed = new Discord.MessageEmbed()
        .setColor('#9098a6')
        .setTitle("use information").addFields(
          { name: 'Description', value: "This command can be used on items like flamethrowers and the Falcon 9 from the shop to use their capabilities. " },
          { name: 'Usage', value: "``el use [ITEM/STOCK NAME]``" },
          { name: 'Aliases', value: "none" }
        )
      message.channel.send(embed);
    }


    if (message.content.toLowerCase() === prefix + 'help balance' || message.content.toLowerCase() === prefix + 'help bal') {
      let embed = new Discord.MessageEmbed()
        .setColor('#9098a6')
        .setTitle("balance information").addFields(
          { name: 'Description', value: "Use ``balance`` to see how much Dogecoin you have." },
          { name: 'Usage', value: "``el balance``" },
          { name: 'Aliases', value: "``bal``" }
        )
      message.channel.send(embed);
    }
    if (message.content.toLowerCase() === prefix + 'help info') {
      let embed = new Discord.MessageEmbed()
        .setColor('#9098a6')
        .setTitle("Bot Information").addFields(
          {name: 'Get started', value: "Start earning money using the ``el launder`` command. Once you have enough money you can buy items from the ``el shop`` & ``el stock list``, get a job from ``el jobs``, and get powerups from the list of ``el hobbies``. To find out more about a command, item, stock, jobs, or hobby, just use the ``el help [COMMAND/ITEM/ETC. NAME]`` command (if you're looking for info on a stock use ``el help stock [STOCK NAME]``."},
          { name: "Website", value: "[Click here](https://www.elon-bot.ml/)", inline: true },
          { name: "Community Server", value: "[Click here](https://discord.gg/jerYNWApvm)", inline: true },
          { name: "Github Repository", value: "[Click here](https://github.com/Joshua-Zou/ElonBot)", inline: true },
          { name: "Invitation Link", value: "[Click here](https://discord.com/api/oauth2/authorize?client_id=824730559779045417&permissions=8&scope=bot)", inline: true }
        )
      message.channel.send(embed);
    }
  }
  if (message.content.toLowerCase().startsWith(prefix+"use")){
    if (message.content.toLowerCase().includes("falcon")||message.content.toLowerCase().includes("rocket")){
      message.channel.send("There will be a 40% chance of you earning 69420 dogecoins, a 30% chance that the rocket does nothing, and a 30% of the rocket crashing and killing you. Are you sure you want to use it? (Yes/no)");
      let response = await selOption();
      let userStuff = await checkStuff(mongoclient, message.author.id);
      if (userStuff.inventory.rockets === 0) return message.channel.send("You don't have enough falcon 9's! To buy some, `el buy item falcon 9`")
      if (response.toLowerCase() !== "yes") return message.channel.send("OK! canceled. If you would like to sell this, do `el sell item falcon 9`")
      let x = Math.floor(Math.random() * 1000);
      if (x<400){
        message.channel.send("Congrats you survived and got 69420 dogecoins!");
        let previous = await checkStuff(mongoclient, message.author.id)
        await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.author.id}, { $set: {currency:{doge: (previous.currency.doge+69420), usd: previous.currency.usd, btc: previous.currency.btc, eth: previous.currency.eth}}})
        await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.author.id}, { $set: {inventory:{rockets: previous.inventory.rockets-1, flamthrowers: previous.inventory.flamthrowers, nft: previous.inventory.nft, teslas: previous.inventory.teslas, gold: previous.inventory.gold, houses: previous.inventory.houses, twitter: previous.inventory.twitter}}})
        return;
      }else if (x<700){
        message.channel.send("You survived but didn't get any money out of it");
        await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.author.id}, { $set: {inventory:{rockets: previous.inventory.rockets-1, flamthrowers: previous.inventory.flamthrowers, nft: previous.inventory.nft, teslas: previous.inventory.teslas, gold: previous.inventory.gold, houses: previous.inventory.houses, twitter: previous.inventory.twitter}}})
        return;
      }else{
        message.channel.send("Ouch. Your rocket crashed, and you died.");
        await mongoclient.db("elonbot").collection(message.guild.id)
                .updateOne({name: message.author.id}, { $set: {
                  currency: {
                    usd: 0,
                    doge: 0,
                    btc: 0,
                    eth: 0,
                 },
                 stocks: {
                    tesla: 0,
                    space: 0,
                    roblox: 0,
                    boring: 0,
                    gameStonks: 0,
                    elonstock: 0
                 },
                 inventory: {
                     rockets: 0,
                     flamthrowers: 0,
                     nft: 0,
                     teslas: 0,
                     gold: 0,
                     houses: 0,
                     twitter: 0
                 }
                }})
        return;
      }
    }else if (message.content.toLowerCase().includes("flame")){
      if (cooldowns[message.author.id].flame === undefined) cooldown[message.author.id].flame = 0;
      if (cooldowns[message.author.id].flame < Date.now()){
        delete cooldowns[message.author.id].flame;
         
        var minute = 60000;
        var hour = minute * 24;
        //Set cooldown
        cooldowns[message.author.id].flame = Date.now() + 60000; //Set a 60 hour cooldown
      if (!message.mentions.users.first()){
        cooldowns[message.author.id].flame = 0;
        return message.channel.send("You need to mention someone to kill!")
    }else{
      message.channel.send("Use the Boring Company Flamethrower to attack someone. There's a 55% chance your target will die, and there's a 45% chance you will die. Are you sure you want to use this? (Yes/No)")
      let result = await selOption();
      if (result.toLowerCase() === "yes"||result.toLowerCase() === "y"){
        let x = Math.floor(Math.random() * 1000);
        if (x<550){
          message.channel.send("You successffuly killed "+message.mentions.users.first().tag);
          await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.author.id}, { $set: {inventory:{rockets: previous.inventory.rockets, flamthrowers: previous.inventory.flamthrowers-1, nft: previous.inventory.nft, teslas: previous.inventory.teslas, gold: previous.inventory.gold, houses: previous.inventory.houses, twitter: previous.inventory.twitter}}})
        let lifesaver = await checkStuff(mongoclient, message.mentions.users.first().id)
            let num = lifesaver.inventory.gold;
            if (num>0){
              message.channel.send("They had a life saver, so they are still alive");
              previous = lifesaver;
              await mongoclient.db("elonbot").collection(message.guild.id)
                .updateOne({name: message.mentions.users.first().id}, { $set: {inventory:{rockets: previous.inventory.rockets, flamthrowers: previous.inventory.flamthrowers, nft: previous.inventory.nft, teslas: previous.inventory.teslas, gold: previous.inventory.gold-1, houses: previous.inventory.houses, twitter: previous.inventory.twitter}}})
              return;
            }
            await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.mentions.users.first().id}, { $set: {
          currency: {
            usd: 0,
            doge: 0,
            btc: 0,
            eth: 0,
         }
        }})
      }else{
          message.channel.send("Your flamethrower turned out to be a cheap phony that was made in China. It blew up and took you with it.")
          await mongoclient.db("elonbot").collection(message.guild.id)
                .updateOne({name: message.author.id}, { $set: {
                  currency: {
                    usd: 0,
                    doge: 0,
                    btc: 0,
                    eth: 0,
                 },
                 stocks: {
                    tesla: 0,
                    space: 0,
                    roblox: 0,
                    boring: 0,
                    gameStonks: 0,
                    elonstock: 0
                 },
                 inventory: {
                     rockets: 0,
                     flamthrowers: 0,
                     nft: 0,
                     teslas: 0,
                     gold: 0,
                     houses: 0,
                     twitter: 0
                 }
                }})
        }
      }else return message.channel.send("Ok, aborted!")
    }
  }    else return message.channel.send("Spams not cool. Especailly when you want to kill people. You still have to wait: "+ Math.round((cooldowns[message.author.id].flame-Date.now())/1000) +" seconds before you can use this command again")
    }
    function selOption(){
      return new Promise(resolve => {
        message.channel.awaitMessages(m => m.author.id === message.author.id,
        {max: 1, time: 30000}).then(collected => {
          resolve(collected.first().content);
        }).catch(() => {
        message.channel.send('No answer after 30 seconds, operation canceled.');
        });
      });
    } 
  }
  if (message.content.toLowerCase().startsWith(prefix+"uber")){
    if (cooldowns[message.author.id].uber === undefined) cooldown[message.author.id].uber = 0;
    if (cooldowns[message.author.id].uber < Date.now()){
      delete cooldowns[message.author.id].uber;
      let previousUser = await checkStuff(mongoclient, message.author.id)
      if (previousUser.inventory.teslas === 0){ cooldowns[message.author.id].uber = 0; return message.channel.send("You don't even have a freakin car to drive you idiot.")}
      var minute = 60000;
      var hour = minute * 24;
      //Set cooldown
      cooldowns[message.author.id].uber = Date.now() + 60000; //Set a 60 hour cooldown
      let x = Math.floor(Math.random() * 500);
      let elon = await checkStuff(mongoclient,message.author.id)
      if (elon.hobby === "elon"){
        message.channel.send("since your elon's child, you get an extra 200 doge!")
        await mongoclient.db("elonbot").collection(message.guild.id)
          .updateOne({name: message.author.id}, { $set: {currency:{doge: (elon.currency.doge+200), usd: elon.currency.usd, btc: elon.currency.btc, eth: elon.currency.eth}}})
      }
      if (x<5){
        message.channel.send("Your tesla broke down and blew up! Luckly you escaped just in time to survive.");
        let previous = await checkStuff(mongoclient, message.author.id)
        await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.author.id}, { $set: {inventory:{rockets: previous.inventory.rockets, flamthrowers: previous.inventory.flamthrowers, nft: previous.inventory.nft, teslas: previous.inventory.teslas-1, gold: previous.inventory.gold, houses: previous.inventory.houses, twitter: previous.inventory.twitter}}})
      }else{
        let previous = await checkStuff(mongoclient, message.author.id)
              await mongoclient.db("elonbot").collection(message.guild.id)
                .updateOne({name: message.author.id}, { $set: {currency:{doge: (previous.currency.doge+x), usd: previous.currency.usd, btc: previous.currency.btc, eth: previous.currency.eth}}})
        message.channel.send("You earned "+x+" doge");
        
      }
      
    }
    else return message.channel.send("Spams not cool. Especailly when dealing with money. You still have to wait: "+ Math.round((cooldowns[message.author.id].uber-Date.now())/1000) +" seconds before you can use this command again")
  }
  if (message.content.toLowerCase().startsWith(prefix+"rent")){
    if (cooldowns[message.author.id].rent === undefined) cooldown[message.author.id].rent = 0;
    if (cooldowns[message.author.id].rent < Date.now()){
      delete cooldowns[message.author.id].rent;
      let previousUser = await checkStuff(mongoclient, message.author.id)
      if (previousUser.inventory.houses === 0){ cooldowns[message.author.id].rent = 0; return message.channel.send("Ur currently homeless, so worry about getting a house first");}
      var minute = 60000;
      var hour = minute * 24;
      //Set cooldown
      console.log("a;lsdkjf;alsdf;lasjdf")

      cooldowns[message.author.id].rent = Date.now() + 60000; //Set a 60 hour cooldown
      let x = Math.floor(Math.random() * 500);
      let elon = await checkStuff(mongoclient,message.author.id)
      if (elon.hobby === "elon"){
        message.channel.send("since your elon's child, you get an extra 200 doge!")
        await mongoclient.db("elonbot").collection(message.guild.id)
          .updateOne({name: message.author.id}, { $set: {currency:{doge: (elon.currency.doge+200), usd: elon.currency.usd, btc: elon.currency.btc, eth: elon.currency.eth}}})
      }
      if (x<5){
        message.channel.send("The weirdo that you rented your house to turned out to be Florida Man, and he let 1000 aligators rampage through your house, and then burned your house down to get rid of the. TLDR your house is gone");
        let previous = await checkStuff(mongoclient, message.author.id)
        await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.author.id}, { $set: {inventory:{rockets: previous.inventory.rockets, flamthrowers: previous.inventory.flamthrowers, nft: previous.inventory.nft, teslas: previous.inventory.teslas, gold: previous.inventory.gold, houses: previous.inventory.houses-1, twitter: previous.inventory.twitter}}})
      }else{
        let previous = await checkStuff(mongoclient, message.author.id)
              await mongoclient.db("elonbot").collection(message.guild.id)
                .updateOne({name: message.author.id}, { $set: {currency:{doge: (previous.currency.doge+x), usd: previous.currency.usd, btc: previous.currency.btc, eth: previous.currency.eth}}})
        message.channel.send("You earned "+x+" doge");
        
      }
      
    }
    else return message.channel.send("Spams not cool. Especailly when dealing with money. You still have to wait: "+ Math.round((cooldowns[message.author.id].rent-Date.now())/1000) +" seconds before you can use this command again")
  }
  if (message.content.toLowerCase().startsWith(prefix+"coin")){
    getCoin();
    async function getCoin(){
    let coin = message.content.toLowerCase().slice(5+prefixlength);
    if (coin.includes(" ")){
      message.channel.send("that is an invalid coin");
      return;
    }
    let data = await CoinGeckoClient.coins.fetch(coin);
    if (!data.data.image){
      message.channel.send("Could not find coin with the given name");
      return;
    }
  ///////////////////////////////////////////////
  let random = new Discord.MessageEmbed()
    .setTitle(data.data.name)
    .setThumbnail(data.data.image.large)
    .setColor('#18492a')
    .addFields(
      { name: 'current price', value: "$"+data.data.market_data.current_price.usd+" usd", inline: true },
      { name: '24h low', value: "$"+data.data.market_data.low_24h.usd+ "usd", inline: true },
      { name: '24h high', value: "$"+data.data.market_data.high_24h.usd+" usd", inline: true },
      { name: "7d price change", value: data.data.market_data.price_change_percentage_24h+"%", inline: true },
      { name: "14d price change", value: data.data.market_data.price_change_percentage_7d+"%", inline: true },
      { name: "30d price change", value: data.data.market_data.price_change_percentage_30d+"%", inline: true },
      { name: "60d price change", value: data.data.market_data.price_change_percentage_60d+"%", inline: true },
      { name: "200d price change", value: data.data.market_data.price_change_percentage_200d+"%", inline: true },
      { name: "1y price change", value: data.data.market_data.price_change_percentage_1y+"%", inline: true },
      { name: "market cap", value: "$"+data.data.market_data.market_cap.usd+" usd", inline: true},
      { name: 'market cap rank', value: "#"+data.data.market_cap_rank, inline: true },
  )
    message.channel.send(random);
  }
  }
  if (message.content.toLowerCase() === prefix + "hobby" || message.content.toLowerCase() === prefix + "hobbies" || message.content.toLowerCase() === prefix + "hobby list" || message.content.toLowerCase() === prefix + "hobbies list") {

    let embed = new Discord.MessageEmbed()
      .setColor('#9098a6')
      .setTitle("Hobbies").addFields(
        { name: ':briefcase: Lawyer - 50%', value: 'Helps you sue people' },
        { name: ':computer: Hacker - 33%', value: 'Gives you more money from laundering' },
        { name: "<:elon:825390986984161330> Elon's Child - 1%", value: 'Gives you 200 Dogecoins for every transaction' }, 
         { name: "Additional Info", value: '-Each % is the chance of you getting the hobby when you choose it'  +'\n'+ '-Find out more about the hobbies using ``el help [HOBBY NAME]``'},            )
    message.channel.send(embed);
  }
  if (message.content.toLowerCase().startsWith(prefix+"get hob")){
    if (cooldowns[message.author.id].hobby === undefined) cooldown[message.author.id].hobby = 0;
    if (cooldowns[message.author.id].hobby < Date.now()){
      //let userid = message.mentions.users.first().id;
      delete cooldowns[message.author.id].hobby;
       
      var minute = 60000;
      //Set cooldown
      cooldowns[message.author.id].hobby = Date.now() + 180000; //Set a 60 sec cooldown

      let embed = new Discord.MessageEmbed()
            .setColor('#9098a6')
            .setTitle("Hobbies").addFields(
              { name: ':briefcase: 1. Lawyer - 50%', value: 'Helps you sue people' },
              { name: ':computer: 2. Hacker - 33%', value: 'Gives you more money from laundering' },
              { name: "<:elon:825390986984161330> 3. Elon's Child - 1%", value: 'Gives you 200 Dogecoins for every transaction' },
              { name: "Additional Info", value: '-Each % is the chance of you getting the hobby when you choose it \n' + '-Get a hobby using ``el get hobby``' +'\n' + '-Find out more about the hobbies using ``el help [HOBBY NAME]``' })
          message.channel.send(embed);

  let response = await selOption();
  if (response.toLowerCase().includes("can")) return message.channel.send("Ok, canceled!")
  if (Number(response).toString().toLowerCase() === "nan") return message.channel.send("That wasn't a valid option!")
  if (Number(response)>3||Number(response)<1) return message.channel.send("That wasn't a valid option!")
  
  if (Number(response) === 1){
    message.channel.send("Rolling the virtual die...");
    let x = Math.floor(Math.random() * 1001);
    if (x>501){
      message.channel.send("uh oh! You lost your current hobby (if you had one) And didn't get the new hobby.");
      await updateDocumentSet(mongoclient, message.author.id, {hobby: "none"});
      return;
    }else{
      message.channel.send("Nice! You got the new hobby, but the previous hobby you had disappeared.")
      await updateDocumentSet(mongoclient, message.author.id, {hobby: "lawyer"})
    }
  }else if (Number(response) === 2){
    message.channel.send("Rolling the virtual die...");
    let x = Math.floor(Math.random() * 1001);
    if (x>666){
      message.channel.send("uh oh! You lost your current hobby (if you had one) And didn't get the new hobby.");
      await updateDocumentSet(mongoclient, message.author.id, {hobby: "none"});
      return;
    }else{
      message.channel.send("Nice! You got the new hobby, but the previous hobby you had disappeared.")
      await updateDocumentSet(mongoclient, message.author.id, {hobby: "hacker"})
    }
  }else if (Number(response) === 3){
    message.channel.send("Rolling the virtual die...");
    let x = Math.floor(Math.random() * 1001);
    if (x>10){
      message.channel.send("uh oh! You lost your current hobby (if you had one) And didn't get the new hobby.");
      await updateDocumentSet(mongoclient, message.author.id, {hobby: "none"});
      return;
    }else{
      message.channel.send("Nice! You got the new hobby, but the previous hobby you had disappeared.")
      await updateDocumentSet(mongoclient, message.author.id, {hobby: "elon"})
    }
  
  }
}else return message.channel.send("To get a new hobby, you have to wait: "+ Math.round((cooldowns[message.author.id].hobby-Date.now())/60000) +" minutes before you can use this command again")
  function selOption(){
    return new Promise(resolve => {
      message.channel.awaitMessages(m => m.author.id === message.author.id,
      {max: 1, time: 30000}).then(collected => {
        resolve(collected.first().content);
      }).catch(() => {
      message.channel.send('No answer after 30 seconds, operation canceled.');
      });
    });
  }
  }
  if (message.content.toLowerCase().includes(prefix+"gift")||message.content.toLowerCase().includes(prefix+"give")){
   if (!message.mentions.users.first()) return message.channel.send("You have to mention someone to give your stuff to!")
   var p = message.content.toLowerCase().indexOf(">");
    var str1 = message.content.toLowerCase().slice(p)
    let thenum11 = str1.match(/\d+/);
   if (thenum11 === null){
    cooldowns[message.author.id].trade = 0;
    return message.channel.send("I didn't detect a number in there! The correct syntax is: `el give **@someone** **thing** **amount**`")

  }
    var things = "none";
    var catagory = "none"
    if (message.content.toLowerCase().includes("doge")){ things = "doge"; catagory = "currency";}
    else if (message.content.toLowerCase().includes("usd")){ things = "usd"; catagory = "currency";}
    else if (message.content.toLowerCase().includes("btc")||message.content.toLowerCase().includes("bitcoin")){ things = "btc"; catagory = "currency";}
    else if (message.content.toLowerCase().includes("flame")){ things = "flamthrowers"; catagory = "inventory";}
    else if (message.content.toLowerCase().includes("eth")){ things = "eth"; catagory = "currency";}
    //
    else if (message.content.toLowerCase().includes("tesla")){ things = "tesla"; catagory = "stocks";}
    else if (message.content.toLowerCase().includes("space")){ things = "space"; catagory = "stocks";}
    else if (message.content.toLowerCase().includes("roblox")){ things = "roblox"; catagory = "stocks";}
    else if (message.content.toLowerCase().includes("bor")){ things = "boring"; catagory = "stocks";}
    else if (message.content.toLowerCase().includes("game")||message.content.toLowerCase().includes("gme")){ things = "gameStonks"; catagory = "stocks";}
    else if (message.content.toLowerCase().includes("elon")){ things = "elonstock"; catagory = "stocks";}
    //
    else if (message.content.toLowerCase().includes("rocket")||message.content.toLowerCase().includes("falcon")){ things = "rockets"; catagory = "inventory";}
    else if (message.content.toLowerCase().includes("tesla")||message.content.toLowerCase().includes("car")){ things = "teslas"; catagory = "inventory";}
    else if (message.content.toLowerCase().includes("gold")){ things = "gold"; catagory = "inventory";}
    else if (message.content.toLowerCase().includes("house")){ things = "houses"; catagory = "inventory";}
    else if (message.content.toLowerCase().includes("twit")){ things = "twitter"; catagory = "inventory";}
    else return message.channel.send("You didn't specify a valid thing to give!")
    //
    // create a "no number" message here
    var n = message.content.toLowerCase().indexOf(">");
    var str = message.content.toLowerCase().slice(n)
    thenum = str.match(/\d+/)[0];
    if (Number(thenum)<1) return message.channel.send("You have to give a person a number of items greater than 0, you idiot")
    thenum = Number(thenum)
    let currentUser = await checkStuff(mongoclient, message.author.id);
    let targetUser = await checkStuff(mongoclient, message.mentions.users.first().id)

    if (currentUser[catagory][things] < thenum) return message.channel.send("You don't have that many things to send!");

    if (things === "doge"){
        await mongoclient.db("elonbot").collection(message.guild.id)
            .updateOne({name: message.author.id}, { $set: {currency:{doge: (currentUser.currency.doge-thenum), usd: currentUser.currency.usd, btc: currentUser.currency.btc, eth: currentUser.currency.eth}}})
        await mongoclient.db("elonbot").collection(message.guild.id)
           .updateOne({name: message.mentions.users.first().id}, { $set: {currency:{doge: (targetUser.currency.doge+thenum), usd: targetUser.currency.usd, btc: targetUser.currency.btc, eth: targetUser.currency.eth}}})
    }else if (things === "usd"){
      await mongoclient.db("elonbot").collection(message.guild.id)
          .updateOne({name: message.author.id}, { $set: {currency:{doge: (currentUser.currency.doge), usd: currentUser.currency.usd-thenum, btc: currentUser.currency.btc, eth: currentUser.currency.eth}}})
      await mongoclient.db("elonbot").collection(message.guild.id)
         .updateOne({name: message.mentions.users.first().id}, { $set: {currency:{doge: (targetUser.currency.doge), usd: targetUser.currency.usd+thenum, btc: targetUser.currency.btc, eth: targetUser.currency.eth}}})
  }else if (things === "btc"){
    await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.author.id}, { $set: {currency:{doge: (currentUser.currency.doge), usd: currentUser.currency.usd, btc: currentUser.currency.btc-thenum, eth: currentUser.currency.eth}}})
    await mongoclient.db("elonbot").collection(message.guild.id)
       .updateOne({name: message.mentions.users.first().id}, { $set: {currency:{doge: (targetUser.currency.doge), usd: targetUser.currency.usd, btc: targetUser.currency.btc+thenum, eth: targetUser.currency.eth}}})
}else if (things === "eth"){
  await mongoclient.db("elonbot").collection(message.guild.id)
      .updateOne({name: message.author.id}, { $set: {currency:{doge: (currentUser.currency.doge), usd: currentUser.currency.usd, btc: currentUser.currency.btc, eth: currentUser.currency.eth-thenum}}})
  await mongoclient.db("elonbot").collection(message.guild.id)
     .updateOne({name: message.mentions.users.first().id}, { $set: {currency:{doge: (targetUser.currency.doge), usd: targetUser.currency.usd, btc: targetUser.currency.btc, eth: targetUser.currency.eth+thenum}}})
}
/// 
else if (things === "rockets"){
  await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.author.id}, { $set: {inventory:{rockets: currentUser.inventory.rockets-thenum, flamthrowers: currentUser.inventory.flamthrowers, nft: currentUser.inventory.nft, teslas: currentUser.inventory.teslas, gold: currentUser.inventory.gold, houses: currentUser.inventory.houses, twitter: currentUser.inventory.twitter}}})
  await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.mentions.users.first().id}, { $set: {inventory:{rockets: targetUser.inventory.rockets+thenum, flamthrowers: targetUser.inventory.flamthrowers, nft: targetUser.inventory.nft, teslas: targetUser.inventory.teslas, gold: targetUser.inventory.gold, houses: targetUser.inventory.houses, twitter: targetUser.inventory.twitter}}})
}else if (things === "flamthrowers"){
  await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.author.id}, { $set: {inventory:{rockets: currentUser.inventory.rockets, flamthrowers: currentUser.inventory.flamthrowers-thenum, nft: currentUser.inventory.nft, teslas: currentUser.inventory.teslas, gold: currentUser.inventory.gold, houses: currentUser.inventory.houses, twitter: currentUser.inventory.twitter}}})
  await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.mentions.users.first().id}, { $set: {inventory:{rockets: targetUser.inventory.rockets, flamthrowers: targetUser.inventory.flamthrowers+thenum, nft: targetUser.inventory.nft, teslas: targetUser.inventory.teslas, gold: targetUser.inventory.gold, houses: targetUser.inventory.houses, twitter: targetUser.inventory.twitter}}})
}else if (things === "teslas"){
  await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.author.id}, { $set: {inventory:{rockets: currentUser.inventory.rockets, flamthrowers: currentUser.inventory.flamthrowers, nft: currentUser.inventory.nft-thenum, teslas: currentUser.inventory.teslas, gold: currentUser.inventory.gold, houses: currentUser.inventory.houses, twitter: currentUser.inventory.twitter}}})
  await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.mentions.users.first().id}, { $set: {inventory:{rockets: targetUser.inventory.rockets, flamthrowers: targetUser.inventory.flamthrowers, nft: targetUser.inventory.nft+thenum, teslas: targetUser.inventory.teslas, gold: targetUser.inventory.gold, houses: targetUser.inventory.houses, twitter: targetUser.inventory.twitter}}})
}else if (things === "teslas"){
  await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.author.id}, { $set: {inventory:{rockets: currentUser.inventory.rockets, flamthrowers: currentUser.inventory.flamthrowers, nft: currentUser.inventory.nft, teslas: currentUser.inventory.teslas-thenum, gold: currentUser.inventory.gold, houses: currentUser.inventory.houses, twitter: currentUser.inventory.twitter}}})
  await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.mentions.users.first().id}, { $set: {inventory:{rockets: targetUser.inventory.rockets, flamthrowers: targetUser.inventory.flamthrowers, nft: targetUser.inventory.nft, teslas: targetUser.inventory.teslas+thenum, gold: targetUser.inventory.gold, houses: targetUser.inventory.houses, twitter: targetUser.inventory.twitter}}})
}else if (things === "gold"){
  await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.author.id}, { $set: {inventory:{rockets: currentUser.inventory.rockets, flamthrowers: currentUser.inventory.flamthrowers, nft: currentUser.inventory.nft, teslas: currentUser.inventory.teslas, gold: currentUser.inventory.gold-thenum, houses: currentUser.inventory.houses, twitter: currentUser.inventory.twitter}}})
  await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.mentions.users.first().id}, { $set: {inventory:{rockets: targetUser.inventory.rockets, flamthrowers: targetUser.inventory.flamthrowers, nft: targetUser.inventory.nft, teslas: targetUser.inventory.teslas, gold: targetUser.inventory.gold+thenum, houses: targetUser.inventory.houses, twitter: targetUser.inventory.twitter}}})
}else if (things === "houses"){
  await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.author.id}, { $set: {inventory:{rockets: currentUser.inventory.rockets, flamthrowers: currentUser.inventory.flamthrowers, nft: currentUser.inventory.nft, teslas: currentUser.inventory.teslas, gold: currentUser.inventory.gold, houses: currentUser.inventory.houses-thenum, twitter: currentUser.inventory.twitter}}})
  await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.mentions.users.first().id}, { $set: {inventory:{rockets: targetUser.inventory.rockets, flamthrowers: targetUser.inventory.flamthrowers, nft: targetUser.inventory.nft, teslas: targetUser.inventory.teslas, gold: targetUser.inventory.gold, houses: targetUser.inventory.houses+thenum, twitter: targetUser.inventory.twitter}}})
}else if (things === "twitter"){
  await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.author.id}, { $set: {inventory:{rockets: currentUser.inventory.rockets, flamthrowers: currentUser.inventory.flamthrowers, nft: currentUser.inventory.nft, teslas: currentUser.inventory.teslas, gold: currentUser.inventory.gold, houses: currentUser.inventory.houses, twitter: currentUser.inventory.twitter-thenum}}})
  await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.mentions.users.first().id}, { $set: {inventory:{rockets: targetUser.inventory.rockets, flamthrowers: targetUser.inventory.flamthrowers, nft: targetUser.inventory.nft, teslas: targetUser.inventory.teslas, gold: targetUser.inventory.gold, houses: targetUser.inventory.houses, twitter: targetUser.inventory.twitter+thenum}}})
}
///
else if (things === "tesla"){
  await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.author.id}, { $set: {stocks:{tesla: currentUser.stocks.tesla-thenum, space: currentUser.stocks.space, roblox: currentUser.stocks.roblox, boring: currentUser.stocks.boring, gameStonks: currentUser.stocks.gameStonks, elonstock: currentUser.stocks.elonstock}}})
  await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.mentions.users.first().id}, { $set: {stocks:{tesla: targetUser.stocks.tesla+thenum, space: targetUser.stocks.space, roblox: targetUser.stocks.roblox, boring: targetUser.stocks.boring, gameStonks: targetUser.stocks.gameStonks, elonstock: targetUser.stocks.elonstock}}})
}else if (things === "space"){
  await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.author.id}, { $set: {stocks:{tesla: currentUser.stocks.tesla, space: currentUser.stocks.space-thenum, roblox: currentUser.stocks.roblox, boring: currentUser.stocks.boring, gameStonks: currentUser.stocks.gameStonks, elonstock: currentUser.stocks.elonstock}}})
  await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.mentions.users.first().id}, { $set: {stocks:{tesla: targetUser.stocks.tesla, space: targetUser.stocks.space+thenum, roblox: targetUser.stocks.roblox, boring: targetUser.stocks.boring, gameStonks: targetUser.stocks.gameStonks, elonstock: targetUser.stocks.elonstock}}})
}else if (things === "roblox"){
  await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.author.id}, { $set: {stocks:{tesla: currentUser.stocks.tesla, space: currentUser.stocks.space, roblox: currentUser.stocks.roblox-thenum, boring: currentUser.stocks.boring, gameStonks: currentUser.stocks.gameStonks, elonstock: currentUser.stocks.elonstock}}})
  await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.mentions.users.first().id}, { $set: {stocks:{tesla: targetUser.stocks.tesla, space: targetUser.stocks.space, roblox: targetUser.stocks.roblox+thenum, boring: targetUser.stocks.boring, gameStonks: targetUser.stocks.gameStonks, elonstock: targetUser.stocks.elonstock}}})
}else if (things === "boring"){
  await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.author.id}, { $set: {stocks:{tesla: currentUser.stocks.tesla, space: currentUser.stocks.space, roblox: currentUser.stocks.roblox, boring: currentUser.stocks.boring-thenum, gameStonks: currentUser.stocks.gameStonks, elonstock: currentUser.stocks.elonstock}}})
  await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.mentions.users.first().id}, { $set: {stocks:{tesla: targetUser.stocks.tesla, space: targetUser.stocks.space, roblox: targetUser.stocks.roblox, boring: targetUser.stocks.boring+thenum, gameStonks: targetUser.stocks.gameStonks, elonstock: targetUser.stocks.elonstock}}})
}else if (things === "gameStonks"){
  await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.author.id}, { $set: {stocks:{tesla: currentUser.stocks.tesla, space: currentUser.stocks.space, roblox: currentUser.stocks.roblox, boring: currentUser.stocks.boring, gameStonks: currentUser.stocks.gameStonks-thenum, elonstock: currentUser.stocks.elonstock}}})
  await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.mentions.users.first().id}, { $set: {stocks:{tesla: targetUser.stocks.tesla, space: targetUser.stocks.space, roblox: targetUser.stocks.roblox, boring: targetUser.stocks.boring, gameStonks: targetUser.stocks.gameStonks+thenum, elonstock: targetUser.stocks.elonstock}}})
}else if (things === "elonstock"){
  await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.author.id}, { $set: {stocks:{tesla: currentUser.stocks.tesla, space: currentUser.stocks.space, roblox: currentUser.stocks.roblox, boring: currentUser.stocks.boring, gameStonks: currentUser.stocks.gameStonks, elonstock: currentUser.stocks.elonstock-thenum}}})
  await mongoclient.db("elonbot").collection(message.guild.id)
        .updateOne({name: message.mentions.users.first().id}, { $set: {stocks:{tesla: targetUser.stocks.tesla, space: targetUser.stocks.space, roblox: targetUser.stocks.roblox, boring: targetUser.stocks.boring, gameStonks: targetUser.stocks.gameStonks, elonstock: targetUser.stocks.elonstock+thenum}}})
}
if (things === "flamthrowers") things = "flamethrower"
message.channel.send("Succesfully transfered `"+thenum+ "` `"+things+"` to user `"+ message.mentions.users.first().tag+"`")
  }












  async function updateDocumentSet(mongoclient, name, updatedlisting){
              let result = await mongoclient.db("elonbot").collection(message.guild.id)
              .updateOne({ name: name}, {$set: updatedlisting});
  }
  async function createCollection(collectionname){
      //const uri = "mongodb+srv://monkey:monkey2008@cluster0.exqqa.mongodb.net/test";
      const db = mongoclient.db("elonbot");
      db.createCollection(collectionname, function(err, result){
        console.log ("Server Created!");

      })
    }
  async function createListing(mongoclient, newWord){

        let result = await mongoclient.db("elonbot").collection(message.guild.id).insertOne(newWord);

      }
  async function signup(mongoclient){
        let userid = message.author.id;
        let collection = message.guild.id;
        const db = mongoclient.db("elonbot");
        let testresult = await db.collection(message.guild.id).find( {"name": userid}).count();

        if (testresult === 0){
          await createListing(mongoclient,
          {
            name: userid,
            tag: message.author.tag,
            currency: {
               usd: 0,
               doge: 0,
               btc: 0,
               eth: 0,
            },
            stocks: {
               tesla: 0,
               space: 0,
               roblox: 0,
               boring: 0,
               gameStonks: 0,
               elonstock: 0
            },
            inventory: {
                rockets: 0,
                flamthrowers: 0,
                nft: 0,
                teslas: 0,
                gold: 0,
                houses: 0,
                twitter: 0,
                time: 0
            },
            job: "none",
            hobby: "none"
          })

          //message.channel.send("done.");
        }
        else {
          //message.channel.send("you cannot have two acounts, sorry");
        }
      }
  async function checkStuff(mongoclient, name){
      try{
    let result = await mongoclient.db("elonbot").collection(message.guild.id)
    .findOne({name: name});
    return result;
      }catch(err){
          console.log(err)
      }
  }

  function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
  }
        } catch (e) {
          console.error(e.warn);
        } finally {
        }
      }
})

return mongoclient;
});
mongoclient.close();
