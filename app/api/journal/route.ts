import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponseWrapper } from '@/utils/response-wrapper'

export const POST = async (req: Request) => {
  const user = await getUserByClerkId()
  const journalEntry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'Hello World!',
    },
  })

  return NextResponseWrapper(journalEntry)
}
