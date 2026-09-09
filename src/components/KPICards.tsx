import { AlertCircle, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';
import { mockIssues } from '../mockData';

export default function KPICards() {
  const totalReports = mockIssues.length;
  const pendingTasks = mockIssues.filter(i => i.status !== 'resolved').length;
  const resolvedIssues = mockIssues.filter(i => i.status === 'resolved').length;

  const stats = [
    { label: 'Total Reports', value: totalReports, change: '+12%', isPositive: true, icon: AlertCircle },
    { label: 'Pending Tasks', value: pendingTasks, change: '-5%', isPositive: true, icon: Clock },
    { label: 'Resolved Issues', value: resolvedIssues, change: '+18%', isPositive: true, icon: CheckCircle2 },
    { label: 'Avg Resolution', value: '4.2h', change: '-22%', isPositive: true, icon: MapPin }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 h-auto lg:h-[85px] flex-shrink-0">
      {stats.map((stat, i) => (
        <div 
          key={i} 
          className={cn(
            "p-4 rounded-2xl border shadow-xs flex flex-col justify-between transition-all",
            stat.label === 'Total Reports' 
              ? "bg-purple-gradient border-brand-dark text-white" 
              : "bg-white border-slate-200 text-slate-900"
          )}
        >
          <p className={cn("text-[10px] font-bold uppercase tracking-wider", stat.label === 'Total Reports' ? "text-slate-300" : "text-slate-500")}>
            {stat.label}
          </p>
          <div className="flex items-baseline justify-between mt-1">
            <h3 className="text-xl font-bold font-mono">{stat.value}</h3>
            <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-md", stat.label === 'Total Reports' ? "bg-white/10 text-white" : "bg-slate-50 text-slate-600")}>
              {stat.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
