
import React, { useState } from 'react';
import { StudioState, StudioStep } from '../../types';
import { generateVideo } from '../../geminiService';

interface StepAnimateProps {
  state: StudioState;
  setState: React.Dispatch<React.SetStateAction<StudioState>>;
  onNext: () => void;
}

const StepAnimate: React.FC<StepAnimateProps> = ({ state, setState, onNext }) => {
  const [animating, setAnimating] = useState(false);
  const selectedFrame = state.storyboard.find(s => s.selected);

  const handleAnimate = async () => {
    if (!selectedFrame) return;
    setAnimating(true);
    try {
      const url = await generateVideo(selectedFrame.imageUrl, selectedFrame.caption);
      setState(prev => ({ ...prev, generatedVideoUrl: url }));
      onNext();
    } catch (error) {
      console.error(error);
      alert('Animation failed. Please try again.');
    } finally {
      setAnimating(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-white tracking-tight">Directing the Scene</h1>
        <p className="text-zinc-500 text-lg">Animating with Veo-3.1-fast for cinematic motion.</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-3xl space-y-6">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Selected Master Frame</h3>
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-zinc-800">
              {selectedFrame && <img src={selectedFrame.imageUrl} className="w-full h-full object-cover opacity-80" alt="Master" />}
            </div>
            <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800">
              <p className="text-sm text-zinc-300 italic">"{selectedFrame?.caption}"</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center gap-4">
               <div className="w-10 h-10 bg-emerald-500/10 text-emerald-500 rounded-lg flex items-center justify-center">
                 <i className="fas fa-check-circle"></i>
               </div>
               <div>
                 <p className="text-xs font-bold text-white">Character Rigged</p>
                 <p className="text-[10px] text-zinc-500">Physics & Anatomy Validated</p>
               </div>
             </div>
             <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center gap-4">
               <div className="w-10 h-10 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center">
                 <i className="fas fa-wind"></i>
               </div>
               <div>
                 <p className="text-xs font-bold text-white">Dynamic Physics</p>
                 <p className="text-[10px] text-zinc-500">Fluid & Cloth Sims Ready</p>
               </div>
             </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-indigo-600 rounded-3xl text-white space-y-6 shadow-2xl shadow-indigo-600/30">
            <h3 className="text-lg font-bold">Launch Animation</h3>
            <p className="text-sm text-indigo-100">AI-Ozmil will now render high-fidelity motion for this scene. This usually takes 30-60 seconds.</p>
            
            <button 
              onClick={handleAnimate}
              disabled={animating}
              className={`w-full py-4 bg-white text-indigo-600 rounded-2xl font-black text-lg transition-all active:scale-95 shadow-xl flex items-center justify-center gap-3 ${animating ? 'opacity-50' : 'hover:bg-zinc-100'}`}
            >
              {animating ? (
                <>
                  <i className="fas fa-circle-notch fa-spin"></i>
                  Rendering...
                </>
              ) : (
                <>
                  <i className="fas fa-play"></i>
                  Start Processing
                </>
              )}
            </button>

            <div className="space-y-3">
               <div className="flex justify-between text-[10px] font-bold uppercase text-indigo-200">
                 <span>Motion Quality</span>
                 <span>Ultra High</span>
               </div>
               <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                 <div className="h-full bg-white w-full"></div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepAnimate;
