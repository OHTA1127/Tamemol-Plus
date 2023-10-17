'use client'

import supabase from '@/utils/supabase'
import {
  Box,
  Button,
  Center,
  Flex,
  FormLabel,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'

function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  //ユーザーがEメールとパスワードを入力後、実行される関数
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    //サインインの処理
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      setEmail('')
      setPassword('')
      if (error) {
        alert(error.message)
      } else {
        router.push('/record')
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      setEmail('')
      setPassword('')
      if (error) {
        alert(error.message)
      } else {
        router.push('/record')
      }
    }
  }

  return (
    <Box w="100%" h="100vh" bgImage="sea.jpg" bgSize="cover">
      <Center h="100%">
        <Box
          boxShadow="xl"
          w="600px"
          paddingY="120px"
          paddingX="32px"
          borderRadius="8px"
          border="1px solid"
          borderColor="gray.100"
          color="white"
          backdropFilter="auto"
          backdropBlur="20px"
        >
          <Box>
            <Heading
              fontWeight="extrabold"
              fontSize={40}
              mb="48px"
              textAlign="center"
              size="xl"
            >
              Welcome to Tamemol!
            </Heading>
            <form onSubmit={handleSubmit}>
              <FormLabel fontWeight="extrabold">Eメール</FormLabel>
              <Input
                type="text"
                size="lg"
                mb="8"
                placeholder="Email"
                _placeholder={{ color: 'white' }}
                variant="outline"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
              <FormLabel fontWeight="extrabold">パスワード</FormLabel>
              <Input
                type="password"
                size="lg"
                mb="8"
                required
                placeholder="Password"
                _placeholder={{ color: 'white' }}
                variant="outline"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
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
                  {isLogin ? 'Login' : 'Sign Up'}
                </Button>
                <Box textAlign="center" mt={5}>
                  {isLogin ? (
                    <Text>Creating an account for the first time?</Text>
                  ) : (
                    <Text>Already have an account ?</Text>
                  )}
                  <Button
                    mt={1}
                    color="white"
                    background="cyan.700"
                    onClick={() => setIsLogin(!isLogin)}
                    _hover={{ background: 'cyan.400' }}
                  >
                    {isLogin ? (
                      <Text>Sign up here</Text>
                    ) : (
                      <Text>Log in here</Text>
                    )}
                  </Button>
                </Box>
              </Flex>
            </form>
          </Box>
        </Box>
      </Center>
      {/* <Image w="50%" h="100vh" alt="画像" src="auth_image.png" /> */}
    </Box>
  )
}

export default React.memo(Auth)
