import { LevelLessons } from './types'

export const vocabularyLessons: LevelLessons = {
  beginner: [
    {
      id: 'v-beg-1',
      title: 'Everyday Verbs',
      description: 'The most common verbs you need for daily communication.',
      readingTimeMins: 4,
      practicePackageId: 1,
      sections: [
        {
          heading: 'Core Verbs',
          content: {
            en: 'Verbs like "make", "do", "have", and "take" are used in hundreds of common phrases.',
            id: 'Kata kerja seperti "make", "do", "have", dan "take" digunakan dalam ratusan frasa umum.'
          },
          examples: [
            { en: 'I make my bed every morning.', id: 'Saya merapikan tempat tidur setiap pagi.' },
            { en: 'She is doing her homework.', id: 'Dia sedang mengerjakan PR-nya.' }
          ]
        }
      ],
      quiz: [
        {
          question: 'Which verb fits best: I usually ___ a shower in the morning.',
          options: ['make', 'do', 'take', 'play'],
          correctAnswer: 'take',
          explanation: {
            en: 'In English, we typically say "take a shower" or "have a shower".',
            id: 'Dalam bahasa Inggris, kita biasanya mengatakan "take a shower" atau "have a shower".'
          }
        }
      ]
    }
  ],
  medium: [
    {
      id: 'v-med-1',
      title: 'Academic Word List (AWL) Basics',
      description: 'Essential formal words for exams and essays.',
      readingTimeMins: 6,
      practicePackageId: 2,
      sections: [
        {
          heading: 'Formal vs Informal',
          content: {
            en: 'In academic writing, replace simple words with more formal alternatives (e.g., "show" -> "demonstrate").',
            id: 'Dalam penulisan akademis, ganti kata-kata sederhana dengan alternatif yang lebih formal (misalnya, "show" -> "demonstrate").'
          }
        }
      ],
      quiz: [
        {
          question: 'Which word is the most formal alternative to "bad"?',
          options: ['Not good', 'Terrible', 'Adverse', 'Sad'],
          correctAnswer: 'Adverse',
          explanation: {
            en: '"Adverse" is a formal academic word (e.g., adverse effects).',
            id: '"Adverse" adalah kata akademis formal (misalnya, efek buruk/merugikan).'
          }
        }
      ]
    }
  ],
  expert: [
    {
      id: 'v-exp-1',
      title: 'Nuance and Register',
      description: 'Understanding the subtle differences between synonyms.',
      readingTimeMins: 7,
      practicePackageId: 3,
      sections: [
        {
          heading: 'Connotation',
          content: {
            en: 'Words can have positive, negative, or neutral feelings attached to them, even if they mean the same thing.',
            id: 'Kata-kata dapat memiliki perasaan positif, negatif, atau netral yang melekat padanya, meskipun memiliki arti yang sama.'
          },
          examples: [
            { en: '"Slender" (positive) vs "Skinny" (negative)', id: '"Slender" / langsing (positif) vs "Skinny" / kurus kering (negatif)' }
          ]
        }
      ],
      quiz: [
        {
          question: 'Which word has a negative connotation?',
          options: ['Determined', 'Stubborn', 'Resolute', 'Persistent'],
          correctAnswer: 'Stubborn',
          explanation: {
            en: 'While all mean not giving up, "stubborn" implies being difficult or unreasonable.',
            id: 'Meskipun semua berarti tidak menyerah, "stubborn" (keras kepala) menyiratkan bersikap sulit atau tidak masuk akal.'
          }
        }
      ]
    }
  ]
}
