import { Flex } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import React from "react";
import MintCard from "../components/MintCard";
import Navbar from "../components/Navbar";
import RecentlyMinted from "../components/RecentlyMinted";

const recent_nfts = [
    {
        _id: 1,
        name: "NFT 1",
        collapsible: "wot?",
        rarity: "very rare",
        age: "20",
        token: "0.008 ETH",
    },
    {
        _id: 2,
        name: "NFT 2",
        collapsible: "wot?",
        rarity: "very rare",
        age: "20",
        token: "0.008 ETH",
    },
    {
        _id: 3,
        name: "NFT 3",
        collapsible: "wot?",
        rarity: "very rare",
        age: "20",
        token: "0.008 ETH",
    },
    {
        _id: 4,
        name: "NFT 4",
        collapsible: "wot?",
        rarity: "very rare",
        age: "20",
        token: "0.008 ETH",
    },
    {
        _id: 5,
        name: "NFT 5",
        collapsible: "wot?",
        rarity: "very rare",
        age: "20",
        token: "0.008 ETH",
    },
];

function MintPage({ fn }) {
    const [isLargerThanTablet] = useMediaQuery("(min-width: 940px)");

    return (
        <div>
            <Navbar />
            <Flex
                justifyContent="space-around"
                alignItems={isLargerThanTablet ? "start" : "center"}
                flexDirection={isLargerThanTablet ? "row" : "column"}
            >
                <MintCard fn={fn} />
                <RecentlyMinted recent_nfts={recent_nfts} />
            </Flex>
        </div>
    );
}

export default MintPage;
