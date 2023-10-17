'use client'
import { Box, Button, Center, Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

export default function TopPageContainer() {
  const router = useRouter()

  return (
    <Box bgImage="sea.jpg" bgSize="cover" w="100%" h="100vh" p={20}>
      <Flex h="100%" alignItems="center">
        <Box w="50%">
          <Box>
            <Text
              as="h1"
              color="white"
              fontSize={{ base: '2xl', md: '5xl' }}
              fontWeight="bold"
              fontFamily="mono"
            >
              Tamemol +
            </Text>
          </Box>
          <Box marginTop={{ base: '10', md: '20' }}>
            <Text
              as="h1"
              color="white"
              fontSize={{ base: '4xl', md: '6xl' }}
              fontWeight="bold"
              fontFamily="mono"
            >
              I will help you be a little more patient.
            </Text>
          </Box>
          <Box marginTop={{ base: '10', md: '20' }}>
            <Center>
              <Button
                as="u"
                fontSize={40}
                color="white"
                fontFamily="mono"
                bg="none"
                onClick={() => {
                  router.push('/auth')
                }}
                _hover={{ opacity: 0.7, cursor: 'pointer' }}
              >
                Get Start
              </Button>
            </Center>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}
