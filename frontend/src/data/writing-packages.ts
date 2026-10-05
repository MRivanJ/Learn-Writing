import type { PromptVisual } from '@/components/prompt-visual'

export type WritingPrompt = {
  id: string
  title: string
  text: string
  visual?: PromptVisual
}

/** 3 packages x 1 prompt */
export const WRITING_PACKAGES: Record<number, WritingPrompt[]> = {
  // ───────────── Package 1 – Beginner ─────────────
  1: [
    {
      id: 'w1-1',
      title: 'Beginner Writing Task',
      text: 'Write about a person who has had a significant influence on your life. Describe who this person is, how you met them, and explain the specific ways they have impacted your life and shaped your character. (Write at least 150 words)',
    }
  ],
  // ───────────── Package 2 – Medium ─────────────
  2: [
    {
      id: 'w2-1',
      title: 'IELTS Task 2 (Opinion)',
      text: 'Some people believe that unpaid community service should be a compulsory part of high school programmes (for example working for a charity, improving the neighbourhood or teaching sports to younger children). To what extent do you agree or disagree? (Write at least 250 words)',
    }
  ],
  // ───────────── Package 3 – Expert ─────────────
  3: [
    {
      id: 'w3-1',
      title: 'IELTS Task 1 (Academic)',
      text: 'The chart below shows the number of men and women in further education in Britain in three periods and whether they were studying full-time or part-time. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      visual: {
        chart: {
          title: 'Students in further education in Britain (thousands)',
          yLabel: 'Thousands of students',
          xKey: 'period',
          series: ['Men full-time', 'Men part-time', 'Women full-time', 'Women part-time'],
          data: [
            { period: '1970/71', 'Men full-time': 100, 'Men part-time': 1000, 'Women full-time': 70, 'Women part-time': 750 },
            { period: '1980/81', 'Men full-time': 110, 'Men part-time': 800, 'Women full-time': 130, 'Women part-time': 1100 },
            { period: '1990/91', 'Men full-time': 130, 'Men part-time': 650, 'Women full-time': 200, 'Women part-time': 1400 },
          ],
        },
        table: {
          caption: 'Same data in table form (thousands)',
          headers: ['Period', 'Men full-time', 'Men part-time', 'Women full-time', 'Women part-time'],
          rows: [
            ['1970/71', 100, 1000, 70, 750],
            ['1980/81', 110, 800, 130, 1100],
            ['1990/91', 130, 650, 200, 1400],
          ],
        },
      }
    }
  ]
}
