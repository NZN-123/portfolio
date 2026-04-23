import { Link } from 'react-router';
import { Hero } from '@widgets/hero';
import { SkillSection } from '@widgets/skill-section';
import { PROJECTS } from '@entities/project';
import { SECTION_IDS, projectDetailPath } from '@shared/config';

export function MainPage() {
  return (
    <div className="min-h-full bg-[#FFFEFE]">
      <Hero />
      <SkillSection />

      <section
        id={SECTION_IDS.project}
        className="mx-auto w-full max-w-[1440px] px-6 py-24 lg:px-[240px]"
      >
        <p className="text-sm text-[#525252]">Project</p>
        <h2 className="mt-2 text-2xl font-bold text-[#FF7474]">
          저의 노력이 담긴 결과물 이에요!
        </h2>
        <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PROJECTS.map((project) => (
            <li key={project.slug}>
              <Link
                to={projectDetailPath(project.slug)}
                className="flex aspect-square flex-col items-center justify-center rounded-3xl bg-neutral-50 text-xl font-bold transition-transform hover:scale-[1.02]"
              >
                {project.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
