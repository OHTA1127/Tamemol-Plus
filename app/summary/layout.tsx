import { Box } from '@chakra-ui/react'
import Footer from '../components/common/organisms/layout/footer'
import Header from '../components/common/organisms/layout/header'

export default function SummaryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Box w="100%" h="100vh" bg="gray.100">
      <Header />
      {children}
      <Footer />
    </Box>
  )
}
