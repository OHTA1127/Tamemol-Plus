import { Database } from '@/database.types'
import { Box, Text, Flex } from '@chakra-ui/react'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { headers, cookies } from 'next/headers'
import ProfileEditButton from './profile-edit-button'

export default async function ProfileBox() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })

  const { data: profile } = await supabase.from('profile').select()
  const userProfile = profile![0]

  const userName = profile?.[0]?.name || 'ゲスト'
  const profileGoalMoney = profile?.[0]?.goal_money || 1000

  return (
    <Box bgColor="white">
      <Text>{userName}</Text>
      <Flex>
        <Text>目標金額 {profileGoalMoney}</Text>
        <ProfileEditButton data={userProfile} />
      </Flex>
    </Box>
  )
}
