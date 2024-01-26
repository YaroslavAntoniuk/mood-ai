'use client'

import { updateJournalEntry } from "@/utils/api";
import { FullJournalEntry, isErrorUI } from "@/utils/types";
import { useEffect, useState } from "react";
import { useAutosave } from "react-autosave";
import { toast } from 'react-toastify';

const JournalEntryEditor = ({ journalEntry }: { journalEntry: FullJournalEntry }) => {
  const [content, setContent] = useState(journalEntry.content);
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(journalEntry.analysis);

  const { mood, summary, color, subject, negative } = analysis || {};
  const analysisData = [
    { name: 'Summary', value: summary },
    { name: 'Subject', value: subject },
    { name: 'Mood', value: mood },
    { name: 'Is negative?', value: negative ? 'Yes' : 'No' },
  ]

  const handleSave = async (currContent: string) => {

    if (currContent === journalEntry.content) return;
    setIsLoading(true);

    const updatedEntry = await updateJournalEntry(journalEntry.id, currContent);

    if (isErrorUI(updatedEntry)) {
      'use server'
      toast.error(updatedEntry.message);
      return;
    }

    setAnalysis(updatedEntry.analysis);
    setShowToast(true);
    setIsLoading(false);
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
    <div className="w-full h-full mt-4 grid grid-rows-2 lg:grid-cols-[2fr_1fr] gap-4">
      <div>
        {isLoading && <div className="absolute top-0 left-0 w-full h-full bg-white/50 flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>}
        <textarea
          className="w-full h-full border p-2 border-gray-200 outline-none text-xl"
          onChange={e => setContent(e.target.value)}
          value={content}
        />
      </div>
      <div className="border-l border-b border-black/10">
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
  )
}

export default JournalEntryEditor;