'use client';

import { Calendar, Clock, Video, Users, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function LiveClassDetailPage({ params }: { params: { 'class-id': string } }) {
  const [isJoining, setIsJoining] = useState(false);
  
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-navy-900 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">SSC Chemistry: Chapter 5</h1>
          <p className="text-lg text-white/70 mb-8">Chemical Bond — Live Session</p>
          
          <div className="flex flex-wrap gap-6 text-sm text-white/60">
            <span className="flex items-center gap-2"><Users className="w-4 h-4" /> Md. Tareque Aziz</span>
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Jan 15, 2026</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 10:00 AM — 12:00 PM</span>
          </div>
        </div>
      </section>
      
      <main className="max-w-7xl mx-auto px-6 md:px-8 -mt-8 relative z-10">
        <div className="bg-card border border-transparent rounded-2xl shadow-xl p-6 md:p-10">
          <h2 className="font-display text-2xl font-bold text-navy-900 mb-6">Class Details</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="font-bold text-navy-900 mb-3">Meeting Link</h3>
              <p className="text-sm text-foreground/60 mb-2">Access the class through the protected link. Only enrolled students can join.</p>
              <a href="#" className="text-cyan-500 font-medium hover:text-cyan-400 text-sm">Open Meeting Link</a>
            </div>
            <div>
              <h3 className="font-bold text-navy-900 mb-3">Class Notes</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-foreground/60 hover:text-cyan-500">Chapter 5 Notes (PDF)</a></li>
                <li><a href="#" className="text-sm text-foreground/60 hover:text-cyan-500">Formula Reference Sheet</a></li>
                <li><a href="#" className="text-sm text-foreground/60 hover:text-cyan-500">Practice Questions (Set A)</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-navy-900 mb-3">Status</h3>
              <p className="text-sm text-foreground/60 mb-2">Meeting: <span className="text-cyan-500 font-medium">Live Now</span></p>
              <p className="text-sm text-foreground/60 mb-4">Attendance: <span className="text-cyan-500 font-medium">Not Marked</span></p>
              <button 
                onClick={() => setIsJoining(true)}
                className="bg-cyan-500 text-navy-900 px-6 py-2 rounded-md font-bold text-sm hover:bg-cyan-400 transition"
              >
                {isJoining ? 'Joining...' : 'Join Class'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}