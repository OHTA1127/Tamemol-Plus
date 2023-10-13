'use client'

import supabase from '@/utils/supabase'
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'
import { MdLogout } from 'react-icons/md'
import MenuIconButton from '../../atoms/button/menu-icon-button'
import MenuDrawer from '../../molecules/menu-drawer'

function Header() {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const onClickHome = useCallback(() => {
    router.push('/')
    onClose()
  }, [router, onClose])

  const onClickSummary = useCallback(() => {
    router.push('/summary')
    onClose()
  }, [router, onClose])

  const onClickPastData = useCallback(() => {
    router.push('/past_data')
    onClose()
  }, [router, onClose])

  //サインアウトの処理
  function signOut() {
    supabase.auth.signOut()
    router.push('/auth')
  }

  return (
    <>
      <Flex
        as="nav"
        color="white"
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 4 }}
      >
        <Flex
          align="center"
          as="a"
          _hover={{ cursor: 'pointer' }}
          onClick={onClickHome}
        >
          <Heading
            as="h1"
            fontSize={{ base: 'xl', md: '4xl' }}
            bgClip="text"
            bgGradient="linear(to-r, cyan.400, blue.500)"
            justifyContent="center"
          >
            Tamemol +
          </Heading>
        </Flex>
        <Flex
          align="center"
          fontSize="sm"
          display={{ base: 'none', md: 'flex' }}
        >
          <Box pr={3}>
            {' '}
            <Link href="/record" as={NextLink}>
              <Text
                as="b"
                bgClip="text"
                bgGradient="linear(to-r, cyan.400, blue.500)"
                fontSize={{ base: 'md', md: 'lg' }}
              >
                Record
              </Text>
            </Link>
          </Box>
          <Box pr={4}>
            <Link href="/summary" as={NextLink}>
              <Text
                as="b"
                bgClip="text"
                bgGradient="linear(to-r, cyan.400, blue.500)"
                fontSize={{ base: 'md', md: 'lg' }}
              >
                Summary
              </Text>
            </Link>
          </Box>
          <Box pr={3}>
            {' '}
            <Link href="/past_data" as={NextLink}>
              <Text
                as="b"
                bgClip="text"
                bgGradient="linear(to-r, cyan.400, blue.500)"
                fontSize={{ base: 'md', md: 'lg' }}
              >
                Past Data
              </Text>
            </Link>
          </Box>
          <Button
            onClick={signOut}
            colorScheme="none"
            bgGradient="linear(to-r, cyan.400, blue.500)"
          >
            <MdLogout size="20px" />
          </Button>
        </Flex>
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer
        onClose={onClose}
        isOpen={isOpen}
        onClickHome={onClickHome}
        onClickPastData={onClickPastData}
        onClickSummary={onClickSummary}
      />
    </>
  )
}

export default React.memo(Header)
