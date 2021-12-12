import React, { useEffect, useState } from "react";

import "./CollectionGallery.css";

import {
    Box,
    Image,
    Flex,
    useColorModeValue,
    Text,
    Button,
    SimpleGrid,
    useMediaQuery,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import { ethers, BigNumber } from "ethers";
import { Contract, Provider } from "ethers-multicall";

import abi from "../abi.json";

// const nftcollections = [
//     {
//         _id: 1,
//         name: "NFT 1",
//         collapsible: "wot?",
//         rarity: "very rare",
//         age: "20",
//         token: "0.008 ETH",
//     },
//     {
//         _id: 2,
//         name: "NFT 2",
//         collapsible: "wot?",
//         rarity: "very rare",
//         age: "20",
//         token: "0.008 ETH",
//     },
//     {
//         _id: 3,
//         name: "NFT 3",
//         collapsible: "wot?",
//         rarity: "very rare",
//         age: "20",
//         token: "0.008 ETH",
//     },
//     {
//         _id: 4,
//         name: "NFT 4",
//         collapsible: "wot?",
//         rarity: "very rare",
//         age: "20",
//         token: "0.008 ETH",
//     },
//     {
//         _id: 5,
//         name: "NFT 5",
//         collapsible: "wot?",
//         rarity: "very rare",
//         age: "20",
//         token: "0.008 ETH",
//     },
//     {
//         _id: 6,
//         name: "NFT 6",
//         collapsible: "wot?",
//         rarity: "very rare",
//         age: "20",
//         token: "0.008 ETH",
//     },
//     {
//         _id: 7,
//         name: "NFT 7",
//         collapsible: "wot?",
//         rarity: "very rare",
//         age: "20",
//         token: "0.008 ETH",
//     },
//     {
//         _id: 8,
//         name: "NFT 8",
//         collapsible: "wot?",
//         rarity: "very rare",
//         age: "20",
//         token: "0.008 ETH",
//     },
// ];

function CollectionGallery({ signer, provider }) {
    const [nftcollections, setnftcollections] = useState();

    const [isLargerThanTablet] = useMediaQuery("(min-width: 940px)");
    const [isLargerThanMobile] = useMediaQuery("(min-width: 540px)");

    const fn = async () => {
        const contract = new ethers.Contract(
            "0xF37d78b496e5f5a34c5811A027202bf52e45fC87",
            abi,
            signer
        );

        const contract2 = new Contract(
            "0xF37d78b496e5f5a34c5811A027202bf52e45fC87",
            abi
        );

        const address = await signer.getAddress(0);

        const result = await contract.balanceOf(address);

        const num = result.toNumber();

        // console.log(num);

        const ethcallProvider = new Provider(provider);

        await ethcallProvider.init(); // Only required when `chainId` is not provided in the `Provider` constructor
        ethcallProvider._multicallAddress =
            "0x08411ADd0b5AA8ee47563b146743C13b3556c9Cc";
        // console.log(ethcallProvider);

        // console.log(address);

        const calls = [];

        const newData = [];

        for (let i = 0; i < num; i++) {
            calls.push(contract2.tokenOfOwnerByIndex(address, i));
        }

        // console.log(calls);

        // const call1 = contract2.tokenOfOwnerByIndex(address, 0);

        const data = await ethcallProvider.all(calls);

        const call2 = contract2.tokenURI([calls]);

        // console.log(data);

        data.map((data) => {
            newData.push(contract2.tokenURI(data));
        });

        // console.log(newData);

        const finalData = await ethcallProvider.all(newData);

        setnftcollections(finalData);
    };

    fn();

    return (
        <Flex mx={20} my={20}>
            <SimpleGrid
                columns={isLargerThanTablet ? 4 : isLargerThanMobile ? 2 : 1}
                spacing={20}
            >
                {nftcollections &&
                    nftcollections.map((nft) => <NFTCard nft={nft} />)}
            </SimpleGrid>
        </Flex>
    );
}

const NFTCard = ({ nft }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Image
            // h={"auto"}
            w={"70%"}
            ml={10}
            src={nft}
        />
    );
};

export default CollectionGallery;
