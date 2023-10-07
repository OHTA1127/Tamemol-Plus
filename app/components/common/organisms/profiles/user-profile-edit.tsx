'use client'

import useStore from '@/store'
import supabase from '@/utils/supabase'
import { Box, Button, FormLabel, Input } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FormEvent } from 'react'

function EditUserProfile() {
  const router = useRouter()
  const { editedProfile } = useStore()
  const { loginUser } = useStore()
  const updateProfile = useStore((state) => state.updateEditProfile)
  const reset = useStore((state) => state.resetEditProfile)

  console.log(loginUser)

  async function submitEditProfile(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    //プロフィールの新規作成

    if (editedProfile.id === '') {
      const { error } = await supabase
        .from('profile')
        .insert({
          name: editedProfile.name,
          goal_money: editedProfile.goalMoney,
          user_id: loginUser.id,
        })
        .select()
      router.refresh()
      router.push('/record')

      reset()
    } else {
      //プロフィールの編集
      const { error } = await supabase
        .from('profile')
        .update({
          name: editedProfile.name,
          goal_money: editedProfile.goalMoney,
        })
        .eq('id', editedProfile.id)
        .select()
      router.refresh()
      router.push('/record')
      reset()
    }
  }

  return (
    <Box bgColor="white">
      <form onSubmit={submitEditProfile}>
        <FormLabel fontWeight="bold">名前</FormLabel>
        <Input
          type="text"
          size="lg"
          mb="8"
          placeholder="Your Name ?"
          required
          value={editedProfile.name || ''}
          onChange={(e) => {
            updateProfile({ ...editedProfile, name: e.target.value })
          }}
        />
        <FormLabel fontWeight="bold">目標金額</FormLabel>
        <Input
          type="text"
          size="lg"
          mb="8"
          placeholder="Goal Money ?"
          required
          value={editedProfile.goalMoney !== null ? editedProfile.goalMoney : 0}
          onChange={(e) => {
            const goalMoney = parseFloat(e.target.value) || 0
            updateProfile({
              ...editedProfile,
              goalMoney: goalMoney,
            })
          }}
        />
        <div>
          <Button type="submit">Update</Button>
        </div>
      </form>
    </Box>
  )
}

export default React.memo(EditUserProfile)
