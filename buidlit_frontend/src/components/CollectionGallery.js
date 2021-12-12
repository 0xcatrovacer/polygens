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

function CollectionGallery() {
    const [nftcollections, setnftcollections] = useState([]);

    const [isLargerThanTablet] = useMediaQuery("(min-width: 940px)");
    const [isLargerThanMobile] = useMediaQuery("(min-width: 540px)");

    const fn = async () => {
        const provider = new ethers.providers.Web3Provider(
            window.ethereum,
            "any"
        );
        // Prompt user for account connections
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
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
        <div>
            <Image
                // h={"auto"}
                w={"100%"}
                ml={10}
                src={nft}
            />
        </div>
    );
};

export default CollectionGallery;
