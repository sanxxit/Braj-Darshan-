-- ── Braj Darshan — Seed Data ──────────────────────────────────────────────────
-- Run AFTER schema.sql in Supabase Dashboard → SQL Editor

-- ── Temples ───────────────────────────────────────────────────────────────────
INSERT INTO temples (id, name, name_hindi, description, deity, city, address, lat, lng, timings, entry_fee, dress_code, photography_allowed, image_url, tags, rank, is_active, crowd_status, trust_links) VALUES

('krishna-janmabhoomi', 'Shri Krishna Janmabhoomi', 'श्री कृष्ण जन्मभूमि',
 'The holiest site in Mathura — the exact birthplace of Lord Krishna.',
 'Lord Krishna', 'Mathura', 'Krishna Janmabhoomi Road, Mathura, UP 281001',
 27.5036, 77.6738,
 '{"opening_time":"05:00 AM","closing_time":"12:00 PM","evening_open":"04:00 PM","evening_close":"09:30 PM","aartis":[{"name":"Mangala Aarti","time":"05:00 AM","duration_min":30},{"name":"Shringar Aarti","time":"07:30 AM","duration_min":20},{"name":"Rajbhog Aarti","time":"11:30 AM","duration_min":25},{"name":"Sandhya Aarti","time":"07:00 PM","duration_min":30},{"name":"Shayan Aarti","time":"09:00 PM","duration_min":20}],"special_note":"Heavy security check at entrance. Photography not allowed inside prison cell."}',
 'Free', 'Traditional / No shorts', false, '/images/temples/janmabhoomi.jpg',
 ARRAY['Must Visit','Birthplace','Heritage','Pilgrimage'], 1, true,
 '{"level":"busy","note":"Weekends see very long security queues","updated_at":"2025-04-24T08:00:00Z","updated_by":"Admin"}',
 '{"official_website":"https://www.krishnajanmabhoomi.org","live_darshan_link":"https://www.youtube.com/@KrishnaJanmabhoomi"}'),

('dwarkadhish', 'Dwarkadhish Temple', 'द्वारकाधीश मंदिर',
 'Built in 1814 by Seth Gokuldas Parikh, famous for ornate Rajasthani architecture and vibrant Holi celebrations.',
 'Lord Dwarkadhish (Krishna)', 'Mathura', 'Vishram Ghat, Mathura, UP 281001',
 27.5003, 77.6764,
 '{"opening_time":"06:30 AM","closing_time":"11:30 AM","evening_open":"04:30 PM","evening_close":"09:00 PM","aartis":[{"name":"Mangala Aarti","time":"06:30 AM","duration_min":25},{"name":"Shringar Aarti","time":"07:45 AM","duration_min":20},{"name":"Rajbhog Aarti","time":"11:00 AM","duration_min":30},{"name":"Sandhya Aarti","time":"06:30 PM","duration_min":25},{"name":"Shayan Aarti","time":"08:30 PM","duration_min":20}]}',
 'Free', 'Traditional / Dupatta required for women', false, '/images/temples/dwarkadhish.jpg',
 ARRAY['Must Visit','Heritage','Holi','Vaishnav'], 2, true,
 '{"level":"moderate","updated_at":"2025-04-24T08:00:00Z","updated_by":"Admin"}',
 '{"official_website":"https://dwarkadhishtemple.org","donation_link":"https://dwarkadhishtemple.org/donate"}'),

('banke-bihari', 'Banke Bihari Temple', 'बांके बिहारी मंदिर',
 'One of Vrindavan''s most beloved temples, built in 1864. Famous for "parda leela" and intense Shringar darshan.',
 'Banke Bihari (Krishna)', 'Vrindavan', 'Banke Bihari Marg, Vrindavan, UP 281121',
 27.5754, 77.6976,
 '{"opening_time":"07:45 AM","closing_time":"12:00 PM","evening_open":"05:30 PM","evening_close":"09:30 PM","aartis":[{"name":"Shringar Aarti","time":"08:00 AM","duration_min":20},{"name":"Rajbhog Aarti","time":"11:30 AM","duration_min":25},{"name":"Sandhya Aarti","time":"07:00 PM","duration_min":30}],"special_note":"On Shravan Mondays & Janmashtami, temple remains open continuously. Extreme crowd during Holi."}',
 'Free', 'Traditional required', false, '/images/temples/banke-bihari.jpg',
 ARRAY['Must Visit','Vrindavan','Crowded','Famous'], 3, true,
 '{"level":"extreme","note":"Always crowded — arrive before 8 AM for bearable wait","updated_at":"2025-04-24T08:00:00Z","updated_by":"Admin"}',
 '{"official_website":"https://bankebiharimandir.in"}'),

('iskcon-vrindavan', 'ISKCON Krishna Balaram Mandir', 'इस्कॉन कृष्ण बलराम मंदिर',
 'Inaugurated in 1975 by Srila Prabhupada. Famous for cleanliness and Mangala Aarti attended by thousands.',
 'Krishna & Balarama, Radha Shyamasundara, Gaura Nitai', 'Vrindavan', 'Bhaktivedanta Swami Marg, Raman Reti, Vrindavan, UP 281121',
 27.5829, 77.7064,
 '{"opening_time":"04:15 AM","closing_time":"01:00 PM","evening_open":"04:30 PM","evening_close":"08:45 PM","aartis":[{"name":"Mangala Aarti","time":"04:30 AM","duration_min":45},{"name":"Tulasi Puja","time":"05:05 AM","duration_min":15},{"name":"Shringar Darshan","time":"07:30 AM","duration_min":30},{"name":"Rajbhog Aarti","time":"12:30 PM","duration_min":30},{"name":"Sandhya Aarti","time":"07:00 PM","duration_min":45},{"name":"Shayan Aarti","time":"08:30 PM","duration_min":20}]}',
 'Free', 'Traditional / Dhoti/Kurta/Saree preferred', true, '/images/temples/iskcon-vrindavan.jpg',
 ARRAY['International','Clean','Vrindavan','Mangala Aarti'], 4, true,
 '{"level":"peaceful","note":"Well-managed queues; Mangala Aarti is calm & beautiful","updated_at":"2025-04-24T08:00:00Z","updated_by":"Admin"}',
 '{"official_website":"https://iskconvrindavan.com","live_darshan_link":"https://iskconvrindavan.com/live-darshan","puja_booking_link":"https://iskconvrindavan.com/puja","donation_link":"https://iskconvrindavan.com/donate"}'),

('prem-mandir', 'Prem Mandir', 'प्रेम मंदिर',
 'Stunning 54-acre marble temple complex inaugurated in 2012. Illuminated spectacularly at night.',
 'Radha Krishna, Sita Ram', 'Vrindavan', 'Raman Reti, Vrindavan, UP 281121',
 27.5779, 77.7062,
 '{"opening_time":"05:30 AM","closing_time":"12:00 PM","evening_open":"04:30 PM","evening_close":"08:30 PM","aartis":[{"name":"Mangala Aarti","time":"05:30 AM","duration_min":20},{"name":"Rajbhog Aarti","time":"11:30 AM","duration_min":20},{"name":"Sandhya Aarti","time":"05:30 PM","duration_min":20}],"special_note":"Musical fountain show at 7:30 PM and 8:30 PM daily. Best visited after sunset."}',
 'Free', 'Decent / No shorts', true, '/images/temples/prem-mandir.jpg',
 ARRAY['Marble','Night Visit','Illuminated','Modern'], 5, true,
 '{"level":"moderate","note":"Evenings busy during fountain shows","updated_at":"2025-04-24T08:00:00Z","updated_by":"Admin"}',
 '{"official_website":"https://www.jkp.org","live_darshan_link":"https://www.jkp.org/live"}'),

('radha-raman', 'Radha Raman Temple', 'राधा रमण मंदिर',
 'One of Vrindavan''s oldest temples (1542 CE). The self-manifested Shaligram deity has never left Vrindavan.',
 'Radha Raman (Krishna)', 'Vrindavan', 'Radha Raman Ghera, Vrindavan, UP 281121',
 27.5694, 77.6957,
 '{"opening_time":"08:00 AM","closing_time":"12:30 PM","evening_open":"05:00 PM","evening_close":"08:30 PM","aartis":[{"name":"Mangala Aarti","time":"06:00 AM","duration_min":30},{"name":"Shringar Aarti","time":"08:00 AM","duration_min":25},{"name":"Rajbhog Aarti","time":"12:00 PM","duration_min":25},{"name":"Sandhya Aarti","time":"06:30 PM","duration_min":30},{"name":"Shayan Aarti","time":"08:00 PM","duration_min":20}]}',
 'Free', 'Traditional', false, '/images/temples/radha-raman.jpg',
 ARRAY['Ancient','Goswami','Heritage','Authentic'], 6, true,
 '{"level":"peaceful","updated_at":"2025-04-24T08:00:00Z","updated_by":"Admin"}',
 NULL),

('govardhan-hill', 'Govardhan Parvat (Jatipura)', 'गोवर्धन पर्वत',
 'The sacred hill lifted by Lord Krishna. Devotees perform the 21 km Govardhan Parikrama barefoot.',
 'Govardhan (Giridhari Krishna)', 'Govardhan', 'Jatipura, Govardhan, Mathura, UP 281502',
 27.4967, 77.4661,
 '{"opening_time":"05:00 AM","closing_time":"12:00 PM","evening_open":"04:00 PM","evening_close":"09:00 PM","aartis":[{"name":"Mangala Aarti","time":"05:00 AM","duration_min":30},{"name":"Sandhya Aarti","time":"06:30 PM","duration_min":30}],"special_note":"Govardhan Parikrama starts from Mansi Ganga. Best done in early morning. Total 21 km."}',
 'Free', 'Traditional', true, '/images/temples/govardhan.jpg',
 ARRAY['Parikrama','Sacred Hill','Nature','Govardhan'], 7, true,
 '{"level":"busy","note":"Parikrama path crowded on Ekadashi & full moon nights","updated_at":"2025-04-24T08:00:00Z","updated_by":"Admin"}',
 NULL),

('radha-kund', 'Radha Kund & Shyam Kund', 'राधा कुंड और श्याम कुंड',
 'Two sacred ponds near Govardhan Hill. Bathing in Radha Kund on Ashtami washes away all sins.',
 'Radha Rani & Krishna', 'Govardhan', 'Radha Kund Village, Govardhan, Mathura, UP 281502',
 27.5184, 77.4750,
 '{"opening_time":"04:00 AM","closing_time":"11:00 PM","evening_open":"04:00 PM","evening_close":"11:00 PM","aartis":[{"name":"Mangala Aarti","time":"04:30 AM","duration_min":20},{"name":"Sandhya Aarti","time":"06:00 PM","duration_min":20}],"special_note":"Ashtami snan is the most auspicious. Best visited at dawn or dusk."}',
 'Free', 'Traditional', true, '/images/temples/radha-kund.jpg',
 ARRAY['Sacred Pond','Govardhan','Ashtami','Peaceful'], 8, true,
 '{"level":"peaceful","updated_at":"2025-04-24T08:00:00Z","updated_by":"Admin"}',
 NULL),

('nidhi-van', 'Nidhivan', 'निधिवन',
 'Mysterious forest grove where Lord Krishna is believed to perform Raas Leela every night. Closes at sunset.',
 'Radha Krishna (Raas Leela)', 'Vrindavan', 'Nidhivan, Vrindavan, UP 281121',
 27.5741, 77.6971,
 '{"opening_time":"06:00 AM","closing_time":"08:30 PM","evening_open":"04:00 PM","evening_close":"08:00 PM","aartis":[{"name":"Evening Aarti","time":"07:30 PM","duration_min":20}],"special_note":"Grove closes at sunset. Visitors must leave before dark. Do not pluck leaves or enter restricted areas."}',
 'Free', 'Respectful clothing required', true, '/images/temples/nidhivan.jpg',
 ARRAY['Mysterious','Forest','Raas Leela','Must Visit'], 9, true,
 '{"level":"moderate","note":"Closes strictly at sunset — plan accordingly","updated_at":"2025-04-24T08:00:00Z","updated_by":"Admin"}',
 NULL),

('seva-kunj', 'Seva Kunj & Lalita Kund', 'सेवा कुंज और ललिता कुंड',
 'Adjacent to Nidhivan. Grove where Radha Rani performed her loving service to Krishna.',
 'Radha Rani', 'Vrindavan', 'Seva Kunj, Vrindavan, UP 281121',
 27.5736, 77.6980,
 '{"opening_time":"06:00 AM","closing_time":"12:00 PM","evening_open":"04:00 PM","evening_close":"08:00 PM","aartis":[{"name":"Morning Aarti","time":"07:00 AM","duration_min":15},{"name":"Evening Aarti","time":"06:30 PM","duration_min":15}]}',
 'Free', 'Traditional', false, '/images/temples/seva-kunj.jpg',
 ARRAY['Radha Rani','Grove','Peaceful','Chaitanya'], 10, true,
 '{"level":"peaceful","updated_at":"2025-04-24T08:00:00Z","updated_by":"Admin"}',
 NULL)

ON CONFLICT (id) DO NOTHING;

-- ── Hotels ────────────────────────────────────────────────────────────────────
INSERT INTO hotels (id, name, category, description, address, city, lat, lng, price_per_night, rating, amenities, contact_phone, image_url, is_verified, is_active) VALUES
('radisson-mathura', 'Radisson Hotel Agra Mathura Highway', 'Mid-Range', 'Modern business hotel on the Agra-Mathura highway with rooftop pool and easy access to Mathura city.', 'NH-2, Mathura-Agra Expressway, Mathura, UP 281001', 'Mathura', 27.4756, 77.6934, 4500, 4.1, ARRAY['Free WiFi','Pool','Restaurant','Parking','AC','Room Service'], '+91-565-2400000', '/images/hotels/radisson.jpg', true, true),
('brij-bhoomi-resort', 'Brij Bhoomi Resort', 'Heritage', 'Heritage-style property with courtyards, folk art murals, and traditional Brajwasi hospitality.', 'Dampier Nagar, Mathura, UP 281001', 'Mathura', 27.5027, 77.6715, 3200, 4.3, ARRAY['Free WiFi','Restaurant','Cultural Shows','Parking','AC','Rooftop'], '+91-565-2403030', '/images/hotels/brij-bhoomi.jpg', true, true),
('iskcon-guesthouse', 'ISKCON Guesthouse Vrindavan', 'Ashram', 'Clean spiritual accommodation inside ISKCON campus. Vegetarian meals included.', 'Bhaktivedanta Swami Marg, Raman Reti, Vrindavan, UP 281121', 'Vrindavan', 27.5832, 77.7068, 1800, 4.5, ARRAY['Vegetarian Meals','Free WiFi','Temple Access','Library','AC'], '+91-565-2540021', '/images/hotels/iskcon-guest.jpg', true, true),
('krishna-palace', 'Hotel Krishna Palace', 'Budget', 'Affordable clean rooms steps from Vishram Ghat and Dwarkadhish Temple.', 'Near Vishram Ghat, Mathura, UP 281001', 'Mathura', 27.4998, 77.6760, 900, 3.7, ARRAY['Free WiFi','AC','Parking','Room Service'], '+91-565-2503540', '/images/hotels/krishna-palace.jpg', true, true),
('gokul-dham', 'Gokul Dham Ashram', 'Ashram', 'Peaceful ashram in the heart of Vrindavan with simple sattvic meals and evening kirtan.', 'Loi Bazaar, Vrindavan, UP 281121', 'Vrindavan', 27.5720, 77.6966, 600, 4.0, ARRAY['Vegetarian Meals','Evening Kirtan','Library','Yoga'], '+91-9897123456', '/images/hotels/gokul-dham.jpg', false, true)
ON CONFLICT (id) DO NOTHING;

-- ── Festival Events ───────────────────────────────────────────────────────────
INSERT INTO festival_events (id, name, name_hindi, category, description, significance, typical_dates, best_temple, special_activities, crowd_level, advance_booking_days, image_url) VALUES
('janmashtami', 'Janmashtami', 'जन्माष्टमी', 'Major', 'The most important festival in Braj — celebrating the birth of Lord Krishna at midnight.', 'Birth of Lord Krishna — Bhado Krishna Ashtami', 'August–September (Bhadrapada Krishna Ashtami)', ARRAY['krishna-janmabhoomi','dwarkadhish','iskcon-vrindavan'], ARRAY['Midnight Abhishek at Janmabhoomi (12:00 AM)','Dahi-Handi competition (next day)','Grand processions (Jhankis) across city','ISKCON 48-hour kirtan marathon','108 parikramas of Govardhan'], 'Extreme', 60, '/images/events/janmashtami.jpg'),
('holi-braj', 'Braj Holi', 'ब्रज होली', 'Major', 'Braj celebrates Holi across a full 40-day period. Lathmar Holi in Barsana, Phoolon ki Holi at Banke Bihari.', 'Celebration of love between Radha and Krishna. Braj is the birthplace of Holi.', 'February–March (40-day festival from Vasant Panchami)', ARRAY['banke-bihari','dwarkadhish'], ARRAY['Lathmar Holi – Barsana (women with sticks)','Lathmar Holi – Nandgaon (next day)','Phoolon ki Holi – Banke Bihari (flower Holi)','Widow Holi – Vrindavan Gopinath Temple','Rang Panchami procession at Vishram Ghat'], 'Extreme', 90, '/images/events/holi.jpg'),
('radha-ashtami', 'Radha Ashtami', 'राधाष्टमी', 'Major', 'The birthday of Radha Rani celebrated 15 days after Janmashtami. Barsana becomes the epicentre.', 'Birth of Radha Rani at Barsana — Bhadrapada Shukla Ashtami', 'August–September (15 days after Janmashtami)', ARRAY['banke-bihari','radha-raman'], ARRAY['Grand Abhishek at Ladli Ji Temple, Barsana','Barsana Parikrama (barefoot)','Phoolon ki Holi offering at Banke Bihari','Kirtans through the night'], 'High', 30, '/images/events/radha-ashtami.jpg'),
('govardhan-puja', 'Govardhan Puja & Annakut', 'गोवर्धन पूजा और अन्नकूट', 'Major', 'The day after Diwali — 56 dishes Annakut offering and lakhs perform Govardhan Parikrama.', 'Celebration of Krishna lifting Govardhan Hill to protect Braj from Indra''s storm', 'October–November (Kartik Shukla Pratipada — day after Diwali)', ARRAY['govardhan-hill'], ARRAY['Govardhan Parikrama at dawn (21 km)','Annakut (56-dish) offering at all major temples','Cow processions around the hill','Mansi Ganga snan (holy bath)'], 'Extreme', 45, '/images/events/govardhan-puja.jpg'),
('sharad-purnima', 'Sharad Purnima – Maha Raas', 'शरद पूर्णिमा – महारास', 'Major', 'The full moon night of Sharad when Lord Krishna performed the original Maha Raas with the Gopis.', 'Night of Krishna''s eternal Raas Leela (circle dance) with the Gopis', 'October (Ashwin Purnima)', ARRAY['nidhi-van','seva-kunj','iskcon-vrindavan'], ARRAY['Moonlit Yamuna parikrama at Kesi Ghat','Raas Leela performances in Nidhivan','Kheer (rice pudding) left overnight in moonlight','All-night kirtan at ISKCON'], 'High', 20, '/images/events/sharad-purnima.jpg'),
('diwali-mathura', 'Diwali in Mathura & Vrindavan', 'मथुरा-वृंदावन दिवाली', 'Major', 'Diwali in Braj is uniquely celebrated for 5 days with millions of earthen diyas lit at Vishram Ghat.', 'Festival of lights celebrating Krishna''s return to Braj after defeating Narakasura', 'October–November (Kartik Amavasya)', ARRAY['dwarkadhish','krishna-janmabhoomi'], ARRAY['1 lakh diyas at Vishram Ghat (Diwali evening)','Grand Aarti at Yamuna banks','Fireworks at Dwarkadhish Temple','Special Shayan Aarti – Sone ki Jhanki'], 'High', 30, '/images/events/diwali.jpg')
ON CONFLICT (id) DO NOTHING;

-- ── Partners ──────────────────────────────────────────────────────────────────
INSERT INTO partners (id, name, category, phone, offer, city, is_verified, is_active, status, verification_note) VALUES
('p1', 'Raju Sharma — E-Rickshaw', 'Taxi', '+91 98765 43210', 'Full day Vrindavan temple tour, fixed ₹400 rate, no hidden charges', 'Vrindavan', true, true, 'approved', 'ID verified on-site. Fixed fare board displayed on vehicle.'),
('p2', 'Bhola Prasad — Certified Guide', 'Guide', '+91 91234 56789', 'Govt-registered guide, fluent in Hindi & English, 15 years experience in Braj parikrama', 'Mathura', true, true, 'approved', 'UP Tourism guide license verified.'),
('p3', 'Radhe Shyam Prasad — Puja Shop', 'PujaShop', '+91 87654 32109', 'Authentic puja samagri at temple-trust approved prices, no overcharging', 'Vrindavan', false, true, 'pending', NULL),
('p4', 'Govinda Hotel & Ashram', 'Hotel', '+91 77777 88888', 'Pure veg, no alcohol, AC rooms ₹800/night, 5 min walk from Banke Bihari', 'Vrindavan', true, true, 'approved', 'Property inspected. Food purely sattvic. Verified.'),
('p5', 'Mohan Lal — Auto Driver', 'Taxi', '+91 99988 77766', 'Mathura–Vrindavan–Govardhan day trip, ₹1200 fixed, AC vehicle', 'Mathura', false, true, 'pending', NULL),
('p6', 'Pinki Devi — Home Cook', 'FoodVendor', '+91 88899 00011', 'Home-cooked sattvic thali ₹80, served near ISKCON gate, 6 AM–12 PM', 'Vrindavan', false, false, 'rejected', 'Location does not have proper food handling facilities.')
ON CONFLICT (id) DO NOTHING;
