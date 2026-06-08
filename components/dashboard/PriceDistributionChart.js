'use client';

import { usePriceDistribution } from '@/hooks/usePriceDistribution';
import {BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg shadow-md px-4 py-2">
        <p className="text-sm font-medium text-slate-800">{label}</p>
        <p className="text-sm text-indigo-600 font-bold">
          {payload[0].value} properties
        </p>
      </div>
    );
  }
  return null;
};

export default function PriceDistributionChart() {
  const { distribution, loading, error } = usePriceDistribution();

  if (loading) {
    return (
      <div className="card animate-pulse">
        <div className="h-4 bg-slate-200 rounded w-1/3 mb-4" />
        <div className="h-48 bg-slate-100 rounded" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="card border-red-200 bg-red-50">
        <p className="text-red-600 text-sm">Failed to load chart: {error}</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="mb-4">
        <h5 className="text-slate-800">Price Distribution</h5>
        <p className="text-sm text-slate-500 mt-1">
          Number of properties per price range
        </p>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={distribution} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis
            dataKey="range"
            tick={{ fontSize: 11, fill: '#94A3B8' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#94A3B8' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="count"
            fill="#4F46E5"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}