import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mood AI',
  description: 'Mood AI is a journal app for tracking your mood with the help of AI. Make records every day, track your mood, change your life.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <ToastContainer position="bottom-right" autoClose={5000} />
        </body>
      </html>
    </ClerkProvider>
  )
}
