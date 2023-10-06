import {
  Box,
  Flex,
  Spacer,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import EditProduct from '../components/common/organisms/products/product-edit'
import ProductList from '../components/common/organisms/products/product-list'
import ProductResult from '../components/common/organisms/products/product-result'
import React from 'react'
import GoalMoney from '../components/common/molecules/money/goal-money'
import UnbuyMoney from '../components/common/molecules/money/unbuy-money'
import BuyMoney from '../components/common/molecules/money/buy-money'
import PieChartContainer from '../components/common/organisms/chart/pie-chart-container'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { headers, cookies } from 'next/headers'
import { Database } from '@/database.types'

async function Record() {

  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })

  const { data: profile } = await supabase.from('profile').select()
  const userProfile = profile![0]
  const profileGoalMoney = profile?.[0]?.goal_money || 1000

  return (
    <Box w="100%" h="100vh">
      <Wrap p={{ base: 4, md: 10 }} justifyContent="center">
        <WrapItem>
          <GoalMoney userData={userProfile} profileGoalMoney={profileGoalMoney} />
        </WrapItem>
        <Spacer />
        <WrapItem>
          <UnbuyMoney />
        </WrapItem>
        <Spacer />
        <WrapItem>
          <BuyMoney />
        </WrapItem>
        <Spacer />
        <WrapItem>
          <ProductResult />
        </WrapItem>
      </Wrap>
      <Flex>
        <EditProduct />
        <Flex>
          <PieChartContainer />
          <ProductList />
        </Flex>
      </Flex>
    </Box>
  )
}

export default React.memo(Record)
