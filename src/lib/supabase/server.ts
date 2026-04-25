import { createClient } from '@supabase/supabase-js';

const url         = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const anonKey     = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/** For server components / route handlers — read-only public data */
export function createServerClient() {
  return createClient(url, anonKey);
}

/** For API route handlers that write data (admin mutations) */
export function createAdminClient() {
  return createClient(url, serviceRole, {
    auth: { persistSession: false },
  });
}
