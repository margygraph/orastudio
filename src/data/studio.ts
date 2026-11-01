export interface ClassType {
  id: string;
  name: string;
  shortName: string;
  description: string;
  level: 'All Levels' | 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number; // minutes
  intensity: 1 | 2 | 3 | 4 | 5;
  color: string;
}

export interface Instructor {
  id: string;
  name: string;
  specialties: string[];
  bio: string;
  image: string;
  imageColor: string;
}

export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  time: string;
  classId: string;
  instructorId: string;
  capacity: number;
  booked: number;
}

export interface Membership {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  isTrial?: boolean;
}

export const classes: ClassType[] = [
  {
    id: 'reformer',
    name: 'Reformer Pilates',
    shortName: 'Reformer',
    description: 'Full-body conditioning on the reformer machine. Controlled movements, precise alignment, deep muscle engagement.',
    level: 'All Levels',
    duration: 50,
    intensity: 3,
    color: 'clay'
  },
  {
    id: 'mat',
    name: 'Mat Pilates',
    shortName: 'Mat',
    description: 'Classical and contemporary mat work. Core strength, flexibility, and postural awareness using bodyweight resistance.',
    level: 'All Levels',
    duration: 50,
    intensity: 3,
    color: 'moss'
  },
  {
    id: 'vinyasa',
    name: 'Vinyasa Yoga',
    shortName: 'Vinyasa',
    description: 'Dynamic flow linking breath and movement. Build strength, mobility, and mental focus through sequenced postures.',
    level: 'Intermediate',
    duration: 60,
    intensity: 4,
    color: 'moss'
  },
  {
    id: 'yin',
    name: 'Yin Yoga',
    shortName: 'Yin',
    description: 'Slow, sustained holds targeting deep connective tissue. A practice of stillness, patience, and release.',
    level: 'All Levels',
    duration: 60,
    intensity: 1,
    color: 'sand'
  },
  {
    id: 'strength',
    name: 'Strength & Mobility',
    shortName: 'S&M',
    description: 'Functional strength training combined with mobility work. Build resilience for everyday movement and sport.',
    level: 'All Levels',
    duration: 50,
    intensity: 4,
    color: 'charcoal'
  }
];

export const instructors: Instructor[] = [
  {
    id: 'elena',
    name: 'Elena Rossi',
    specialties: ['Reformer Pilates', 'Mat Pilates'],
    bio: '12 years teaching Pilates. Trained at Stott Pilates International. Former contemporary dancer.',
    image: 'https://image.qwenlm.ai/generated-images/788fd279-b5cc-4ae7-b369-d4048f79722e/_result.png',
    imageColor: '#B9714F'
  },
  {
    id: 'marco',
    name: 'Marco Bianchi',
    specialties: ['Strength & Mobility', 'Mat Pilates'],
    bio: 'Strength coach and movement specialist. MSc in Sports Science. Works with athletes and desk-bound professionals alike.',
    image: 'https://image.qwenlm.ai/generated-images/57a8e29f-aa07-455c-aba2-b0c595eb4416/_result.png',
    imageColor: '#3F4A3C'
  },
  {
    id: 'sara',
    name: 'Sara Chen',
    specialties: ['Vinyasa Yoga', 'Yin Yoga'],
    bio: 'RYT-500 certified. Studied in Rishikesh and Mysore. Her teaching is grounded, clear, and never dogmatic.',
    image: 'https://image.qwenlm.ai/generated-images/c4546b57-9c46-4eb6-a20a-9020f2f5eed3/_result.png',
    imageColor: '#D9CDB8'
  },
  {
    id: 'luca',
    name: 'Luca Moretti',
    specialties: ['Reformer Pilates', 'Strength & Mobility'],
    bio: 'Balanced Body certified. Background in physiotherapy. Specialises in rehabilitation and postural correction.',
    image: 'https://image.qwenlm.ai/generated-images/239cc06a-4e1b-44b2-b308-8abdc30829f2/_result.png',
    imageColor: '#1C1B19'
  },
  {
    id: 'anna',
    name: 'Anna Petrov',
    specialties: ['Vinyasa Yoga', 'Mat Pilates'],
    bio: 'Yoga teacher and somatic practitioner. 8 years of teaching. Focuses on breath-led movement and mindful strength.',
    image: 'https://image.qwenlm.ai/generated-images/cabc62f1-3382-4d90-a783-73722628d248/_result.png',
    imageColor: '#5a6b56'
  }
];

export const timetable: TimetableSlot[] = [
  // Monday
  { id: 'm1', day: 'Monday', time: '07:00', classId: 'reformer', instructorId: 'elena', capacity: 8, booked: 6 },
  { id: 'm2', day: 'Monday', time: '09:00', classId: 'vinyasa', instructorId: 'sara', capacity: 16, booked: 12 },
  { id: 'm3', day: 'Monday', time: '12:30', classId: 'mat', instructorId: 'anna', capacity: 14, booked: 10 },
  { id: 'm4', day: 'Monday', time: '18:00', classId: 'strength', instructorId: 'marco', capacity: 12, booked: 11 },
  { id: 'm5', day: 'Monday', time: '19:15', classId: 'reformer', instructorId: 'luca', capacity: 8, booked: 8 },
  // Tuesday
  { id: 't1', day: 'Tuesday', time: '07:00', classId: 'mat', instructorId: 'elena', capacity: 14, booked: 9 },
  { id: 't2', day: 'Tuesday', time: '10:00', classId: 'yin', instructorId: 'sara', capacity: 16, booked: 7 },
  { id: 't3', day: 'Tuesday', time: '12:30', classId: 'reformer', instructorId: 'luca', capacity: 8, booked: 8 },
  { id: 't4', day: 'Tuesday', time: '18:00', classId: 'vinyasa', instructorId: 'anna', capacity: 16, booked: 14 },
  { id: 't5', day: 'Tuesday', time: '19:15', classId: 'strength', instructorId: 'marco', capacity: 12, booked: 10 },
  // Wednesday
  { id: 'w1', day: 'Wednesday', time: '07:00', classId: 'reformer', instructorId: 'elena', capacity: 8, booked: 7 },
  { id: 'w2', day: 'Wednesday', time: '09:00', classId: 'strength', instructorId: 'marco', capacity: 12, booked: 8 },
  { id: 'w3', day: 'Wednesday', time: '12:30', classId: 'vinyasa', instructorId: 'sara', capacity: 16, booked: 13 },
  { id: 'w4', day: 'Wednesday', time: '18:00', classId: 'mat', instructorId: 'anna', capacity: 14, booked: 12 },
  { id: 'w5', day: 'Wednesday', time: '19:15', classId: 'reformer', instructorId: 'luca', capacity: 8, booked: 6 },
  // Thursday
  { id: 'th1', day: 'Thursday', time: '07:00', classId: 'vinyasa', instructorId: 'anna', capacity: 16, booked: 11 },
  { id: 'th2', day: 'Thursday', time: '10:00', classId: 'mat', instructorId: 'elena', capacity: 14, booked: 10 },
  { id: 'th3', day: 'Thursday', time: '12:30', classId: 'yin', instructorId: 'sara', capacity: 16, booked: 5 },
  { id: 'th4', day: 'Thursday', time: '18:00', classId: 'reformer', instructorId: 'luca', capacity: 8, booked: 8 },
  { id: 'th5', day: 'Thursday', time: '19:15', classId: 'strength', instructorId: 'marco', capacity: 12, booked: 9 },
  // Friday
  { id: 'f1', day: 'Friday', time: '07:00', classId: 'reformer', instructorId: 'elena', capacity: 8, booked: 5 },
  { id: 'f2', day: 'Friday', time: '09:00', classId: 'strength', instructorId: 'marco', capacity: 12, booked: 7 },
  { id: 'f3', day: 'Friday', time: '12:30', classId: 'mat', instructorId: 'anna', capacity: 14, booked: 11 },
  { id: 'f4', day: 'Friday', time: '18:00', classId: 'vinyasa', instructorId: 'sara', capacity: 16, booked: 15 },
  { id: 'f5', day: 'Friday', time: '19:15', classId: 'reformer', instructorId: 'luca', capacity: 8, booked: 8 },
  // Saturday
  { id: 's1', day: 'Saturday', time: '09:00', classId: 'reformer', instructorId: 'elena', capacity: 8, booked: 8 },
  { id: 's2', day: 'Saturday', time: '10:15', classId: 'vinyasa', instructorId: 'anna', capacity: 16, booked: 13 },
  { id: 's3', day: 'Saturday', time: '11:30', classId: 'strength', instructorId: 'marco', capacity: 12, booked: 10 },
  { id: 's4', day: 'Saturday', time: '16:00', classId: 'yin', instructorId: 'sara', capacity: 16, booked: 6 },
  // Sunday
  { id: 'su1', day: 'Sunday', time: '10:00', classId: 'mat', instructorId: 'elena', capacity: 14, booked: 8 },
  { id: 'su2', day: 'Sunday', time: '11:15', classId: 'vinyasa', instructorId: 'sara', capacity: 16, booked: 11 },
  { id: 'su3', day: 'Sunday', time: '16:00', classId: 'yin', instructorId: 'anna', capacity: 16, booked: 4 },
];

export const memberships: Membership[] = [
  {
    id: 'trial',
    name: 'Free Trial',
    price: 0,
    period: 'first class',
    description: 'Your first class is on us. No commitment, no pressure.',
    features: ['Any class, any level', 'No credit card required', 'Studio tour included'],
    highlighted: true,
    isTrial: true
  },
  {
    id: 'dropin',
    name: 'Drop-in',
    price: 28,
    period: 'per class',
    description: 'Come when it suits you. Pay per session.',
    features: ['Single class access', 'Valid for 30 days', 'All class types'],
  },
  {
    id: 'pack',
    name: '10-Class Pack',
    price: 230,
    period: '10 classes',
    description: 'Save €50 compared to drop-in. Use at your own pace.',
    features: ['10 classes total', 'Valid for 3 months', 'All class types', 'Share with a friend'],
  },
  {
    id: 'unlimited',
    name: 'Unlimited',
    price: 189,
    period: 'per month',
    description: 'Unlimited access to all classes. Our most popular option.',
    features: ['Unlimited classes', 'Priority booking', 'Guest pass (1/month)', 'Pause up to 2 weeks/year'],
  }
];

export const testimonials = [
  {
    text: "I've tried gyms, boutique studios, and online programs. Ora is the first place where I actually look forward to showing up. The instructors know their craft and the space is calm without being precious.",
    author: 'Giulia M.',
    role: 'Member since 2023'
  },
  {
    text: "After years of back pain, the reformer classes here changed everything. Luca understood my limitations immediately and pushed me just enough. Six months in, I feel stronger than I did at 25.",
    author: 'Thomas K.',
    role: 'Member since 2024'
  },
  {
    text: "The timetable actually works for my schedule. Early mornings before work, or evenings when I need to decompress. Small classes, real attention, no waiting for equipment.",
    author: 'Chiara D.',
    role: 'Member since 2023'
  }
];

export const faqItems = [
  {
    question: 'I\'ve never done Pilates or yoga. Can I start here?',
    answer: 'Absolutely. Our All Levels classes are designed for beginners and experienced practitioners together. Arrive 10 minutes early so your instructor can check in with you. We\'ll guide you through everything.'
  },
  {
    question: 'What should I bring?',
    answer: 'Comfortable clothing that allows movement. Grip socks for reformer classes (we sell them at reception if you forget). A water bottle. We provide mats, towels, and all equipment.'
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'Cancel up to 4 hours before class at no charge. Late cancellations or no-shows are charged at the drop-in rate. Unlimited members: 3 late cancellations per month, then a €15 fee applies.'
  },
  {
    question: 'I have an injury. Should I come?',
    answer: 'If your doctor has cleared you for gentle movement, yes. Tell us about your injury when you book and again when you arrive. Our instructors can offer modifications. We cannot accommodate acute injuries or post-surgical recovery without medical clearance.'
  },
  {
    question: 'How early should I arrive?',
    answer: '10 minutes for your first visit (we\'ll show you the studio and introduce you to your instructor). 5 minutes for subsequent visits. Classes start on time.'
  },
  {
    question: 'Do you have parking?',
    answer: 'Street parking is available on the surrounding roads. The nearest garage is Parking San Babila, 3 minutes walk. We\'re also a 4-minute walk from San Babila metro (M1).'
  }
];
