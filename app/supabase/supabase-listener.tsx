'use client'

import useStore from '@/store'
import supabase from '@/utils/supabase'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function SupabaseListener({
  accessToken,
}: {
  accessToken?: string
}) {
  const router = useRouter()
  const { updateLoginUser } = useStore()

  useEffect(() => {
    const getUserInfo = async () => {
      //ブラウザに存在するユーザーのセッション情報を取得する
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        //zustandのログインユーザーのステートに取得した情報を格納する
        updateLoginUser({
          id: data.session?.user.id,
          email: data.session?.user.email,
        })
      }
    }
    getUserInfo()

    //ユーザーのセッション情報の変化を監視し、ログインしたりログアウトするたびに実行される
    supabase.auth.onAuthStateChange((_, session) => {
      updateLoginUser({ id: session?.user.id, email: session?.user.email })
      if (session?.access_token !== accessToken) {
        router.refresh()
      }
    })
  }, [updateLoginUser, accessToken, router])
  return null
}
