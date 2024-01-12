import JournalEntryEditor from "@/components/JournalEntryEditor";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { Params } from "@/utils/types";
import { JournalEntry } from "@prisma/client";

const getJournalEntry = async (id: string): Promise<JournalEntry> => {
  const user = await getUserByClerkId();
  const journalEntry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id
      }
    },
  });

  if (!journalEntry) throw new Error("Journal entry not found");

  return journalEntry;
}

const JournalEntryPage = async ({ params }: { params: Params }) => {
  const journalEntry = await getJournalEntry(params.id);

  return (
    <div className="w-full h-full">
      <div>Journal Entry Page</div>
      <JournalEntryEditor journalEntry={journalEntry} />
    </div>
  );
}

export default JournalEntryPage;
