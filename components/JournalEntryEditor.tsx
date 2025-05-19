'use client'

import { useAIUsage } from "@/context/AIUsageContext";
import { updateJournalEntry } from "@/utils/api";
import { FullJournalEntry, isErrorUI } from "@/utils/types";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const JournalEntryEditor = ({ journalEntry }: { journalEntry: FullJournalEntry }) => {
  const [content, setContent] = useState(journalEntry.content);
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(journalEntry.analysis);
  const { usageCount, usageLimit, updateUsage } = useAIUsage();

  const { mood, summary, color, subject, negative } = analysis || {};
  const analysisData = [
    { name: 'Summary', value: summary },
    { name: 'Subject', value: subject },
    { name: 'Mood', value: mood },
    { name: 'Is negative?', value: negative ? 'Yes' : 'No' },
  ];

  const handleSave = async (analyze: boolean) => {
    if (content === journalEntry.content && !analyze) return;
  
    setIsLoading(true);

    const updatedEntry = await updateJournalEntry(journalEntry.id, content, analyze);

    if (isErrorUI(updatedEntry)) {
      toast.error(updatedEntry.message);
      setIsLoading(false);
      return;
    }

    updateUsage(updatedEntry.usageCount);
    setAnalysis(updatedEntry.analysis);
    setShowToast(true);
    setIsLoading(false);
  };

  useEffect(() => {
    if (showToast) {
      toast.success('Journal entry saved!');
      setShowToast(false);
    }
  }, [showToast]);

  return (
    <div className="w-full h-full mt-4 grid grid-rows-2 lg:grid-cols-[2fr_1fr] gap-4">
      <div>
        <div className="text-sm text-gray-600 mb-4">
          <p>Note: If the usage count reaches the limit, AI analysis will not be performed on this journal entry.</p>
        </div>

        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-white/50 flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        )}

        <textarea
          className="w-full h-full border p-2 border-gray-200 outline-none text-xl"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />

        <div className="mt-4 flex gap-2">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => handleSave(false)}
          >
            Save Only
          </button>
          <button
            disabled={usageCount >= usageLimit}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handleSave(true)}
          >
            Save & Analyze
          </button>
        </div>
      </div>

      <div className="border-l border-b border-black/10">
        <div className="px-4 py-8" style={{ backgroundColor: color || 'white' }}>
          <h2 className="text-2xl drop-shadow-[0_2px_2px_rgba(255,247,247,0.25)]">Analysis</h2>
        </div>
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
  );
};

export default JournalEntryEditor;
