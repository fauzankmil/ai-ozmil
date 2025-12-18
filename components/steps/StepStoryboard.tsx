
import React from 'react';
import { StudioState, StudioStep } from '../../types';

interface StepStoryboardProps {
  state: StudioState;
  setState: React.Dispatch<React.SetStateAction<StudioState>>;
  onNext: () => void;
}

const StepStoryboard: React.FC<StepStoryboardProps> = ({ state, setState, onNext }) => {
  const toggleSelect = (id: string) => {
    setState(prev => ({
      ...prev,
      storyboard: prev.storyboard.map(item => ({
        ...item,
        selected: item.id === id
      }))
    }));
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-white tracking-tight">Confirm Key Visuals</h1>
        <p className="text-zinc-500 text-lg">We generated these based on your character & style profile.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {state.storyboard.map((item, idx) => (
          <div 
            key={item.id}
            onClick={() => toggleSelect(item.id)}
            className={`group relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${
              item.selected ? 'border-indigo-600 ring-4 ring-indigo-600/20' : 'border-zinc-800 hover:border-zinc-600'
            }`}
          >
            <div className="aspect-[9/16] bg-zinc-900 overflow-hidden">
               <img src={item.imageUrl} alt={`Scene ${idx}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            
            <div className="absolute top-3 left-3 w-6 h-6 bg-black/50 backdrop-blur rounded-full flex items-center justify-center text-[10px] font-bold text-white">
              {idx + 1}
            </div>

            {item.selected && (
              <div className="absolute top-3 right-3 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white text-[10px]">
                <i className="fas fa-check"></i>
              </div>
            )}

            <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
               <p className="text-[10px] text-zinc-300 line-clamp-2">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-indigo-600/10 border border-indigo-600/20 p-6 rounded-3xl flex items-center gap-6">
        <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl flex-shrink-0 shadow-lg shadow-indigo-600/20">
          <i className="fas fa-wand-magic-sparkles"></i>
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-bold text-white mb-1">Character Continuity Locked</h4>
          <p className="text-sm text-zinc-400">Ozmil confirmed visual traits match across all generated scenes. No prompt editing required.</p>
        </div>
        <button 
          onClick={onNext}
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all whitespace-nowrap"
        >
          Confirm & Animate
        </button>
      </div>
    </div>
  );
};

export default StepStoryboard;
