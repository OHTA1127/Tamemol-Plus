import { Box, Flex } from '@chakra-ui/react'
import EditProduct from '../components/common/organisms/products/product-edit'
import ProductList from '../components/common/organisms/products/product-list'
import ProfileBox from '../components/common/organisms/profiles/profile-box'
import ProductResult from '../components/common/organisms/products/product-result'
import React from 'react'
import GoalMoney from '../components/common/molecules/money/goal-money'
import UnbuyMoney from '../components/common/molecules/money/unbuy-money'
import BuyMoney from '../components/common/molecules/money/buy-money'

async function Record() {
  return (
    <Flex>
      <Box>
        <ProfileBox />
        <EditProduct />
      </Box>
      <Box>
        <ProductResult />
        <Flex bg="white">
          <GoalMoney />
          <UnbuyMoney />
          <BuyMoney />
        </Flex>
        <ProductList />
      </Box>
    </Flex>
  )
}

export default React.memo(Record)
