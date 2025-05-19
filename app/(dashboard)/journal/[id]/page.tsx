import JournalEntryEditor from "@/components/JournalEntryEditor";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { FullJournalEntry, Params } from "@/utils/types";
import { redirect } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";


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
      <Link href="/journal" className="flex items-center gap-2 mb-4 shadow-md p-2 rounded-md bg-white hover:bg-gray-100 transition-colors w-fit px-4">
        <ArrowLeftIcon className="w-4 h-4" />
        <span>Back</span>
      </Link>
      <div className="font-bold text-xl">{`Today's Mood/Story`}</div>
      <JournalEntryEditor journalEntry={journalEntry} />
    </div>
  );
}

export default JournalEntryPage;
