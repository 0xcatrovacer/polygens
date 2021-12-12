var express = require("express");
const ContractMethods = require("./src/web3/Methods");
const contractMethods = new ContractMethods();
const axios = require("axios");
const http = require("http");
const got = require("got");

var app = express();

var PORT = process.env.PORT || 4193;

app.get("/:folder/:id", async (req, res) => {
    try {
        const folder = req.params.folder;
        const id = req.params.id;

        const totalSupply = await contractMethods.totalSupply();

        if (parseInt(id) <= parseInt(totalSupply)) {
            got.stream(
                `https://gateway.pinata.cloud/ipfs/QmetXqt6EkeTYKteRFSyvmEEyYuvjfJqtk6psMFaZGXqgF/${folder}/${id}.png`
            ).pipe(res);
        } else {
            return res.send({
                success: false,
                data: "Trait Sniping Not Allowed",
            });
        }
    } catch (e) {
        console.log(e);
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
