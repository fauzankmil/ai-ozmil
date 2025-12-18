
import React, { useState, useEffect, useCallback } from 'react';
import { StudioStep, ContentType, StudioState, CTAStyle, TemplateType } from './types';
import { DEFAULT_CHARACTER, DEFAULT_STYLE, CTA_PRESETS, TEMPLATES } from './constants';
import { generateStoryboard, generateVisuals, generateVideo } from './geminiService';

// Components
import Sidebar from './components/Sidebar';
import SettingsPanel from './components/SettingsPanel';
import PreviewWindow from './components/PreviewWindow';
import StepInput from './components/steps/StepInput';
import StepStoryboard from './components/steps/StepStoryboard';
import StepAnimate from './components/steps/StepAnimate';
import StepFinalize from './components/steps/StepFinalize';

const App: React.FC = () => {
  const [state, setState] = useState<StudioState>({
    currentStep: StudioStep.INPUT,
    contentType: ContentType.TEXT,
    inputContent: '',
    character: DEFAULT_CHARACTER,
    style: DEFAULT_STYLE,
    storyboard: [],
    cta: CTAStyle.FOLLOW,
    template: TemplateType.STORYTIME,
    loading: false,
    apiKeySet: false
  });

  useEffect(() => {
    const checkKey = async () => {
      // Assuming window.aistudio exists as per instructions
      if (typeof (window as any).aistudio?.hasSelectedApiKey === 'function') {
        const hasKey = await (window as any).aistudio.hasSelectedApiKey();
        setState(prev => ({ ...prev, apiKeySet: hasKey }));
      } else {
         // Fallback if not in environment
         setState(prev => ({ ...prev, apiKeySet: true }));
      }
    };
    checkKey();
  }, []);

  const handleOpenKeyDialog = async () => {
    if (typeof (window as any).aistudio?.openSelectKey === 'function') {
      await (window as any).aistudio.openSelectKey();
      setState(prev => ({ ...prev, apiKeySet: true }));
    }
  };

  const nextStep = () => {
    const steps = Object.values(StudioStep);
    const currentIndex = steps.indexOf(state.currentStep);
    if (currentIndex < steps.length - 1) {
      setState(prev => ({ ...prev, currentStep: steps[currentIndex + 1] }));
    }
  };

  const prevStep = () => {
    const steps = Object.values(StudioStep);
    const currentIndex = steps.indexOf(state.currentStep);
    if (currentIndex > 0) {
      setState(prev => ({ ...prev, currentStep: steps[currentIndex - 1] }));
    }
  };

  const handleProcessInput = async () => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const story = await generateStoryboard(state.inputContent, state.character, state.style, state.template);
      const visuals = await generateVisuals(story);
      
      const storyboardItems = story.map((s: any, i: number) => ({
        id: `story-${i}`,
        imageUrl: visuals[i] || 'https://picsum.photos/400/700',
        caption: s.caption,
        rank: i,
        selected: i === 0 // Select first by default
      }));

      setState(prev => ({ 
        ...prev, 
        storyboard: storyboardItems, 
        currentStep: StudioStep.STORYBOARD,
        loading: false 
      }));
    } catch (error) {
      console.error(error);
      setState(prev => ({ ...prev, loading: false, error: 'Failed to generate visuals.' }));
    }
  };

  if (!state.apiKeySet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-6">
        <div className="max-w-md w-full text-center space-y-6 studio-glass p-8 rounded-2xl shadow-2xl">
          <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/20">
            <i className="fas fa-bolt text-4xl text-white"></i>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">AI-Ozmil</h1>
          <p className="text-zinc-400">To start generating professional videos, please select a paid API key from Google AI Studio.</p>
          <div className="bg-zinc-900 p-4 rounded-xl text-sm text-left border border-zinc-800">
            <p className="text-zinc-500 mb-2 font-mono">Prerequisites:</p>
            <ul className="list-disc list-inside text-zinc-300 space-y-1">
              <li>GCP Billing enabled project</li>
              <li>Gemini API access</li>
            </ul>
          </div>
          <button 
            onClick={handleOpenKeyDialog}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
          >
            Select API Key
          </button>
          <p className="text-xs text-zinc-500">
            Refer to <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="underline hover:text-indigo-400">billing documentation</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden font-sans">
      <Sidebar currentStep={state.currentStep} />
      
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-8 bg-zinc-950/50 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 text-indigo-400 font-bold text-xl">
               <span className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-sm">
                 <i className="fas fa-bolt"></i>
               </span>
               AI-Ozmil <span className="text-zinc-600 font-medium text-xs border border-zinc-800 px-2 py-0.5 rounded-full">STUDIO</span>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <button className="px-4 py-1.5 text-sm bg-zinc-900 hover:bg-zinc-800 rounded-lg border border-zinc-800 transition-colors">
               Save Draft
             </button>
             <button className="px-4 py-1.5 text-sm bg-indigo-600 hover:bg-indigo-500 rounded-lg font-medium transition-colors">
               Export Video
             </button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-y-auto p-8 bg-zinc-950">
            <div className="max-w-4xl mx-auto pb-20">
              {state.currentStep === StudioStep.INPUT && (
                <StepInput 
                  state={state} 
                  setState={setState} 
                  onNext={handleProcessInput} 
                />
              )}
              {state.currentStep === StudioStep.STORYBOARD && (
                <StepStoryboard 
                  state={state} 
                  setState={setState} 
                  onNext={nextStep}
                />
              )}
              {state.currentStep === StudioStep.ANIMATE && (
                <StepAnimate 
                  state={state} 
                  setState={setState} 
                  onNext={nextStep}
                />
              )}
              {state.currentStep === StudioStep.FINALIZE && (
                <StepFinalize 
                  state={state} 
                  setState={setState} 
                  onNext={nextStep}
                />
              )}
            </div>
          </div>
          
          <PreviewWindow state={state} />
        </div>

        {/* Persistent Bottom Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-800 flex items-center justify-between px-8 z-20">
          <button 
            onClick={prevStep}
            disabled={state.currentStep === StudioStep.INPUT}
            className="px-6 py-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 disabled:opacity-0 transition-all font-medium"
          >
            <i className="fas fa-chevron-left mr-2"></i> Previous Step
          </button>
          
          <div className="flex items-center gap-2">
            {Object.values(StudioStep).map((step, idx) => (
              <div 
                key={step} 
                className={`w-2 h-2 rounded-full transition-all duration-500 ${state.currentStep === step ? 'w-8 bg-indigo-500' : 'bg-zinc-800'}`}
              />
            ))}
          </div>

          <button 
            onClick={nextStep}
            disabled={state.loading || state.currentStep === StudioStep.FINALIZE}
            className="px-8 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/10"
          >
            {state.loading ? <i className="fas fa-circle-notch fa-spin"></i> : 'Continue'} <i className="fas fa-chevron-right ml-2"></i>
          </button>
        </div>
      </main>

      <SettingsPanel state={state} setState={setState} />
    </div>
  );
};

export default App;
