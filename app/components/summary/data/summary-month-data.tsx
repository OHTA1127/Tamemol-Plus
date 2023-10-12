'use client'
import { Box, Button, Flex, Spacer, Text } from '@chakra-ui/react'
import React from 'react'

type Props = {
  selectMonth: number
  handlePreviousMonth: () => void
  handleNextMonth: () => void
}

function SummaryMonthData({
  selectMonth,
  handlePreviousMonth,
  handleNextMonth,
}: Props) {
  return (
    <Box w="260px" h="120px">
      <Text fontSize={35} color="gray.800">
        <span style={{ fontSize: '70px' }}>{selectMonth}</span>月のまとめ
      </Text>
      <Flex>
        <Button
          h="25px"
          w={20}
          color="white"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          _hover={{ background: 'blue.500' }}
          onClick={handlePreviousMonth}
        >
          Previous
        </Button>
        <Spacer />
        <Button
          h="25px"
          w={20}
          color="white"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          _hover={{ background: 'blue.500' }}
          onClick={handleNextMonth}
        >
          Next
        </Button>
      </Flex>
    </Box>
  )
}

export default React.memo(SummaryMonthData)
