import { Database } from '@/database.types'
import { Box, Spacer, Wrap, WrapItem } from '@chakra-ui/react'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'
import React from 'react'
import BuyMoney from '../components/common/molecules/money/buy-money'
import GoalMoney from '../components/common/molecules/money/goal-money'
import UnbuyMoney from '../components/common/molecules/money/unbuy-money'
import PieChartContainer from '../components/common/organisms/chart/pie-chart-container'
import EditProduct from '../components/record/product-edit'
import ProductList from '../components/record/product-list'
import ProductResult from '../components/record/product-result'

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
          <GoalMoney
            userData={userProfile}
            profileGoalMoney={profileGoalMoney}
          />
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
      <Wrap p={{ base: 4, md: 10 }} justifyContent="center">
        <WrapItem>
          <EditProduct />
        </WrapItem>
        <Spacer />
        <WrapItem>
          <PieChartContainer />
        </WrapItem>
        <Spacer />
        <WrapItem>
          <ProductList />
        </WrapItem>
      </Wrap>
    </Box>
  )
}

export default React.memo(Record)
