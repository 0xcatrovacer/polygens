import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import MintPage from "./pages/MintPage";
import Collections from "./pages/Collections";

function App() {
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
