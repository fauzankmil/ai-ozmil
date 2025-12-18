
export enum StudioStep {
  INPUT = 'input',
  STORYBOARD = 'storyboard',
  SELECT = 'select',
  ANIMATE = 'animate',
  FINALIZE = 'finalize',
  EXPORT = 'export'
}

export enum ContentType {
  TEXT = 'text',
  IMAGE = 'image',
  VOICE = 'voice',
  PHOTO = 'photo'
}

export enum CTAStyle {
  FOLLOW = 'follow',
  COMMENT = 'comment',
  SAVE = 'save',
  SHARE = 'share',
  CLICK_LINK = 'link'
}

export enum TemplateType {
  STORYTIME = 'storytime',
  EDUCATIONAL = 'educational',
  VIRAL = 'viral',
  CINEMATIC = 'cinematic'
}

export interface CharacterProfile {
  name: string;
  description: string;
  traits: string[];
  referenceImage?: string;
  locked: boolean;
}

export interface VisualStyle {
  name: string;
  mood: string;
  lighting: string;
  colorPalette: string[];
  locked: boolean;
}

export interface StoryboardItem {
  id: string;
  imageUrl: string;
  caption: string;
  rank: number;
  selected: boolean;
}

export interface StudioState {
  currentStep: StudioStep;
  contentType: ContentType;
  inputContent: string;
  inputMedia?: string;
  character: CharacterProfile;
  style: VisualStyle;
  storyboard: StoryboardItem[];
  generatedVideoUrl?: string;
  cta: CTAStyle;
  template: TemplateType;
  loading: boolean;
  error?: string;
  apiKeySet: boolean;
}
