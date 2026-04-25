import type { Itinerary } from '@/lib/types';

export const itineraries: Itinerary[] = [
  {
    id: '2-day-braj',
    title: 'Braj Express: Essential Darshan',
    days: 2,
    tagline: 'For the devotee on a divine deadline',
    description: 'Hit all the sacred essentials of Mathura and Vrindavan in two spiritually charged days.',
    best_for: ['Weekend Travelers', 'First-timers', 'Quick Pilgrims'],
    schedule: [
      {
        day: 1,
        theme: 'Sacred Mathura — The Birthplace of Krishna',
        stops: [
          { time: '05:00 AM', title: 'Mangala Aarti at Janmabhoomi', description: 'Arrive at the holiest site. Witness the pre-dawn Mangala Aarti — the most serene darshan of the day.', type: 'Temple', location_id: 'krishna-janmabhoomi', duration_min: 60, tips: 'Reach 30 min early. Security lines open at 04:45 AM.' },
          { time: '07:30 AM', title: 'Peda Breakfast at Vrindavan Sweets', description: 'Try the famous Mathura Peda — soft, saffron-infused milk sweets. Pair with a glass of steaming chai.', type: 'Food', duration_min: 30, tips: 'Buy from Brijwasi Sweets near Janmabhoomi gate.' },
          { time: '08:15 AM', title: 'Vishram Ghat – Yamuna Aarti', description: 'Walk 10 minutes to Vishram Ghat for the morning Yamuna Aarti. Hire a boat for a 20-min Yamuna darshan.', type: 'Activity', duration_min: 45, tips: 'Boat rides cost ₹50–₹100 per person.' },
          { time: '09:30 AM', title: 'Dwarkadhish Temple', description: 'Visit the grand Dwarkadhish Temple before the afternoon closure. The Shringar darshan is spectacular.', type: 'Temple', location_id: 'dwarkadhish', duration_min: 60 },
          { time: '11:00 AM', title: 'Hotel Check-in & Rest', description: 'Check into your hotel near Vishram Ghat. Freshen up before the afternoon heat.', type: 'Hotel', duration_min: 60 },
          { time: '01:00 PM', title: 'Braj Thali Lunch', description: 'Authentic sattvic thali (no onion/garlic) at a local restaurant.', type: 'Food', duration_min: 60, tips: 'Try Brijwasi Restaurant or Shri Rasoi near Ghat area.' },
          { time: '04:30 PM', title: 'Travel to Vrindavan', description: 'Auto-rickshaw or e-rickshaw to Vrindavan (15 km, ~30 min, ₹40–₹60).', type: 'Travel', duration_min: 40 },
          { time: '05:30 PM', title: 'Banke Bihari Sandhya Darshan', description: 'Arrive for the ethereal evening darshan at Banke Bihari. The parda leela and bhajans create an electrifying atmosphere.', type: 'Temple', location_id: 'banke-bihari', duration_min: 60, tips: 'Extremely crowded. Keep belongings close. Avoid taking wallet out.' },
          { time: '07:30 PM', title: 'Prem Mandir by Night', description: 'Witness the spectacular light show and illuminated marble at Prem Mandir. Fountain show at 7:30 PM.', type: 'Temple', location_id: 'prem-mandir', duration_min: 75, tips: 'Best viewed from the open courtyard at night.' },
          { time: '09:00 PM', title: 'Return & Shayan', description: 'Return to hotel. Rest for tomorrow\'s early start.', type: 'Hotel', duration_min: 30 },
        ],
      },
      {
        day: 2,
        theme: 'Eternal Vrindavan — Forests, Groves & Yamuna',
        stops: [
          { time: '04:30 AM', title: 'ISKCON Mangala Aarti', description: 'The ISKCON Mangala Aarti is a life-changing experience — hundreds of devotees chanting in the dawn darkness.', type: 'Temple', location_id: 'iskcon-vrindavan', duration_min: 75, tips: 'Arrive by 4:15 AM. Dress modestly (dhoti/saree preferred).' },
          { time: '07:00 AM', title: 'Radha Raman Temple', description: 'One of Vrindavan\'s most ancient and authentic temples. The self-manifested Shaligram deity is deeply moving.', type: 'Temple', location_id: 'radha-raman', duration_min: 45 },
          { time: '08:00 AM', title: 'Loi Bazaar Breakfast', description: 'Explore the narrow lanes of Vrindavan\'s old market. Try the rabri, malpua, or kachori.', type: 'Food', duration_min: 45 },
          { time: '09:30 AM', title: 'Nidhivan & Seva Kunj', description: 'Visit the mysterious Nidhivan grove and adjacent Seva Kunj. Feel the divine energy of these sacred forests.', type: 'Temple', location_id: 'nidhi-van', duration_min: 60, tips: 'Walk at a slow pace. Read the legend boards. Do not pick leaves.' },
          { time: '12:00 PM', title: 'Departure', description: 'Begin your journey home with a heart full of Bhakti.', type: 'Travel', duration_min: 30 },
        ],
      },
    ],
  },
  {
    id: '3-day-braj',
    title: 'Braj Darshan: Complete Pilgrimage',
    days: 3,
    tagline: 'The complete Brajwasi experience',
    description: 'Three days covering all of Mathura, Vrindavan, and a sunrise visit to the sacred Govardhan Hill.',
    best_for: ['Families', 'Devotees', 'First-timers', 'Cultural Travelers'],
    schedule: [
      {
        day: 1,
        theme: 'Sacred Mathura — The Birthplace of Krishna',
        stops: [
          { time: '05:00 AM', title: 'Mangala Aarti at Janmabhoomi', description: 'Pre-dawn darshan at the most sacred site in Braj.', type: 'Temple', location_id: 'krishna-janmabhoomi', duration_min: 60 },
          { time: '07:30 AM', title: 'Vishram Ghat Yamuna Aarti & Boat Ride', description: 'Morning Yamuna aarti followed by a peaceful sunrise boat ride.', type: 'Activity', duration_min: 60, tips: 'Boat rides ₹50–100/person' },
          { time: '09:00 AM', title: 'Dwarkadhish Temple', description: 'Grand Shringar aarti darshan at Dwarkadhish.', type: 'Temple', location_id: 'dwarkadhish', duration_min: 60 },
          { time: '11:00 AM', title: 'Hotel Check-in & Lunch', description: 'Check in and enjoy a traditional Braj thali.', type: 'Hotel', duration_min: 90 },
          { time: '04:00 PM', title: 'Kans Qila & Potara Kund', description: 'Explore the ancient fort of Kansa and the sacred Potara Kund (where baby Krishna\'s clothes were washed).', type: 'Activity', duration_min: 75 },
          { time: '06:30 PM', title: 'Sandhya Aarti at Yamuna', description: 'Evening aarti at Vishram Ghat with floating diyas.', type: 'Activity', duration_min: 45, tips: 'Buy a diya for ₹10 and float it in the Yamuna.' },
        ],
      },
      {
        day: 2,
        theme: 'Divine Vrindavan — Forests of Eternal Love',
        stops: [
          { time: '04:30 AM', title: 'ISKCON Mangala Aarti', description: 'Life-changing pre-dawn aarti at ISKCON.', type: 'Temple', location_id: 'iskcon-vrindavan', duration_min: 75 },
          { time: '07:00 AM', title: 'Radha Raman & Radha Damodar Temples', description: 'Two ancient Vrindavan temples from the Goswami tradition.', type: 'Temple', location_id: 'radha-raman', duration_min: 60 },
          { time: '09:30 AM', title: 'Nidhivan & Seva Kunj', description: 'Explore the mysterious sacred groves of Vrindavan.', type: 'Temple', location_id: 'nidhi-van', duration_min: 60 },
          { time: '12:00 PM', title: 'Sattvic Lunch at ISKCON Prasadam Hall', description: 'Pure vegetarian mahaprasadam at ISKCON.', type: 'Food', duration_min: 60, tips: 'Prasadam is inexpensive and incredibly delicious.' },
          { time: '04:30 PM', title: 'Banke Bihari Evening Darshan', description: 'The most intense and devotional darshan in Vrindavan.', type: 'Temple', location_id: 'banke-bihari', duration_min: 60 },
          { time: '07:30 PM', title: 'Prem Mandir Night Visit', description: 'Illuminated marble temple and fountain show.', type: 'Temple', location_id: 'prem-mandir', duration_min: 90 },
        ],
      },
      {
        day: 3,
        theme: 'Govardhan Parikrama — The Sacred Hill',
        stops: [
          { time: '05:00 AM', title: 'Depart for Govardhan', description: 'Taxi to Govardhan (25 km, ~45 min).', type: 'Travel', duration_min: 45 },
          { time: '06:00 AM', title: 'Mansi Ganga Snan', description: 'Ritual bath at the sacred Mansi Ganga lake at the base of Govardhan Hill.', type: 'Activity', duration_min: 30 },
          { time: '07:00 AM', title: 'Govardhan Parikrama (Partial)', description: 'Walk a portion of the 21 km parikrama. Even 7 km gives tremendous blessings.', type: 'Activity', location_id: 'govardhan-hill', duration_min: 120, tips: 'Wear light shoes. Carry water. The path is stony in sections.' },
          { time: '10:00 AM', title: 'Radha Kund & Shyam Kund', description: 'Visit the holiest tirthas — the sacred ponds associated with Radha and Krishna.', type: 'Temple', location_id: 'radha-kund', duration_min: 60 },
          { time: '12:30 PM', title: 'Return to Mathura & Departure', description: 'Head back to Mathura railway station or bus stand. Carry home some Mathura Peda!', type: 'Travel', duration_min: 45 },
        ],
      },
    ],
  },
];
