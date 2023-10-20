import { Database } from '@/database.types'
import { Box, Spacer, Wrap, WrapItem } from '@chakra-ui/react'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'
import BarChart from './chart/bar-chart/bar-chart'
import LineChart from './chart/line-chart/line-chart'
import BuyDataPieChart from './chart/pie-chart/buy-data-pie-chart'
import UnbuyDataPieChart from './chart/pie-chart/unbuy-data-pie-chart'
import PastDataStat from './stat/past-data-stat'

export default async function SumamaryContainer() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })

  const { data: product } = await supabase
    .from('products')
    .select()
    .order('created_at', { ascending: true })

  const { data: profile } = await supabase.from('profile').select()

  return (
    <Box h="100vh">
      <Wrap p={{ base: 4, md: 10 }} justifyContent="center">
        <WrapItem>
          <LineChart productData={product} />
        </WrapItem>
        <Spacer />
        <WrapItem>
          <BarChart productData={product} />
        </WrapItem>
      </Wrap>
      <Wrap p={{ base: 4, md: 10 }} justifyContent="center">
        <WrapItem>
          <BuyDataPieChart productData={product} />
        </WrapItem>
        <Spacer />
        <WrapItem>
          <UnbuyDataPieChart productData={product} />
        </WrapItem>
        <Spacer />
        <WrapItem>
          <PastDataStat userProfile={profile} productData={product} />
        </WrapItem>
      </Wrap>
    </Box>
  )
}
