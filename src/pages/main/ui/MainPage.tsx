import { Header } from '@widgets/header';
import { Hero } from '@widgets/hero';
import { SkillSection } from '@widgets/skill-section';
import { ExperienceSection } from '@widgets/experience-section';
import { ProjectSection } from '@widgets/project-section';

export function MainPage() {
  return (
    <div className="min-h-full bg-[#FAFAFA]">
      <Header />
      <Hero />
      <SkillSection />
      <ExperienceSection />
      <ProjectSection />
    </div>
  );
}
