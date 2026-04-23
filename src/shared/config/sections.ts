export const SECTION_IDS = {
  main: 'main',
  skill: 'skill',
  experience: 'experience',
  project: 'project',
  blog: 'blog',
  contact: 'contact',
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

export const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: SECTION_IDS.main, label: 'Main' },
  { id: SECTION_IDS.skill, label: 'Skill' },
  { id: SECTION_IDS.experience, label: 'Experience' },
  { id: SECTION_IDS.project, label: 'Project' },
  { id: SECTION_IDS.blog, label: 'Blog' },
];
