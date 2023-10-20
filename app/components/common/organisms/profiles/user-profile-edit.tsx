'use client'

import useStore from '@/store'
import supabase from '@/utils/supabase'
import {
  Box,
  Button,
  Center,
  Flex,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

export default function EditUserProfile() {
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
    <Box w="100%" h="100vh" bgImage="sea.jpg" bgSize="cover">
      <Center h="100%">
        <Box
          boxShadow="xl"
          w={{ base: '300px', md: '600px' }}
          paddingY={{ base: '60px', md: '120px' }}
          paddingX="32px"
          borderRadius="8px"
          border="1px solid"
          borderColor="gray.100"
          color="white"
          backdropFilter="auto"
          backdropBlur="40px"
        >
          <Box>
            <Heading
              fontWeight="extrabold"
              fontSize={{ base: '25', md: '40' }}
              mb={{ base: '20px', md: '48px' }}
              textAlign="center"
              size="xl"
            >
              Edit your profile!
            </Heading>
            <form onSubmit={submitEditProfile}>
              <FormLabel fontWeight="extrabold">名前</FormLabel>
              <Input
                type="text"
                size="lg"
                mb="8"
                placeholder="Your Name ?"
                _placeholder={{ color: 'white' }}
                variant="outline"
                required
                value={editedProfile.name || ''}
                onChange={(e) => {
                  updateProfile({ ...editedProfile, name: e.target.value })
                }}
              />
              <FormLabel fontWeight="extrabold">目標金額(半角数字)</FormLabel>
              <Input
                type="text"
                size="lg"
                mb="8"
                placeholder="Goal Money ?"
                _placeholder={{ color: 'white' }}
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
                  background="cyan.700"
                  size="lg"
                  paddingX="80px"
                  m="0 auto"
                  _hover={{ background: 'cyan.400' }}
                >
                  Update
                </Button>
              </Flex>
            </form>
          </Box>
        </Box>
      </Center>
    </Box>
  )
}
