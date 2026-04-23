import { Link } from 'react-router';
import type { Project } from '@entities/project';
import { projectDetailPath } from '@shared/config';

export function ProjectCard(project: Project) {
  return (
    <Link
      to={projectDetailPath(project.slug)}
      className="group relative block aspect-square w-full overflow-hidden rounded-[48px] bg-white lg:rounded-[64px]"
      aria-label={project.name}
    >
      {/* Default: centered logo image (contains brand + name) */}
      <div className="flex h-full items-center justify-center p-6">
        <img
          src={project.logoSrc}
          alt={project.name}
          className="h-auto max-h-[70%] w-auto max-w-[70%] object-contain"
        />
      </div>

      {/* Hover dimd overlay (lg+ only; mobile taps navigate directly) */}
      <div className="pointer-events-none absolute inset-0 hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:block">
        <div className="absolute inset-0 rounded-[64px] bg-black/72" />

        <span className="absolute top-10 left-10 text-xs leading-4 font-semibold tracking-[0.252px] text-[#FF7474]">
          {project.role}
        </span>
        <span className="absolute top-10 right-10 text-xs leading-4 font-semibold tracking-[0.252px] text-white">
          {project.teamSize}
        </span>

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-10">
          <h3 className="text-2xl leading-8 font-semibold tracking-[-0.23px] text-white">
            {project.name}
          </h3>
          <p className="text-center text-sm leading-5 font-medium tracking-[0.145px] text-[#FAFAFA]">
            {project.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
