import {
    Box,
    Center,
    Image,
    Flex,
    Stack,
    Button,
    useColorModeValue,
    FormControl,
    FormLabel,
    Select,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Text,
} from "@chakra-ui/react";
import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";

import abi from "../abi.json";

export default function MintCard() {
    const [signer, setSigner] = useState({});
    const [token, setToken] = useState(0);
    const [mintedNFT, setMintedNFT] = useState("");
    const [tokenid, setTokenId] = useState(49);

    useEffect(async () => {
        const provider = new ethers.providers.Web3Provider(
            window.ethereum,
            "any"
        );
        // Prompt user for account connections
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        setSigner(signer);
    }, []);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const mintfn = async (token) => {
        const contract = new Contract(
            "0x1833bF54dfB030CE9Ff925B9F0F4a4a7DC353c06",
            abi,
            signer
        );

        const wsProvider = new ethers.providers.WebSocketProvider(
            "wss://rpc-mumbai.maticvigil.com/ws/v1/9a9736ed65423cc5678dd3653932d27facaf1e6b"
        );

        const wsSigner = await wsProvider.getSigner();

        const wsContract = new Contract(
            "0x1833bF54dfB030CE9Ff925B9F0F4a4a7DC353c06",
            abi,
            wsSigner
        );

        wsContract.on("Transfer", (from, to, tokenId) => {
            // if (to === signer.getAddress(0)) {
            console.log(tokenId);
            setTokenId(tokenId.toNumber());
            // }
            // wsContract.off("Transfer");
        });

        const result = await contract.mint(token, {
            value: ethers.utils.parseEther("0.01"),
        });

        const receipt = await result.wait();

        // console.log(result, receipt);

        console.log(tokenid);
        const nftToken = await contract.tokenURI(tokenid);
        console.log(nftToken);
        setMintedNFT(nftToken);
        console.log(mintedNFT);

        onOpen();

        // console.log(receipt.events[1].decode);
    };

    return (
        <Center p={6} mx={20}>
            <Flex
                mt={20}
                pb={5}
                maxW={"350px"}
                w={"auto"}
                bg={useColorModeValue("white", "gray.800")}
                boxShadow={"2xl"}
                rounded={"md"}
                overflow={"hidden"}
                direction={"column"}
                alignItems={"center"}
            >
                <Image
                    h={"auto"}
                    w={"70%"}
                    mt={10}
                    src={
                        "https://harmoonies.one/images/MintButtonBackground.png"
                    }
                    // objectFit={"cover"}
                />

                <Box py={6}>
                    <Stack
                        direction={"row"}
                        justify={"center"}
                        spacing={6}
                        w={200}
                    >
                        <FormControl id="token">
                            <FormLabel>Token</FormLabel>
                            <Select
                                placeholder="Select token"
                                onChange={(e) => {
                                    setToken(e.target.value);
                                }}
                            >
                                <option value={0}>BTC</option>
                                <option value={1}>DAI</option>
                                <option value={2}>ETH</option>
                                <option value={3}>MATIC</option>
                            </Select>
                        </FormControl>
                    </Stack>

                    <Button
                        className="btn btn__primary"
                        w={"full"}
                        mt={8}
                        bg={useColorModeValue("#151f21", "gray.900")}
                        color={"white"}
                        rounded={"md"}
                        _hover={{
                            transform: "translateY(-2px)",
                            boxShadow: "lg",
                        }}
                        onClick={async () => {
                            await mintfn(token);
                            // if (receipt.status === 1) {
                            // }
                        }}
                    >
                        Mint
                    </Button>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader fontSize={25}>
                                Congratulations!
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody
                                display={"flex"}
                                flexDirection={"column"}
                                alignItems={"center"}
                            >
                                <Image
                                    h={"auto"}
                                    w={"70%"}
                                    mt={10}
                                    src={mintedNFT}
                                    // objectFit={"cover"}
                                />
                                <Text fontSize={25} my={10}>
                                    You minted: Polygens #{tokenid}
                                </Text>
                            </ModalBody>

                            <ModalFooter>
                                <Button
                                    colorScheme="blue"
                                    mr={3}
                                    onClick={onClose}
                                >
                                    Close
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Box>
            </Flex>
        </Center>
    );
}
