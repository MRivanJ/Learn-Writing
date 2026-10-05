import type { Request, Response } from 'express'
import { geminiJsonModel } from '../lib/gemini.js'

export async function handler(req: Request, res: Response) {
  try {
    const { topic } = req.body ?? {}

    if (!topic) {
      return res.status(400).json({ error: 'Missing topic' })
    }

    const systemInstruction = `
You are an expert English teacher. Generate 5 multiple-choice grammar questions on the topic of "${topic}".
Each question should be challenging enough for TOEFL/IELTS preparation (B2-C1 level).

Return a strictly formatted JSON object with this structure:
{
  "questions": [
    {
      "id": "1", // unique string ID
      "text": "The sentence with a blank...",
      "options": ["A", "B", "C", "D"], // exactly 4 options
      "correctAnswer": "A", // must match one of the options exactly
      "explanation": "Why this answer is correct (in simple English).",
      "explanationId": "The same explanation written in simple, natural Bahasa Indonesia for an Indonesian learner."
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
    console.error('Error generating grammar drill:', error)
    return res.status(500).json({ error: 'Failed to generate drill.' })
  }
}
