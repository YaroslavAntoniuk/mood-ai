import LinksList from '@/components/LinksList';
import { UsageBanner } from '@/components/UsageBanner';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { ReactNode } from 'react';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid grid-rows-[60px_1fr] grid-cols-1 lg:grid-cols-[200px_1fr] sm:w-screen h-screen relative">
      <aside className="col-span-1 row-span-2 border-r border-black/10 hidden lg:block">
        <Link href="/journal" className='flex items-center justify-center p-6 h-[60px]'>
          <h1 className="text-2xl">Mood AI</h1>
        </Link>
        <LinksList />
      </aside>

      <header className="col-span-1 border-b border-black/10 flex justify-between items-center p-4">
        <UsageBanner />
        <Link href="/journal" className='flex lg:hidden items-center justify-center h-[60px] border-b'>
          <h1 className="text-lg text-nowrap">Mood AI</h1>
        </Link>
        <LinksList className="flex lg:hidden flex-row gap-2 ml-4" />
        <div className='flex lg:w-full lg:items-center lg:justify-end'><UserButton /></div>
      </header>

      <main className="col-span-1 bg-slate-200/100 row-span-2 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout;
