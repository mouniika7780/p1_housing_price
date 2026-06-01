'use client';

import { useState } from 'react';
import { useProperties } from '@/hooks/useProperties';
import { Button } from '@/components/common/Button';
import { exportToCSV, exportToPDF } from '@/lib/exportUtils';
import { Download, FileText, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';

const columns = [
  {key:'id',label: 'ID'   },
  {key:'square_footage',label: 'Sq Ft'},
  {key:'bedrooms',label: 'Beds'},
  {key:'bathrooms',label: 'Baths'   },
  {key:'year_built',label: 'Year'},
  {key:'lot_size',label: 'Lot Size' },
  {key:'distance_to_city_center',label: 'Distance' },
  {key:'school_rating',label: 'School'},
  {key:'price',label: 'Price'},
];

export default function PropertyTable({ filters }) {
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey]= useState(null);
  const [sortDir, setSortDir] = useState('asc');
  const pageSize = 10;

  const { data, loading, error } = useProperties(page, pageSize, filters);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const getSortedData = (rows) => {
    if (!sortKey) return rows;
    return [...rows].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (sortDir === 'asc') return valA > valB ? 1 : -1;
      return valA < valB ? 1 : -1;
    });
  };

  const totalPages = data ? Math.ceil(data.total / pageSize) : 1;
  const rows = data ? getSortedData(data.data) : [];

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h5 className="text-slate-800">Property Listings</h5>
          <p className="text-sm text-slate-500 mt-1">
            {data ? `${data.total} properties found` : 'Loading...'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Download size={14} />}
            disabled={!data}
            onClick={() => exportToCSV(rows, 'properties')}
          >
            CSV
          </Button>
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<FileText size={14} />}
            disabled={!data}
            onClick={() => exportToPDF(rows, 'properties')}
          >
            PDF
          </Button>
        </div>
      </div>

      {loading && (
        <div className="animate-pulse space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 bg-slate-100 rounded" />
          ))}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          <p className="text-red-600 text-sm">Failed to load properties: {error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                {columns.map(({ key, label }) => (
                  <th
                    key={key}
                    onClick={() => handleSort(key)}
                    className="text-left py-3 px-3 text-xs font-medium text-slate-500 uppercase tracking-wide cursor-pointer hover:text-indigo-600 transition-colors"
                  >
                    <span className="flex items-center gap-1">
                      {label}
                      <ArrowUpDown size={12} className={sortKey === key ? 'text-indigo-600' : 'text-slate-300'} />
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.id}
                  className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
                >
                  <td className="py-3 px-3 text-slate-500">{row.id}</td>
                  <td className="py-3 px-3 text-slate-700">{row.square_footage.toLocaleString()}</td>
                  <td className="py-3 px-3 text-slate-700">{row.bedrooms}</td>
                  <td className="py-3 px-3 text-slate-700">{row.bathrooms}</td>
                  <td className="py-3 px-3 text-slate-700">{row.year_built}</td>
                  <td className="py-3 px-3 text-slate-700">{row.lot_size.toLocaleString()}</td>
                  <td className="py-3 px-3 text-slate-700">{row.distance_to_city_center} mi</td>
                  <td className="py-3 px-3">
                    <span className="badge badge-info">{row.school_rating}/10</span>
                  </td>
                  <td className="py-3 px-3 font-semibold text-indigo-600">
                    ${row.price.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
          <p className="text-sm text-slate-500">
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<ChevronLeft size={14} />}
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </Button>
            <Button
              variant="secondary"
              size="sm"
              rightIcon={<ChevronRight size={14} />}
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}