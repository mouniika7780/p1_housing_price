'use client';
import { useState, useEffect } from 'react';
import  { MarketAnalysisService } from '@/services/marketAnlaysis';

export function useProperties(page, pageSize, filters) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    MarketAnalysisService.getProperties(page, pageSize, filters)
    .then((res)=> setData(res))
    .catch((err) => setError(err.message))
    .finally(() => setLoading(false));
  }, [page, pageSize, JSON.stringify(filters)]);

  return { data, loading, error };
}
