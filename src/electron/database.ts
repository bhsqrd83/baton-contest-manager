import Database from 'better-sqlite3';
import * as path from 'path';
import { app } from 'electron';

const dbPath = path.join(app.getPath('userData'), 'baton-contest.db');
const db = new Database(dbPath);

// Initialize database with NBTA schema
export function initializeDatabase() {
  db.exec(`
    -- Participants (Twirlers)
    CREATE TABLE IF NOT EXISTS participants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      birthdate TEXT NOT NULL,
      gender TEXT,
      citizenship TEXT DEFAULT 'USA',
      coach_id INTEGER,
      studio TEXT,
      notes TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (coach_id) REFERENCES coaches(id)
    );

    -- Coaches
    CREATE TABLE IF NOT EXISTS coaches (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      studio TEXT,
      is_judge INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    -- Contests
    CREATE TABLE IF NOT EXISTS contests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      date TEXT NOT NULL,
      location TEXT,
      classification TEXT CHECK(classification IN ('AAAA', 'AAA', 'AA', 'A', 'B', 'C')),
      num_lanes INTEGER DEFAULT 4,
      notes TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    -- Judges
    CREATE TABLE IF NOT EXISTS judges (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      contest_id INTEGER NOT NULL,
      coach_id INTEGER,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT,
      FOREIGN KEY (contest_id) REFERENCES contests(id) ON DELETE CASCADE,
      FOREIGN KEY (coach_id) REFERENCES coaches(id)
    );

    -- Events
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      contest_id INTEGER NOT NULL,
      event_type TEXT NOT NULL,
      status_level TEXT CHECK(status_level IN ('Novice', 'Beginner', 'Intermediate', 'Advanced', 'College')),
      age_division TEXT CHECK(age_division IN ('Tot', 'Juvenile', 'Pre-teen', 'Junior', 'Senior')),
      age_min INTEGER,
      age_max INTEGER,
      time_min_seconds INTEGER,
      time_max_seconds INTEGER,
      performance_area_size TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (contest_id) REFERENCES contests(id) ON DELETE CASCADE
    );

    -- Participant Status (per event type)
    CREATE TABLE IF NOT EXISTS participant_status (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      participant_id INTEGER NOT NULL,
      event_type TEXT NOT NULL,
      status_level TEXT NOT NULL,
      wins INTEGER DEFAULT 0,
      FOREIGN KEY (participant_id) REFERENCES participants(id) ON DELETE CASCADE,
      UNIQUE(participant_id, event_type)
    );

    -- Registrations
    CREATE TABLE IF NOT EXISTS registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_id INTEGER NOT NULL,
      participant_id INTEGER NOT NULL,
      registration_date TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
      FOREIGN KEY (participant_id) REFERENCES participants(id) ON DELETE CASCADE,
      UNIQUE(event_id, participant_id)
    );

    -- Set System (Division assignments to lanes)
    CREATE TABLE IF NOT EXISTS set_system_assignments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_id INTEGER NOT NULL,
      lane_number INTEGER NOT NULL,
      division_name TEXT NOT NULL,
      position_in_queue INTEGER NOT NULL,
      has_conflict INTEGER DEFAULT 0,
      FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
    );

    -- Scores
    CREATE TABLE IF NOT EXISTS scores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_id INTEGER NOT NULL,
      participant_id INTEGER NOT NULL,
      judge_id INTEGER NOT NULL,
      raw_score REAL NOT NULL,
      penalty_drops INTEGER DEFAULT 0,
      penalty_two_hand INTEGER DEFAULT 0,
      penalty_falls INTEGER DEFAULT 0,
      penalty_breaks INTEGER DEFAULT 0,
      penalty_time_seconds INTEGER DEFAULT 0,
      penalty_no_salute INTEGER DEFAULT 0,
      penalty_improper_salute INTEGER DEFAULT 0,
      total_penalties REAL GENERATED ALWAYS AS (
        (penalty_drops * 0.5) +
        (penalty_two_hand * 0.5) +
        (penalty_falls * 0.5) +
        (penalty_breaks * 0.1) +
        (ABS(penalty_time_seconds) * 0.1) +
        (penalty_no_salute * 1.0) +
        (penalty_improper_salute * 0.5)
      ) STORED,
      final_score REAL GENERATED ALWAYS AS (
        raw_score - (
          (penalty_drops * 0.5) +
          (penalty_two_hand * 0.5) +
          (penalty_falls * 0.5) +
          (penalty_breaks * 0.1) +
          (ABS(penalty_time_seconds) * 0.1) +
          (penalty_no_salute * 1.0) +
          (penalty_improper_salute * 0.5)
        )
      ) STORED,
      placement_for_this_judge INTEGER,
      flagged INTEGER DEFAULT 0,
      notes TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
      FOREIGN KEY (participant_id) REFERENCES participants(id) ON DELETE CASCADE,
      FOREIGN KEY (judge_id) REFERENCES judges(id) ON DELETE CASCADE,
      UNIQUE(event_id, participant_id, judge_id)
    );

    -- Results
    CREATE TABLE IF NOT EXISTS results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_id INTEGER NOT NULL,
      participant_id INTEGER NOT NULL,
      placement_points_sum INTEGER NOT NULL,
      raw_score_sum REAL NOT NULL,
      final_placement INTEGER NOT NULL,
      qualified_for_nationals INTEGER DEFAULT 0,
      is_advancement INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
      FOREIGN KEY (participant_id) REFERENCES participants(id) ON DELETE CASCADE,
      UNIQUE(event_id, participant_id)
    );

    -- Create indexes for performance
    CREATE INDEX IF NOT EXISTS idx_participants_coach ON participants(coach_id);
    CREATE INDEX IF NOT EXISTS idx_events_contest ON events(contest_id);
    CREATE INDEX IF NOT EXISTS idx_registrations_event ON registrations(event_id);
    CREATE INDEX IF NOT EXISTS idx_registrations_participant ON registrations(participant_id);
    CREATE INDEX IF NOT EXISTS idx_scores_event ON scores(event_id);
    CREATE INDEX IF NOT EXISTS idx_scores_participant ON scores(participant_id);
    CREATE INDEX IF NOT EXISTS idx_scores_judge ON scores(judge_id);
  `);

  console.log('Database initialized at:', dbPath);
}

export { db };
