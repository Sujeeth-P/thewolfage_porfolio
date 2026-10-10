export const NAV_ITEMS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

/* ------------------------------------------------------------------
   Contact + social. Edit these in one place.
   - WhatsApp: set VITE_WHATSAPP_NUMBER in .env (digits with country code,
     e.g. 919876543210). If unset, the WhatsApp button is simply not shown.
   - Social links with an empty href are hidden (no dead "#" links).
------------------------------------------------------------------- */
export const CONTACT_EMAIL = 'support@thewolfage.live';
export const WHATSAPP_NUMBER = (import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, '');
export const WHATSAPP_MESSAGE = "Hi The Wolf Age, I'd like to talk about a project.";

export const SOCIAL_LINKS = [
  { label: 'GitHub', href: '' },
  { label: 'LinkedIn', href: '' },
  { label: 'Twitter', href: '' },
  { label: 'Dribbble', href: '' },
];

/* Hero copy: what you do, in one line, visible without scrolling. */
export const HERO_COPY = {
  kicker: 'Digital Craft · Fearless Execution',
  sub: 'We design and build websites, mobile apps and ERP systems — plus the brand content that makes your business impossible to ignore.',
  primaryCta: 'Start a Project',
  secondaryCta: 'View Our Work',
};

export const HERO_REVEAL_STATEMENTS = [
  'Most agencies build websites.',
  'We build market presence.',
  'Every brand has a potential.',
  'We make it undeniable.',
  'This is The Wolf Age.',
];

export const REVEAL_COLORS = ['#E8F020', '#ffffff', '#20F0D4', '#ffffff', '#E8F020'];

export const MARQUEE_ITEMS = [
  'DIGITAL EXPERIENCES', '◆',
  'FEARLESS DESIGN', '◆',
  'MODERN DEVELOPMENT', '◆',
  'CINEMATIC WEBSITES', '◆',
  'PERFORMANCE SYSTEMS', '◆',
  'BRAND IDENTITY', '◆',
  'AI SOLUTIONS', '◆',
  'SCALABLE PRODUCTS', '◆',
];

/* Shown in the "Tech Stack" section (taken from the stacks named in your
   services and project tags). Edit freely; 12 entries fill the desktop grid. */
export const TECH_STACK = [
  'React', 'Node.js', 'React Native', 'Next.js',
  'TypeScript', 'PostgreSQL', 'Firebase', 'GraphQL',
  'Redis', 'Tailwind', 'Shopify API', 'Solidity',
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'DISCOVER',
    text: "We map your competitive landscape, surface technical debt, and identify exactly where you're losing users. Signal only. No filler.",
    icon: '◉',
    tags: ['Research', 'Audit', 'Strategy'],
  },
  {
    step: '02',
    title: 'ARCHITECT',
    text: 'System design, UX blueprints, and a technical roadmap your team can actually follow. We align before a single line is written.',
    icon: '◈',
    tags: ['Design Systems', 'UX', 'Blueprint'],
  },
  {
    step: '03',
    title: 'BUILD',
    text: 'Sprint-based delivery with weekly demos. Clean code. Pixel-perfect execution. Performance reviewed at every stage.',
    icon: '⬡',
    tags: ['Engineering', 'QA', 'Delivery'],
  },
  {
    step: '04',
    title: 'SHIP & SCALE',
    text: "Zero-downtime deployment, monitoring setup, and ongoing iteration cycles. We don't disappear at launch.",
    icon: '◆',
    tags: ['Deploy', 'Monitor', 'Iterate'],
  },
];

export const ABOUT_STATS = [
  ['18+', 'Products Delivered'],
  ['5+', 'Years of Craft'],
  ['3×', 'Average Client ROI'],
  ['100%', 'Founder-Led Studio'],
];
