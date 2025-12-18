
import React, { useState } from 'react';
import { StudioState, StudioStep } from '../../types';

interface StepFinalizeProps {
  state: StudioState;
  setState: React.Dispatch<React.SetStateAction<StudioState>>;
  onNext: () => void;
}

const StepFinalize: React.FC<StepFinalizeProps> = ({ state, setState, onNext }) => {
  const [activeTab, setActiveTab] = useState<'captions' | 'voice' | 'music'>('captions');

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-white tracking-tight">Finishing Touches</h1>
        <p className="text-zinc-500 text-lg">Integrated voiceover, auto-pacing, and subtitles.</p>
      </div>

      <div className="flex gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-2xl w-fit">
        {['captions', 'voice', 'music'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-6 py-2 rounded-xl text-sm font-bold capitalize transition-all ${
              activeTab === tab ? 'bg-zinc-800 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {activeTab === 'captions' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-left-4">
              <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl space-y-4">
                 <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Subtitle Style</label>
                 <div className="grid grid-cols-2 gap-3">
                   {['Hype Neon', 'Classic Bold', 'Minimalist', 'Anime Style'].map(s => (
                     <button key={s} className={`p-4 rounded-xl border text-xs font-bold ${s === 'Hype Neon' ? 'border-indigo-600 bg-indigo-600/10 text-indigo-400' : 'border-zinc-800 bg-zinc-950 text-zinc-500'}`}>
                       {s}
                     </button>
                   ))}
                 </div>
              </div>
              <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl space-y-4">
                 <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Auto-Transcribed Segments</label>
                 <div className="space-y-2">
                    <div className="flex gap-3 p-3 bg-zinc-950 border border-zinc-800 rounded-xl">
                      <span className="text-[10px] text-zinc-600 font-bold mt-1">00:01</span>
                      <p className="text-xs text-zinc-300">Welcome back to the studio...</p>
                    </div>
                    <div className="flex gap-3 p-3 bg-zinc-950 border border-zinc-800 rounded-xl border-indigo-600/30">
                      <span className="text-[10px] text-indigo-600 font-bold mt-1">00:05</span>
                      <p className="text-xs text-zinc-300 font-bold">Today we're building the future of AI.</p>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'voice' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-left-4">
              <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-3xl space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-2xl">
                    <i className="fas fa-user-robot"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">AI Voice: Kore</h4>
                    <p className="text-xs text-zinc-500">Energetic, Professional, Warm</p>
                  </div>
                </div>
                <div className="space-y-4">
                   <div className="flex justify-between text-xs text-zinc-400 font-bold uppercase">
                     <span>Emotion Level</span>
                     <span className="text-indigo-400">Excited (70%)</span>
                   </div>
                   <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                     <div className="h-full bg-indigo-500 w-[70%]"></div>
                   </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="p-8 bg-indigo-600 rounded-3xl text-white space-y-6 shadow-2xl shadow-indigo-600/20">
            <h3 className="text-2xl font-black italic uppercase tracking-tighter">Ready for Publish</h3>
            <p className="text-sm text-indigo-100 font-medium">Final video is render-ready. Your character consistency is locked at 98% across all 12 scenes.</p>
            
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-xs">
                <i className="fas fa-check-circle text-emerald-300"></i>
                <span>Subtitles Synced (AI Logic)</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <i className="fas fa-check-circle text-emerald-300"></i>
                <span>CTA Overlay Applied</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <i className="fas fa-check-circle text-emerald-300"></i>
                <span>Background Audio Ducked</span>
              </div>
            </div>

            <button className="w-full py-5 bg-white text-indigo-600 rounded-2xl font-black text-xl hover:scale-[1.02] transition-all shadow-2xl">
              EXPORT & PUBLISH
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepFinalize;
