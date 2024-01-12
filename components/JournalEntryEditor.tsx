'use client'

import { JournalEntry } from "@prisma/client";
import { useState } from "react";

const JournalEntryEditor = ({ journalEntry }: { journalEntry: JournalEntry }) => {
  const [content, setContent] = useState(journalEntry.content);

  return (
    <div className="w-5/6 h-5/6 p-4">
      <textarea
        className="w-full h-full border p-2 border-gray-200 outline-none text-xl"
        onChange={e => setContent(e.target.value)}
        value={content}
      />
    </div>
  )
}

export default JournalEntryEditor;