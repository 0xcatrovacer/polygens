import { Button } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Image } from "@chakra-ui/image";
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import React from "react";

import "./RecentlyMinted.css";

const RecentlyMinted = ({ recent_nfts }) => {
    const [isLargerThanMobile] = useMediaQuery("(min-width: 540px)");

    return (
        <Box>
            <Text fontSize="3xl" fontWeight={500} my={10}>
                RECENTLY MINTED
            </Text>
            <SimpleGrid columns={1} spacing={10}>
                {recent_nfts &&
                    recent_nfts.map((nft) => {
                        return (
                            // <div className="recentcard" key={nft._id}>
                            //     <div className="recentcard__content">
                            //         <div className="recentcard__front">
                            //             <Image
                            //                 // h={"auto"}
                            //                 w={"70%"}
                            //                 ml={10}
                            //                 src={
                            //                     "https://harmoonies.one/images/MintButtonBackground.png"
                            //                 }
                            //             />
                            //         </div>

                            //         <div className="recentcard__back">
                            //             <p className="recentcard__body">
                            //                 {nft.name}
                            //             </p>
                            //             <p className="recentcard__body">
                            //                 {nft.token}
                            //             </p>
                            //             <p className="recentcard__body">
                            //                 {nft.rarity}
                            //             </p>
                            //             <p className="recentcard__body">
                            //                 {nft.age}
                            //             </p>
                            //         </div>
                            //     </div>
                            // </div>

                            <Flex
                                key={nft._id}
                                my={5}
                                w={"300px"}
                                boxShadow={"2xl"}
                                rounded={"md"}
                                overflow={"hidden"}
                                direction={"column"}
                                alignItems={"center"}
                            >
                                <Image
                                    h={"auto"}
                                    w={"50%"}
                                    mt={5}
                                    src={
                                        "https://harmoonies.one/images/MintButtonBackground.png"
                                    }
                                />
                                <Text my={10} fontSize={20}>
                                    Text Space
                                </Text>
                            </Flex>
                        );
                    })}
            </SimpleGrid>
        </Box>
    );
};

export default RecentlyMinted;
