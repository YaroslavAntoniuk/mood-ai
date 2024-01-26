import { auth } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();

  const href = userId ? "/journal" : "/new-user";

  return <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
    <div className="w-full max-w-[600px] mx-auto p-6 text-center">
      <h1 className="text-5xl mb-6 lg:text-6xl">Mood AI</h1>
      <p className="text-xl lg:text-2xl text-white/50 mb-10">The <span className="font-bold">journal</span> app for tracking your mood with the help of <span className="font-bold">AI</span>. Make records every day, track your mood, <span className="font-bold">change your life</span>.</p>

      <div className="w-full flex justify-center items-center">
        <Link href={href}>
          <button className="bg-black px-6 py-4 lg:px-12 lg:py-6 lg:text-2xl rounded-lg text-xl shadow-[0_0_40px_1px_#48abe0]">Get Started</button>
        </Link>
      </div>
    </div>
  </div>
}
