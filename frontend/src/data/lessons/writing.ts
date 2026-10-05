import { LevelLessons } from './types'

export const writingLessons: LevelLessons = {
  beginner: [
    {
      id: 'w-beg-1',
      title: 'Sentence and Paragraph Basics',
      description: 'Learn how to structure a basic English paragraph.',
      readingTimeMins: 5,
      practicePackageId: 1,
      sections: [
        {
          heading: 'The Topic Sentence',
          content: {
            en: 'Every paragraph should start with a topic sentence that tells the reader what the paragraph is about.',
            id: 'Setiap paragraf harus dimulai dengan kalimat topik yang memberi tahu pembaca tentang apa paragraf tersebut.'
          },
          examples: [
            { en: 'My hometown is famous for its beautiful beaches.', id: 'Kampung halaman saya terkenal dengan pantainya yang indah.' }
          ]
        }
      ],
      quiz: [
        {
          question: 'What is the purpose of a topic sentence?',
          options: ['To conclude the paragraph', 'To introduce the main idea', 'To list examples', 'To correct grammar'],
          correctAnswer: 'To introduce the main idea',
          explanation: {
            en: 'A topic sentence introduces the main idea of the paragraph.',
            id: 'Kalimat topik memperkenalkan ide utama dari paragraf.'
          }
        }
      ]
    }
  ],
  medium: [
    {
      id: 'w-med-1',
      title: 'IELTS Task 2 Essay Structure',
      description: 'How to structure a 250-word opinion essay.',
      readingTimeMins: 8,
      practicePackageId: 2,
      sections: [
        {
          heading: 'The 4-Paragraph Structure',
          content: {
            en: 'A standard essay includes an Introduction, two Body Paragraphs, and a Conclusion.',
            id: 'Esai standar mencakup Pendahuluan, dua Paragraf Isi, dan Kesimpulan.'
          }
        }
      ],
      quiz: [
        {
          question: 'How many paragraphs is recommended for IELTS Task 2?',
          options: ['2', '4', '6', '8'],
          correctAnswer: '4',
          explanation: {
            en: 'The standard structure is 4 paragraphs: Intro, Body 1, Body 2, Conclusion.',
            id: 'Struktur standarnya adalah 4 paragraf: Pendahuluan, Isi 1, Isi 2, Kesimpulan.'
          }
        }
      ]
    }
  ],
  expert: [
    {
      id: 'w-exp-1',
      title: 'Advanced Coherence & Cohesion',
      description: 'Mastering logical flow in complex academic essays.',
      readingTimeMins: 7,
      practicePackageId: 3,
      sections: [
        {
          heading: 'Nuanced Linking Devices',
          content: {
            en: 'Instead of basic linkers like "but" and "because", use "nevertheless", "consequently", or "notwithstanding".',
            id: 'Alih-alih penghubung dasar seperti "but" dan "because", gunakan "nevertheless", "consequently", atau "notwithstanding".'
          }
        }
      ],
      quiz: [
        {
          question: 'Which of the following is an advanced alternative to "but"?',
          options: ['And', 'So', 'Nevertheless', 'Because'],
          correctAnswer: 'Nevertheless',
          explanation: {
            en: '"Nevertheless" is a formal adverb used to introduce a contrasting point.',
            id: '"Nevertheless" adalah kata keterangan formal yang digunakan untuk memperkenalkan poin yang kontras.'
          }
        }
      ]
    }
  ]
}
