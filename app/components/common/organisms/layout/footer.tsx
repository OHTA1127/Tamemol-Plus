'use client'
import { Box, Flex, Link, Text } from '@chakra-ui/react'
import { AiFillGithub } from 'react-icons/ai'
import NextLink from 'next/link'
import React from 'react'

function Footer() {
  return (
    <Flex as="footer" position="fixed" bottom={0} w="100%">
      <Text
        color="gray.100"
        m="0 auto"
        p={3}
        bgClip="text"
        bgGradient="linear(to-r, cyan.400, blue.500)"
      >
        &copy; 2023 Tamemol. All rights reserved.
      </Text>
      <Box
        my="auto"
        mr={4}
        bgGradient="linear(to-r, cyan.400, blue.500)"
        borderRadius="10px"
      >
        <Link href="https://github.com/OHTA1127" as={NextLink}>
          {' '}
          <AiFillGithub style={{ color: 'fff' }} size="20px" />
        </Link>
      </Box>
    </Flex>
  )
}

export default React.memo(Footer)
