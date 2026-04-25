-- ── Braj Darshan — Supabase Schema ──────────────────────────────────────────
-- Run this in Supabase Dashboard → SQL Editor

-- ── Temples ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS temples (
  id                   TEXT PRIMARY KEY,
  name                 TEXT NOT NULL,
  name_hindi           TEXT,
  description          TEXT,
  deity                TEXT,
  city                 TEXT,
  address              TEXT,
  lat                  DECIMAL(10, 7),
  lng                  DECIMAL(10, 7),
  timings              JSONB,
  entry_fee            TEXT DEFAULT 'Free',
  dress_code           TEXT,
  photography_allowed  BOOLEAN DEFAULT true,
  image_url            TEXT,
  tags                 TEXT[],
  rank                 INTEGER,
  is_active            BOOLEAN DEFAULT true,
  crowd_status         JSONB,
  trust_links          JSONB,
  created_at           TIMESTAMPTZ DEFAULT NOW(),
  updated_at           TIMESTAMPTZ DEFAULT NOW()
);

-- ── Hotels ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS hotels (
  id               TEXT PRIMARY KEY,
  name             TEXT NOT NULL,
  category         TEXT,
  description      TEXT,
  address          TEXT,
  city             TEXT,
  lat              DECIMAL(10, 7),
  lng              DECIMAL(10, 7),
  price_per_night  INTEGER,
  rating           DECIMAL(3, 1),
  amenities        TEXT[],
  contact_phone    TEXT,
  image_url        TEXT,
  is_verified      BOOLEAN DEFAULT false,
  is_active        BOOLEAN DEFAULT true,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ── Festival Events ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS festival_events (
  id                    TEXT PRIMARY KEY,
  name                  TEXT NOT NULL,
  name_hindi            TEXT,
  category              TEXT,
  description           TEXT,
  significance          TEXT,
  typical_dates         TEXT,
  best_temple           TEXT[],
  special_activities    TEXT[],
  crowd_level           TEXT,
  advance_booking_days  INTEGER DEFAULT 0,
  image_url             TEXT
);

-- ── Partners ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS partners (
  id                 TEXT PRIMARY KEY,
  name               TEXT NOT NULL,
  category           TEXT,
  phone              TEXT,
  offer              TEXT,
  city               TEXT,
  lat                DECIMAL(10, 7),
  lng                DECIMAL(10, 7),
  is_verified        BOOLEAN DEFAULT false,
  is_active          BOOLEAN DEFAULT true,
  status             TEXT DEFAULT 'pending',
  verification_note  TEXT,
  created_at         TIMESTAMPTZ DEFAULT NOW()
);

-- ── Row Level Security ────────────────────────────────────────────────────────
ALTER TABLE temples         ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotels          ENABLE ROW LEVEL SECURITY;
ALTER TABLE festival_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners        ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public can read temples"         ON temples         FOR SELECT USING (true);
CREATE POLICY "Public can read hotels"          ON hotels          FOR SELECT USING (true);
CREATE POLICY "Public can read festival_events" ON festival_events FOR SELECT USING (true);
CREATE POLICY "Public can read partners"        ON partners        FOR SELECT USING (true);

-- Service role can do everything (bypasses RLS automatically)

-- ── updated_at trigger ────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER temples_updated_at
  BEFORE UPDATE ON temples
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
