'use client'

import useStore from '@/store'
import supabase from '@/utils/supabase'
import { Flex, Heading, FormLabel, Button, Box, Input } from '@chakra-ui/react'
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
    <Flex>
      <Box
        boxShadow="lg"
        w="600px"
        paddingY="120px"
        paddingX="32px"
        borderRadius="8px"
        border="1px solid"
        borderColor="gray.100"
        m="0 auto"
        display="flex"
      >
        <Box w="100%">
          <Heading color="gray.800" mb="48px" textAlign="center" size="xl">
            ようこそ
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormLabel fontWeight="bold">Eメール</FormLabel>
            <Input
              type="text"
              size="lg"
              mb="8"
              placeholder="Email"
              variant="outline"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <FormLabel fontWeight="bold">パスワード</FormLabel>
            <Input
              type="password"
              size="lg"
              mb="8"
              required
              placeholder="Password"
              variant="outline"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            <div>
              <Button type="submit">{isLogin ? 'Login' : 'Register'}</Button>
            </div>
          </form>
          <Button onClick={() => setIsLogin(!isLogin)}>change mode ?</Button>
        </Box>
      </Box>
    </Flex>
  )
}
