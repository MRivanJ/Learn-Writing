-- Add package_id to writing_submissions
ALTER TABLE writing_submissions ADD COLUMN package_id INTEGER;

-- Add package_id to grammar_results
ALTER TABLE grammar_results ADD COLUMN package_id INTEGER;

-- Add package_id to reading_sessions
ALTER TABLE reading_sessions ADD COLUMN package_id INTEGER;
