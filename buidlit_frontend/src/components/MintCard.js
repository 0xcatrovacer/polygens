import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,
    FormControl,
    FormLabel,
    Select,
} from "@chakra-ui/react";

export default function MintCard() {
    return (
        <Center py={6}>
            <Flex
                mt={20}
                maxW={"270px"}
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
                    w={"80%"}
                    mt={5}
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
                                <option>ETH</option>
                                <option>BTC</option>
                                <option>SOL</option>
                                <option>MATIC</option>
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
                    >
                        Mint
                    </Button>
                </Box>
            </Flex>
        </Center>
    );
}
