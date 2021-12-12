import { Flex } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import React from "react";
import MintCard from "../components/MintCard";
import Navbar from "../components/Navbar";
import RecentlyMinted from "../components/RecentlyMinted";

function MintPage({ fn, signer }) {
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
                <RecentlyMinted signer={signer} />
            </Flex>
        </div>
    );
}

export default MintPage;
