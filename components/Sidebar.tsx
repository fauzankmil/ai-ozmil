
import React from 'react';
import { StudioStep } from '../types';

interface SidebarProps {
  currentStep: StudioStep;
}

const Sidebar: React.FC<SidebarProps> = ({ currentStep }) => {
  const steps = [
    { id: StudioStep.INPUT, label: 'Concept', icon: 'fa-lightbulb' },
    { id: StudioStep.STORYBOARD, label: 'Storyboard', icon: 'fa-images' },
    { id: StudioStep.ANIMATE, label: 'Animate', icon: 'fa-film' },
    { id: StudioStep.FINALIZE, label: 'Post-Prod', icon: 'fa-wand-magic-sparkles' },
    { id: StudioStep.EXPORT, label: 'Export', icon: 'fa-rocket' },
  ];

  return (
    <aside className="w-20 bg-zinc-950 border-r border-zinc-800 flex flex-col items-center py-8 gap-10">
      {steps.map((step) => {
        const isActive = currentStep === step.id;
        return (
          <div key={step.id} className="relative group">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
              isActive 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                : 'text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300'
            }`}>
              <i className={`fas ${step.icon} text-lg`}></i>
            </div>
            {/* Tooltip */}
            <span className="absolute left-16 top-1/2 -translate-y-1/2 px-2 py-1 bg-zinc-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
              {step.label}
            </span>
          </div>
        );
      })}
    </aside>
  );
};

export default Sidebar;
