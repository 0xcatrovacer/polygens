import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ethers } from "ethers";

import MintPage from "./pages/MintPage";
import Collections from "./pages/Collections";
import { useEffect } from "react";

function App() {
    useEffect(async () => {
        const provider = new ethers.providers.Web3Provider(
            window.ethereum,
            "any"
        );
        // Prompt user for account connections
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        console.log("Account:", await signer.getAddress());
    }, []);
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MintPage />} />
                    <Route path="collections" element={<Collections />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
