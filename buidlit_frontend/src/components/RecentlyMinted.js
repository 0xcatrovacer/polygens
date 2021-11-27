import { Image } from "@chakra-ui/image";
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/layout";
import React from "react";

const RecentlyMinted = ({ recent_nfts }) => {
    return (
        <Box>
            <Text fontSize="3xl" fontWeight={500} my={10}>
                RECENTLY MINTED
            </Text>
            <SimpleGrid columns={1} spacing={10}>
                {recent_nfts &&
                    recent_nfts.map((nft) => {
                        return (
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
