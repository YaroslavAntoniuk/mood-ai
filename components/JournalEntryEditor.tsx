'use client'

import { updateJournalEntry } from "@/utils/api";
import { JournalEntry } from "@prisma/client";
import { useEffect, useState } from "react";
import { useAutosave } from "react-autosave";
import { toast } from 'react-toastify';

const JournalEntryEditor = ({ journalEntry }: { journalEntry: JournalEntry }) => {
  const [content, setContent] = useState(journalEntry.content);
  const [showToast, setShowToast] = useState(false);

  const handleSave = async (currContent: string) => {
    if (currContent === journalEntry.content) return;

    await updateJournalEntry(journalEntry.id, currContent);
    setShowToast(true);
  }

  useAutosave({
    data: content,
    onSave: handleSave
  })

  useEffect(() => {
    if (showToast) {
      toast.success('Journal entry saved!');
      setShowToast(false);
    }
  }, [showToast])


  return (
    <div className="w-5/6 h-5/6 mt-4">
      <textarea
        className="w-full h-full border p-2 border-gray-200 outline-none text-xl"
        onChange={e => setContent(e.target.value)}
        value={content}
      />
    </div>
  )
}

export default JournalEntryEditor;