'use client';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../database.types';

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>();
  const redirectUrl = `${process.env.NEXT_PUBLIC_URL}/auth/callback`;

  return (
    <Auth
      supabaseClient={supabase}
      view="magic_link"
      appearance={{ theme: ThemeSupa }}
      theme="dark"
      showLinks={false}
      providers={[]}
      redirectTo={redirectUrl}
    />
  );
}
