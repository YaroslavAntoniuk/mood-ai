import { FullJournalEntry } from "@/utils/types";

const JournalEntryCard = ({ journalEntry }: { journalEntry: FullJournalEntry }) => {
  const date = new Date(journalEntry.createdAt).toDateString();

  return (
    <div className="divide-y divide-gray-200 rounded-lg
    bg-white shadow min-w-[100px]">
      <div className="px-4 py-5 sm:px-6 flex justify-between">
        <div>{date}</div>
        <div className="flex flex-row gap-4 items-center">
          <span>Mood:</span>
          <div className="w-8 h-8 rounded-3xl" style={{ backgroundColor: journalEntry.analysis?.color || 'gray' }}></div>
        </div>
      </div>
      <div className="px-4 py-5 sm:px-6 text-ellipsis">{journalEntry.content}</div>
      <div className="px-4 py-5 sm:px-6">{journalEntry.updatedAt.toDateString()}</div>
    </div>
  )
}

export default JournalEntryCard;
