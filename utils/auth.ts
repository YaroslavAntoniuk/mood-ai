import { auth, currentUser } from '@clerk/nextjs'
import { prisma } from './db'
import { redirect } from 'next/navigation'

export const getUserByClerkId = async (options = {}) => {
  const { userId } = await auth()
  if (!userId) {
    redirect('/sign-in')
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
    ...options,
  })

  if (!user) {
    const clerkUser = await currentUser()
    if (!clerkUser) {
      redirect('/sign-in')
    }

    const newUser = await prisma.user.create({
      data: {
        clerkId: userId,
        email: clerkUser.emailAddresses[0].emailAddress,
        name: `${clerkUser.firstName} ${clerkUser.lastName}`.trim() || null,
      },
      ...options,
    })

    return newUser
  }

  return user
}
