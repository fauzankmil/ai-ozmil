
import React from 'react';
import { StudioState, CTAStyle, TemplateType } from '../types';
import { CTA_PRESETS, TEMPLATES } from '../constants';

interface SettingsPanelProps {
  state: StudioState;
  setState: React.Dispatch<React.SetStateAction<StudioState>>;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ state, setState }) => {
  return (
    <aside className="w-80 bg-zinc-900 border-l border-zinc-800 flex flex-col overflow-y-auto">
      <div className="p-6 border-b border-zinc-800">
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
          <i className="fas fa-sliders-h text-indigo-400"></i> Consistency Engine
        </h3>
      </div>

      <div className="p-6 space-y-8">
        {/* Character Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-zinc-100">Character Profile</label>
            <span className="text-[10px] bg-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded border border-zinc-700 flex items-center gap-1">
              <i className="fas fa-lock"></i> LOCKED
            </span>
          </div>
          <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 relative group">
            <div className="w-full aspect-square bg-zinc-900 rounded-lg mb-3 flex items-center justify-center overflow-hidden border border-zinc-800">
              <img src="https://picsum.photos/300/300?grayscale" alt="Character" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform" />
            </div>
            <p className="text-xs font-medium text-zinc-300">{state.character.name}</p>
            <p className="text-[10px] text-zinc-500 mt-1 line-clamp-2">{state.character.description}</p>
            <div className="mt-3 flex flex-wrap gap-1">
              {state.character.traits.map(t => (
                <span key={t} className="text-[9px] bg-indigo-500/10 text-indigo-400 px-1.5 py-0.5 rounded uppercase">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Style Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-zinc-100">Visual Aesthetic</label>
            <span className="text-[10px] bg-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded border border-zinc-700 flex items-center gap-1">
              <i className="fas fa-lock"></i> LOCKED
            </span>
          </div>
          <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600"></div>
               <div>
                 <p className="text-xs font-medium text-zinc-300">{state.style.name}</p>
                 <p className="text-[10px] text-zinc-500">{state.style.mood}</p>
               </div>
             </div>
          </div>
        </div>

        {/* CTA Selector */}
        <div className="space-y-4">
          <label className="text-sm font-semibold text-zinc-100">Conversion Goal (CTA)</label>
          <div className="grid grid-cols-1 gap-2">
            {(Object.entries(CTA_PRESETS) as [CTAStyle, any][]).map(([key, config]) => (
              <button 
                key={key}
                onClick={() => setState(prev => ({ ...prev, cta: key }))}
                className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                  state.cta === key 
                    ? 'bg-indigo-600/10 border-indigo-600 text-indigo-400' 
                    : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                }`}
              >
                <span className="text-sm">{config.icon}</span>
                <span className="text-xs font-medium">{config.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Template Selector */}
        <div className="space-y-4 pb-20">
          <label className="text-sm font-semibold text-zinc-100">Editing Template</label>
          <div className="space-y-2">
            {(Object.entries(TEMPLATES) as [TemplateType, any][]).map(([key, config]) => (
              <button 
                key={key}
                onClick={() => setState(prev => ({ ...prev, template: key }))}
                className={`w-full p-4 rounded-xl border text-left transition-all ${
                  state.template === key 
                    ? 'bg-indigo-600/10 border-indigo-600' 
                    : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <p className={`text-xs font-bold ${state.template === key ? 'text-indigo-400' : 'text-zinc-300'}`}>{config.name}</p>
                <p className="text-[10px] text-zinc-500 mt-1">{config.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SettingsPanel;
