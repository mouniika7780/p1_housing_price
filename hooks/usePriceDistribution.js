'use client';
import { useState, useEffect } from 'react';
import  { MarketAnalysisService } from '@/services/marketAnlaysis';



export function usePriceDistribution() {
  const [distribution, setDistribution] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    MarketAnalysisService.getPriceDistribution()
      .then((res)=>setDistribution(res))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { distribution, loading, error };
}
