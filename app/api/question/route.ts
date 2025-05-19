import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponseWrapper } from '@/utils/response-wrapper'
import { qa } from '@/utils/services/ai.service'
import { JournalQAEntry } from '@/utils/types'

export const POST = async (request: Request) => {
  const { question } = await request.json()
  const user = await getUserByClerkId()

  const isOutOfCredits = user.usageCount >= user.usageLimit
  const entries: JournalQAEntry[] = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  })

  const answer = await qa(question, entries, isOutOfCredits)

  if (!isOutOfCredits) {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        usageCount: {
          increment: 1,
        },
      },
    })
  }

  return NextResponseWrapper({answer, usageCount: user.usageCount})
}
