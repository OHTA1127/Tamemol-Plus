'use client'

import {
  Box,
  Flex,
  Heading,
  Link,
  useDisclosure,
  Button,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import MenuIconButton from '../../atoms/button/menu-icon-button'
import MenuDrawer from '../../molecules/menu-drawer'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { MdLogout } from 'react-icons/md'
import supabase from '@/utils/supabase'

export default function Header() {
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
        bg="cyan.500"
        color="gray.50"
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
          <Heading as="h1" fontSize={{ base: 'xl', md: '2xl' }}>
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
              Record
            </Link>
          </Box>
          <Box pr={4}>
            <Link href="/summary" as={NextLink}>
              Summary
            </Link>
          </Box>
          <Box pr={3}>
            {' '}
            <Link href="/past_data" as={NextLink}>
              Past Data
            </Link>
          </Box>
          <Button onClick={signOut} colorScheme="none">
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
