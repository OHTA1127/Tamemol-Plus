import React from 'react'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/database.types'
import { headers, cookies } from 'next/headers'
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
