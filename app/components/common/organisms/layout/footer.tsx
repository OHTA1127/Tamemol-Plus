'use client'
import { Box, Center, Flex, Link, Text } from '@chakra-ui/react'
import { AiFillGithub } from 'react-icons/ai'
import NextLink from 'next/link'

export default function Footer() {
  return (
    <Flex as="footer" bg="gray.500" position="fixed" bottom={0} w="100%">
      <Text color="gray.100" m="0 auto" p={3}>
        &copy; 2023 Tamemol. All rights reserved.
      </Text>
      <Box my="auto" mr={4} color="gray.100">
        <Link href="https://github.com/OHTA1127" as={NextLink}>
          {' '}
          <AiFillGithub style={{ color: 'fff' }} size="20px" />
        </Link>
      </Box>
    </Flex>
  )
}
