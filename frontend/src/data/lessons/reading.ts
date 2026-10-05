import { LevelLessons } from './types'

export const readingLessons: LevelLessons = {
  beginner: [
    {
      id: 'r-beg-1',
      title: 'Skimming for the Main Idea',
      description: 'Learn how to quickly find what a text is about.',
      readingTimeMins: 5,
      practicePackageId: 1,
      sections: [
        {
          heading: 'What is Skimming?',
          content: {
            en: 'Skimming means reading very fast to get the general idea, not every single word. Focus on the first sentence of each paragraph.',
            id: 'Skimming berarti membaca sangat cepat untuk mendapatkan ide umum, bukan setiap kata. Fokus pada kalimat pertama setiap paragraf.'
          }
        }
      ],
      quiz: [
        {
          question: 'When skimming, what should you focus on most?',
          options: ['Every single word', 'The first sentence of each paragraph', 'The author\'s name', 'The punctuation'],
          correctAnswer: 'The first sentence of each paragraph',
          explanation: {
            en: 'The first sentence often contains the main idea (topic sentence) of the paragraph.',
            id: 'Kalimat pertama sering kali berisi ide utama (kalimat topik) dari paragraf.'
          }
        }
      ]
    }
  ],
  medium: [
    {
      id: 'r-med-1',
      title: 'True / False / Not Given',
      description: 'Master the trickiest question type in English exams.',
      readingTimeMins: 8,
      practicePackageId: 2,
      sections: [
        {
          heading: 'Understanding "Not Given"',
          content: {
            en: 'If the information is not explicitly mentioned or cannot be deduced, the answer is "Not Given". Do not use your own outside knowledge.',
            id: 'Jika informasi tidak disebutkan secara eksplisit atau tidak dapat disimpulkan, jawabannya adalah "Not Given". Jangan gunakan pengetahuan luar Anda sendiri.'
          }
        }
      ],
      quiz: [
        {
          question: 'If a statement is factually true in the real world, but not mentioned in the text, what is the answer?',
          options: ['True', 'False', 'Not Given', 'Yes'],
          correctAnswer: 'Not Given',
          explanation: {
            en: 'You must base your answer strictly on the text provided, not outside knowledge.',
            id: 'Anda harus mendasarkan jawaban Anda secara ketat pada teks yang disediakan, bukan pengetahuan dari luar.'
          }
        }
      ]
    }
  ],
  expert: [
    {
      id: 'r-exp-1',
      title: 'Inference and Author Purpose',
      description: 'Read between the lines in complex academic texts.',
      readingTimeMins: 7,
      practicePackageId: 3,
      sections: [
        {
          heading: 'Making Inferences',
          content: {
            en: 'An inference is a logical conclusion based on evidence in the text, even if it is not directly stated.',
            id: 'Inferensi adalah kesimpulan logis berdasarkan bukti dalam teks, meskipun tidak dinyatakan secara langsung.'
          }
        }
      ],
      quiz: [
        {
          question: 'What is an inference?',
          options: ['A direct quote', 'A wild guess', 'A logical conclusion based on text evidence', 'A grammatical error'],
          correctAnswer: 'A logical conclusion based on text evidence',
          explanation: {
            en: 'Inference involves combining text clues with logic to understand unstated meanings.',
            id: 'Inferensi melibatkan penggabungan petunjuk teks dengan logika untuk memahami makna yang tidak tersurat.'
          }
        }
      ]
    }
  ]
}
