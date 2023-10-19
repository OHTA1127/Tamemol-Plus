'use client'
import { Database } from '@/database.types'
import useStore from '@/store'
import { Box, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

type ProfileData = Database['public']['Tables']['profile']['Row']

type Props = {
  profileGoalMoney: string
  userData: ProfileData
}

function GoalMoney({ profileGoalMoney, userData }: Props) {
  const updateProfile = useStore((state) => state.updateEditProfile)

  return (
    <Link href="/edit_profile">
      <Box
        w="360px"
        h="120px"
        bgGradient="linear(to-r, cyan.400, blue.500)"
        borderRadius="10px"
        shadow="2xl"
        p={2}
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
          <Text fontSize="md" fontWeight="bold" pt={2} pl={3} color="white">
            目標金額
          </Text>
          <Text
            textAlign="center"
            fontSize="5xl"
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

export default React.memo(GoalMoney)
