import React, { createContext, useContext, useState } from 'react';
import { Issue, Worker, Assignment } from '../types';

// Define initial mock data locally for the presentation
const initialIssues: Issue[] = [
  {
    id: 'IC0314',
    title: 'Pothole Sector 4',
    description: 'Major pothole detected on Sector 4 main road.',
    priority: 'medium',
    status: 'in-progress',
    lat: 28.6139,
    lng: 77.2090,
    createdAt: '2026-06-02T08:00:00.000Z',
    locationName: '7 Tombs Road, Tolichowki'
  },
  {
    id: 'IC0315',
    title: 'Flooding Alert',
    description: 'Severe stagnation/flooding of rainwater on the lanes.',
    priority: 'high',
    status: 'resolved',
    lat: 28.6250,
    lng: 77.2200,
    createdAt: '2026-05-23T10:00:00.000Z',
    locationName: 'Tilak Road'
  },
  {
    id: 'IC0316',
    title: 'Water Leakage',
    description: 'Major pipeline supply failure causing leak.',
    priority: 'medium',
    status: 'pending',
    lat: 28.5900,
    lng: 77.2100,
    createdAt: '2026-06-01T14:22:00.000Z',
    locationName: 'Sector 2 Main Avenue'
  }
];

const initialWorkers: Worker[] = [
  { id: 'worker_1', name: 'Liam Cross', isAvailable: false },
  { id: 'worker_2', name: 'Robert Martin', isAvailable: true },
  { id: 'worker_3', name: 'Sarah Jenkins', isAvailable: true }
];

const initialAssignments: Assignment[] = [
  { id: 'asgn_1', workerId: 'worker_1', issueId: 'IC0314', assignedAt: '2026-06-02T11:00:00.000Z' }
];

interface FirebaseContextType {
  user: any;
  loading: boolean;
  issues: Issue[];
  workers: Worker[];
  assignments: Assignment[];
  addWorker: (name: string) => void;
  assignTask: (workerId: string, issueId: string) => void;
  completeTask: (assignmentId: string) => void;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [issues, setIssues] = useState<Issue[]>(initialIssues);
  const [workers, setWorkers] = useState<Worker[]>(initialWorkers);
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);

  // Mock a pre-logged in Admin user structure so the dashboard shows instantly
  const user = {
    uid: '242610547',
    email: 'adminrukhsaar@infracare.com',
    displayName: 'Admin Rukhsaar'
  };

  const addWorker = (name: string) => {
    const newWorker: Worker = {
      id: `worker_${Date.now()}`,
      name,
      isAvailable: true
    };
    setWorkers(prev => [...prev, newWorker]);
  };

  const assignTask = (workerId: string, issueId: string) => {
    const newAssignment: Assignment = {
      id: `asgn_${Date.now()}`,
      workerId,
      issueId,
      assignedAt: new Date().toISOString()
    };
    
    setAssignments(prev => [...prev, newAssignment]);
    setWorkers(prev => prev.map(w => w.id === workerId ? { ...w, isAvailable: false } : w));
    setIssues(prev => prev.map(i => i.id === issueId ? { ...i, status: 'in-progress' } : i));
  };

  const completeTask = (assignmentId: string) => {
    const asgn = assignments.find(a => a.id === assignmentId);
    if (!asgn) return;

    setAssignments(prev => prev.filter(a => a.id !== assignmentId));
    setWorkers(prev => prev.map(w => w.id === asgn.workerId ? { ...w, isAvailable: true } : w));
    setIssues(prev => prev.map(i => i.id === asgn.issueId ? { ...i, status: 'resolved' } : i));
  };

  return (
    <FirebaseContext.Provider value={{ 
      user, 
      loading: false, // Turn off loading immediately 
      issues, 
      workers, 
      assignments, 
      addWorker, 
      assignTask, 
      completeTask 
    }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) throw new Error('useFirebase must be used within a FirebaseProvider');
  return context;
};