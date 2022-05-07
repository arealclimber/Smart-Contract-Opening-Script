module.exports = Object.freeze({
    // required. wallet privateKey
    privateKey : "输入私钥",
    
    // required. Your wallet address   
    fromAddress : "输入私钥对应钱包地址".toLocaleLowerCase(),
    
    // reuiqred. Your target contract address
    toAddress: "0x121422c67f51c3Ff34a5de5B9Da39e99FF067a63".toLocaleLowerCase(),

    // required. Find out the contract creator address
    creatorAddress: "0x121422c67f51c3Ff34a5de5B9Da39e99FF067a63".toLocaleLowerCase(),

    // required. 投资金额
    price: "0.1",

    // required. 推荐钱包地址
    ref: "0x57a34Af3e29AA3339977B522414Ec473397C2B8a",             
    
    // required. How many items you wants to buy
    maxPriorityFeePerGas : "88", 
    
    // required. The collection contract address you want to buy                                                                           
    maxFeePerGas : "180",
 
    
    // required. The num you want to mint
    number: "1",

    // required. http provider from infura or alchemy. It must be ws
    wssMainnet: "wss://avax.getblock.io/mainnet/ext/bc/C/ws?api_key=d4fa678a-4845-4a46-94e6-9bd2cfb6093b",

    // required. http provider from infura or alchemy. It must be wss
    wssRinkeby: "wss://eth-rinkeby.alchemyapi.io/v2/xxxxxx",

    // required. http provider from infura or alchemy. It must be wss
    wssGoerli : "wss://eth-goerli.alchemyapi.io/v2/xxxxx",

    // optional. debug usage. The value should be "Rinkeby" for rinkeby, "Goerli" for goerli or "" for mainnet
    network : "",

    // timere script const, the start time of dutch
    time: 1644069600,
});
