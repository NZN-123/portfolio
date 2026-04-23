import { PROJECTS } from '@entities/project';
import { SECTION_IDS } from '@shared/config';
import { ProjectCard } from './ProjectCard';
import { ProjectTitle } from './ProjectTitle';

export function ProjectSection() {
  return (
    <section id={SECTION_IDS.project} className="bg-[#FAFAFA]">
      <div
        className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 py-24 lg:gap-16 lg:py-32"
        style={{
          paddingLeft: 'clamp(24px, 8vw, 120px)',
          paddingRight: 'clamp(24px, 8vw, 120px)',
        }}
      >
        <ProjectTitle />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
