import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponseWrapper } from '@/utils/response-wrapper'
import { qa } from '@/utils/services/ai.service'
import { JournalQAEntry } from '@/utils/types'

export const POST = async (request: Request) => {
  const { question } = await request.json()
  const user = await getUserByClerkId()

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

  const answer = await qa(question, entries)

  return NextResponseWrapper(answer)
}
