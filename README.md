## 智能合约抢开盘脚本

这个脚本以抢这个项目的开盘为例 https://fyrise.io/ 

### 脚本逻辑

1、监听这个项目的智能合约开盘Funtion

2、在合约管理员提交 seedMarket 交易，一旦获取到pending状态的这个交易，立即发送自己的 buyBlocks 交易

### 脚本设置：

总共需要修改3个文件，abi.json 、 config.js 和 public.js

1、从区块链浏览器找到智能合约的abi，复制粘贴到abi.json即可

2、config.js按中文备注修改即可，把中文换成相应的内容

	privateKey : "输入私钥",

	fromAddress : "输入私钥对应钱包地址".toLocaleLowerCase(),

	toAddress: "智能合约地址".toLocaleLowerCase(),

    本案例没用到
    creatorAddress: "合约管理员地址".toLocaleLowerCase(),

    可以输入小数点比如 0.8
    price: "需要投资的金额",

    ref: "推荐钱包地址",  

    maxFeePerGas : "gas费",

    建议自己申请一个单独使用的节点，申请地址：https://getblock.io/
    wssMainnet: "wss高速节点",

3、public.js

	163行：buyBlocks修改为合约对应的函数，包括config.ref
	let extraData =  await contract.methods.buyBlocks(config.ref);

	206行：判断有pending状态的交易方法为seedMarket时，触发交易
	if(decodedData.name == 'seedMarket'){

	213～227行：增加了判断合约余额是否大于0，以免节点接口数据没获取到，耽误进场
	不需要可删除

4、设置完成后，从终端（windows是打开CMD）进入脚本目录

输入 node public.js

即可运行。

如果windows用户没安装过nodejs，需要先在官网下载安装，新手建议下载 .msi 版本
https://nodejs.org/en/download/


需要交流哪个免费节点好用可以联系我

有什么好项目也可以推荐我哈


咨询、交流、定制脚本 联系电报Telegram： @bigg518

https://t.me/bigg518

声明：自用脚本，如需使用，风险自负。
