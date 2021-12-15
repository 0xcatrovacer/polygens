import { ReactNode } from "react";
import {
    Box,
    Flex,
    Button,
    Link,
    useColorModeValue,
    Stack,
    useColorMode,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const NavLink = ({ children }: { children: ReactNode }) => (
    <Link
        px={2}
        py={1}
        rounded={"md"}
        _hover={{
            textDecoration: "none",
            bg: useColorModeValue("gray.200", "gray.700"),
        }}
        href={"#"}
    >
        {children}
    </Link>
);

export default function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <>
            <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
                <Flex
                    h={20}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <Box fontSize={25} ml={4} color={"#F4CF7D"}>
                        PolyGens
                    </Box>
                    <Flex width={180} justifyContent={"space-between"}>
                        <Box fontSize={20}>
                            <RouterLink to="/">Mint</RouterLink>
                        </Box>
                        <Box fontSize={20}>
                            <RouterLink to="/collections">
                                Collections
                            </RouterLink>
                        </Box>
                    </Flex>

                    <Flex alignItems={"center"}>
                        <Stack direction={"row"} spacing={7}>
                            <Button onClick={toggleColorMode}>
                                {colorMode === "light" ? (
                                    <MoonIcon />
                                ) : (
                                    <SunIcon />
                                )}
                            </Button>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}
