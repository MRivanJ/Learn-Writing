import type { Request, Response } from 'express'
import { geminiJsonModel } from '../lib/gemini.js'

export async function handler(req: Request, res: Response) {
  try {
    const { promptType, promptText, essayText } = req.body ?? {}

    if (!promptType || !promptText || !essayText) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const systemInstruction = `
You are an expert English proficiency examiner grading an essay for the ${promptType.toUpperCase()} exam. 
Analyze the student's essay based on the prompt.

Please return a strictly formatted JSON object with the following structure:
{
  "band_score": number, // Overall score (e.g., 0-9 for IELTS, 0-30 for TOEFL)
  "feedback": {
    "task_achievement": number, // Sub-score (0-9 for IELTS)
    "coherence": number, // Sub-score
    "lexical": number, // Sub-score
    "grammar": number, // Sub-score
    "overall_comments": "string detailed overall feedback",
    "errors": [
      {
        "original": "the exact incorrect word/phrase from the text",
        "correction": "the suggested correction",
        "explanation": "why it is wrong"
      }
    ]
  }
}
`

    const userPrompt = `
EXAM TYPE: ${promptType}
PROMPT: ${promptText}

STUDENT ESSAY:
${essayText}

Evaluate this essay according to official scoring criteria.
`

    const result = await geminiJsonModel.generateContent({
      contents: [
        { role: 'user', parts: [{ text: systemInstruction + '\n\n' + userPrompt }] }
      ],
    })

    const responseText = result.response.text()
    const parsedData = JSON.parse(responseText)

    return res.json(parsedData)
  } catch (error) {
    console.error('Error grading essay:', error)
    return res.status(500).json({ error: 'Failed to evaluate the essay. Please try again later.' })
  }
}
