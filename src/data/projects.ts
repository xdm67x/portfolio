export interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  color: string
  githubUrl?: string
  liveUrl?: string
}

export const projects: Project[] = [
  {
    id: 'rtk',
    title: 'RTK (Rust Token Killer)',
    description: 'CLI proxy that reduces LLM token consumption by 60-90%',
    techStack: ['Rust', 'LLM', 'CLI'],
    color: '#DEA584',
    githubUrl: 'https://github.com/rtk-ai/rtk',
  },
  {
    id: 'simple-agent',
    title: 'simple-agent',
    description:
      'An interactive AI coding agent that runs locally on your computer',
    techStack: ['Go', 'Ollama', 'Coding Agent'],
    color: '#22d3ee',
    githubUrl: 'https://github.com/xdm67x/simple-agent',
  },
  {
    id: 'cargo-feature-guard',
    title: 'cargo-feature-guard',
    description: 'Validate Cargo feature propagation across a workspace',
    techStack: ['Rust', 'Cargo'],
    color: '#CE422B',
    githubUrl: 'https://github.com/xdm67x/cargo-feature-guard',
  },
  {
    id: 'quick-xml',
    title: 'quick-xml',
    description: 'Rust high performance xml reader and writer',
    techStack: ['Rust'],
    color: '#DEA584',
    githubUrl: 'https://github.com/xdm67x/quick-xml',
  },
  {
    id: 'electrotest',
    title: 'electrotest',
    description:
      'CLI automation tool for testing Electron apps using Gherkin and CDP',
    techStack: ['Rust', 'Tokio', 'CDP'],
    color: '#47848F',
    githubUrl: 'https://github.com/xdm67x/electrotest',
  },
  {
    id: 'soft-delight',
    title: 'Soft Delight',
    description: 'A comfortable, eye-friendly VS Code theme for developers',
    techStack: ['TypeScript', 'JSON', 'VS Code'],
    color: '#6B5B95',
    githubUrl: 'https://github.com/xdm67x/soft-delight',
  },
  {
    id: 'chip8',
    title: 'chip8',
    description: 'Chip8 emulator written in C++',
    techStack: ['C++', 'CMake'],
    color: '#4A90D9',
    githubUrl: 'https://github.com/dm67x/chip8',
  },
]

export const heroContent = {
  name: 'MEHMET OZKAN',
  title: 'PIXEL ARCHITECT • LVL 99 WIZARD',
  tagline: 'TRANSFORMING PIXELS INTO IMMERSIVE EXPERIENCES',
  bio: 'AI enthusiast, video game aficionado, crafting web experiences. Ready to join your squad.',
}
