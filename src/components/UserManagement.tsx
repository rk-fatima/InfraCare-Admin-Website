import React, { useState } from 'react';
import { UserPlus, Shield, Mail, Phone, Radio } from 'lucide-react';
import { cn } from '../lib/utils';
import { Worker } from '../types';

interface UserManagementProps {
  workers: Worker[];
  onAdd: (name: string) => void;
}

export default function UserManagement({ workers, onAdd }: UserManagementProps) {
  const [subTab, setSubTab] = useState<'field' | 'admin'>('field');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newWorkerName, setNewWorkerName] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWorkerName.trim()) {
      onAdd(newWorkerName.trim());
      setNewWorkerName('');
      setShowAddModal(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Identity & Access</h1>
          <p className="text-slate-500 text-sm">Manage administrative roles and field workforce permissions.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-purple-gradient text-white px-4 py-2.5 rounded-xl font-bold shadow-md hover:brightness-110 transition-all text-xs"
        >
          <UserPlus className="w-4 h-4" /> Add Field Worker
        </button>
      </div>

      {/* Roster Segmentation Tabs */}
      <div className="border-b border-slate-200 flex gap-6 text-sm font-semibold">
        <button 
          onClick={() => setSubTab('field')}
          className={cn("pb-3 border-b-2 transition-all flex items-center gap-2", subTab === 'field' ? "border-brand-medium text-brand-dark font-bold" : "border-transparent text-slate-400")}
        >
          <Radio className="w-4 h-4" /> Field Dispatch Team ({workers.length})
        </button>
        <button 
          onClick={() => setSubTab('admin')}
          className={cn("pb-3 border-b-2 transition-all flex items-center gap-2", subTab === 'admin' ? "border-brand-medium text-brand-dark font-bold" : "border-transparent text-slate-400")}
        >
          <Shield className="w-4 h-4" /> Command Administrators (1)
        </button>
      </div>

      {subTab === 'field' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workers.map((worker) => (
            <div key={worker.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-sm">
                      {worker.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{worker.name}</h3>
                      <p className="text-[10px] font-mono text-slate-400">UID: {worker.id.substring(0, 8)}</p>
                    </div>
                  </div>
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                    worker.isAvailable ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"
                  )}>
                    {worker.isAvailable ? 'Active' : 'On-Duty'}
                  </span>
                </div>

                <div className="mt-4 space-y-2 border-t border-slate-50 pt-3 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{worker.name.toLowerCase().replace(/\s+/g, '.')}@infracare.gov</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>+91 94421 {worker.id.substring(0, 5)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-medium">Clearance: Level 1</span>
                <span className="text-brand-medium font-bold hover:underline cursor-pointer">Modify Clearance</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs max-w-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-light text-brand-medium rounded-full flex items-center justify-center font-bold">AJ</div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Admin Rukhsaar</h3>
              <p className="text-xs text-slate-400 font-medium">Head Systems Dispatcher</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600 font-medium">
            <p><span className="text-slate-400">System Domain:</span> Master Cluster Registry</p>
            <p><span className="text-slate-400">Security Clearance:</span> Root Level Administration</p>
          </div>
        </div>
      )}

      {/* Onboarding Input Modal Container */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 w-full max-w-sm shadow-xl">
            <h2 className="text-lg font-bold text-slate-900 mb-1">Onboard Field Engineer</h2>
            <p className="text-xs text-slate-400 mb-4">Register an engineer to assign active tasks.</p>
            
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                <input 
                  autoFocus
                  type="text"
                  required
                  value={newWorkerName}
                  onChange={(e) => setNewWorkerName(e.target.value)}
                  placeholder="e.g. Liam Cross"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-medium/20 text-slate-900"
                />
              </div>

              <div className="flex gap-2 pt-2 text-xs font-bold">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2.5 bg-purple-gradient text-white rounded-xl shadow-xs hover:brightness-110 transition-all"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}