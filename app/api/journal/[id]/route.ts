export const dynamic = 'force-dynamic';

import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { NextResponseWrapper } from '@/utils/response-wrapper';
import { upsertAnalysis } from '@/utils/services/analysis.service';
import { FullJournalEntry, Params } from '@/utils/types';
import { revalidatePath } from 'next/cache';

export const PUT = async (req: Request, context: { params: Params }) => {
  const { searchParams } = new URL(req.url);
  const shouldAnalyze = searchParams.get('analyze') === 'true';

  const { content } = await req.json();
  const user = await getUserByClerkId();
  const isOutOfCredits = user.usageCount >= user.usageLimit;

  // Update the journal entry first
  const updatedJournalEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: context.params.id,
      },
    },
    data: { content },
    include: { analysis: true },
  });

  let analysis = updatedJournalEntry.analysis;

  // Only call upsertAnalysis if explicitly requested
  if (shouldAnalyze) {
    // upsertAnalysis handles whether to return real or mock analysis
    analysis = await upsertAnalysis(updatedJournalEntry, isOutOfCredits);

    // Only increment usage if we gave real analysis
    if (!isOutOfCredits) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          usageCount: {
            increment: 1,
          },
        },
      });

      // Update local usageCount
      user.usageCount += 1;
    }
  }

  revalidatePath('/journal');

  return NextResponseWrapper<FullJournalEntry & { usageCount: number }>({
    ...updatedJournalEntry,
    analysis,
    usageCount: user.usageCount,
  });
};

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
