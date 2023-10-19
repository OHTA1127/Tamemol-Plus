import { Database } from '@/database.types'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'
import React from 'react'
import MonthDisplay from './month-display'

async function SumamaryContainer() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })

  const { data: product } = await supabase
    .from('products')
    .select()
    .order('created_at', { ascending: true })

  const { data: profile } = await supabase.from('profile').select()

  return <MonthDisplay productData={product} userProfile={profile} />
}

export default React.memo(SumamaryContainer)
