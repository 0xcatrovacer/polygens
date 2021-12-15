import { Image } from "@chakra-ui/image";
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/layout";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

import abi from "../abi.json";

const RecentlyMinted = () => {
    const [recent_nfts, setRecent] = useState([]);

    const fn = async () => {
        const provider = new ethers.providers.Web3Provider(
            window.ethereum,
            "any"
        );
        // Prompt user for account connections
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            "0x1833bF54dfB030CE9Ff925B9F0F4a4a7DC353c06",
            abi,
            signer
        );

        const result = await contract.totalSupply();

        const num = result.toNumber();

        const recents = [];

        for (let k = num; k > num - 5; k--) {
            recents.push({ url: await contract.tokenURI(k), token: k });
        }

        // console.log(recents);

        setRecent(recents);
    };

    useEffect(() => {
        fn();
    }, []);

    return (
        <Box>
            <Text
                fontSize="3xl"
                fontWeight={500}
                my={10}
                ml={5}
                color={"#8D6FD7"}
            >
                Recently Minted
            </Text>
            <SimpleGrid columns={1} spacing={10}>
                {recent_nfts &&
                    recent_nfts.map((nft) => {
                        return (
                            <Flex
                                className="recently__card"
                                my={5}
                                w={"250px"}
                                boxShadow={"2xl"}
                                rounded={"md"}
                                overflow={"hidden"}
                                direction={"column"}
                                alignItems={"center"}
                            >
                                <Image
                                    h={"auto"}
                                    w={"90%"}
                                    mt={5}
                                    src={nft.url}
                                />

                                <Text fontSize={20} my={5} color={"#8D6FD7"}>
                                    PolyGens #{nft.token}
                                </Text>
                            </Flex>
                        );
                    })}
            </SimpleGrid>
        </Box>
    );
};

export default RecentlyMinted;
