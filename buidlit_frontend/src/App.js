import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Contract, ethers } from "ethers";

import MintPage from "./pages/MintPage";
import Collections from "./pages/Collections";
import { useEffect, useState } from "react";

import abi from "./abi.json";

function App() {
    const [provider, setProvider] = useState({});
    const [signer, setSigner] = useState({});

    useEffect(async () => {
        const provider = new ethers.providers.Web3Provider(
            window.ethereum,
            "any"
        );
        setProvider(provider);
        // Prompt user for account connections
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        setSigner(signer);
        console.log("Account:", await signer.getAddress());
    }, []);

    const fn = async () => {
        const contract = new Contract(
            "0xF37d78b496e5f5a34c5811A027202bf52e45fC87",
            abi,
            signer
        );

        const result = await contract.mint(0, {
            value: ethers.utils.parseEther("0.01"),
        });

        const receipt = await result.wait();

        console.log(result, receipt);
    };

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MintPage fn={fn} />} />
                    <Route
                        path="collections"
                        element={
                            <Collections provider={provider} signer={signer} />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
