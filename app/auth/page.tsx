'use client'

import useStore from '@/store'
import supabase from '@/utils/supabase'
import {
  Flex,
  Heading,
  FormLabel,
  Button,
  Box,
  Input,
  Text,
  Image,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function Auth() {
  const { loginUser } = useStore()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const resetProduct = useStore((status) => status.resetEditProduct)
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
      }
    }
  }

  return (
    <Flex w="100%" h="100vh" bgGradient="linear(to-r, cyan.400, green.400)">
      <Box
        w="50%"
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
              bgGradient="linear(to-r, cyan.500, green.500)"
              bgClip="text"
              fontWeight="extrabold"
              fontSize={40}
              mb="48px"
              textAlign="center"
              size="xl"
            >
              Welcome to Tamemol!
            </Heading>
            <form onSubmit={handleSubmit}>
              <FormLabel fontWeight="bold" color="teal.800">
                Eメール
              </FormLabel>
              <Input
                color="gray.600"
                type="text"
                size="lg"
                mb="8"
                placeholder="Email"
                _placeholder={{ color: 'teal.800' }}
                variant="outline"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
              <FormLabel fontWeight="bold" color="teal.800">
                パスワード
              </FormLabel>
              <Input
                color="gray.600"
                type="password"
                size="lg"
                mb="8"
                required
                placeholder="Password"
                _placeholder={{ color: 'teal.800' }}
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
                  background="teal.800"
                  size="lg"
                  paddingX="80px"
                  m="0 auto"
                  _hover={{ background: 'teal.300' }}
                >
                  {isLogin ? 'Login' : 'Sign Up'}
                </Button>
                <Box textAlign="center" mt={5}>
                  {isLogin ? (
                    <Text color="teal.800">
                      Creating an account for the first time?
                    </Text>
                  ) : (
                    <Text color="teal.800">Already have an account ?</Text>
                  )}
                  <Button
                    mt={1}
                    color="white"
                    background="teal.800"
                    onClick={() => setIsLogin(!isLogin)}
                    _hover={{ background: 'teal.300' }}
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
      </Box>
      <Image w="50%" h="100vh" alt="画像" src="auth_image.png" />
    </Flex>
  )
}
