import JournalEntryCard from "@/components/JournalEntryCard";
import NewJournalEntry from "@/components/NewJournalEntry";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { JournalEntry } from "@prisma/client";

const getJournalEntries = async (): Promise<JournalEntry[]> => {
  const user = await getUserByClerkId({});
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return entries;
}

const Journal = async () => {
  const journalEntries = await getJournalEntries();

  return (
    <div className="p-10 bg-slate-200/100 h-full">
      <h1 className="text-3xl mb-8">Journal</h1>
      <div className="grid grid-cols-3 gap-4">
        <NewJournalEntry />
        {journalEntries.map((journalEntry) => (
          <JournalEntryCard key={journalEntry.id} journalEntry={journalEntry} />
        ))}
      </div>
    </div>
  )
}

export default Journal;