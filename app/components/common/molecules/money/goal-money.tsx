'use client'
import { Database } from '@/database.types'
import useStore from '@/store'
import { Box, Link, Stack, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

type ProfileData = Database['public']['Tables']['profile']['Row']

type Props = {
  profileGoalMoney: string
  userData: ProfileData
}

export default function GoalMoney({ profileGoalMoney, userData }: Props) {
  const updateProfile = useStore((state) => state.updateEditProfile)

  return (
    <Link href="/edit_profile" as={NextLink}>
      <Box
        w={{ base: '165px', md: '360px' }}
        h={{ base: '70px', md: '120px' }}
        bgGradient="linear(to-r, cyan.400, blue.500)"
        borderRadius="10px"
        shadow="2xl"
        p={{ base: 0, md: 2 }}
        _hover={{ cursor: 'pointer', opacity: 0.8 }}
        // onClickイベントでザスタンドを使用してグローバルステートに現在のprofileの値をセットする
        onClick={() => {
          if (userData) {
            updateProfile({
              id: userData.id,
              name: userData.name,
              goalMoney: userData.goal_money,
            })
          }
        }}
      >
        <Stack>
          <Text
            fontSize={{ base: 'xs', md: 'md' }}
            fontWeight="bold"
            pt={2}
            pl={3}
            color="white"
          >
            目標金額
          </Text>
          <Text
            textAlign="center"
            fontSize={{ base: 'xl', md: '5xl' }}
            fontWeight="bold"
            color="white"
          >
            ¥ {profileGoalMoney}
          </Text>
        </Stack>
      </Box>
    </Link>
  )
}
