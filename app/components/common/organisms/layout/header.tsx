'use client'

import { Box, Flex, Heading, Link, useDisclosure } from '@chakra-ui/react'
import NextLink from 'next/link'
import MenuIconButton from '../../atoms/button/menu-icon-button'
import MenuDrawer from '../../molecules/menu-drawer'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

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
          <Box pr={4}>
            <Link href="/summary" as={NextLink}>
              Summary
            </Link>
          </Box>
          <Link href="/past_data" as={NextLink}>
            Past Data
          </Link>
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
