import JournalEntryCard from "@/components/JournalEntryCard";
import NewJournalEntry from "@/components/NewJournalEntry";
import QuestionBar from "@/components/QuestionBar";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { FullJournalEntry } from "@/utils/types";

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
    <div className="p-8 h-full">
      <h1 className="text-3xl mb-8">Journal</h1>
      <div className="my-8">
        <QuestionBar />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <NewJournalEntry />
        {journalEntries.map((journalEntry) => (
          <JournalEntryCard key={journalEntry.id} journalEntry={journalEntry} />
        ))}
      </div>
    </div>
  )
}

export default Journal;