import React from "react";

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

const nftcollections = [
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
    {
        _id: 6,
        name: "NFT 6",
        collapsible: "wot?",
        rarity: "very rare",
        age: "20",
        token: "0.008 ETH",
    },
    {
        _id: 7,
        name: "NFT 7",
        collapsible: "wot?",
        rarity: "very rare",
        age: "20",
        token: "0.008 ETH",
    },
    {
        _id: 8,
        name: "NFT 8",
        collapsible: "wot?",
        rarity: "very rare",
        age: "20",
        token: "0.008 ETH",
    },
];

function CollectionGallery({ signer, provider }) {
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

        // console.log(BigNumber.from(result._hex));
        console.log(BigNumber.from("0x02"));

        const ethcallProvider = new Provider(provider);

        await ethcallProvider.init(); // Only required when `chainId` is not provided in the `Provider` constructor
        ethcallProvider._multicallAddress =
            "0x08411ADd0b5AA8ee47563b146743C13b3556c9Cc";
        // console.log(ethcallProvider);

        // console.log(address);

        const call1 = contract2.tokenOfOwnerByIndex(address, 0);

        const call2 = contract2.tokenURI(1);

        const data = await ethcallProvider.all([call1, call2]);

        console.log(data);
    };

    fn();

    return (
        <Flex mx={20} my={20}>
            <SimpleGrid
                columns={isLargerThanTablet ? 4 : isLargerThanMobile ? 2 : 1}
                spacing={20}
            >
                {nftcollections &&
                    nftcollections.map((nft) => (
                        <NFTCard nft={nft} key={nft._id} />
                    ))}
            </SimpleGrid>
        </Flex>
    );
}

const NFTCard = ({ nft }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <div className="card">
            <div className="card__content">
                <div className="card__front">
                    <Image
                        // h={"auto"}
                        w={"70%"}
                        ml={10}
                        src={
                            "https://harmoonies.one/images/MintButtonBackground.png"
                        }
                    />
                </div>

                <div className="card__back">
                    <p className="card__body">{nft.name}</p>
                    <p className="card__body">{nft.token}</p>
                    <p className="card__body">{nft.rarity}</p>
                    <p className="card__body">{nft.age}</p>
                </div>
            </div>
        </div>
    );
};

export default CollectionGallery;
