import Video1 from '../assets/footages/final.mp4'
import Video2 from '../assets/footages/sed.mp4'
import Video3 from '../assets/footages/motion.mp4'
import Video4 from '../assets/footages/orteca.mp4'

import td1 from '../assets/images/td1.webp'
import td2 from '../assets/images/td2.webp'
import td3 from '../assets/images/td3.webp'
import td4 from '../assets/images/td4.webp'
import td5 from '../assets/images/td5.webp'
import td6 from '../assets/images/td6.webp'
import td7 from '../assets/images/td7.webp'
import td8 from '../assets/images/td8.webp'
import pj1 from '../assets/images/pj1.webp'
import pj2 from '../assets/images/pj2.webp'
import pj3 from '../assets/images/pj3.webp'
import pj4 from '../assets/images/pj4.webp'

export const VIDEO_WORK = [
  {
    id: 'v1',
    title: 'After Movies',
    category: 'After Movie - SMUQ Expressive Day #7',
    year: '2025',
    video: Video1,
    preview: 'Rhythm-driven brand film with surgical pacing.',
  },
  {
    id: 'v2',
    title: 'Event Promotion',
    category: 'Trending Concept - SMUQ Expressive Day #8',
    year: '2026',
    video: Video2,
    preview: 'Live energy captured in layered motion.',
  },
  {
    id: 'v3',
    title: 'Motion',
    category: 'Commercial Use - 31Studio Salatiga',
    year: '2026',
    video: Video3,
    preview: 'Motiongraph even for Commercial Use.',
  },
  {
    id: 'v4',
    title: 'Branding',
    category: 'Short-form - Orteca Company',
    year: '2026',
    video: Video4,
    preview: 'Scroll-stopping cuts for digital culture.',
  },
];

export const PHOTOS = [
  {
    id: 'p1',
    src: td1,
    camera: 'Fujifilm X-T100',
    location: 'Yogyakarta',
    year: '2025',
  },
  {
    id: 'p2',
    src: td2,
    camera: 'Fujifilm X-T100',
    location: 'Magelang',
    year: '2026',
  },
  {
    id: 'p3',
    src: td3,
    camera: 'Sony A6700',
    location: 'Salatiga',
    year: '2026',
  },
  {
    id: 'p4',
    src: td4,
    camera: 'Fuji X-T100',
    location: 'Yogyakarta',
    year: '2025',
  },
  {
    id: 'p5',
    src: td5,
    camera: 'Fuji X-T100',
    location: 'Yogyakarta',
    year: '2025',
  },

  {
    id: 'p6',
    src: td6,
    camera: 'Fuji X-T100',
    location: 'Yogyakarta',
    year: '2025',
  },

  {
    id: 'p7',
    src: td7,
    camera: 'Fuji X-T100',
    location: 'Yogyakarta',
    year: '2025',
  },

  {
    id: 'p8',
    src: td8,
    camera: 'Fuji X-T100',
    location: 'Yogyakarta',
    year: '2025',
  },
  
];

export const ENGINEERING = [
  {
    id: 'e1',
    title: 'Lumen OS',
    category: 'Frontend',
    code: `const Frontend = () => {
  const stack = [
    "React",
    "Next.js",
    "TypeScript",
    "Motion"
  ];

  return (
    <Build
      experience="Fast"
      lighthouse="95+"
      status="Optimized"
      />
    );
  };`,
    output: 'Creative workspace with real-time sync',
  },

  {
    id: 'e2',
    title: 'Cadence',
    category: 'Creative Development',
    code: `const CreativeDevelopment = () => {
  const ingredients = {
    motion: "Fluid",
    visuals: "Cinematic",
    interaction: "Immersive"
  };

  return composeExperience(
    ingredients
    );
  };`,
    output: 'Audio journaling with on-device AI',
  },
  
  {
    id: 'e3',
    title: 'Signal Grid',
    category: 'Interactive Systems',
    code: `const InteractiveSystem = () => {
  const state = {
    user: "active",
    input: "tracked",
    motion: "dynamic"    
  };

  return sync(state);
  };`,
    output: 'Motion-driven interface primitives',
  },
];

export const SELECTED_WORK = [
  {
    id: 'w1',
    title: 'SED #7',
    year: '2025',
    role: 'Videographer · Editor',
    category: 'Video',
    image: pj1,
  },
  {
    id: 'w2',
    title: 'MSR 2026',
    year: '2026',
    role: 'Photographer',
    category: 'Photography',
    image: pj2,
  },
  {
    id: 'w3',
    title: 'Cinematography',
    year: '2024',
    role: 'Videographer · Editor',
    category: 'Contest',
    image: pj3,
  },
  {
    id: 'w4',
    title: 'SED #8',
    year: '2026',
    role: 'Creative · VJ',
    category: 'Creative',
    image: pj4,
  },
];

export const PROCESS_STEPS = [
  { id: 'observe', label: 'Observe', desc: 'Read the room. Understand intent, audience, and constraint before touching a single frame.' },
  { id: 'capture', label: 'Capture', desc: 'Find the light. Record the rhythm. Preserve what matters in the moment.' },
  { id: 'edit', label: 'Edit', desc: 'Cut with purpose. Shape narrative through timing, color, and motion.' },
  { id: 'build', label: 'Build', desc: 'Engineer the system. Clean architecture, precise interactions, zero friction.' },
  { id: 'deliver', label: 'Deliver', desc: 'Ship with conviction. Polish until the experience sings.' },
];

export const SOCIALS = [
  { label: 'Email', href: 'mailto:abelagaphe@gmail.com' },
  { label: 'Instagram', href: 'https://instagram.com/abelagaphe' },
  { label: 'GitHub', href: 'https://github.com/Aberuu' },
];
