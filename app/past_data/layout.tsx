import { Box } from '@chakra-ui/react'
import Footer from '../components/common/organisms/layout/footer'
import Header from '../components/common/organisms/layout/header'

export default function PastDataLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Box w="100%" h="100vh" bgGradient="linear(to-r, cyan.400, green.400)">
      <Header />
      {children}
      <Footer />
    </Box>
  )
}
