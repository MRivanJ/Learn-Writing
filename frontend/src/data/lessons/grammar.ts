import { LevelLessons } from './types'

export const grammarLessons: LevelLessons = {
  beginner: [
    {
      id: 'g-beg-1',
      title: 'Simple Present Tense',
      description: 'Learn how to describe habits and general facts.',
      readingTimeMins: 5,
      practicePackageId: 1,
      sections: [
        {
          heading: 'What is Simple Present?',
          content: {
            en: 'We use the simple present tense to talk about things that are always true, habits, or routines.',
            id: 'Kita menggunakan simple present tense untuk membicarakan hal-hal yang selalu benar, kebiasaan, atau rutinitas.'
          },
          examples: [
            { en: 'I drink coffee every morning. (Habit)', id: 'Saya minum kopi setiap pagi. (Kebiasaan)' },
            { en: 'The sun rises in the east. (Fact)', id: 'Matahari terbit di sebelah timur. (Fakta)' }
          ]
        },
        {
          heading: 'Subject-Verb Agreement',
          content: {
            en: 'For He, She, and It, remember to add -s or -es to the verb.',
            id: 'Untuk He, She, dan It, ingatlah untuk menambahkan -s atau -es pada kata kerja.'
          },
          examples: [
            { en: 'She works in an office.', id: 'Dia bekerja di kantor.' },
            { en: 'He goes to school by bus.', id: 'Dia pergi ke sekolah dengan bus.' }
          ]
        }
      ],
      commonMistakes: {
        en: 'Forgetting the -s for third-person singular (e.g., saying "He play" instead of "He plays").',
        id: 'Lupa menambahkan -s untuk orang ketiga tunggal (misalnya, mengatakan "He play" bukan "He plays").'
      },
      quiz: [
        {
          question: 'My brother ___ football every Sunday.',
          options: ['play', 'plays', 'playing', 'played'],
          correctAnswer: 'plays',
          explanation: {
            en: '"My brother" is third-person singular (he), so we add -s to the verb.',
            id: '"My brother" adalah orang ketiga tunggal (he), jadi kita menambahkan -s pada kata kerja.'
          }
        },
        {
          question: 'Water ___ at 100 degrees Celsius.',
          options: ['boil', 'boils', 'boiling', 'boiled'],
          correctAnswer: 'boils',
          explanation: {
            en: 'This is a general fact, and "Water" is an uncountable noun (it), so we use "boils".',
            id: 'Ini adalah fakta umum, dan "Water" adalah kata benda tak bisa dihitung (it), jadi kita gunakan "boils".'
          }
        }
      ]
    },
    {
      id: 'g-beg-2',
      title: 'Basic Articles (A, An, The)',
      description: 'Understand when to use definite and indefinite articles.',
      readingTimeMins: 4,
      practicePackageId: 1,
      sections: [
        {
          heading: 'A and An (Indefinite)',
          content: {
            en: 'Use "a" before consonant sounds and "an" before vowel sounds when talking about a non-specific thing.',
            id: 'Gunakan "a" sebelum bunyi konsonan dan "an" sebelum bunyi vokal saat membicarakan hal yang tidak spesifik.'
          },
          examples: [
            { en: 'I have a dog.', id: 'Saya punya seekor anjing.' },
            { en: 'She ate an apple.', id: 'Dia makan sebuah apel.' }
          ]
        },
        {
          heading: 'The (Definite)',
          content: {
            en: 'Use "the" when talking about a specific thing that both the speaker and listener know.',
            id: 'Gunakan "the" saat membicarakan hal spesifik yang diketahui oleh pembicara dan pendengar.'
          },
          examples: [
            { en: 'The dog is barking.', id: 'Anjing itu (yang kita ketahui) sedang menggonggong.' }
          ]
        }
      ],
      quiz: [
        {
          question: 'I saw ___ elephant at the zoo.',
          options: ['a', 'an', 'the', 'no article'],
          correctAnswer: 'an',
          explanation: {
            en: '"Elephant" starts with a vowel sound, and it\'s one of many elephants.',
            id: '"Elephant" dimulai dengan bunyi vokal, dan itu adalah salah satu dari banyak gajah.'
          }
        }
      ]
    }
  ],
  medium: [
    {
      id: 'g-med-1',
      title: 'First and Second Conditionals',
      description: 'Express real and hypothetical situations.',
      readingTimeMins: 6,
      practicePackageId: 2,
      sections: [
        {
          heading: 'First Conditional (Real)',
          content: {
            en: 'Used for future situations that are likely to happen. Structure: If + Present, Will + Verb.',
            id: 'Digunakan untuk situasi masa depan yang kemungkinan besar terjadi. Struktur: If + Present, Will + Verb.'
          },
          examples: [
            { en: 'If it rains, I will stay home.', id: 'Jika hujan, saya akan tinggal di rumah.' }
          ]
        },
        {
          heading: 'Second Conditional (Unreal)',
          content: {
            en: 'Used for hypothetical or unlikely situations in the present or future. Structure: If + Past, Would + Verb.',
            id: 'Digunakan untuk situasi hipotetis atau tidak mungkin di masa sekarang atau masa depan. Struktur: If + Past, Would + Verb.'
          },
          examples: [
            { en: 'If I won the lottery, I would buy a house.', id: 'Jika saya memenangkan lotre, saya akan membeli rumah.' }
          ]
        }
      ],
      quiz: [
        {
          question: 'If I ___ you, I would study harder.',
          options: ['am', 'was', 'were', 'be'],
          correctAnswer: 'were',
          explanation: {
            en: 'In the second conditional, "were" is typically used for all subjects (If I were you).',
            id: 'Dalam conditional kedua, "were" biasanya digunakan untuk semua subjek (If I were you).'
          }
        }
      ]
    }
  ],
  expert: [
    {
      id: 'g-exp-1',
      title: 'Mixed Conditionals',
      description: 'Combine past and present unreal situations.',
      readingTimeMins: 7,
      practicePackageId: 3,
      sections: [
        {
          heading: 'Past Action, Present Result',
          content: {
            en: 'Structure: If + Past Perfect, Would + Base Verb. Used when a past unreal condition has a present unreal result.',
            id: 'Struktur: If + Past Perfect, Would + Base Verb. Digunakan saat kondisi tidak nyata di masa lalu memiliki hasil tidak nyata di masa sekarang.'
          },
          examples: [
            { en: 'If I had studied harder (past), I would be a doctor now (present).', id: 'Jika saya belajar lebih keras (dulu), saya akan menjadi dokter sekarang.' }
          ]
        }
      ],
      quiz: [
        {
          question: 'If she had taken the medication, she ___ feeling sick now.',
          options: ['would not be', 'will not be', 'would not have been', 'had not been'],
          correctAnswer: 'would not be',
          explanation: {
            en: 'Past condition (had taken) leading to a present result (would not be).',
            id: 'Kondisi masa lalu (had taken) mengarah ke hasil masa sekarang (would not be).'
          }
        }
      ]
    }
  ]
}
