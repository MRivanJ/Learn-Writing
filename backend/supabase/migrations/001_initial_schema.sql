-- Users profiles (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  display_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Writing submissions
CREATE TABLE writing_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  prompt_type TEXT,  -- 'ielts_task1', 'ielts_task2', 'toefl_independent', 'toefl_integrated'
  prompt_text TEXT,
  essay_text TEXT,
  band_score NUMERIC(3,1),
  feedback JSONB,    -- { task_achievement, coherence, lexical, grammar, overall_comments, errors[] }
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Grammar drill results
CREATE TABLE grammar_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  question_text TEXT,
  correct_answer TEXT,
  user_answer TEXT,
  is_correct BOOLEAN,
  topic TEXT,  -- 'tenses', 'articles', 'conditionals', etc.
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vocabulary flashcard progress
CREATE TABLE vocabulary_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  word TEXT,
  difficulty TEXT DEFAULT 'new',  -- 'new', 'easy', 'medium', 'hard'
  next_review_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, word)
);

-- Reading comprehension sessions
CREATE TABLE reading_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  passage_text TEXT,
  score INTEGER,
  total_questions INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Set up Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE writing_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE grammar_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE vocabulary_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_sessions ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Policies for writing_submissions
CREATE POLICY "Users can view own submissions" ON writing_submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own submissions" ON writing_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies for grammar_results
CREATE POLICY "Users can view own results" ON grammar_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own results" ON grammar_results FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies for vocabulary_progress
CREATE POLICY "Users can view own progress" ON vocabulary_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON vocabulary_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON vocabulary_progress FOR UPDATE USING (auth.uid() = user_id);

-- Policies for reading_sessions
CREATE POLICY "Users can view own sessions" ON reading_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own sessions" ON reading_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Trigger to create a profile automatically when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (new.id, new.raw_user_meta_data->>'display_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
