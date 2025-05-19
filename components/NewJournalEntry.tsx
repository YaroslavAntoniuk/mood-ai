'use client';

import { createNewJournalEntry } from "@/utils/api";
import { useRouter } from "next/navigation";
import { isErrorUI } from "@/utils/types";
import { toast } from "react-toastify";
import { useState } from "react";

const NewJournalEntry = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddJournalEntry = async () => {
    setIsLoading(true);
    try {
      const data = await createNewJournalEntry('');

      if (isErrorUI(data)) {
        toast.error(data.message);
        return;
      }

      router.push(`/journal/${data.id}`);
      router.refresh();
    } catch (error) {
      toast.error('Failed to create journal entry');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="cursor-pointer bg-white shadow-md rounded-md px-6 py-4 relative">
      <div className="px-4 py-5 sm:p-6" onClick={handleAddJournalEntry}>
        <span className="text-xl">New Journal Entry</span>
      </div>
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-white/50 flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
    </div>
  );
}

export default NewJournalEntry;
