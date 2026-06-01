'use client';

import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { MarketAnalysisService } from '@/services/marketAnlaysis';
import { Input } from '@/components/common/Input';
import { fields, defaultForm } from '@/sampleData/data';


export default function WhatIfTool() {
  const [form, setForm] = useState(defaultForm);
  const [result, setResult]= useState(null);
  const [loading, setLoading]= useState(false);
  const [error, setError]= useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const payload = Object.fromEntries(
        Object.entries(form).map(([k, v]) => [k, parseFloat(v)])
      );
      const data = await MarketAnalysisService.whatIfPrediction(payload);
      setResult(data);
      console.log('Prediction result:', data);
    } catch (err) {
      setError('Prediction failed. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = Object.values(form).every((v) => v !== '');

  return (
    <div className="card">
      <div className="mb-4">
        <h5 className="text-slate-800 flex items-center gap-2">
          What-If Analysis
        </h5>
        <p className="text-sm text-slate-500 mt-1">
          Enter property details to predict its price
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {fields.map(({ name, label,type, placeholder }) => (
          <div key={name}>
            <label className="text-xs text-slate-500 font-medium mb-1 block">
              {label}
            </label>

            <Input
              name={name}
              id={name}
              type={type}
              value={form[name]}
              onChange={handleChange}
              placeholder={placeholder}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Button
          variant="primary"
          size="md"
          fullWidth
          isLoading={loading}
          disabled={!isFormValid}
          onClick={handleSubmit}
        >
          Predict Price
        </Button>
      </div>

      {error && (
        <div className="mt-3 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-4 bg-indigo-50 border border-indigo-200 rounded-lg px-4 py-3">
          <p className="text-xs text-indigo-400 font-medium uppercase tracking-wide mb-1">
            Predicted Price
          </p>
          <p className="text-2xl font-bold text-indigo-600">
            ${result.prediction.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}