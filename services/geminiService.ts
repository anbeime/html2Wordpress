import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedContentRaw } from "../types";

// Initialize the API client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates the text content for a product based on a creative fusion concept.
 */
export const generateProductText = async (userPrompt: string): Promise<GeneratedContentRaw> => {
  const modelId = "gemini-2.5-flash";
  
  const systemInstruction = `
    You are a visionary product designer for a brand that fuses "Traditional Chinese Elements" with "Western Modern/Grotesque/Surreal" aesthetics.
    Your goal is to invent a product based on the user's input.
    
    The tone should be sophisticated, slightly mysterious, and persuasive (e-commerce style).
    
    Return a JSON object.
    The 'imagePrompt' field should be a highly detailed visual description suitable for an image generator to create the product image.
    The 'amazonSearchTerm' should be a search query to find similar real items on Amazon.
  `;

  const response = await ai.models.generateContent({
    model: modelId,
    contents: `Create a unique product concept based on: "${userPrompt}".`,
    config: {
      systemInstruction: systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "A creative, catchy product name." },
          tagline: { type: Type.STRING, description: "A short, punchy marketing slogan." },
          description: { type: Type.STRING, description: "A compelling 2-3 sentence product description." },
          price: { type: Type.NUMBER, description: "A realistic price in USD." },
          features: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "List of 3-4 key features."
          },
          imagePrompt: { type: Type.STRING, description: "A detailed prompt to generate the product image." },
          amazonSearchTerm: { type: Type.STRING, description: "Keywords to search this item on Amazon." },
          category: { type: Type.STRING, description: "The product category." }
        },
        required: ["title", "tagline", "description", "price", "features", "imagePrompt", "amazonSearchTerm", "category"]
      }
    }
  });

  if (response.text) {
    return JSON.parse(response.text) as GeneratedContentRaw;
  }
  throw new Error("Failed to generate product text.");
};

/**
 * Generates an image for the product using Gemini.
 */
export const generateProductImage = async (imagePrompt: string): Promise<string> => {
  const modelId = "gemini-2.5-flash-image";

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          { text: imagePrompt + ", professional product photography, studio lighting, white background, high resolution, photorealistic, 8k" }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
        }
      }
    });

    // Extract image from response parts
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error("No image data found in response.");
  } catch (error) {
    console.error("Image generation failed:", error);
    // Fallback image if generation fails to avoid crashing the flow
    return "https://picsum.photos/800/800?grayscale&blur=2"; 
  }
};