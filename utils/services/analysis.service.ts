import { JournalEntry } from '@prisma/client'
import { prisma } from '../db'
import { analyze } from './ai.service'

export const upsertAnalysis = async (journalEntry: JournalEntry, useMockData: boolean = false) => {
  const analysis = await analyze(journalEntry.content, useMockData)

  return await prisma.analysis.upsert({
    where: {
      journalId: journalEntry.id,
    },
    create: {
      journalId: journalEntry.id,
      userId: journalEntry.userId,
      ...analysis,
    },
    update: analysis,
  })
}
