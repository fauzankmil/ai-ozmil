
import React from 'react';
import { CTAStyle, TemplateType, VisualStyle, CharacterProfile } from './types';

export const CTA_PRESETS = {
  [CTAStyle.FOLLOW]: {
    label: 'Follow for Part 2',
    icon: <i className="fas fa-plus-circle"></i>,
    behavior: 'Cliffhanger ending with animated follow button.'
  },
  [CTAStyle.COMMENT]: {
    label: 'Comment your choice',
    icon: <i className="fas fa-comment"></i>,
    behavior: 'Pause with interactive prompt Overlay.'
  },
  [CTAStyle.SAVE]: {
    label: 'Save this',
    icon: <i className="fas fa-bookmark"></i>,
    behavior: 'Recap summary screen with bookmark animation.'
  },
  [CTAStyle.SHARE]: {
    label: 'Share with a friend',
    icon: <i className="fas fa-paper-plane"></i>,
    behavior: 'Viral hook with arrow animation.'
  },
  [CTAStyle.CLICK_LINK]: {
    label: 'Check link in bio',
    icon: <i className="fas fa-link"></i>,
    behavior: 'End screen with CTA overlay pointing down.'
  }
};

export const TEMPLATES = {
  [TemplateType.STORYTIME]: {
    name: 'Storytime',
    description: 'Casual, fast pacing, dynamic captions.',
    scenes: 12,
    pacing: 'dynamic'
  },
  [TemplateType.EDUCATIONAL]: {
    name: 'Masterclass',
    description: 'Slow pacing, bold highlight text.',
    scenes: 8,
    pacing: 'steady'
  },
  [TemplateType.VIRAL]: {
    name: 'Viral/Hype',
    description: 'Extreme pacing, neon effects, flash transitions.',
    scenes: 15,
    pacing: 'aggressive'
  },
  [TemplateType.CINEMATIC]: {
    name: 'Cinematic',
    description: 'Wide shots, smooth transitions, atmospheric.',
    scenes: 6,
    pacing: 'slow'
  }
};

export const DEFAULT_STYLE: VisualStyle = {
  name: 'Cyberpunk Neon',
  mood: 'Vibrant, high contrast',
  lighting: 'Volumetric neon glow',
  colorPalette: ['#ff00ff', '#00ffff', '#000000'],
  locked: true
};

export const DEFAULT_CHARACTER: CharacterProfile = {
  name: 'Ozmil Avatar',
  description: 'A futuristic creator with glowing accessories',
  traits: ['confident', 'tech-savvy', 'expressive'],
  locked: true
};
