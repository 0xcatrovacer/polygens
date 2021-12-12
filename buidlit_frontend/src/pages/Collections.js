import React from "react";
import Navbar from "../components/Navbar";
import CollectionGallery from "../components/CollectionGallery";

function Collections({ provider, signer }) {
    return (
        <div>
            <Navbar />
            <CollectionGallery provider={provider} signer={signer} />
        </div>
    );
}

export default Collections;
