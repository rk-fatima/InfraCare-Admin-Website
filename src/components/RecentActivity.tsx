import { Issue } from '../types';
import { cn } from '../lib/utils';

interface RecentActivityProps {
  issues?: Issue[];
}

export default function RecentActivity({ issues }: RecentActivityProps) {
  // Hardcoded presentation matrix matching your specific municipal logs
  const realRecentActivities = [
    { 
      id: 'REP-005', 
      title: 'Garbage', 
      locationName: '7 Tombs Road, Tolichowki', 
      status: 'pending', 
      dateText: '23-May-2026' 
    },
    { 
      id: 'REP-004', 
      title: 'Broken Pipe', 
      locationName: 'Sector 4', 
      status: 'resolved', 
      dateText: '5-May-2026' 
    },
    { 
      id: 'REP-003', 
      title: 'Pothole', 
      locationName: 'Pillar 145, Attapur', 
      status: 'pending', 
      dateText: '15-May-2026' 
    },
    { 
      id: 'REP-002', 
      title: 'Broken Streetlight', 
      locationName: 'Gulshan Colony', 
      status: 'pending', 
      dateText: '14-Mar-2026' 
    },
    { 
      id: 'REP-001', 
      title: 'Pothole', 
      locationName: 'Shaikpet', 
      status: 'pending', 
      dateText: '15-Mar-2026' 
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-[#d1fae5] text-[#065f46]';
      case 'in-progress': return 'bg-[#fef3c7] text-[#92400e]';
      case 'pending': return 'bg-[#fee2e2] text-[#991b1b]';
      default: return 'bg-slate-50 text-slate-700';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col overflow-hidden h-full min-h-[220px]">
      <div className="p-3 px-4 border-b border-slate-200 font-bold text-sm bg-purple-gradient text-white">
        Recent Activity
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left table-fixed">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-4 py-3 text-[11px] font-bold text-slate-600 uppercase w-[100px]">Report ID</th>
              <th className="px-4 py-3 text-[11px] font-bold text-slate-600 uppercase w-[150px]">Issue Type</th>
              <th className="px-4 py-3 text-[11px] font-bold text-slate-600 uppercase w-[200px]">Location</th>
              <th className="px-4 py-3 text-[11px] font-bold text-slate-600 uppercase w-[120px]">Status</th>
              <th className="px-4 py-3 text-[11px] font-bold text-slate-600 uppercase">Date Reported</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {realRecentActivities.map((issue) => (
              <tr key={issue.id} className="hover:bg-slate-50 transition-all group">
                <td className="px-4 py-2.5 text-xs font-bold text-brand-dark">#{issue.id}</td>
                <td className="px-4 py-2.5 text-xs font-medium text-slate-900 truncate">{issue.title}</td>
                <td className="px-4 py-2.5 text-xs text-slate-600 truncate">{issue.locationName}</td>
                <td className="px-4 py-2.5">
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tight whitespace-nowrap",
                    getStatusBadge(issue.status)
                  )}>
                    {issue.status.replace('-', ' ')}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-xs text-slate-500 whitespace-nowrap">
                  {issue.dateText}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}