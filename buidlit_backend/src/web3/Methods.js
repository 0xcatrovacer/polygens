const Contract = require("./Contract");
const Provider = require("./Provider");
const provider = new Provider();
const contract = new Contract();
const instance = contract.initContract();
class Methods {
    async totalSupply() {
        const txn = await instance.methods.totalSupply();
        const r = await txn.call();
        return r;
    }
}
module.exports = Methods;
