
import React from 'react';
import { StudioState, ContentType } from '../../types';

interface StepInputProps {
  state: StudioState;
  setState: React.Dispatch<React.SetStateAction<StudioState>>;
  onNext: () => void;
}

const StepInput: React.FC<StepInputProps> = ({ state, setState, onNext }) => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-white tracking-tight">How do you want to start?</h1>
        <p className="text-zinc-500 text-lg">Ozmil Studio handles the visuals, pacing, and consistency.</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { id: ContentType.TEXT, icon: 'fa-align-left', label: 'Script', desc: 'Type or paste script' },
          { id: ContentType.PHOTO, icon: 'fa-camera', label: 'Photo', desc: 'Consistent character' },
          { id: ContentType.IMAGE, icon: 'fa-image', label: 'Scene', desc: 'Initial frame' },
          { id: ContentType.VOICE, icon: 'fa-microphone', label: 'Voice', desc: 'Record or upload' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setState(prev => ({ ...prev, contentType: item.id }))}
            className={`flex flex-col items-center p-6 rounded-2xl border transition-all ${
              state.contentType === item.id 
                ? 'bg-indigo-600/10 border-indigo-600 ring-2 ring-indigo-600/20' 
                : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
              state.contentType === item.id ? 'bg-indigo-600 text-white' : 'bg-zinc-800 text-zinc-400'
            }`}>
              <i className={`fas ${item.icon} text-xl`}></i>
            </div>
            <span className="text-sm font-bold text-zinc-200">{item.label}</span>
            <span className="text-[10px] text-zinc-500 mt-1 uppercase tracking-wider">{item.desc}</span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <label className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Script Content</label>
        <textarea
          value={state.inputContent}
          onChange={(e) => setState(prev => ({ ...prev, inputContent: e.target.value }))}
          placeholder="What's the story today? Ozmil will analyze the pacing, tone, and visual requirements..."
          className="w-full h-48 bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 text-xl text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600/50 transition-all placeholder:text-zinc-700 resize-none"
        />
      </div>

      <div className="flex items-center justify-end gap-4">
        <button 
          onClick={onNext}
          disabled={!state.inputContent || state.loading}
          className="px-12 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-indigo-600/20"
        >
          {state.loading ? (
             <span className="flex items-center gap-2">
               <i className="fas fa-circle-notch fa-spin"></i> Analyzing Concepts...
             </span>
          ) : (
             'Generate Visuals'
          )}
        </button>
      </div>
    </div>
  );
};

export default StepInput;
