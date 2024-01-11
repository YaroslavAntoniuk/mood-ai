'use client';

import { createNewJournalEntry } from "@/utils/api";
import { useRouter } from "next/navigation";

const NewJournalEntry = () => {
  const router = useRouter();
  const handleAddJournalEntry = async () => {
    const data = await createNewJournalEntry('');

    router.push(`/journal/${data.id}`)
  }

  return (
    <div className="cursor-pointer bg-white shadow-md rounded-md px-6 py-4">
      <div className="px-4 py-5 sm:p-6" onClick={handleAddJournalEntry}>
        <span className="text-xl">New Journal Entry</span>
      </div>
    </div>
  );
}

export default NewJournalEntry;
