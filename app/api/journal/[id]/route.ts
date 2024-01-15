import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { updateAnalysis } from '@/utils/services/analysis.service'
import { NextResponseWrapper } from '@/utils/response-wrapper'
import { Params } from '@/utils/types'
import { JournalEntry } from '@prisma/client'

export const PUT = async (req: Request, context: { params: Params }) => {
  const { content } = await req.json()

  const user = await getUserByClerkId()
  const updatedJournalEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: context.params.id,
      },
    },
    data: {
      content,
    },
  })

  await updateAnalysis(updatedJournalEntry)

  return NextResponseWrapper<JournalEntry>(updatedJournalEntry)
}
