import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { ReactNode } from 'react';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return <div className='grid grid-rows-[60px_1fr] grid-cols-1 lg:grid-cols-[200px_1fr] sm: w-screen h-screen relative'>
    <aside className='row-span-3 border-r border-black/10 hidden lg:block'>
      <div className='flex items-center justify-center w-full h-[60px]'>
        <Link href='/journal'>
          <h1 className='text-2xl'>Mood AI</h1>
        </Link>
      </div>
    </aside>

    <div className='border-b border-black/10'>
      <header className='flex justify-between items-center flex-row w-full h-full'>
        <Link href='/journal' className='lg:hidden w-fit whitespace-nowrap px-6'>
          <h1 className='text-2xl'>Mood AI</h1>
        </Link>
        <div className='h-full w-full px-6 flex items-center justify-end'>
          <UserButton />
        </div>
      </header>
    </div>

    <div>{children}</div>
  </div>
}

export default DashboardLayout;
