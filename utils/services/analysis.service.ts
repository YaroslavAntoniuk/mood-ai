import { JournalEntry } from '@prisma/client'
import { prisma } from '../db'
import { analyze } from './ai.service'

export const createAnalysis = async (journalEntry: JournalEntry) => {
  const analysis = await analyze(journalEntry.content)

  await prisma.analysis.create({
    data: {
      journalId: journalEntry.id,
      ...analysis,
    },
  })
}

export const updateAnalysis = async (journalEntry: JournalEntry) => {
  const analysis = await analyze(journalEntry.content)

  await prisma.analysis.update({
    where: {
      journalId: journalEntry.id,
    },
    data: analysis,
  })
}
