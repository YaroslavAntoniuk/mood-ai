'use client';

import { useState } from "react";

const QuestionBar = () => {
  const [question, setQuestion] = useState('');

  const onChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  return (
    <div>
      <form className="flex gap-6" onSubmit={handleSubmit}>
        <input type="text" value={question} onChange={onChangeQuestion} placeholder="Ask a question" className="w-[50%] h-12 px-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500" />
        <button className="bg-blue-400 text-white px-8 py-2 rounded-lg text-xl">Ask</button>
      </form>
    </div>
  )
}

export default QuestionBar;
