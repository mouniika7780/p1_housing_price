'use client';
import { useState, useEffect } from 'react';
import  { MarketAnalysisService } from '@/services/marketAnlaysis';

export function useMarketStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    MarketAnalysisService.getMarketStats()
      .then((res)=>setStats(res))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { stats, loading, error };
}
