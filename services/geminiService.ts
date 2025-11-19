import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key is missing. Gemini features will be disabled.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateLetter = async (
  deceasedName: string,
  institutionName: string,
  accountType: string,
  accountNumber: string,
  relationship: string
): Promise<string> => {
  const client = getClient();
  if (!client) return "Error: API Key missing. Cannot generate letter.";

  const prompt = `
    Write a formal, compassionate, but direct business letter to close a bank account for a deceased person.
    
    Details:
    - Deceased Name: ${deceasedName}
    - Institution: ${institutionName}
    - Account Type: ${accountType}
    - Account Number: ${accountNumber}
    - Sender Relationship: ${relationship}
    
    The letter should request account closure and disbursement of funds to the estate. 
    Mention that a certified copy of the death certificate is enclosed.
    Keep it professional and concise. Do not include placeholders like [Date] or [Address], 
    just the body of the letter and the closing.
  `;

  try {
    const response: GenerateContentResponse = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Failed to generate content.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while generating the document. Please try again later.";
  }
};

export const askEstateQuestion = async (question: string, context: string): Promise<string> => {
  const client = getClient();
  if (!client) return "Error: API Key missing.";

  const prompt = `
    You are a compassionate and knowledgeable estate assistant for a grieving family.
    Context about the deceased: ${context}
    
    User Question: "${question}"
    
    Answer efficiently and calmly. Avoid legal advice disclaimers in every sentence, 
    but be clear you are an AI assistant. Keep the tone "Calm Capable".
  `;

  try {
    const response: GenerateContentResponse = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "I couldn't find an answer for that right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting right now.";
  }
};