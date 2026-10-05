export type GlossaryEntry = {
  word: string
  meaningId: string
}

export type PromptTable = {
  caption: string
  headers: string[]
  rows: string[][]
}

export type ReadingQuestion = {
  id: string
  text: string
  options: string[]
  correctAnswer: string
  explanation: string
  explanationId?: string
}

export type ReadingPassage = {
  id: string
  title: string
  content: string
  table?: PromptTable | null
  glossary?: GlossaryEntry[] | null
  questions: ReadingQuestion[]
}

/** 3 packages x 1 passage (with 5 questions each) */
export const READING_PACKAGES: Record<number, ReadingPassage[]> = {
  // ───────────── Package 1 – Beginner ─────────────
  1: [
    {
      id: 'r1-1',
      title: 'The Daily Life of a Student',
      content: 'A student\'s life is full of activities. In the morning, they usually wake up early to go to school. Classes begin at 8 AM and end around 3 PM. During breaks, students chat with friends or eat snacks in the cafeteria. After school, many students participate in extracurricular activities such as sports, music, or art clubs. In the evening, they return home, have dinner with their families, and complete their homework before going to bed. Weekends are a time for relaxation, hobbies, and spending time with family and friends.',
      table: null,
      glossary: [
        { word: 'extracurricular', meaningId: 'kegiatan di luar kurikulum sekolah' },
        { word: 'participate', meaningId: 'berpartisipasi' },
        { word: 'relaxation', meaningId: 'relaksasi/bersantai' }
      ],
      questions: [
        {
          id: 'q1',
          text: 'What time do classes usually begin?',
          options: ['7 AM', '8 AM', '9 AM', '3 PM'],
          correctAnswer: '8 AM',
          explanation: 'The passage explicitly states that classes begin at 8 AM.',
          explanationId: 'Teks secara eksplisit menyatakan bahwa kelas dimulai pada jam 8 pagi.'
        },
        {
          id: 'q2',
          text: 'What do students do during breaks?',
          options: ['Do homework', 'Go to sleep', 'Chat with friends', 'Play music'],
          correctAnswer: 'Chat with friends',
          explanation: 'The passage says that during breaks, students chat with friends or eat snacks.',
          explanationId: 'Teks menyebutkan bahwa selama istirahat, siswa mengobrol dengan teman atau makan camilan.'
        },
        {
          id: 'q3',
          text: 'When do students usually complete their homework?',
          options: ['In the morning', 'During breaks', 'After school', 'In the evening'],
          correctAnswer: 'In the evening',
          explanation: 'The text mentions they complete their homework in the evening before going to bed.',
          explanationId: 'Teks menyebutkan mereka menyelesaikan PR di malam hari sebelum tidur.'
        },
        {
          id: 'q4',
          text: 'Which of the following is NOT mentioned as an extracurricular activity?',
          options: ['Sports', 'Music', 'Art clubs', 'Video games'],
          correctAnswer: 'Video games',
          explanation: 'Sports, music, and art clubs are mentioned, but video games are not.',
          explanationId: 'Olahraga, musik, dan klub seni disebutkan, tetapi video game tidak.'
        },
        {
          id: 'q5',
          text: 'What is the main purpose of weekends for students according to the text?',
          options: ['To study more', 'To go to school', 'To relax and spend time with family', 'To do homework'],
          correctAnswer: 'To relax and spend time with family',
          explanation: 'The text states that weekends are a time for relaxation, hobbies, and family time.',
          explanationId: 'Teks menyatakan bahwa akhir pekan adalah waktu untuk relaksasi, hobi, dan berkumpul bersama keluarga.'
        }
      ]
    }
  ],
  // ───────────── Package 2 – Medium ─────────────
  2: [
    {
      id: 'r2-1',
      title: 'The Impacts of Social Media on Communication',
      content: 'Social media has revolutionized the way people communicate in the 21st century. Platforms like Facebook, Twitter, and Instagram have made it possible to connect with others across the globe instantly. This shift has brought both positive and negative consequences.\n\nOn the positive side, social media allows families and friends separated by distance to maintain close relationships. It also provides a platform for rapid information sharing, which can be crucial during emergencies. Furthermore, it has given marginalized groups a voice and facilitated the organization of social movements.\n\nHowever, there are significant drawbacks. The reliance on digital communication can sometimes lead to a decline in face-to-face social skills. Misinformation can spread quickly, leading to public confusion. Additionally, the constant exposure to curated online lives has been linked to increased anxiety and depression among young people. Finding a balance in social media usage remains a critical challenge for modern society.',
      table: null,
      glossary: [
        { word: 'revolutionized', meaningId: 'merevolusi / mengubah secara drastis' },
        { word: 'marginalized', meaningId: 'terpinggirkan' },
        { word: 'curated', meaningId: 'dikurasi / dipilih dan ditata dengan hati-hati' },
        { word: 'reliance', meaningId: 'ketergantungan' }
      ],
      questions: [
        {
          id: 'q1',
          text: 'According to the passage, what is one positive consequence of social media?',
          options: ['It decreases anxiety.', 'It improves face-to-face skills.', 'It allows people to maintain long-distance relationships.', 'It prevents the spread of misinformation.'],
          correctAnswer: 'It allows people to maintain long-distance relationships.',
          explanation: 'The text states that social media allows families and friends separated by distance to maintain close relationships.',
          explanationId: 'Teks menyatakan bahwa media sosial memungkinkan keluarga dan teman yang terpisah jarak untuk mempertahankan hubungan yang dekat.'
        },
        {
          id: 'q2',
          text: 'How can social media be useful during emergencies?',
          options: ['By providing entertainment.', 'By facilitating rapid information sharing.', 'By improving social skills.', 'By replacing doctors.'],
          correctAnswer: 'By facilitating rapid information sharing.',
          explanation: 'The passage mentions that social media provides a platform for rapid information sharing, which is crucial during emergencies.',
          explanationId: 'Teks menyebutkan bahwa media sosial menyediakan platform untuk berbagi informasi dengan cepat, yang sangat penting selama keadaan darurat.'
        },
        {
          id: 'q3',
          text: 'What is a negative impact of relying heavily on digital communication?',
          options: ['A decline in face-to-face social skills.', 'An increase in social movements.', 'A decrease in global connections.', 'A lack of information.'],
          correctAnswer: 'A decline in face-to-face social skills.',
          explanation: 'The text explicitly states that reliance on digital communication can lead to a decline in face-to-face social skills.',
          explanationId: 'Teks secara eksplisit menyatakan bahwa ketergantungan pada komunikasi digital dapat menyebabkan penurunan keterampilan sosial tatap muka.'
        },
        {
          id: 'q4',
          text: 'What has been linked to increased anxiety and depression among young people?',
          options: ['Rapid information sharing.', 'Face-to-face communication.', 'Constant exposure to curated online lives.', 'Connecting with others across the globe.'],
          correctAnswer: 'Constant exposure to curated online lives.',
          explanation: 'The passage notes that constant exposure to curated online lives is linked to increased anxiety and depression.',
          explanationId: 'Teks mencatat bahwa paparan terus-menerus terhadap kehidupan online yang dikurasi dikaitkan dengan peningkatan kecemasan dan depresi.'
        },
        {
          id: 'q5',
          text: 'What is considered a critical challenge for modern society according to the text?',
          options: ['Eliminating social media entirely.', 'Finding a balance in social media usage.', 'Creating more social media platforms.', 'Stopping the spread of social movements.'],
          correctAnswer: 'Finding a balance in social media usage.',
          explanation: 'The conclusion states that finding a balance in social media usage remains a critical challenge.',
          explanationId: 'Kesimpulan menyatakan bahwa menemukan keseimbangan dalam penggunaan media sosial tetap menjadi tantangan penting.'
        }
      ]
    }
  ],
  // ───────────── Package 3 – Expert ─────────────
  3: [
    {
      id: 'r3-1',
      title: 'The Phenomenon of Quantum Entanglement',
      content: 'Quantum entanglement is a physical phenomenon that occurs when pairs or groups of particles are generated, interact, or share spatial proximity in ways such that the quantum state of each particle cannot be described independently of the state of the others, even when the particles are separated by a large distance. The topic of quantum entanglement is at the heart of the disparity between classical and quantum physics.\n\nMeasurements of physical properties such as position, momentum, spin, and polarization performed on entangled particles are found to be appropriately correlated. For example, if a pair of particles is generated in such a way that their total spin is known to be zero, and one particle is found to have clockwise spin on a certain axis, then the spin of the other particle, measured on the same axis, will be found to be counterclockwise. Because of the nature of quantum measurement, however, this behavior gives rise to effects that can appear paradoxical: any measurement of a property of a particle can be seen as acting on that particle (e.g. by collapsing a number of superimposed states); and in the case of entangled particles, such action must be on the entangled system as a whole.\n\nAlbert Einstein famously described this phenomenon as "spooky action at a distance" due to its apparent violation of the principle of locality, which posits that an object is directly influenced only by its immediate surroundings. However, subsequent experiments, notably those testing Bell\'s inequalities, have demonstrated that quantum entanglement is a fundamental aspect of reality, paving the way for advancements in quantum computing and quantum cryptography.',
      table: null,
      glossary: [
        { word: 'entanglement', meaningId: 'keterikatan / keterjeratan' },
        { word: 'phenomenon', meaningId: 'fenomena' },
        { word: 'spatial proximity', meaningId: 'kedekatan spasial/ruang' },
        { word: 'disparity', meaningId: 'perbedaan / kesenjangan' },
        { word: 'momentum', meaningId: 'momentum' },
        { word: 'polarization', meaningId: 'polarisasi' },
        { word: 'correlated', meaningId: 'berkorelasi' },
        { word: 'paradoxical', meaningId: 'paradoks / bertentangan' },
        { word: 'superimposed', meaningId: 'bertumpuk / superposisi' },
        { word: 'locality', meaningId: 'lokalitas (prinsip bahwa benda hanya dipengaruhi sekitarnya)' }
      ],
      questions: [
        {
          id: 'q1',
          text: 'Which of the following best defines quantum entanglement according to the passage?',
          options: ['A state where particles can be described independently of each other.', 'A phenomenon where the quantum state of one particle is inextricably linked to another, regardless of distance.', 'A classical physics concept explaining the movement of large objects.', 'A method of measuring the speed of light in a vacuum.'],
          correctAnswer: 'A phenomenon where the quantum state of one particle is inextricably linked to another, regardless of distance.',
          explanation: 'The passage describes entanglement as a state where the quantum state of each particle cannot be described independently of the state of the others, even when separated by a large distance.',
          explanationId: 'Teks mendeskripsikan keterikatan sebagai keadaan di mana keadaan kuantum dari setiap partikel tidak dapat dijelaskan terlepas dari keadaan partikel lainnya, bahkan ketika dipisahkan oleh jarak yang jauh.'
        },
        {
          id: 'q2',
          text: 'If two entangled particles have a total spin of zero, and one is measured as clockwise, what must the other be on the same axis?',
          options: ['Clockwise', 'Counterclockwise', 'Zero', 'Superimposed'],
          correctAnswer: 'Counterclockwise',
          explanation: 'The text provides this exact example: if one is clockwise, the other will be counterclockwise to maintain a total spin of zero.',
          explanationId: 'Teks memberikan contoh yang tepat ini: jika satu searah jarum jam, yang lain akan berlawanan arah jarum jam untuk mempertahankan putaran total nol.'
        },
        {
          id: 'q3',
          text: 'Why did Einstein refer to quantum entanglement as "spooky action at a distance"?',
          options: ['Because it involved ghosts.', 'Because it appeared to violate the principle of locality.', 'Because it could only happen in outer space.', 'Because the particles were invisible to the naked eye.'],
          correctAnswer: 'Because it appeared to violate the principle of locality.',
          explanation: 'The passage states Einstein called it "spooky action at a distance" due to its apparent violation of the principle of locality.',
          explanationId: 'Teks menyatakan Einstein menyebutnya "aksi menakutkan pada jarak jauh" karena tampaknya melanggar prinsip lokalitas.'
        },
        {
          id: 'q4',
          text: 'What do tests of Bell\'s inequalities demonstrate?',
          options: ['That quantum entanglement is a fundamental aspect of reality.', 'That Einstein\'s principle of locality is always correct.', 'That quantum computers are impossible to build.', 'That classical physics can explain all quantum phenomena.'],
          correctAnswer: 'That quantum entanglement is a fundamental aspect of reality.',
          explanation: 'The text states that experiments testing Bell\'s inequalities have demonstrated that quantum entanglement is a fundamental aspect of reality.',
          explanationId: 'Teks menyatakan bahwa eksperimen yang menguji ketidaksetaraan Bell telah menunjukkan bahwa keterikatan kuantum adalah aspek fundamental dari realitas.'
        },
        {
          id: 'q5',
          text: 'What future technologies does quantum entanglement pave the way for, according to the text?',
          options: ['Faster airplanes and trains.', 'Quantum computing and quantum cryptography.', 'Better classical computers.', 'New forms of social media.'],
          correctAnswer: 'Quantum computing and quantum cryptography.',
          explanation: 'The concluding sentence mentions that it paves the way for advancements in quantum computing and quantum cryptography.',
          explanationId: 'Kalimat penutup menyebutkan bahwa ini membuka jalan bagi kemajuan dalam komputasi kuantum dan kriptografi kuantum.'
        }
      ]
    }
  ]
}
