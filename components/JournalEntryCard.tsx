import { JournalEntry } from "@prisma/client";

const JournalEntryCard = ({ journalEntry }: { journalEntry: JournalEntry }) => {
  const date = new Date(journalEntry.createdAt).toDateString();

  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg
    bg-white shadow">
      <div className="px-4 py-5 sm:px-6">{date}</div>
      <div className="px-4 py-5 sm:px-6">{journalEntry.content}</div>
      <div className="px-4 py-5 sm:px-6">{journalEntry.updatedAt.toDateString()}</div>
    </div>
  )
}

export default JournalEntryCard;
