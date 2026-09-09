import { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import KPICards from './components/KPICards';
import MapSection from './components/MapSection';
import RecentActivity from './components/RecentActivity';
import WorkforceManagement from './components/WorkforceManagement';
import ActiveReports from './components/ActiveReports';
import UserManagement from './components/UserManagement';
import Settings from './components/Settings';
import { Issue, Worker, Assignment } from './types';
import { mockIssues } from './mockData';

// Initial Mock Workers Data for Local Simulation
const initialWorkers: Worker[] = [
  { id: 'WRK-001', name: 'Nikhil Reddy', isAvailable: true },
  { id: 'WRK-002', name: 'Rohan Saxena', isAvailable: false },
  { id: 'WRK-003', name: 'Karan Kapoor', isAvailable: true },
  { id: 'WRK-004', name: 'Prachi', isAvailable: false },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Local State tracking to manage mock state data dynamically
  const [issues, setIssues] = useState<Issue[]>(mockIssues);
  const [workers, setWorkers] = useState<Worker[]>(initialWorkers);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [assigningIssue, setAssigningIssue] = useState<Issue | null>(null);

  // Local handler simulation methods to replace backend network dispatches
  const addWorker = (name: string) => {
    const newWorker: Worker = {
      id: `WRK-${Math.floor(100 + Math.random() * 900)}`,
      name,
      isAvailable: true,
    };
    setWorkers(prev => [...prev, newWorker]);
  };

  const assignTask = (workerId: string, issueId: string) => {
    const newAssignment: Assignment = {
      id: `ASG-${Math.floor(1000 + Math.random() * 9000)}`,
      workerId,
      issueId,
      assignedAt: new Date().toISOString(),
    };
    
    setAssignments(prev => [...prev, newAssignment]);
    setWorkers(prev => prev.map(w => w.id === workerId ? { ...w, isAvailable: false } : w));
    setIssues(prev => prev.map(i => i.id === issueId ? { ...i, status: 'in-progress' } : i));
    setAssigningIssue(null);
  };

  const completeTask = (assignmentId: string) => {
    const assignment = assignments.find(a => a.id === assignmentId);
    if (!assignment) return;

    setWorkers(prev => prev.map(w => w.id === assignment.workerId ? { ...w, isAvailable: true } : w));
    setIssues(prev => prev.map(i => i.id === assignment.issueId ? { ...i, status: 'resolved' } : i));
    setAssignments(prev => prev.filter(a => a.id !== assignmentId));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <KPICards />
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[340px] flex-shrink-0">
              <div className="lg:col-span-3">
                <MapSection 
                  issues={issues.filter(i => i.status !== 'resolved')} 
                  onAssignClick={(issue) => setAssigningIssue(issue)}
                />
              </div>
              <div className="lg:col-span-2">
                <WorkforceManagement 
                  workers={workers}
                  assignments={assignments}
                  issues={issues}
                  onAddWorker={addWorker}
                  onAssign={assignTask}
                  onComplete={completeTask}
                  assigningIssue={assigningIssue}
                  setAssigningIssue={setAssigningIssue}
                />
              </div>
            </div>
            <div className="flex-1 min-h-[240px]">
              <RecentActivity issues={issues} />
            </div>
          </>
        );
      case 'reports':
        return <ActiveReports issues={issues} onAssign={setAssigningIssue} />;
      case 'users':
        return <UserManagement workers={workers} onAdd={addWorker} />;
      case 'settings':
        return <Settings user={null} />;
      default:
        return <div className="p-8 text-center text-slate-500">Section allocation error.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex h-screen overflow-hidden text-slate-900">
      {/* Structural Layout Side Bar Column Container */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Functional Interface Row Stack Element */}
      <main className="flex-1 ml-[220px] flex flex-col h-screen overflow-hidden">
        <TopNav />
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4 lg:space-y-6 flex flex-col animate-in fade-in duration-300">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}