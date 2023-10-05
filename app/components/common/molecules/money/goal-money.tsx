import React from 'react'
import { headers, cookies } from 'next/headers'
import { Database } from '@/database.types'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Box, Text } from '@chakra-ui/react'

async function GoalMoney() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })
  const { data: profile } = await supabase.from('profile').select()
  const profileGoalMoney = profile?.[0]?.goal_money || 1000

  return (
    <Box>
      <Text>目標金額</Text>
      <Text>{profileGoalMoney}</Text>
    </Box>
  )
}

export default React.memo(GoalMoney)
