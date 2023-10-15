import { Database } from '@/database.types'
import { Box, Wrap, WrapItem } from '@chakra-ui/react'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'
import React from 'react'
import LineChart from './chart/line-chart/line-chart'
import BuyDataPieChart from './chart/pie-chart/buy-data-pie-chart'
import UnbuyDataPieChart from './chart/pie-chart/unbuy-data-pie-chart'
import PastDataStat from './stat/past-data-stat'

async function SumamaryContainer() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })

  const { data: product } = await supabase
    .from('products')
    .select()
    .order('created_at', { ascending: true })

  return (
    <Box w="100%" h="100vh">
      <Wrap p={{ base: 4, md: 10 }} justifyContent="center">
        <WrapItem>
          <LineChart productData={product} />
          <PastDataStat productData={product} />
        </WrapItem>
      </Wrap>
      <Wrap p={{ base: 4, md: 10 }} justifyContent="center">
        <WrapItem>
          <BuyDataPieChart productData={product} />
          <UnbuyDataPieChart productData={product} />
        </WrapItem>
      </Wrap>
    </Box>
  )
}

export default React.memo(SumamaryContainer)
