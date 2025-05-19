import JournalEntryEditor from "@/components/JournalEntryEditor";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { FullJournalEntry, Params } from "@/utils/types";
import { redirect } from "next/navigation";

const getJournalEntry = async (id: string): Promise<FullJournalEntry> => {
  const user = await getUserByClerkId();
  const journalEntry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id
      }
    },
    include: {
      analysis: true
    }
  });

  if (!journalEntry) {
    redirect('/journal');
  }

  return journalEntry;
}

const JournalEntryPage = async ({ params }: { params: Params }) => {
  const journalEntry = await getJournalEntry(params.id);

  return (
    <div className="h-5/6 p-4">
      <div className="font-bold text-xl">{`Today's Mood/Story`}</div>
      <JournalEntryEditor journalEntry={journalEntry} />
    </div>
  );
}

export default JournalEntryPage;
