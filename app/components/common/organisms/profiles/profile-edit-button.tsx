'use client'

import useStore from '@/store'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'

type ProfileData = {
  id: string
  created_at: string
  name: string | null
  goal_money: number | null
  user_id: string | null
}

type ProfileProps = {
  data: ProfileData
}

export default function ProfileEditButton({ data }: ProfileProps) {
  const updateProfile = useStore((state) => state.updateEditProfile)

  return (
    <Link href="/edit_profile">
      <Button
        onClick={() => {
          updateProfile({
            id: data.id,
            name: data.name,
            goalMoney: data.goal_money,
          })
        }}
      >
        編集
      </Button>
    </Link>
  )
}
