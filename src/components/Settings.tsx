import React, { useState } from 'react';
import { User, Bell, Shield, Sliders, HelpCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Settings({ user }: { user: any }) {
  const [activeSection, setActiveSection] = useState('profile');

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-500 text-sm">Configure your personal preferences and system-wide parameters.</p>
        </div>
        <button className="bg-purple-gradient text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:brightness-110 transition-all text-xs">
          Save Changes
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex-1">
        {/* Left Navigation Sidebar */}
        <div className="w-full md:w-56 flex flex-col gap-1.5 border-r border-slate-100 pr-6">
          <button 
            onClick={() => setActiveSection('profile')}
            className={cn("flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all", activeSection === 'profile' ? "bg-brand-light/50 text-brand-medium" : "text-slate-500 hover:bg-slate-50")}
          >
            <User className="w-4 h-4" /> Account Profile
          </button>
          <button 
            onClick={() => setActiveSection('notifications')}
            className={cn("flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all", activeSection === 'notifications' ? "bg-brand-light/50 text-brand-medium" : "text-slate-500 hover:bg-slate-50")}
          >
            <Bell className="w-4 h-4" /> Notifications
          </button>
          <button 
            onClick={() => setActiveSection('security')}
            className={cn("flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all", activeSection === 'security' ? "bg-brand-light/50 text-brand-medium" : "text-slate-500 hover:bg-slate-50")}
          >
            <Shield className="w-4 h-4" /> Security & Access
          </button>
          <button 
            onClick={() => setActiveSection('system')}
            className={cn("flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all", activeSection === 'system' ? "bg-brand-light/50 text-brand-medium" : "text-slate-500 hover:bg-slate-50")}
          >
            <Sliders className="w-4 h-4" /> System Configuration
          </button>

          {/* Help Box matching the screenshot */}
          <div className="mt-8 bg-brand-light/30 rounded-2xl p-4 border border-brand-light">
            <div className="flex items-center gap-2 text-brand-medium font-bold text-xs uppercase tracking-wider mb-2">
              <HelpCircle className="w-4 h-4" /> Need Help?
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Check out our municipal infrastructure guide for best practices.
            </p>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 pl-2">
          {activeSection === 'profile' && (
            <div className="space-y-8 animate-in fade-in duration-300 max-w-2xl">
              
              {/* Personal Information Section */}
              <section>
                <h2 className="text-base font-bold text-slate-900 mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      disabled 
                      value="rfatima_cse240547@mgit.ac.in" 
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-400 font-medium cursor-not-allowed"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue="RUKHSAAR FATIMA" 
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-medium/20 focus:border-brand-medium transition-all"
                    />
                  </div>
                </div>
              </section>

              {/* Municipal Detail Section */}
              <section>
                <h2 className="text-base font-bold text-slate-900 mb-4">Municipal Detail</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Station ID</label>
                    <input 
                      type="text" 
                      defaultValue="Shaikpet" 
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-medium/20 focus:border-brand-medium transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Jurisdiction</label>
                    <div className="relative">
                      <select className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-medium/20 focus:border-brand-medium appearance-none transition-all">
                        <option>Downtown District</option>
                        <option>North Sector</option>
                        <option>South Sector</option>
                      </select>
                      {/* Custom dropdown arrow */}
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Sign Out Button matching the screenshot */}
              <div className="pt-6">
                <button 
                  onClick={() => window.location.reload()} 
                  className="px-4 py-2 bg-red-50 text-red-600 font-bold text-sm rounded-xl hover:bg-red-100 transition-colors"
                >
                  Sign Out of Account
                </button>
              </div>

            </div>
          )}
          
          {activeSection !== 'profile' && (
            <div className="py-12 text-center text-slate-400 text-sm font-medium">
              This settings panel is restricted during the demo.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}