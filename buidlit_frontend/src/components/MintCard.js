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
} from "@chakra-ui/react";
import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";

import abi from "../abi.json";

import { useNavigate } from "react-router-dom";

export default function MintCard() {
    const [signer, setSigner] = useState({});
    const [token, setToken] = useState(0);

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

    const mintfn = async (token) => {
        const contract = new Contract(
            "0xF37d78b496e5f5a34c5811A027202bf52e45fC87",
            abi,
            signer
        );

        const result = await contract.mint(token, {
            value: ethers.utils.parseEther("0.01"),
        });

        const receipt = await result.wait();

        console.log(result, receipt);
    };

    const navigate = useNavigate();
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
                            <Select placeholder="Select token">
                                <option
                                    value={0}
                                    onSelect={() => {
                                        setToken(0);
                                    }}
                                >
                                    BTC
                                </option>
                                <option
                                    value={1}
                                    onSelect={() => {
                                        setToken(1);
                                    }}
                                >
                                    DAI
                                </option>
                                <option
                                    value={2}
                                    onSelect={() => {
                                        setToken(2);
                                    }}
                                >
                                    ETH
                                </option>
                                <option
                                    value={3}
                                    onSelect={() => {
                                        setToken(3);
                                    }}
                                >
                                    MATIC
                                </option>
                            </Select>
                        </FormControl>
                    </Stack>

                    <Button
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
                            navigate("/collections");
                            // }
                        }}
                    >
                        Mint
                    </Button>
                </Box>
            </Flex>
        </Center>
    );
}
