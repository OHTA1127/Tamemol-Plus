import { Box, Center, Text } from '@chakra-ui/react'
import React from 'react'

function NotBuyProduct() {
  return (
    <Box w="360px" h="500px" bgColor="white" borderRadius="10px" shadow="2xl">
      <Center>
        <Text fontWeight="bold" pt={230}>
          買った商品はありません！
        </Text>
      </Center>
    </Box>
  )
}

export default React.memo(NotBuyProduct)
