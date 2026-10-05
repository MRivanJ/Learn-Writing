import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { handler as gradeEssay } from './routes/grade-essay.js'
import { handler as grammarDrill } from './routes/grammar-drill.js'
import { handler as readingPassage } from './routes/reading-passage.js'
import { handler as vocabulary } from './routes/vocabulary.js'

const app = express()
const port = Number(process.env.PORT) || 4000

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }))
app.use(express.json())

app.post('/api/ai/grade-essay', gradeEssay)
app.post('/api/ai/grammar-drill', grammarDrill)
app.post('/api/ai/reading-passage', readingPassage)
app.post('/api/ai/vocabulary', vocabulary)

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`)
})
