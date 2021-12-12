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
    const [receipt, setReceipt] = useState();

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

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MintPage signer={signer} />} />
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
