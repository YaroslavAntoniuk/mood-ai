import JournalEntryEditor from "@/components/JournalEntryEditor";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { CreatedJournalEntry, Params } from "@/utils/types";

const getJournalEntry = async (id: string): Promise<CreatedJournalEntry> => {
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

  if (!journalEntry) throw new Error("Journal entry not found");

  return journalEntry;
}

const JournalEntryPage = async ({ params }: { params: Params }) => {
  const journalEntry = await getJournalEntry(params.id);
  const { mood, summary, color, subject, negative } = journalEntry.analysis || {};
  const analysisData = [
    { name: 'Summary', value: summary },
    { name: 'Subject', value: subject },
    { name: 'Mood', value: mood },
    { name: 'Is negative?', value: negative ? 'Yes' : 'No' },
    { name: 'Color', value: color },
  ]

  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2 p-4">
        <div className="font-bold text-xl">{`Today's Mood/Story`}</div>
        <JournalEntryEditor journalEntry={journalEntry} />
      </div>
      <div className="border-l border-black/10">
        <div className={`px-4 py-8`} style={{ backgroundColor: color || 'white' }}>
          <h2 className="text-2xl drop-shadow-[0_2px_2px_rgba(255,247,247,0.25)]">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map(({ name, value }) => (
              <li key={name}>
                <div className="flex justify-between items-center px-4 py-2 border-b">
                  <div className="font-bold mr-2">{name}</div>
                  <div className="text-right">{value}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default JournalEntryPage;
