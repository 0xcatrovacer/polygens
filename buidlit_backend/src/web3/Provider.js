const Web3 = require("web3");
class Provider {
    constructor() {
        //setup web3 provider
        this.web3 = new Web3(
            new Web3.providers.HttpProvider("https://api.s0.b.hmny.io")
        );
    }
}
module.exports = Provider;
