var express = require("express");
const ContractMethods = require("./src/web3/Methods");
const contractMethods = new ContractMethods();
const axios = require("axios");

var app = express();

var PORT = process.env.PORT || 4193;

app.get("/:folder/:id", async (req, res) => {
    try {
        const folder = req.params.folder;
        const id = req.params.id;
        const totalSupply = await contractMethods.totalSupply();

        if (parseInt(id) <= parseInt(totalSupply)) {
            const resp = await axios.get(
                `https://gateway.pinata.cloud/ipfs/QmetXqt6EkeTYKteRFSyvmEEyYuvjfJqtk6psMFaZGXqgF/${folder}/${id}.json`
            );
            return res.send({
                success: true,
                data: "Will appear when you convert from Images to JSON",
                // resp,
            });
        }
        return res.send({
            success: false,
            data: "Don't trait snipe plz",
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
