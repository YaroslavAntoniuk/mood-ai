import JournalEntryCard from "@/components/JournalEntryCard";
import NewJournalEntry from "@/components/NewJournalEntry";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { FullJournalEntry } from "@/utils/types";
import Link from "next/link";

const getJournalEntries = async (): Promise<FullJournalEntry[]> => {
  const user = await getUserByClerkId({});
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      analysis: true
    }
  });

  return entries;
}

const Journal = async () => {
  const journalEntries = await getJournalEntries();

  return (
    <div className="p-8 bg-slate-200/100 h-full">
      <h1 className="text-3xl mb-8">Journal</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <NewJournalEntry />
        {journalEntries.map((journalEntry) => (
          <Link href={`/journal/${journalEntry.id}`} key={journalEntry.id}>
            <JournalEntryCard journalEntry={journalEntry} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Journal;