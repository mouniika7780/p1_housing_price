import Link from 'next/link';
import { BarChart2, Filter, Sparkles, Download } from 'lucide-react';


export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">

      <div className="text-center mb-16">
        <h1 className="text-gray-900 mb-4">
          Property Market Analysis
        </h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto mb-8">
          Explore market analyse property segments and predict values.
        </p>
        <Link
          href="/market-analysis"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700
          text-white font-medium px-6 py-3 rounded-lg transition-colors no-underline"
        >
          Go to Dashboard →
        </Link>
      </div>
    </div>
  );
}