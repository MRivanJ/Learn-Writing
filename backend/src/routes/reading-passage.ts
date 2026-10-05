import type { Request, Response } from 'express'
import { geminiJsonModel } from '../lib/gemini.js'

export async function handler(_req: Request, res: Response) {
  try {
    const systemInstruction = `
You are an expert English examiner. Generate a TOEFL/IELTS style academic reading passage (around 300-400 words) and 5 multiple-choice comprehension questions based on the passage.
The passage should be on a random academic topic (e.g., Biology, History, Astronomy, Sociology).

If any question refers to a table, data, figure, diagram or chart, you MUST provide that data in the "table" field so the student can see it (never refer to visual material that is not included). If no table is needed, set "table" to null.

Return a strictly formatted JSON object with this structure:
{
  "title": "Title of the passage",
  "content": "Full text of the passage. Use paragraphs separated by \\n\\n.",
  "table": {
    "caption": "Short title of the table",
    "headers": ["Column 1", "Column 2"],
    "rows": [["value", "value"]]
  }, // or null
  "glossary": [
    { "word": "a harder word that appears in the passage", "meaningId": "its meaning in Bahasa Indonesia" }
  ], // 6 to 10 of the hardest words in the passage
  "questions": [
    {
      "id": "q1",
      "text": "The question text...",
      "options": ["A", "B", "C", "D"], // exactly 4 options
      "correctAnswer": "A", // must match exactly one of the options
      "explanation": "Why this answer is correct (in simple English).",
      "explanationId": "The same explanation written in simple, natural Bahasa Indonesia."
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
    console.error('Error generating reading passage:', error)
    return res.status(500).json({ error: 'Failed to generate reading passage.' })
  }
}
