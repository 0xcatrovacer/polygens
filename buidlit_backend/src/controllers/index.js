var express = require("express");
const ContractMethods = require("./src/web3/Methods");
const contractMethods = new ContractMethods();
const axios = require("axios");

var app = express();

var PORT = 4193;

app.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const totalSupply = await contractMethods.totalSupply();

        if (parseInt(id) <= parseInt(totalSupply)) {
            const resp = await axios.get(
                `https://gateway.pinata.cloud/ipfs/QmbBaacQJBy18r13qU3V4yweJ9qTGpMPWrW9BxYeLQWYbd/${id}.png`
            );
            return res.send({
                success: true,
                data: "Will appear when you convert from Images to JSON",
            });
        }
        return res.send({
            success: false,
            data: "Trait Sniping is not allowed",
        });
    } catch (e) {
        return res.send({
            success: false,
            data: "some error",
            e,
        });
    }
});

app.listen(PORT, function () {
    console.log("Server is running on PORT:", PORT);
});
