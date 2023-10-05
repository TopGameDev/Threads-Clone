import { Box, Flex, VStack, Text, Link, MenuButton, Menu, Portal, MenuList, MenuItem} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { Avatar } from "@chakra-ui/avatar"
import { BsInstagram } from "react-icons/bs"
import { CgMoreO } from "react-icons/cg"
import React from 'react'

const UserHeader = () => {
    const toast = useToast()

    const copyUrl = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(() => {
            toast({ description: 'Copied to Clipboard' })
        })
    }

  return (
    <VStack gap={4} alignItems={"start"}>
        <Flex justifyContent={"space-between"} w={"full"}>
            <Box>
                <Text fontSize={"1.75rem"} fontWeight={"bold"}>
                    Mark ZuckerBerg
                </Text>
                <Flex gap={2} alignItems={"center"}>
                    <Text fontSize={"sm"}>@Zman</Text>
                    <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}>
                        threads.next
                    </Text>
                </Flex>
            </Box>
            <Box>
                <Avatar 
                    name="Mark Zukerberg"
                    src="/zuck-avatar.png"
                    size={
                        {
                            base: "lg",
                            md: "xl"
                        }
                    }
                />
            </Box>
        </Flex>
        <Text>Co-founder, executive chairman and CEO of Meta Platforms.</Text>
        <Flex w={"full"} justifyContent={"space-between"}>
            <Flex gap={2} alignItems={"center"}>
                <Text color={"gray.light"}>3.2k followers</Text>
                <Box w="1" h={"1"} bg={"gray.light"} borderRadius={"full"}></Box>
                <Link color={"gray.light"}>instagram.com</Link>
            </Flex>
            <Flex>
                <Box className='icon-container'>
                    <BsInstagram size={24} cursor={"pointer"}/>
                </Box>
                <Box className='icon-container'>
                    <Menu>
                        <MenuButton>
                            <CgMoreO size={24} cursor={"pointer"}/>
                        </MenuButton>
                        <Portal>
                            <MenuList bg={"gray.dark"}>
                                <MenuItem bg={"gray.dark"} onClick={copyUrl}>Copy Link</MenuItem>
                            </MenuList>
                        </Portal>
                    </Menu>
                </Box>
            </Flex>
        </Flex>

        <Flex w={"full"}>
            <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb={"3"} cursor={"pointer"}>
                <Text fontWeight={"bold"}>Threads</Text>
            </Flex>
            <Flex flex={1} borderBottom={"1px solid gray"} justifyContent={"center"} color={"gray.light"} pb={"3"} cursor={"pointer"}>
                <Text fontWeight={"bold"}>Replies</Text>
            </Flex>
        </Flex>

    </VStack>
  )
}

export default UserHeader