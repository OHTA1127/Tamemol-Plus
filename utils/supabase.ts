import { Database } from '@/database.types'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'

export default createBrowserSupabaseClient<Database>()
