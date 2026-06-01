'use client';

import { useMarketStats } from '@/hooks/useMarketStats';

const statConfig = [
  {
    key:'total_properties',
    label:'Total Properties',
    format:(v) => v,
  },
  {
    key:'avg_price',
    label:'Average Price',
    format:(v) => `$${v.toLocaleString()}`,
  },
  {
    key:'median_price',
    label:'Median Price',
    format:(v) => `$${v.toLocaleString()}`,
  },
  {
    key:'avg_school_rating',
    label:'Avg School Rating',
    format:(v) => `${v} / 10`,
  },
];

export default function StatsCards({ filters }) {
  const { stats, loading, error } = useMarketStats();

  console.log('StatsCards - stats:', stats, 'loading:', loading, 'error:', error);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card animate-pulse">
            <div className="h-4 bg-slate-200 rounded w-1/2 mb-3" />
            <div className="h-8 bg-slate-200 rounded w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="card border-red-200 bg-red-50">
        <p className="text-red-600 text-sm">Failed to load stats:{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statConfig.map(({ key, label, icon:Icon, format, color, bg }) => (
        <div key={key} className="card">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-slate-500 font-medium">{label}</p>
          </div>
          <p className={`text-2xl font-bold ${color}`}>
            {stats ? format(stats[key]) :'—'}
          </p>
        </div>
      ))}
    </div>
  );
}