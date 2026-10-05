import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

// Export the model configured for JSON output where needed
export const geminiModel = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
})

// Helper specific for getting structured JSON from Gemini
export const geminiJsonModel = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  generationConfig: {
    responseMimeType: 'application/json',
  },
})
