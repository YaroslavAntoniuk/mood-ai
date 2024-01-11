import { auth } from '@clerk/nextjs'
import { prisma } from './db'

export const getUserByClerkId = async (options = {}) => {
  const { userId } = await auth()
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId as string,
    },
    ...options,
  })

  return user
}
