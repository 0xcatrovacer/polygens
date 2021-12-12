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
import { useNavigate } from "react-router-dom";

export default function MintCard({ fn }) {
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
                                <option value={0}>BTC</option>
                                <option value={1}>DAI</option>
                                <option value={2}>ETH</option>
                                <option value={3}>MATIC</option>
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
                            await fn();
                            navigate("/collections");
                        }}
                    >
                        Mint
                    </Button>
                </Box>
            </Flex>
        </Center>
    );
}
