import { UserButton } from '@clerk/nextjs';
import { ReactNode } from 'react';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return <div className='grid grid-rows-[60px_1fr] grid-cols-[200px_1fr] w-screen h-screen relative'>
    <aside className='row-span-3 border-r border-black/10'>
      <div className='flex items-center justify-center w-full h-[60px]'>
        <h1 className='text-2xl'>Mood AI</h1>
      </div>
    </aside>

    <div className='col-span-1 border-b border-black/10'>
      <header className='w-full h-full'>
        <div className='h-full w-full px-6 flex items-center justify-end'>
          <UserButton />
        </div>
      </header>
    </div>

    <div className='row-span-2 col-span-1'>{children}</div>
  </div>
}

export default DashboardLayout;
