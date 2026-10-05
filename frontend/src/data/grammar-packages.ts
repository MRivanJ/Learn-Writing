import type { Bilingual } from '@/lib/language'

export const GRAMMAR_TOPICS = [
  'Tenses',
  'Articles',
  'Prepositions',
  'Conditionals',
  'Passive Voice',
  'Subject-Verb Agreement',
] as const

export type GrammarTopic = (typeof GRAMMAR_TOPICS)[number]

export type GrammarQuestion = {
  id: string
  topic: GrammarTopic
  text: string
  options: string[]
  correctAnswer: string
  explanation: Bilingual
}

/** Small helper so each question stays on a few lines. `answer` is the index of the right option. */
function q(
  id: string,
  topic: GrammarTopic,
  text: string,
  options: string[],
  answer: number,
  en: string,
  idn: string
): GrammarQuestion {
  return { id, topic, text, options, correctAnswer: options[answer], explanation: { en, id: idn } }
}

/** 3 packages x 12 questions (2 per topic) so weak topics can be found. */
export const GRAMMAR_PACKAGES: Record<number, GrammarQuestion[]> = {
  // ───────────── Package 1 – Beginner ─────────────
  1: [
    q('g1-1', 'Tenses', 'She ___ to school every day.', ['goes', 'go', 'going', 'gone'], 0,
      'A daily habit uses the present simple. With "she" we add -s: goes.',
      'Kebiasaan sehari-hari memakai present simple. Dengan subjek "she" kita tambahkan -s: goes.'),
    q('g1-2', 'Tenses', 'Yesterday I ___ a movie with my friends.', ['watch', 'watched', 'watching', 'watches'], 1,
      '"Yesterday" shows a finished action in the past, so we use the past simple: watched.',
      '"Yesterday" menunjukkan kejadian yang sudah selesai di masa lalu, jadi memakai past simple: watched.'),
    q('g1-3', 'Articles', 'I saw ___ elephant at the zoo.', ['a', 'an', 'the', 'no article'], 1,
      'We use "an" before a vowel sound. "Elephant" starts with the vowel sound /e/.',
      'Kita pakai "an" sebelum bunyi vokal. "Elephant" diawali bunyi vokal /e/.'),
    q('g1-4', 'Articles', '___ sun rises in the east.', ['A', 'An', 'The', 'No article'], 2,
      'There is only one sun, so we use "the" for things that are unique.',
      'Matahari hanya satu, jadi kita pakai "the" untuk hal yang unik.'),
    q('g1-5', 'Prepositions', 'The meeting is ___ Monday.', ['in', 'on', 'at', 'by'], 1,
      'We use "on" with days of the week: on Monday.',
      'Kita pakai "on" untuk nama hari: on Monday.'),
    q('g1-6', 'Prepositions', 'She is very good ___ math.', ['at', 'in', 'on', 'for'], 0,
      'The fixed phrase is "good at" (a subject or skill).',
      'Frasa tetapnya adalah "good at" (untuk pelajaran atau keahlian).'),
    q('g1-7', 'Conditionals', 'If it rains tomorrow, we ___ at home.', ['stay', 'will stay', 'stayed', 'would stay'], 1,
      'A real future possibility uses: If + present simple, will + verb (first conditional).',
      'Kemungkinan nyata di masa depan memakai: If + present simple, will + verb (first conditional).'),
    q('g1-8', 'Conditionals', 'If I ___ hungry, I eat something.', ['am', 'was', 'were', 'will be'], 0,
      'For general truths we use If + present simple, present simple (zero conditional).',
      'Untuk kebenaran umum kita pakai If + present simple, present simple (zero conditional).'),
    q('g1-9', 'Passive Voice', 'The cake ___ by my mother.', ['made', 'was made', 'makes', 'making'], 1,
      'Passive voice = be + past participle. The cake was made (past).',
      'Kalimat pasif = be + past participle. The cake was made (lampau).'),
    q('g1-10', 'Passive Voice', 'English ___ in many countries.', ['speaks', 'is spoken', 'spoke', 'speaking'], 1,
      'English receives the action, so we use the passive: is spoken.',
      'English menerima aksi, jadi memakai pasif: is spoken.'),
    q('g1-11', 'Subject-Verb Agreement', 'The dogs ___ in the garden.', ['is', 'are', 'was', 'be'], 1,
      '"Dogs" is plural, so we use the plural verb "are".',
      '"Dogs" jamak, jadi memakai kata kerja jamak "are".'),
    q('g1-12', 'Subject-Verb Agreement', 'My brother ___ a teacher.', ['are', 'is', 'be', 'were'], 1,
      '"My brother" is singular, so we use "is".',
      '"My brother" tunggal, jadi memakai "is".'),
  ],

  // ───────────── Package 2 – Medium ─────────────
  2: [
    q('g2-1', 'Tenses', 'By the time we arrived, the film ___.', ['has started', 'had started', 'starts', 'was start'], 1,
      'An action finished before another past action uses the past perfect: had started.',
      'Aksi yang selesai sebelum aksi lampau lainnya memakai past perfect: had started.'),
    q('g2-2', 'Tenses', 'I ___ in this city since 2020.', ['live', 'lived', 'have lived', 'am living'], 2,
      '"Since 2020" connects the past to now, so we use the present perfect: have lived.',
      '"Since 2020" menghubungkan masa lalu sampai sekarang, jadi memakai present perfect: have lived.'),
    q('g2-3', 'Articles', 'She is ___ honest person.', ['a', 'an', 'the', 'no article'], 1,
      '"Honest" starts with a silent h, so it begins with a vowel sound: an honest person.',
      '"Honest" diawali huruf h yang tidak dibunyikan, jadi bunyinya vokal: an honest person.'),
    q('g2-4', 'Articles', '___ water is essential for life.', ['The', 'A', 'An', 'No article'], 3,
      'For general ideas with uncountable nouns we use no article.',
      'Untuk hal umum dengan kata benda tak terhitung, kita tidak memakai artikel.'),
    q('g2-5', 'Prepositions', 'He apologised ___ being late.', ['for', 'of', 'to', 'at'], 0,
      'The verb "apologise" is followed by "for": apologise for something.',
      'Kata kerja "apologise" diikuti "for": apologise for something.'),
    q('g2-6', 'Prepositions', 'We are interested ___ learning Japanese.', ['on', 'in', 'at', 'for'], 1,
      'The fixed phrase is "interested in".',
      'Frasa tetapnya adalah "interested in".'),
    q('g2-7', 'Conditionals', 'If I ___ you, I would take the job.', ['am', 'was', 'were', 'be'], 2,
      'For an imaginary situation (second conditional) we use "were" for all subjects after "If".',
      'Untuk situasi khayalan (second conditional) kita pakai "were" untuk semua subjek setelah "If".'),
    q('g2-8', 'Conditionals', 'If she had studied harder, she ___ the exam.',
      ['would pass', 'would have passed', 'will pass', 'passed'], 1,
      'An unreal past situation uses: If + past perfect, would have + past participle (third conditional).',
      'Situasi lampau yang tidak terjadi memakai: If + past perfect, would have + past participle (third conditional).'),
    q('g2-9', 'Passive Voice', 'The new bridge ___ next year.', ['will be built', 'will build', 'is building', 'built'], 0,
      'Future passive = will be + past participle. The bridge receives the action.',
      'Pasif masa depan = will be + past participle. Jembatan menerima aksi.'),
    q('g2-10', 'Passive Voice', 'The thief ___ by the police yesterday.', ['arrested', 'was arrested', 'is arrested', 'has arrest'], 1,
      'Past passive = was/were + past participle: was arrested.',
      'Pasif lampau = was/were + past participle: was arrested.'),
    q('g2-11', 'Subject-Verb Agreement', 'Neither the teacher nor the students ___ ready.', ['is', 'are', 'was', 'has'], 1,
      'With "neither... nor", the verb agrees with the nearer subject ("students"), so: are.',
      'Dengan "neither... nor", kata kerja mengikuti subjek terdekat ("students"), jadi: are.'),
    q('g2-12', 'Subject-Verb Agreement', 'Everyone in the class ___ a textbook.', ['have', 'has', 'are', 'were'], 1,
      '"Everyone" is singular, so we use "has".',
      '"Everyone" dianggap tunggal, jadi memakai "has".'),
  ],

  // ───────────── Package 3 – Expert ─────────────
  3: [
    q('g3-1', 'Tenses', 'This time next week, I ___ on a beach in Bali.',
      ['will lie', 'will be lying', 'lie', 'am lay'], 1,
      'An action in progress at a point in the future uses the future continuous: will be lying.',
      'Aksi yang sedang berlangsung pada waktu tertentu di masa depan memakai future continuous: will be lying.'),
    q('g3-2', 'Tenses', 'She ___ for three hours when the phone rang.',
      ['has been working', 'had been working', 'was work', 'worked'], 1,
      'A longer action before another past event uses the past perfect continuous: had been working.',
      'Aksi yang berlangsung lama sebelum kejadian lampau lain memakai past perfect continuous: had been working.'),
    q('g3-3', 'Articles', '___ Netherlands is famous for its tulips.', ['A', 'An', 'The', 'No article'], 2,
      'Some country names (plural or "of" names) take "the": the Netherlands, the United States.',
      'Beberapa nama negara (bentuk jamak atau memakai "of") memakai "the": the Netherlands, the United States.'),
    q('g3-4', 'Articles', 'He plays ___ guitar beautifully.', ['a', 'an', 'the', 'no article'], 2,
      'With musical instruments we normally say "play the + instrument".',
      'Untuk alat musik kita biasanya memakai "play the + nama alat".'),
    q('g3-5', 'Prepositions', 'The new law comes ___ effect next month.', ['in', 'into', 'at', 'on'], 1,
      'The fixed phrase is "come into effect".',
      'Frasa tetapnya adalah "come into effect".'),
    q('g3-6', 'Prepositions', 'She takes great pride ___ her work.', ['of', 'in', 'on', 'at'], 1,
      'The fixed phrase is "take pride in".',
      'Frasa tetapnya adalah "take pride in".'),
    q('g3-7', 'Conditionals', 'If he had not missed the train, he ___ here now.',
      ['would be', 'would have been', 'will be', 'is'], 0,
      'Mixed conditional: a past cause (had missed) with a present result: would + verb.',
      'Mixed conditional: penyebab di masa lalu (had missed) dengan akibat di masa kini: would + verb.'),
    q('g3-8', 'Conditionals', '___ I known about the delay, I would have left earlier.', ['If', 'Had', 'Have', 'Should'], 1,
      'Formal inversion of the third conditional: "Had I known" = "If I had known".',
      'Inversi formal dari third conditional: "Had I known" = "If I had known".'),
    q('g3-9', 'Passive Voice', 'The new policy is said ___ unpopular.', ['be', 'to be', 'being', 'been'], 1,
      'Reporting verbs in the passive use a to-infinitive: is said to be.',
      'Kata kerja pelaporan dalam kalimat pasif memakai to-infinitive: is said to be.'),
    q('g3-10', 'Passive Voice', 'The documents ___ by the time the lawyer arrived.',
      ['had been signed', 'had signed', 'were signing', 'have been signed'], 0,
      'Past perfect passive (had been + past participle) for an action completed before another past action.',
      'Past perfect pasif (had been + past participle) untuk aksi yang selesai sebelum aksi lampau lain.'),
    q('g3-11', 'Subject-Verb Agreement', 'The number of applicants ___ increased this year.', ['have', 'has', 'are', 'were'], 1,
      '"The number of" is singular (the number itself), so we use "has".',
      '"The number of" tunggal (yang dibicarakan adalah jumlahnya), jadi memakai "has".'),
    q('g3-12', 'Subject-Verb Agreement', 'A number of students ___ absent today.', ['is', 'was', 'are', 'has'], 2,
      '"A number of" means "several" and takes a plural verb: are.',
      '"A number of" berarti "beberapa" dan memakai kata kerja jamak: are.'),
  ],
}
