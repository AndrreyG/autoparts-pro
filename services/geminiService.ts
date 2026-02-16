import { GoogleGenAI, Type } from '@google/genai';
import { CarPart, FilterState } from '../types';
import { getPartImage } from '../constants';

export const generatePartsWithGemini = async (
  filters: FilterState
): Promise<CarPart[]> => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.warn("API Key missing, returning empty list from AI service.");
    return [];
  }

  const ai = new GoogleGenAI({ apiKey });

  // Construct a prompt context based on filters
  const filterDescription = `
    Brand: ${filters.brand || 'Any'}
    Model: ${filters.model || 'Any'}
    Year: ${filters.year || 'Any'}
    Category: ${filters.category || 'Any'}
    Search Query: ${filters.searchQuery || 'None'}
  `;

  const prompt = `
    Generate a realistic list of 8 automotive car parts based on the following criteria:
    ${filterDescription}

    If the criteria are "Any", generate a diverse mix of popular car parts.
    Ensure the "partNumber" looks realistic (e.g., specific to brand).
    Ensure "modelCompatibility" includes the filtered model if specified, or realistic models for the brand.
    Ensure "yearCompatibility" includes the filtered year if specified.
    
    If the Search Query describes a symptom (e.g., "squeaking noise"), generate parts that fix that symptom.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              brand: { type: Type.STRING },
              modelCompatibility: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              yearCompatibility: {
                type: Type.ARRAY,
                items: { type: Type.INTEGER }
              },
              category: { type: Type.STRING },
              price: { type: Type.NUMBER },
              partNumber: { type: Type.STRING },
              inStock: { type: Type.BOOLEAN },
              // We do not ask for imageUrl from Gemini, we assign it locally based on category
              description: { type: Type.STRING }
            }
          }
        }
      }
    });

    const data = JSON.parse(response.text || '[]');
    
    // Post-process to ensure we have images
    return data.map((part: any, index: number) => ({
      ...part,
      // Ensure ID is unique if Gemini hallucinates duplicates
      id: `ai-${Date.now()}-${index}`,
      // Use helper to get a relevant image based on the generated category
      imageUrl: getPartImage(part.category)
    }));

  } catch (error) {
    console.error("Gemini API Error:", error);
    return [];
  }
};