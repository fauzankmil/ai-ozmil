
import React from 'react';
import { StudioState, StudioStep } from '../types';

interface PreviewWindowProps {
  state: StudioState;
}

const PreviewWindow: React.FC<PreviewWindowProps> = ({ state }) => {
  const selectedFrame = state.storyboard.find(s => s.selected);

  return (
    <aside className="w-96 bg-zinc-900 border-l border-zinc-800 flex flex-col p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Live Preview</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          <span className="text-[10px] text-zinc-500 font-bold">READY</span>
        </div>
      </div>

      <div className="flex-1 relative bg-black rounded-3xl border-4 border-zinc-800 shadow-2xl overflow-hidden aspect-[9/16] max-h-[700px] mx-auto group">
        {/* Placeholder for real-time preview logic */}
        {state.generatedVideoUrl ? (
          <video 
            src={state.generatedVideoUrl} 
            className="w-full h-full object-cover" 
            autoPlay 
            loop 
            muted 
          />
        ) : selectedFrame ? (
          <img 
            src={selectedFrame.imageUrl} 
            alt="Preview" 
            className="w-full h-full object-cover animate-in fade-in zoom-in duration-500" 
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center text-zinc-700">
            <i className="fas fa-video-slash text-5xl mb-4"></i>
            <p className="text-xs uppercase tracking-widest font-bold">Waiting for input...</p>
          </div>
        )}

        {/* Dynamic Overlays (Simulating Captions) */}
        {state.currentStep === StudioStep.FINALIZE && (
          <div className="absolute inset-x-0 bottom-24 flex flex-col items-center px-6">
            <div className="bg-yellow-400 text-black font-black text-xl px-4 py-1 rotate-[-2deg] mb-2 uppercase italic shadow-xl">
              Consistency is Key
            </div>
            <div className="bg-white text-black font-black text-sm px-2 py-0.5 rotate-[1deg] uppercase italic shadow-lg">
              Unlock Your Potential
            </div>
          </div>
        )}

        {/* Progress indicators overlay */}
        <div className="absolute top-4 inset-x-4 flex gap-1">
          {[1,2,3,4,5].map(i => (
            <div key={i} className={`h-1 flex-1 rounded-full ${i === 1 ? 'bg-white' : 'bg-white/20'}`}></div>
          ))}
        </div>
      </div>

      <div className="mt-8 p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
        <div className="flex items-center justify-between text-[10px] text-zinc-500 font-bold uppercase mb-3">
          <span>Metadata</span>
          <span className="text-indigo-400">9:16 Portrait</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-zinc-400">Resolution</span>
            <span className="text-zinc-200">1080x1920</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-zinc-400">Estimated Duration</span>
            <span className="text-zinc-200">15s</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-zinc-400">Scene Count</span>
            <span className="text-zinc-200">{state.storyboard.length || 0}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default PreviewWindow;
