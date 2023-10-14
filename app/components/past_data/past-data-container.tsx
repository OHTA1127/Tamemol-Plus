import { Database } from '@/database.types'
import { Box, Flex } from '@chakra-ui/react'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'
import React from 'react'
import BuyDataPieChart from './chart/buy-data-pie-chart'
import UnbuyDataPieChart from './chart/unbuy-data-pie-chart'

async function SumamaryContainer() {
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
    <Flex w="100%" h="100vh">
      <Box>
        <BuyDataPieChart productData={product} />
        <UnbuyDataPieChart productData={product} />
      </Box>
    </Flex>
  )
}

export default React.memo(SumamaryContainer)
