'use client';

import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { filterFields } from '@/sampleData/data';


const defaultFilters = filterFields.reduce((acc, f) => {
  acc[f.name] = '';
  return acc;
}, {});

export default function FilterPanel({ onFilterChange }) {
  const [filters, setFilters]= useState(defaultFilters);
  const [isOpen, setIsOpen]= useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    const cleaned = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== '')
    );
    onFilterChange(cleaned);
    setIsOpen(false);
  };

  const handleReset = () => {
    setFilters(defaultFilters);
    onFilterChange({});
    setIsOpen(false);
  };

  const activeCount = Object.values(filters).filter((v) => v !== '').length;

  return (
    <div className="card">

      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-indigo-600" />
          <h5 className="text-slate-800">Filter Properties</h5>
          {activeCount > 0 && (
            <span className="badge badge-info">{activeCount} active</span>
          )}
        </div>
        <span className="text-slate-400 text-sm">
          {isOpen ? 'Hide' : 'Show'}
        </span>
      </div>

      {isOpen && (
        <div className="mt-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {filterFields.map(({ name, label, placeholder }) => (
              <Input
                key={name}
                type="number"
                name={name}
                value={filters[name]}
                onChange={handleChange}
                label={label}
                placeholder={placeholder}
                fieldSize="sm"
              />
            ))}
          </div>

          <div className="flex gap-3 mt-4">
            <Button variant="primary" size="sm" onClick={handleApply}>
              Apply Filters
            </Button>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<X size={14} />}
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}