import { JournalEntry } from "@prisma/client";

const JournalEntryCard = ({ journalEntry }: { journalEntry: JournalEntry }) => {
  return (
    <div className="card">
      <h2>{journalEntry.content}</h2>
      <p>{journalEntry.createdAt.toISOString()}</p>
    </div>
  );
}

export default JournalEntryCard;
