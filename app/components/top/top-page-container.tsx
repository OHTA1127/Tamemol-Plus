'use client'
import { Box, Button, Center, Fade, Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

export default function TopPageContainer() {
  const router = useRouter()

  return (
    <Box bgImage="sea.jpg" bgSize="cover" w="100%" h="100vh" p={20}>
      <Flex h="100%" alignItems="center">
        <Box w={{ base: '100%', md: '60%' }}>
          <Box>
            <Fade in={true} delay={0.5}>
              <Text
                as="h1"
                color="white"
                fontSize={{ base: '2xl', md: '5xl' }}
                fontWeight="bold"
                fontFamily="mono"
              >
                Tamemol +
              </Text>
            </Fade>
          </Box>
          <Box marginTop={{ base: '10', md: '20' }}>
            <Fade in={true} delay={0.8}>
              <Text
                as="h1"
                color="white"
                fontSize={{ base: 'xl', md: '6xl' }}
                fontWeight="bold"
                fontFamily="mono"
              >
                Tamemol will help you be a little more patient.
              </Text>
            </Fade>
          </Box>
          <Box marginTop={{ base: '10', md: '20' }}>
            <Center>
              <Fade in={true} delay={1.1}>
                <Button
                  as="u"
                  fontSize={{ base: '20', md: '40' }}
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
              </Fade>
            </Center>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}
