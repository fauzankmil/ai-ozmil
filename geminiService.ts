
import { GoogleGenAI, Type, GenerateContentResponse, Modality } from "@google/genai";
import { CharacterProfile, VisualStyle, TemplateType } from "./types";

// Note: process.env.API_KEY is pre-configured in the runtime
const getAi = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateStoryboard = async (
  input: string, 
  character: CharacterProfile, 
  style: VisualStyle,
  template: TemplateType
) => {
  const ai = getAi();
  const prompt = `
    Create 10 storyboard descriptions for a ${template} video.
    Input script: ${input}
    Character: ${character.description}, traits: ${character.traits.join(', ')}
    Visual Style: ${style.mood}, ${style.lighting}
    
    Return a list of detailed prompts for image generation. Each prompt must include the character reference to ensure consistency.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            caption: { type: Type.STRING },
            visualPrompt: { type: Type.STRING }
          },
          required: ['caption', 'visualPrompt']
        }
      }
    }
  });

  return JSON.parse(response.text);
};

export const generateVisuals = async (prompts: { visualPrompt: string }[]) => {
  const ai = getAi();
  const visuals = [];

  // In a real app we'd parallelize, but for a studio we want high quality
  // Generating using gemini-3-pro-image-preview for consistency
  for (const item of prompts.slice(0, 8)) {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: { parts: [{ text: item.visualPrompt }] },
      config: {
        imageConfig: { aspectRatio: '9:16', imageSize: '1K' }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        visuals.push(`data:image/png;base64,${part.inlineData.data}`);
      }
    }
  }
  return visuals;
};

export const generateVideo = async (imageB64: string, prompt: string) => {
  const ai = getAi();
  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: `Animate this character naturally: ${prompt}`,
    image: {
      imageBytes: imageB64.split(',')[1],
      mimeType: 'image/png'
    },
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: '9:16'
    }
  });

  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 5000));
    operation = await ai.operations.getVideosOperation({ operation });
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  const res = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
  const blob = await res.blob();
  return URL.createObjectURL(blob);
};

export const generateVoiceOver = async (text: string) => {
  const ai = getAi();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: `Read naturally: ${text}` }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Kore' },
        },
      },
    },
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64Audio) throw new Error("Voice generation failed");
  
  return `data:audio/pcm;base64,${base64Audio}`;
};
