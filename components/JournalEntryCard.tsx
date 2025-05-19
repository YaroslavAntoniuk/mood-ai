'use client';

import { FullJournalEntry } from "@/utils/types";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import { useRouter } from "next/navigation";

const JournalEntryCard = ({ journalEntry }: { journalEntry: FullJournalEntry }) => {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const date = new Date(journalEntry.createdAt).toDateString();

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  const handleCardClick = () => {
    router.push(`/journal/${journalEntry.id}`);
  };

  return (
    <>
      <div 
        onClick={handleCardClick}
        className="cursor-pointer divide-y divide-gray-200 rounded-lg bg-white shadow min-w-[100px] h-[250px] relative"
      >
        <div className="px-4 py-5 sm:px-6 flex justify-between">
          <div>{date}</div>
          <div className="flex flex-row gap-4 items-center">
            <span>Mood:</span>
            <div className="w-8 h-8 rounded-3xl" style={{ backgroundColor: journalEntry.analysis?.color || 'gray' }}></div>
          </div>
        </div>
        <div className="px-4 py-5 sm:px-6">
          <p className="line-clamp-3 leading-7 min-h-20">{journalEntry.content}</p>
        </div>
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>{journalEntry.updatedAt.toDateString()}</div>
          <button
            onClick={handleDeleteClick}
            className="text-red-500 hover:text-red-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
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
