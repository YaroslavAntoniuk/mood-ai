'use client'

import { useAIUsage } from '@/context/AIUsageContext';

export const UsageBanner = () => {
  const { usageCount, usageLimit} = useAIUsage(); 

  const percentage = Math.min((usageCount / usageLimit) * 100, 100)

  return (
    <div className="w-full bg-transparent">
      <div className="flex justify-between items-center text-sm">
        <span>
          AI Usage: <strong>{usageCount}</strong> / {usageLimit}
        </span>
        <span className="text-xs text-gray-500">{percentage.toFixed(0)}%</span>
      </div>
      <div className="h-1 w-full bg-gray-200 rounded mt-1">
        <div
          className="h-1 bg-blue-500 rounded transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
