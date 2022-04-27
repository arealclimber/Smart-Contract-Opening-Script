//const AlchemyWeb3 = require("@alch/alchemy-web3");
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

async function signTx(web3, fields = {}) {
  const nonce = await web3.eth.getTransactionCount(config.fromAddress, 'latest');
  console.log('nonce',nonce)
  const transaction = {
   'nonce': nonce,
   ...fields,
  };

  return await web3.eth.accounts.signTransaction(transaction, config.privateKey);
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


  console.log('Catching Dead Fish:', web3URL);


//添加重新连接选项以确保始终保持连接
var options = { 
    reconnect: { 
        auto: true, 
        delay: 1000, // ms 
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
  let extraData =  await contract.methods.withdraw();
  //-----------------------------------------------------------------
  //-----------------------------------------------------------------

  let data = extraData.encodeABI();

  // DEBUG SECTION
  //sendMinimalLondonTx(web3,data,targetContract,config.price);


var duqu = 1;
var fishNum0 = config.catchFish;

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

                    var hashValue = web3.utils.fromWei(tx.value, 'ether');
                    console.log('金额',hashValue);
                    
          					const decodedData = abiDecoder.decodeMethod(tx.input);
          					if(decodedData){
          					    console.log(decodedData);
          					    //-----------------------------------------------------------------
          					    //--------------- Change this function every time------------------
          					    if((decodedData.name == 'invest' && hashValue > fishNum0)){
          					    //-----------------------------------------------------------------
          					    //-----------------------------------------------------------------
          					      // your code
          					      console.log("BIG FISH !!!!!!!!!!!!!!!!!!!!",decodedData.name);
          					      sendMinimalLondonTx(web3,data,targetContract,config.price);
          					      console.log('================NEXT11111=====================')
          					    } else {
          					      console.log(decodedData.name);
          					      //sendMinimalLondonTx(web3,data,targetContract,config.price);
          					      console.log('================NEXT22222=====================')
          					    }
          					}




                 }
             }


             // 读取address中的余额，余额单位是wei
             //var accountBalance = web3.eth.getBalance(account);
              web3.eth.getBalance(account, (err, wei) => {
                  // 余额单位从wei转换为ether
                  balance = web3.utils.fromWei(wei, 'ether');
                  //console.log("balance: " + balance);
                  console.log('起抓金额：',fishNum0,'目前余额',balance);

                 if(balance >= fishNum0){
                    console.log('====================抓鱼了gogogogo====================');
                    //sendMinimalLondonTx(web3,data,targetContract,config.price);
                    console.log('================NEXT11111=====================')
                 }else{
                    console.log('xxxxxxxxx鱼不够xxxxxxxxx');
                 }
              });

              




         } catch (err) {
             console.log("丢包了～～～～～～～～～～～");
         }
    })
});









};

pendingTrasactions();

