import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yaqjetrnyvdmondsynokd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhZ2pldHJueXZkbW9uZHN5bm9rZCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzIwNjQ3NDc4LCJleHAiOjE3NTEyNzY2Nzh9.V10-FQ_eDbyT3WPG'

export const supabase = createClient(supabaseUrl, supabaseKey)
