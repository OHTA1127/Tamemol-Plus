import { Box, Flex } from '@chakra-ui/react'
import EditProduct from '../components/common/organisms/products/product-edit'
import ProductList from '../components/common/organisms/products/product-list'
import ProfileBox from '../components/common/organisms/profiles/profile-box'

export default async function Record() {
  return (
    <>
      <Box>
        <ProfileBox />
      </Box>
      <Flex>
        <EditProduct />
        <ProductList />
      </Flex>
    </>
  )
}
