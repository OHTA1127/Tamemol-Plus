'use client'

import useStore from '@/store'
import supabase from '@/utils/supabase'
import { Box, Button, Flex, FormLabel, Heading, Input } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { FormEvent } from 'react'

function EditUserProfile() {
  const router = useRouter()
  const { editedProfile } = useStore()
  const { loginUser } = useStore()
  const updateProfile = useStore((state) => state.updateEditProfile)
  const reset = useStore((state) => state.resetEditProfile)

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
    <Flex w="100%" h="100vh">
      <Box
        w="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Box
          boxShadow="lg"
          w="600px"
          paddingY="120px"
          paddingX="32px"
          borderRadius="8px"
          border="1px solid"
          borderColor="gray.100"
          m="0 auto"
          color="white"
          bgColor="white"
        >
          <Box w="100%">
            <Heading
              bgGradient="linear(to-r, cyan.400, blue.500)"
              bgClip="text"
              fontWeight="extrabold"
              fontSize={40}
              mb="48px"
              textAlign="center"
              size="xl"
            >
              Edit your profile!
            </Heading>
            <form onSubmit={submitEditProfile}>
              <FormLabel fontWeight="bold" color="teal.800">
                名前
              </FormLabel>
              <Input
                color="gray.600"
                type="text"
                size="lg"
                mb="8"
                placeholder="Your Name ?"
                _placeholder={{ color: 'teal.800' }}
                variant="outline"
                required
                value={editedProfile.name || ''}
                onChange={(e) => {
                  updateProfile({ ...editedProfile, name: e.target.value })
                }}
              />
              <FormLabel fontWeight="bold" color="teal.800">
                目標金額(半角数字)
              </FormLabel>
              <Input
                color="gray.600"
                type="text"
                size="lg"
                mb="8"
                placeholder="Goal Money ?"
                _placeholder={{ color: 'teal.800' }}
                variant="outline"
                required
                value={
                  editedProfile.goalMoney !== null ? editedProfile.goalMoney : 0
                }
                onChange={(e) => {
                  const goalMoney = parseFloat(e.target.value) || 0
                  updateProfile({
                    ...editedProfile,
                    goalMoney: goalMoney,
                  })
                }}
              />
              <Flex flexDirection="column">
                <Button
                  type="submit"
                  color="white"
                  background="blue.700"
                  size="lg"
                  paddingX="80px"
                  m="0 auto"
                  _hover={{ background: 'teal.300' }}
                >
                  Update
                </Button>
              </Flex>
            </form>
          </Box>
        </Box>
      </Box>
    </Flex>
  )
}

export default React.memo(EditUserProfile)
