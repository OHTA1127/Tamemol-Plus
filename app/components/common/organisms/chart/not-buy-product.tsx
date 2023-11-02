import { Box, Center, Text } from '@chakra-ui/react'
import React from 'react'

type Props = {
  width?: string
  height?: string
  pt?: number
}

function NotBuyProduct({ width = '360px', height = '500px', pt = 230 }: Props) {
  return (
    <Box w={width} h={height} bgColor="white" borderRadius="10px" shadow="2xl">
      <Center>
        <Text fontWeight="bold" pt={pt}>
          買った商品はありません！
        </Text>
      </Center>
    </Box>
  )
}

export default React.memo(NotBuyProduct)
