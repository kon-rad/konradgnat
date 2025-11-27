import ReactMarkdown from 'react-markdown';
import parse from 'html-react-parser';
import { prisma } from '@/lib/prisma';

export default async function Projects() {
  const data = await prisma.hackathon.findMany({
    orderBy: { created_on: 'desc' }
  });
  console.log('hacks: ', data);

  return (
    <div className="content__container">
      <h1>coming soon</h1>
    </div>
  );
}
