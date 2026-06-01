'use client';

import { useState } from 'react';
import StatsCards from '@/components/dashboard/StatsCards';
import PriceDistributionChart from '@/components/dashboard/PriceDistributionChart';
import PropertyTable from '@/components/dashboard/PropertyTable';
import FilterPanel from '@/components/dashboard/FilterPanel';
import WhatIfTool from '@/components/dashboard/WhatIfTool';

export default function MarketAnalysisPage() {
  const [filters, setFilters] = useState({});

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Property Market Analysis
        </h1>
        <p className="text-gray-500 mt-1">
          Explore market trends, analyse segments and predict property values.
        </p>
      </div>

      <StatsCards filters={filters} />

      <div className="mt-8">
        <FilterPanel onFilterChange={setFilters} />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PriceDistributionChart />
        <WhatIfTool />
      </div>

      <div className="mt-8">
        <PropertyTable filters={filters} />
      </div>

    </div>
  );
}