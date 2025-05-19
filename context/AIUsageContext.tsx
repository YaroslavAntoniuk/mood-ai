'use client'

import { createContext, useContext, useEffect, useState } from 'react';

const AIUsageContext = createContext({
  usageCount: 0,
  updateUsage: (count: number) => {},
  usageLimit: 0,
});

export const AIUsageProvider = ({ children }: { children: React.ReactNode }) => {
  const [usageCount, setUsageCount] = useState(0);
  const usageLimit = 5;

  useEffect(() => {
    const getUsageCount = async () => {
      const response = await fetch('/api/usage')
      const data = await response.json()
      
      setUsageCount(data.data.usageCount)
    }

    getUsageCount()
  }, [])

  const updateUsage = (count: number) => {
    setUsageCount(count);
  }

  return (
    <AIUsageContext.Provider value={{ usageCount, updateUsage, usageLimit }}>
      {children}
    </AIUsageContext.Provider>
  );
};

export const useAIUsage = () => useContext(AIUsageContext);
