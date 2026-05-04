'use client';

import { FormEvent, useMemo, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Code2,
  Cpu,
  Database,
  GraduationCap,
  Link,
  Mail,
  MapPin,
  MessageCircle,
  Sparkles,
  Terminal,
  X,
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { emailjsConfig } from '../lib/emailjs-config';

const easeOut = [0.16, 1, 0.3, 1] as const;

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Journey', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

const roles = ['Software Developer', 'Full Stack Developer', 'Problem Solver', 'Tech Enthusiast'];

const aboutParagraphs = [
  'I love developing software and creating applications that solve real problems. My passions include Artificial Intelligence with its fascinating models and algorithms, mobile development, and applying these technologies to address practical challenges in everyday life and work.',
  'I am interested in Artificial Intelligence and its potential to solve practical problems. I research various models and algorithms - from machine learning to neural networks - finding ways to apply them to real-world challenges effectively. This exploration of AI algorithms helps me constantly learn and improve my problem-solving approaches.',
  'I focus on mobile development and creating applications that serve specific purposes. This includes personal productivity apps, business solutions, and everyday tools. I build Android and iOS applications that streamline workflows and enhance efficiency. My goal is to deliver mobile solutions that solve real user problems effectively.',
];

const stats = [
  ['1+', 'Years Experience'],
  ['20+', 'Projects Completed'],
  ['5+', 'Programming Languages'],
];

const skills = [
  {
    name: 'Core Language Skills',
    icon: Code2,
    items: ['Python', 'Java', 'JavaScript', 'Swift (iOS)'],
  },
  {
    name: 'Frameworks & Libraries',
    icon: Cpu,
    items: ['TensorFlow/Keras', 'PyTorch', 'React.js', 'SwiftUI', 'Spring Boot'],
  },
  {
    name: 'Databases',
    icon: Database,
    items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Firebase', 'Supabase'],
  },
  {
    name: 'Development Tools',
    icon: Terminal,
    items: ['Git/GitHub', 'Android Studio', 'Xcode', 'Visual Studio Code'],
  },
  {
    name: 'Cloud & Platforms',
    icon: Sparkles,
    items: ['Docker', 'Firebase Console', 'Vercel', 'Cybrancee'],
  },
  {
    name: 'Project Management & Collaboration',
    icon: BriefcaseBusiness,
    items: ['Jira', 'GitHub', 'GitLab', 'Trello', 'Microsoft Project'],
  },
];

const currentTopics = ['Machine Learning', 'AI Frameworks', 'Mobile Development', 'Cloud Computing', 'DevOps Practices', 'Project Management'];

const projects = [
  {
    id: 0,
    title: 'AI Patent Search',
    description: 'An intelligent platform that combines traditional patent search with advanced AI capabilities for faster and more accurate discovery.',
    technologies: ['Next.js', 'AI', 'API', 'Tailwind CSS'],
    liveUrl: 'https://patents-view-search-ov4s.vercel.app',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 7,
    title: 'Patent Automation Workflow',
    description: 'An automated workflow that scrapes patent data from WIPO via RSS Feed, uses an AI Agent to process the data, and sends reports via Gmail every Monday at 9 AM.',
    technologies: ['n8n', 'AI Agent', 'RSS', 'Automation'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    hasDocumentation: true,
  },
  {
    id: 1,
    title: 'Savagers Web App',
    description: 'A cinematic lifestyle and music web app where users can enjoy curated music, read thoughtful articles about everyday life, work, and culture, and explore a modern Liquid Glass-inspired interface.',
    technologies: ['React', 'Vite', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://savagers1.vercel.app',
    githubUrl: '#',
    featured: true,
    actionLabel: 'Open App',
  },
  {
    id: 2,
    title: 'Savagers Nutrition',
    description: 'A food intelligence website for estimating nutrition across everyday ingredients and discovering cooking recipes from cuisines around the world.',
    technologies: ['Nutrition Data', 'Recipe Search', 'Web App', 'UX Design'],
    liveUrl: 'https://savagers.me',
    githubUrl: '#',
    featured: true,
    actionLabel: 'Visit Site',
  },
  {
    id: 3,
    title: 'Discord MusicBot',
    description: 'A Discord music bot built to play YouTube audio reliably in voice channels, with a music-app style queue experience, optimized search, playback controls, and a Lavalink plus yt-cipher stack for resilient YouTube playback.',
    technologies: ['Python', 'Discord Bot', 'Lavalink', 'Wavelink', 'yt-cipher'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    actionLabel: 'Private Bot',
  },
];

const workExperience = [
  {
    position: 'AI Developer Intern',
    company: '3G Telecommunication Joint Stock Company',
    location: 'Ha Noi, Vietnam',
    duration: 'Feb 2024 - Aug 2024',
    description: [
      'Developed and tested machine learning models to enhance telecommunications systems',
      'Collaborated with cross-functional teams to integrate AI solutions into existing products',
      'Served as technical support for model capabilities and deployment requirements',
      'Conducted data analysis to identify trends and improve system performance',
      'Assisted in creation of technical documentation for AI applications',
      'Participated in code reviews and leveraged internal resources for product development',
    ],
  },
  {
    position: 'Software Developer Intern',
    company: 'FPT Software',
    location: 'Ha Noi, Vietnam',
    duration: 'Mar 2025 - Jul 2025',
    description: [
      'Collaborated directly with a Senior Mentor during initial phase to rapidly acquire core software development methodologies',
      'Developed robust and responsive user interfaces (UIs) for Android using Java and XML layouts, adhering to Material Design guidelines to enhance user experience (UX)',
      'Designed and managed data structures with Cloud Firestore and Realtime Database by Firebase to handle application state and synchronize data in real-time, reducing latency in feature updates',
      'Managed end-to-end testing of Android application by deploying release candidates to physical devices',
      'Learned and applied Git/GitHub to manage and share code with team, ensuring clean integration, avoiding conflicts and created Pull Requests (PRs) for code review by mentor',
      'Assisted in writing Technical Specification Documents (TSDs) for new features, clearly defining architectural decisions, data flow, and API contracts to ensure alignment between development and QA teams',
    ],
  },
];

const education = [
  {
    position: 'Bachelor of Information Technology',
    company: 'Thuyloi University',
    location: 'Hanoi, Vietnam',
    duration: '2021 - 2026',
    description: [
      'Specialized in Information Technology and Software Development',
      'Acquired strong foundation in programming, database management, and system analysis',
      'Completed practical projects and coursework related to modern software engineering practices',
    ],
  },
  {
    position: 'Mobile Developer (iOS)',
    company: 'Self-Directed Learning / Specialized Training',
    location: 'Online',
    duration: '2023 - Present',
    description: [
      'Deepened knowledge in iOS development using Swift and SwiftUI',
      'Focused on building intuitive user interfaces and smooth user experiences',
      'Studied mobile app architecture, memory management, and performance optimization',
      'Built several iOS applications exploring modern frameworks and API integrations',
    ],
  },
];

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    info: 'trungkun103@gmail.com',
    link: 'mailto:trungkun103@gmail.com',
  },
  {
    icon: Link,
    title: 'LinkedIn',
    info: 'linkedin.com/in/TrungAnhx',
    link: 'https://www.linkedin.com/in/TrungAnhx',
  },
  {
    icon: Code2,
    title: 'GitHub',
    info: 'github.com/TrungAnhx',
    link: 'https://github.com/TrungAnhx?tab=repositories',
  },
  {
    icon: MessageCircle,
    title: 'Discord',
    info: 'discord.gg/Savagers',
    link: 'https://discord.gg/Savagers',
  },
];

function WordsPullUp({
  text,
  className = '',
  showAsterisk = false,
  align = 'justify-start',
}: {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  align?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(' ');

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${align} overflow-hidden pb-[0.1em] ${className}`}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="mr-[0.12em] inline-block overflow-hidden pb-[0.12em]">
          <motion.span
            className="relative inline-block"
            initial={shouldReduceMotion ? false : { y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : undefined}
            transition={{ duration: 0.8, delay: index * 0.08, ease: easeOut }}
          >
            {word}
            {showAsterisk && index === words.length - 1 && (
              <sup className="absolute -right-[0.34em] top-[0.58em] text-[0.28em] leading-none">*</sup>
            )}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function SectionIntro({
  label,
  title,
  muted,
}: {
  label: string;
  title: string;
  muted?: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-4xl text-center sm:mb-14">
      <p className="mb-4 text-[10px] uppercase tracking-[0.32em] text-primary/70 sm:text-xs">{label}</p>
      <WordsPullUp
        text={title}
        align="justify-center"
        className="text-3xl font-normal leading-[0.98] text-[var(--portfolio-text)] sm:text-4xl md:text-5xl lg:text-6xl"
      />
      {muted && <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base">{muted}</p>}
    </div>
  );
}

function AnimatedParagraph({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.86', 'end 0.22'] });
  const chars = useMemo(() => text.split(''), [text]);

  return (
    <p ref={ref} className="mx-auto max-w-4xl text-left text-sm leading-[1.75] text-primary sm:text-base md:text-lg">
      {chars.map((char, index) => {
        const charProgress = index / Math.max(chars.length - 1, 1);
        return (
          <AnimatedLetter
            key={`${char}-${index}`}
            char={char}
            progress={scrollYProgress}
            range={[Math.max(0, charProgress - 0.1), Math.min(1, charProgress + 0.05)]}
          />
        );
      })}
    </p>
  );
}

function AnimatedLetter({
  char,
  progress,
  range,
}: {
  char: string;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.22, 1]);
  return (
    <motion.span style={{ opacity }} aria-hidden="true">
      {char}
    </motion.span>
  );
}

function Hero() {
  return (
    <section id="home" className="h-screen bg-black p-4 md:p-6">
      <div className="relative h-full overflow-hidden rounded-2xl bg-black md:rounded-[2rem]">
        <video className="absolute inset-0 h-full w-full object-cover" src="/bg5.mp4" autoPlay loop muted playsInline preload="metadata" />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/75" />

        <nav className="absolute left-1/2 top-0 z-20 -translate-x-1/2 rounded-b-2xl bg-black px-4 py-2 md:rounded-b-3xl md:px-8">
          <div className="flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="whitespace-nowrap text-[10px] transition-colors sm:text-xs md:text-sm"
                style={{ color: 'rgba(225, 224, 204, 0.8)' }}
              >
                {item.name}
              </a>
            ))}
          </div>
        </nav>

        <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-6 sm:px-6 md:px-8 md:pb-8">
          <div className="grid items-end gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="mb-3 text-xs uppercase tracking-[0.28em] text-primary/70 sm:text-sm">TrungAnhx Portfolio</p>
              <h1 className="max-w-[min(92vw,980px)] pb-[0.12em] text-[18vw] font-medium leading-[0.94] tracking-[-0.045em] text-[var(--portfolio-text)] sm:text-[16vw] md:text-[12vw] lg:text-[9vw] xl:text-[8.2vw] 2xl:text-[7.5vw]">
                <span className="block">
                  <WordsPullUp text="Trần Đình" />
                </span>
                <span className="block -mt-[0.08em]">
                  <WordsPullUp text="Trung" showAsterisk />
                </span>
              </h1>
            </div>

            <motion.div
              className="flex flex-col items-start gap-5 lg:col-span-4 lg:pb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: easeOut }}
            >
              <div className="flex flex-wrap gap-2">
                {roles.map((role) => (
                  <span key={role} className="rounded-full border border-primary/15 bg-black/30 px-3 py-1 text-[11px] text-primary/75 backdrop-blur-md">
                    {role}
                  </span>
                ))}
              </div>
              <p className="max-w-md text-xs leading-[1.25] text-primary/70 sm:text-sm md:text-base">
                Passionate software developer with expertise in building scalable and efficient applications. I love turning complex problems into simple, beautiful, and intuitive solutions.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a href="#projects" className="group flex items-center gap-2 rounded-full bg-primary py-1.5 pl-5 pr-1.5 text-sm font-medium text-black transition-all hover:gap-3 sm:text-base">
                  View My Work
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-primary transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
                <a href="#contact" className="rounded-full border border-primary/25 px-5 py-3 text-sm font-medium text-primary/85 transition-colors hover:border-primary/60 hover:text-primary">
                  Get In Touch
                </a>
              </div>
              <div className="flex gap-3">
                <a className="social-link" href="https://github.com/TrungAnhx?tab=repositories" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Code2 className="h-4 w-4" />
                </a>
                <a className="social-link" href="https://www.linkedin.com/in/TrungAnhx" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Link className="h-4 w-4" />
                </a>
                <a className="social-link" href="mailto:trungkun103@gmail.com" aria-label="Email">
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="bg-black px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[1.75rem] bg-[#101010] px-5 py-14 text-center sm:px-10 sm:py-20 lg:px-16">
        <p className="mb-5 text-[10px] uppercase tracking-[0.32em] text-primary sm:text-xs">Software Developer</p>
        <h2 className="mx-auto max-w-4xl text-3xl font-normal leading-[0.98] text-[var(--portfolio-text)] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
          <WordsPullUp text="I am Trung Anh," align="justify-center" />
          <span className="font-serif italic"> a builder of practical software. </span>
          <WordsPullUp text="I work across AI, mobile development, and full-stack products." align="justify-center" />
        </h2>

        <div className="mt-10 space-y-6">
          {aboutParagraphs.map((paragraph) => (
            <AnimatedParagraph key={paragraph} text={paragraph} />
          ))}
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-3">
          {stats.map(([value, label]) => (
            <div key={label} className="rounded-2xl border border-primary/10 bg-black/30 p-5">
              <div className="text-3xl font-bold text-primary">{value}</div>
              <div className="mt-1 text-xs text-gray-400 sm:text-sm">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="relative overflow-hidden bg-black px-4 py-20 sm:px-6 lg:px-8">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]" />
      <div className="relative mx-auto max-w-7xl">
        <SectionIntro
          label="Technical Skills"
          title="Studio-grade workflows for practical product engineering."
          muted="Excited about the future of technology and constantly expanding my skillset. Here are the tools and domains I use to build real software."
        />

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.article
                key={skill.name}
                className="feature-card min-h-[310px]"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-7 text-xl font-semibold text-[var(--portfolio-text)]">{skill.name}</h3>
                <div className="mt-7 space-y-3">
                  {skill.items.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-gray-400">
                      <Check className="h-4 w-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {currentTopics.map((topic) => (
            <span key={topic} className="rounded-full border border-primary/15 bg-[#151515] px-4 py-2 text-xs text-primary/75">
              {topic}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);

  return (
    <section id="projects" className="bg-black px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          label="Featured Projects"
          title="Recent work with robust engineering and seamless user experiences."
          muted="Explore a collection of my recent work, from AI-assisted search to automation workflows and full-stack products."
        />

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              className="group flex min-h-[360px] flex-col justify-between rounded-[1.5rem] bg-[#212121] p-6 transition-colors hover:bg-[#282828]"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.75, delay: index * 0.08, ease: easeOut }}
            >
              <div>
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-xs text-primary/50">{String(index + 1).padStart(2, '0')}</span>
                  {project.featured && <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-black">Featured</span>}
                </div>
                <h3 className="text-2xl font-semibold text-[var(--portfolio-text)]">{project.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-gray-400">{project.description}</p>
              </div>

              <div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="rounded-full border border-primary/10 px-3 py-1 text-[11px] text-primary/70">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex gap-3">
                  {project.hasDocumentation ? (
                    <button type="button" onClick={() => setSelectedProject(project)} className="learn-link">
                      View Docs <ArrowRight className="h-4 w-4 -rotate-45" />
                    </button>
                  ) : (
                    <a href={project.liveUrl !== '#' ? project.liveUrl : undefined} target={project.liveUrl !== '#' ? '_blank' : undefined} rel="noopener noreferrer" className={`learn-link ${project.liveUrl === '#' ? 'pointer-events-none opacity-45' : ''}`}>
                      {project.actionLabel ?? (project.liveUrl !== '#' ? 'Live Demo' : 'Coming Soon')} <ArrowRight className="h-4 w-4 -rotate-45" />
                    </a>
                  )}
                  <a href={project.githubUrl !== '#' ? project.githubUrl : undefined} target={project.githubUrl !== '#' ? '_blank' : undefined} rel="noopener noreferrer" className={`icon-button ${project.githubUrl === '#' ? 'pointer-events-none opacity-45' : ''}`} aria-label={`${project.title} code`}>
                    <Code2 className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {selectedProject && <WorkflowModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  );
}

function WorkflowModal({ project, onClose }: { project: (typeof projects)[number]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <button className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-label="Close documentation" />
      <motion.div
        className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[1.5rem] border border-primary/15 bg-[#101010] shadow-2xl"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: easeOut }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-primary/10 bg-[#101010]/95 p-5 backdrop-blur md:p-7">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-primary/50">Documentation</p>
            <h2 className="mt-2 text-2xl font-semibold text-[var(--portfolio-text)] sm:text-3xl">{project.title}</h2>
          </div>
          <button type="button" onClick={onClose} className="icon-button" aria-label="Close documentation">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5 md:p-8">
          <p className="max-w-3xl text-base leading-relaxed text-gray-300">{project.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="rounded-full border border-primary/10 px-3 py-1 text-xs text-primary/70">
                {tech}
              </span>
            ))}
          </div>

          <div className="my-10 grid gap-3 md:grid-cols-3">
            {[
              ['WIPO RSS Feed', 'Continuously monitors and scrapes raw patent data and new filings from WIPO.'],
              ['AI Processing Agent', 'Filters noise, translates, categorizes, and summarizes the patent technical details.'],
              ['Scheduled Delivery', 'Dispatches structured, insightful reports to stakeholders via Gmail every Monday.'],
            ].map(([title, description], index) => (
              <div key={title} className="rounded-2xl border border-primary/10 bg-[#212121] p-5">
                <span className="text-xs text-primary/50">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-5 text-lg font-semibold text-[var(--portfolio-text)]">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">{description}</p>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold text-[var(--portfolio-text)]">Technical Details & Automation Logic</h3>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              ['n8n Self-hosted Instance', 'The backbone of the workflow runs on a robust self-hosted n8n environment, allowing for complex multi-step data transformations without traditional code overhead.'],
              ['RSS XML Parsing', 'Custom RSS parsers handle complex nested XML schemas from WIPO PatentScope, extracting relevant metadata such as filing dates, inventors, and abstracts.'],
              ['LLM Summarization', 'Integrates with a large language model to comprehend dense technical jargon. The AI translates and summarizes patents into clear, concise bullet points.'],
              ['Google Sheets & Gmail', 'Parsed data is stored historically in Google Sheets. Every Monday at 9:00 AM, a beautifully formatted HTML email digest is triggered via the Gmail API.'],
            ].map(([title, description]) => (
              <div key={title} className="rounded-2xl border border-primary/10 bg-black/30 p-5">
                <h4 className="font-semibold text-primary">{title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ExperienceSection() {
  const [activeTab, setActiveTab] = useState<'work' | 'education'>('work');
  const activeData = activeTab === 'work' ? workExperience : education;

  return (
    <section id="experience" className="bg-black px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionIntro
          label="My Journey"
          title="From academic foundations to professional product work."
          muted="From academic excellence to professional growth, here is my path in software development."
        />

        <div className="mb-10 flex justify-center">
          <div className="inline-flex rounded-full border border-primary/10 bg-[#101010] p-1">
            {[
              { key: 'work' as const, label: 'Work Experience', Icon: BriefcaseBusiness },
              { key: 'education' as const, label: 'Education', Icon: GraduationCap },
            ].map(({ key, label, Icon }) => (
              <button
                key={key as string}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors sm:px-5 ${activeTab === key ? 'bg-primary text-black' : 'text-primary/65 hover:text-primary'}`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {activeData.map((item, index) => (
            <motion.article
              key={`${activeTab}-${item.position}`}
              className="rounded-[1.5rem] border border-primary/10 bg-[#101010] p-5 md:p-7"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: easeOut }}
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-[var(--portfolio-text)]">{item.position}</h3>
                  <p className="mt-1 text-primary/80">{item.company}</p>
                </div>
                <div className="text-sm text-gray-400 md:text-right">
                  <p className="flex items-center gap-2 md:justify-end">
                    <MapPin className="h-4 w-4 text-primary/60" /> {item.location}
                  </p>
                  <p className="mt-1">{item.duration}</p>
                </div>
              </div>
              <ul className="mt-6 grid gap-3 md:grid-cols-2">
                {item.description.map((desc) => (
                  <li key={desc} className="flex items-start gap-3 text-sm leading-relaxed text-gray-400">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitMessage('Please fill in all fields correctly.');
      setIsSubmitting(false);
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setSubmitMessage('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: `From: ${formData.name} (${formData.email})\n\n${formData.message}`,
          to_name: 'Trung Anh',
          reply_to: formData.email,
          user_email: formData.email,
        },
        emailjsConfig.publicKey,
      );

      if (response.status === 200) {
        setSubmitMessage('Email sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitMessage('Failed to send message. Please try again later.');
      }
    } catch {
      setSubmitMessage('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-black px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionIntro
          label="Get In Touch"
          title="Let us discuss new opportunities, products, and AI-driven ideas."
          muted="I am always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!"
        />

        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={handleSubmit} className="rounded-[1.5rem] bg-[#101010] p-5 md:p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="field-label">
                Your Name
                <input className="field-input" name="name" value={formData.name} onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))} placeholder="Your Name" required />
              </label>
              <label className="field-label">
                Your Email
                <input className="field-input" type="email" name="email" value={formData.email} onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))} placeholder="your.email@example.com" required />
              </label>
            </div>
            <label className="field-label mt-4">
              Your Message
              <textarea className="field-input min-h-36 resize-none" name="message" value={formData.message} onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))} placeholder="Your message here..." required />
            </label>
            <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-black transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
              <ArrowRight className="h-4 w-4" />
            </button>
            {submitMessage && <p className="mt-4 rounded-2xl border border-primary/10 bg-black/30 px-4 py-3 text-center text-sm text-primary/80">{submitMessage}</p>}
          </form>

          <div className="rounded-[1.5rem] bg-[#212121] p-5 md:p-7">
            <h3 className="text-2xl font-semibold text-[var(--portfolio-text)]">Let us Connect</h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              Feel free to reach out through any of these channels. I am always open to discussing new opportunities, interesting projects, or just having a chat about technology.
            </p>
            <div className="mt-7 space-y-3">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <a key={method.title} href={method.link} target={method.link.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl bg-black/25 p-4 text-primary/80 transition-colors hover:text-primary">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-black">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-sm text-gray-500">{method.title}</span>
                      <span className="break-all text-sm">{method.info}</span>
                    </span>
                  </a>
                );
              })}
            </div>
            <div className="mt-7 border-t border-primary/10 pt-6">
              <h4 className="text-sm font-semibold text-[var(--portfolio-text)]">Available for</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {['Freelance Projects', 'Full-time Positions', 'Consulting', 'Collaborations'].map((item) => (
                  <span key={item} className="rounded-full border border-primary/15 px-3 py-1 text-xs text-primary/70">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-primary/10 bg-black px-4 py-10 text-primary/70 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xl font-semibold text-[var(--portfolio-text)]">TrungAnhx</p>
          <p className="mt-1">© {year} Trần Đình Trung. All rights reserved.</p>
        </div>
        <div className="flex flex-wrap gap-5">
          <a href="#home" className="hover:text-primary">Home</a>
          <a href="#about" className="hover:text-primary">About</a>
          <a href="#projects" className="hover:text-primary">Projects</a>
          <a href="#contact" className="hover:text-primary">Contact</a>
        </div>
        <p className="text-gray-500">Built with Next.js, TypeScript, and Tailwind CSS</p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-[var(--portfolio-text)]">
      <Hero />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
