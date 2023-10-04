import { Box, Flex } from '@chakra-ui/react'
import EditProduct from '../components/common/organisms/products/product-edit'
import ProductList from '../components/common/organisms/products/product-list'
import ProfileBox from '../components/common/organisms/profiles/profile-box'
import ProductResult from '../components/common/organisms/products/product-result'
import React from 'react'

async function Record() {


  return (
    <Flex>
      <Box>
        <ProfileBox />
        <EditProduct />
      </Box>
      <Box>
        <ProductResult />
        <ProductList />
      </Box>
    </Flex>
  )
}

export default React.memo(Record)
