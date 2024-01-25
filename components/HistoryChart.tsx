'use client'

import { Analysis } from "@prisma/client";
import React from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import HistoryTooltip from "./HistoryTooltip";

interface HistoryChartProps {
  data: Analysis[]
}

const HistoryChart: React.FC<HistoryChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <LineChart width={300} height={100} data={data}>
        <Line
          dataKey="sentimentScore"
          type="monotone"
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{ r: 8 }}
          name="createdAt"
        />
        <XAxis dataKey="createdAt" />
        <Tooltip content={<HistoryTooltip />} />

      </LineChart>
    </ResponsiveContainer>
  )
}

export default HistoryChart;