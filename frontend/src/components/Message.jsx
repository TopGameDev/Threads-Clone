import { Avatar, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Message = ({ownMessage}) => {
  return (
    <>
    {ownMessage ? (
        <Flex
            gap={2}
            alignSelf={"flex-end"}
            p={3}
        >
            <Text 
                maxWidth={"350px"} 
                bg={"blue.400"}
                p={1}
                borderRadius={"md"}
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, pariatur?
            </Text>
            <Avatar src='' w={"7"} h={7} />
        </Flex>
    ) : (
        <Flex
            gap={2}
            p={3}
        >
            <Avatar src='' w={"7"} h={7} />
            <Text 
                maxWidth={"350px"} 
                bg={"gray.400"}
                p={1}
                borderRadius={"md"}
                color={"black"}
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad ea, ex debitis soluta quae minus.
            </Text>
        </Flex>
    )}
    </>
  )
}

export default Message