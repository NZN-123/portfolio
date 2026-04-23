export interface Skill {
  name: string;
  label: string;
  iconSrc: string;
  bgColor: string;
}

export type SkillGroupTitle = 'Design' | 'Development' | 'Communication';

export interface SkillGroup {
  title: SkillGroupTitle;
  skills: Skill[];
}
