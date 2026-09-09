import { useState } from 'react';
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { Issue } from '../types';

interface ActiveReportsProps {
  issues?: Issue[];
  onAssign?: (issue: any) => void;
}

export default function ActiveReports({ onAssign }: ActiveReportsProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'resolved'>('all');

  // Hardcoded mockup data matrix drawn precisely from image_dff6e6.jpg
  const mockupReports = [
    { id: 'IC-005', type: 'Garbage', location: '7 Tombs Road, Tolichowki', status: 'pending', date: '23-May-2026', icon: '🗑️' },
    { id: 'IC-004', type: 'Broken Pipe', location: 'Sector 4', status: 'resolved', date: '05-May-2026', icon: '💧' },
    { id: 'IC-003', type: 'Pothole', location: 'Pillar 145, Attapur', status: 'in-progress', date: '15-May-2026', icon: '🚧' },
    { id: 'IC-002', type: 'Broken Streetlight', location: 'Gulshan Colony', status: 'pending', date: '14-Mar-2026', icon: '💡' },
    { id: 'IC-001', type: 'Pothole', location: 'Shaikpet', status: 'pending', date: '15-Mar-2026', icon: '🚧' },
  ];

  // Dynamic evaluation layer for localized simulation searches
  const filteredReports = mockupReports.filter(row => {
    const matchesSearch = row.type.toLowerCase().includes(search.toLowerCase()) || 
                          row.id.toLowerCase().includes(search.toLowerCase()) ||
                          row.location.toLowerCase().includes(search.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'pending') return matchesSearch && (row.status === 'pending' || row.status === 'active');
    return matchesSearch && row.status === filter;
  });

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-600 font-bold';
      case 'in-progress': return 'bg-amber-100 text-amber-600 font-bold';
      case 'resolved': return 'bg-emerald-100 text-emerald-600 font-bold';
      default: return 'bg-slate-200 text-slate-500 font-bold'; // pending
    }
  };

  return (
    <div className="flex flex-col h-full gap-4 animate-in fade-in duration-300">
      {/* Dynamic Descriptive Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Active Reports</h1>
          <p className="text-slate-500 text-sm">Monitor and manage all regional infrastructure reports.</p>
        </div>

        {/* Global Structural Sub-Search Form Element */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reports..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-medium/20 text-slate-900 shadow-2xs"
            />
          </div>
          <button className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-2xs text-slate-500 transition-colors">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Roster Layout Filter Options */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {(['all', 'pending', 'in-progress', 'resolved'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide capitalize transition-all whitespace-nowrap cursor-pointer",
              filter === type 
                ? "bg-indigo-600 text-white shadow-xs font-bold" 
                : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-100 shadow-2xs"
            )}
          >
            {type === 'all' ? 'All' : type.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Primary Data Grid Log Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col flex-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200">
                <th className="p-4 py-3 text-xs font-bold text-slate-700 w-32">Report ID</th>
                <th className="p-4 py-3 text-xs font-bold text-slate-700 w-64">Issue Type</th>
                <th className="p-4 py-3 text-xs font-bold text-slate-700">Location</th>
                <th className="p-4 py-3 text-xs font-bold text-slate-700 w-32">Status</th>
                <th className="p-4 py-3 text-xs font-bold text-slate-700 w-40">Date Reported</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredReports.map((row, idx) => (
                <tr key={`${row.id}-${idx}`} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 py-3.5 text-xs font-bold text-slate-700">#{row.id}</td>
                  <td className="p-4 py-3.5 text-xs font-semibold text-slate-900">
                    <span className="flex items-center gap-2">
                      {row.icon && <span className="text-sm">{row.icon}</span>}
                      {row.type}
                    </span>
                  </td>
                  <td className="p-4 py-3.5 text-xs text-slate-600 font-medium">{row.location}</td>
                  <td className="p-4 py-3.5">
                    <span className={cn(
                      "px-2.5 py-0.5 rounded-md text-[10px] uppercase tracking-wide inline-block border border-black/5 text-center min-w-[76px]",
                      getStatusBadgeStyle(row.status)
                    )}>
                      {row.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="p-4 py-3.5 text-xs text-slate-500 font-medium">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReports.length === 0 && (
          <div className="py-12 text-center text-slate-400 text-xs italic flex-1 flex items-center justify-center">
            No incident records match current search filter selection parameters.
          </div>
        )}

        {/* Custom Pagination Interface Controls */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-center gap-1.5 text-xs font-bold text-slate-500 mt-auto select-none">
          <button className="p-1 hover:bg-slate-100 rounded text-slate-400">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-6 h-6 flex items-center justify-center bg-indigo-50 border border-indigo-200 text-indigo-600 rounded">1</button>
          <button className="w-6 h-6 flex items-center justify-center hover:bg-slate-100 rounded">2</button>
          <button className="w-6 h-6 flex items-center justify-center hover:bg-slate-100 rounded">3</button>
          <span className="px-1 text-slate-400 font-normal">...</span>
          <button className="p-1 hover:bg-slate-100 rounded text-slate-400">
            <ChevronRight className="w-4 h-4" />
          </button>
          <button className="ml-2 text-slate-600 hover:text-slate-900 transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
}