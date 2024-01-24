'use client';

import { askQuestion } from "@/utils/api";
import { isErrorUI } from "@/utils/types";
import { useState } from "react";

const QuestionBar = () => {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState('');
  const onChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const answer = await askQuestion(question);

    if (isErrorUI(answer)) {
      setAnswer('Sorry, I could not answer your question');
    } else {
      setAnswer(answer);
    }

    setQuestion('');
    setLoading(false);
  }

  return (
    <div>
      <form className="flex gap-6" onSubmit={handleSubmit}>
        <input disabled={loading} type="text" value={question} onChange={onChangeQuestion} placeholder="Ask a question" className="w-[50%] h-12 px-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500" />
        <button disabled={loading} className="bg-blue-400 text-white px-8 py-2 rounded-lg text-xl">Ask</button>
      </form>
      {loading && <div className="absolute top-0 left-0 w-full h-full bg-white/50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>}
      {answer && <div className="mt-6"> {answer} </div>}
    </div>
  )
}

export default QuestionBar;
