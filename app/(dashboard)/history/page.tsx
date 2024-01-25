import HistoryChart from "@/components/HistoryChart";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getAnalysis = async () => {
  const user = await getUserByClerkId();
  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  const sumAnalysis = analyses.reduce((acc, curr) => {
    return acc + curr.sentimentScore;
  }, 0);

  const avgAnalysis = sumAnalysis / analyses.length;

  return { analyses, avgAnalysis };
}

const History = async () => {
  const { analyses, avgAnalysis } = await getAnalysis();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div>{`Avg. Sentiment ${avgAnalysis}`}</div>
      <div className="w-5/6 h-2/6">
        <HistoryChart data={analyses} />
      </div>
    </div>
  )
}

export default History;
