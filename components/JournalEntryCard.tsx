'use client';

import { FullJournalEntry } from "@/utils/types";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import { useRouter } from "next/navigation";
import { TrashIcon } from "@heroicons/react/24/outline";
const JournalEntryCard = ({ journalEntry }: { journalEntry: FullJournalEntry }) => {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const date = new Date(journalEntry.createdAt).toDateString();

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  const handleCardViewClick = () => {
    router.push(`/journal/${journalEntry.id}`);
  };

  return (
    <>
      <div
        className="divide-y divide-gray-200 rounded-lg bg-white shadow min-w-[100px] h-[250px] relative"
      >
        <div className="px-4 py-5 sm:px-6 flex justify-between relative">
          <div className="flex flex-row gap-4 items-center">
            <span>Mood:</span>
            <div className="w-8 h-8 rounded-3xl shadow-md" style={{ backgroundColor: journalEntry.analysis?.color || 'gray' }}></div>
          </div>
          {/** delete button */}
          <button
            onClick={handleDeleteClick}
            className="text-red-500 hover:text-red-700 font-bold rounded"
          >
            {/** delete icon */}
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="px-4 py-5 sm:px-6">
          <p className="line-clamp-3 leading-7 min-h-20">{journalEntry.content}</p>
        </div>
        <div className="px-4 py-5 sm:px-6 flex justify-between">
          <div>{date}</div>
          <button
            onClick={handleCardViewClick}
            className="text-blue-500 hover:text-blue-700 font-bold rounded"
          >
            View
          </button>
        </div>
      </div>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        journalId={journalEntry.id}
      />
    </>
  );
}

export default JournalEntryCard;
