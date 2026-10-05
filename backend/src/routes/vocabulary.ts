import type { Request, Response } from 'express'
import { geminiJsonModel } from '../lib/gemini.js'

export async function handler(req: Request, res: Response) {
  try {
    const { level } = req.body ?? {}
    const targetLevel = level || 'advanced'

    const systemInstruction = `
You are an expert English vocabulary teacher. Generate a list of 5 high-frequency academic words suitable for TOEFL/IELTS preparation at the ${targetLevel} level.
Write the "meaningId" field in natural, easy Bahasa Indonesia for an Indonesian learner.
Make sure the words are useful for academic writing and reading.

Return a strictly formatted JSON object with this structure:
{
  "words": [
    {
      "word": "string",
      "definition": "string (simple English definition)",
      "meaningId": "string (the meaning of the word in simple Indonesian / Bahasa Indonesia)",
      "example": "string (a sentence using the word)",
      "synonyms": ["string", "string"],
      "partOfSpeech": "string"
    }
  ]
}
`

    const result = await geminiJsonModel.generateContent({
      contents: [{ role: 'user', parts: [{ text: systemInstruction }] }],
    })

    const responseText = result.response.text()
    const parsedData = JSON.parse(responseText)

    return res.json(parsedData)
  } catch (error) {
    console.error('Error generating vocabulary:', error)
    return res.status(500).json({ error: 'Failed to generate vocabulary.' })
  }
}
