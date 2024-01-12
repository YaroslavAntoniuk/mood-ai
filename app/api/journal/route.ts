import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponseWrapper } from '@/utils/response-wrapper'
import { revalidatePath } from 'next/cache'

export const POST = async () => {
  const user = await getUserByClerkId()
  const journalEntry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'Hello World!',
    },
  })

  revalidatePath('/journal')

  return NextResponseWrapper(journalEntry)
}
