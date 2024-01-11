import Link from "next/link";

export default function Home() {
  return <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
    <div className="w-full max-w-[600px] mx-auto">
      <h1 className="text-6xl">Journal Mood App AI</h1>
      <p className="text-2xl text-white/50 p-4">The app for tracking your mood with the help of AI. Make records every day, track your mood, change your life.</p>

      <div className="w-full flex justify-center items-center">
        <Link href="/journal">
          <button className="bg-black px-6 py-4 rounded-lg text-xl shadow-[0_0_40px_1px_#48abe0]">Get Started</button>
        </Link>
      </div>
    </div>
  </div>
}
