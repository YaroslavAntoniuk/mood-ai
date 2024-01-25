'use client';

import { askQuestion } from "@/utils/api";
import { isErrorUI } from "@/utils/types";
import { useState } from "react";

const QuestionBar = () => {
  const [question, setQuestion] = useState('');
  const [savedQuestion, setSavedQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState('');

  const onChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value)
    setSavedQuestion(e.target.value)
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
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="question" className="text-lg">You can ask a question about any of your entries</label>
        </div>
        <div className="flex gap-6">
          <input id="question" disabled={loading} type="text" value={question} onChange={onChangeQuestion} placeholder="Ask a question" className="w-[50%] h-12 px-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500" />
          <button disabled={loading} className="bg-blue-400 text-white px-8 py-2 rounded-lg text-xl">Ask</button>
        </div>
      </form>
      {loading && <div className="absolute top-0 left-0 w-full h-full bg-white/50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>}
      {answer && <div className="mt-6 p-6 bg-white rounded-lg">
        <div className="text-lg mb-4"><span className="font-bold">Question:</span> {savedQuestion}</div>
        <div className="text-lg"><span className="font-bold">Answer:</span> {answer}</div>
      </div>}
    </div>
  )
}

export default QuestionBar;
