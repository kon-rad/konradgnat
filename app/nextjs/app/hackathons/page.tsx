import ReactMarkdown from 'react-markdown';
import parse from 'html-react-parser';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export default async function Projects() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });
  const { data, error } = await supabase
    .from('hackathons')
    .select()
    .order('created_on', { ascending: false });
  console.log('hacks: ', data);

  return (
    <div className="content__container">
      <h1>coming soon</h1>
    </div>
  );
}
