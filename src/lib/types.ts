/* ─── Core Geographic ─────────────────────────────────────────────────────── */
export interface Coordinates {
  lat: number;
  lng: number;
}

/* ─── Aarti / Timings ─────────────────────────────────────────────────────── */
export interface AartiTiming {
  name: string;        // e.g. "Mangala Aarti"
  time: string;        // e.g. "04:30 AM"
  duration_min: number;
}

export interface TempleTimings {
  opening_time: string;    // e.g. "05:00 AM"
  closing_time: string;    // e.g. "12:00 PM" (afternoon close)
  evening_open: string;    // e.g. "04:00 PM"
  evening_close: string;   // e.g. "09:00 PM"
  aartis: AartiTiming[];
  special_note?: string;   // e.g. "Closed on Ekadashi for cleaning"
}

/* ─── Crowd / Darshan Rush Status ─────────────────────────────────────────── */
export type CrowdLevel = 'peaceful' | 'moderate' | 'busy' | 'extreme';

export interface CrowdStatus {
  level: CrowdLevel;
  note?: string;           // e.g. "Ekadashi — expect long queues"
  updated_at: string;      // ISO date string
  updated_by: string;      // admin name / "system"
}

/* ─── Temple Trust Links ──────────────────────────────────────────────────── */
export interface TrustLinks {
  official_website?: string;
  donation_link?: string;
  puja_booking_link?: string;
  live_darshan_link?: string;
}

/* ─── Temple ──────────────────────────────────────────────────────────────── */
export interface Temple {
  id: string;
  name: string;
  name_hindi: string;
  description: string;
  deity: string;
  city: string;            // "Mathura" | "Vrindavan" | "Govardhan" | "Barsana"
  address: string;
  lat: number;
  lng: number;
  timings: TempleTimings;
  entry_fee: string;       // "Free" | "₹20" etc.
  dress_code: string;
  photography_allowed: boolean;
  image_url: string;
  tags: string[];          // ["Shaivite", "Vaishnav", "Heritage", "Must Visit"]
  rank: number;            // 1–20 for top 20 list
  is_active: boolean;
  crowd_status?: CrowdStatus;
  trust_links?: TrustLinks;
}

/* ─── Hotel / Stay ────────────────────────────────────────────────────────── */
export type HotelCategory = 'Budget' | 'Mid-Range' | 'Heritage' | 'Ashram';

export interface Hotel {
  id: string;
  name: string;
  category: HotelCategory;
  description: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  price_per_night: number; // INR
  rating: number;          // 0–5
  amenities: string[];
  contact_phone: string;
  image_url: string;
  is_verified: boolean;
  is_active: boolean;
}

/* ─── Food / Street Stall ─────────────────────────────────────────────────── */
export type FoodCategory = 'Sweets' | 'Chaat' | 'Thali' | 'Breakfast' | 'Beverage';

export interface FoodStall {
  id: string;
  name: string;
  specialty: string;       // e.g. "Peda, Mathura Pedha"
  category: FoodCategory;
  address: string;
  city: string;
  lat: number;
  lng: number;
  price_range: string;     // "₹20–₹100"
  opening_time: string;
  closing_time: string;
  is_trending: boolean;
  image_url: string;
  is_active: boolean;
}

/* ─── Festival / Event ────────────────────────────────────────────────────── */
export type FestivalCategory =
  | 'Major'
  | 'Seasonal'
  | 'Weekly'
  | 'Monthly';

export interface FestivalEvent {
  id: string;
  name: string;
  name_hindi: string;
  category: FestivalCategory;
  description: string;
  significance: string;
  typical_dates: string;   // e.g. "March (Phalguna Purnima)"
  best_temple: string[];   // temple ids
  special_activities: string[];
  crowd_level: 'Low' | 'Medium' | 'High' | 'Extreme';
  advance_booking_days: number;
  image_url: string;
}

/* ─── Trip Planner ────────────────────────────────────────────────────────── */
export interface ItineraryStop {
  time: string;            // e.g. "06:00 AM"
  title: string;
  description: string;
  type: 'Temple' | 'Food' | 'Activity' | 'Hotel' | 'Travel';
  location_id?: string;    // refs temple/hotel/food id
  duration_min: number;
  tips?: string;
}

export interface ItineraryDay {
  day: number;
  theme: string;           // e.g. "Divine Mathura – The Birthplace"
  stops: ItineraryStop[];
}

export interface Itinerary {
  id: string;
  title: string;
  days: number;            // 2 | 3 | 4
  tagline: string;
  description: string;
  best_for: string[];      // ["First-timers", "Families", "Pilgrims"]
  schedule: ItineraryDay[];
}

/* ─── Taxi / Guide ────────────────────────────────────────────────────────── */
export type PartnerCategory = 'Hotel' | 'Taxi' | 'Guide' | 'FoodVendor' | 'PujaShop';

export type PartnerStatus = 'pending' | 'approved' | 'rejected';

export interface Partner {
  id: string;
  name: string;
  category: PartnerCategory;
  phone: string;
  offer: string;           // "What can you offer right now?"
  city: string;
  lat?: number;
  lng?: number;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;      // ISO date string
  status: PartnerStatus;
  verification_note?: string;
}

/* ─── Map Marker ──────────────────────────────────────────────────────────── */
export type MarkerType = 'Temple' | 'Hotel' | 'Food' | 'Taxi' | 'Parking';

export interface MapMarker {
  id: string;
  type: MarkerType;
  name: string;
  lat: number;
  lng: number;
  entity_id: string;       // refs the actual entity
}

/* ─── Admin Dashboard ─────────────────────────────────────────────────────── */
export interface AnalyticsStat {
  label: string;
  value: number;
  change_pct: number;      // +12.5 or -3.2
  period: string;          // "last 7 days"
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'super_admin' | 'editor';
  created_at: string;
}

/* ─── Auth ────────────────────────────────────────────────────────────────── */
export interface AuthState {
  user_id: string | null;
  email: string | null;
  is_admin: boolean;
  is_loading: boolean;
}

/* ─── API Responses ───────────────────────────────────────────────────────── */
export interface ApiResponse<T> {
  data: T;
  error: string | null;
  success: boolean;
}

export interface GeocodingResult {
  lat: number;
  lng: number;
  formatted_address: string;
}
