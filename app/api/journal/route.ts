import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { upsertAnalysis } from '@/utils/services/analysis.service'
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

  await upsertAnalysis(journalEntry, true)

  revalidatePath('/journal')

  return NextResponseWrapper({journalEntry, usageCount: user.usageCount})
}
