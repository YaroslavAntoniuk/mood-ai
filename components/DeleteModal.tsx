'use client';

import { deleteJournalEntry } from "@/utils/api";
import { isErrorUI } from "@/utils/types";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  journalId: string;
}

const DeleteModal = ({ isOpen, onClose, journalId }: DeleteModalProps) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleDelete = async () => {
    const result = await deleteJournalEntry(journalId);
    
    if (isErrorUI(result)) {
      toast.error(result.message);
      return;
    }

    toast.success('Journal entry deleted successfully');
    router.refresh();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Delete Journal Entry</h2>
        <p className="mb-6">Are you sure you want to delete this journal entry? This action cannot be undone.</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal; 