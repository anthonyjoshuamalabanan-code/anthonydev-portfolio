import {
  Accessibility, Atom, Braces, ClipboardList, Code2, FileCode2, FileType, Figma, Gauge,
  Github, GitBranch, Layers, MonitorSmartphone, Palette, Plug, RefreshCw, Rocket,
  Search, ShieldCheck, Wind, Zap,
} from 'lucide-react';
import { makeCover } from '../utils/cover.js';
import { CgWebsite } from 'react-icons/cg';

// ---- Replace these values with your own details ----
export const profile = {
  name: 'Anthony Joshua Malabanan',
  title: 'Frontend Web Developer',
  location: 'Philippines',
  email: 'anthonyjoshuamalabanan2004@gmail.com',
  github: 'https://github.com/anthonyjoshuamalabanan-code',
  experience: 'I am a beginner frontend developer focused on learning by building real projects and improving my skills step by step.',
};

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

export const stats = [
  { value: '3+', label: 'Months learning web development' },
  { value: '1', label: 'Main project' },
];

export const skillGroups = [
  {
    title: 'Languages',
    items: [
      { name: 'HTML5', note: 'Semantic, accessible markup', icon: FileCode2 },
      { name: 'CSS3', note: 'Grid, Flexbox, custom properties', icon: Palette },
      { name: 'JavaScript', note: 'Modern ES2023+ code', icon: Braces },
      { name: 'TypeScript', note: 'Currently learning the basics', icon: FileType },
    ],
  },
  {
    title: 'Frameworks and styling',
    items: [
      { name: 'React', note: 'Hooks and component architecture', icon: Atom },
      { name: 'Next.js', note: 'Exploring routing and app structure', icon: Layers },
      { name: 'Tailwind CSS', note: 'Design systems with utility classes', icon: Wind },
    ],
  },
  {
    title: 'Tools and data',
    items: [
      { name: 'Git', note: 'Branching and a clean history', icon: GitBranch },
      { name: 'GitHub', note: 'Hosting projects and tracking changes', icon: Github },
    ],
  },
  
];

export const services = [
  { title: 'Responsive websites', icon: MonitorSmartphone, description: 'I can build simple websites that adapt to phones, tablets, and desktop screens.' },
  { title: 'React practice projects', icon: Atom, description: 'I use React to practice components, state, props, and interactive interfaces.' },
  { title: 'Landing pages', icon: Rocket, description: 'I can create clean landing pages while practicing layout, typography, and responsive design.' },
  { title: 'UI implementation', icon: Figma, description: 'I can turn a simple design or reference into a working frontend and learn from the process.' },
  { title: 'Website improvements', icon: RefreshCw, description: 'I enjoy going back through projects to fix layout issues, improve mobile behavior, and clean up code.' },
  { title: 'Learning through projects', icon: Zap, description: 'Each project gives me a chance to learn a new tool, solve a problem, and improve the next version.' },
];

export const processSteps = [
  { title: 'Understand', icon: Search, description: 'I first figure out what the project needs and what the finished page should do.' },
  { title: 'Plan', icon: ClipboardList, description: 'I break the work into smaller sections so I know what to build first.' },
  { title: 'Build', icon: Code2, description: 'I write the frontend, test the layout, and make changes as I learn more.' },
  { title: 'Test', icon: ShieldCheck, description: 'I check the project on different screen sizes and fix anything that does not behave as expected.' },
  { title: 'Improve', icon: Rocket, description: 'After finishing, I review what I could have done better and use that lesson in my next project.' },
];

export const projects = [
  {
    id: 'stay-basic-basketball',
    title: 'Stay Basic Basketball',
    category: 'Website',
    description:
      'A basketball training website I built to practice creating a responsive project with HTML, JavaScript, and Python. I worked on the page structure, layout, navigation, and interactive parts while learning how to organize a real website.',
    tags: ['HTML', 'JavaScript', 'Python'],
    github: 'https://github.com/anthonyjoshuamalabanan-code',
    demo: 'https://staybasicbasketball.tech/',
    image: '/project/staybasic.jpg',
  },
];