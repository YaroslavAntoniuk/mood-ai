export const dynamic = 'force-dynamic'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponseWrapper } from '@/utils/response-wrapper'
import { upsertAnalysis } from '@/utils/services/analysis.service'
import { FullJournalEntry, Params } from '@/utils/types'

export const PUT = async (req: Request, context: { params: Params }) => {
  const { content } = await req.json()

  const user = await getUserByClerkId()
  const isOutOfCredits = user.usageCount >= user.usageLimit
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
    include: {
      analysis: true,
    },
  })

  const analysis = await upsertAnalysis(updatedJournalEntry, isOutOfCredits)

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

  return NextResponseWrapper<FullJournalEntry & { usageCount: number }>({
    ...updatedJournalEntry,
    analysis,
    usageCount: user.usageCount,
  })
}

export const DELETE = async (req: Request, context: { params: Params }) => {
  const user = await getUserByClerkId()

  await prisma.journalEntry.delete({
    where: {
      userId_id: {
        userId: user.id,
        id: context.params.id,
      },
    },
  })

  return NextResponseWrapper({ success: true })
}
