import { Link, useParams, Navigate } from 'react-router';
import { findProjectBySlug, PROJECTS } from '@entities/project';
import { projectDetailPath, ROUTES } from '@shared/config';

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? findProjectBySlug(slug) : undefined;

  if (!project) {
    return <Navigate to={ROUTES.main} replace />;
  }

  return (
    <div className="min-h-full bg-neutral-50">
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-neutral-100 bg-white/90 px-6 backdrop-blur">
        <Link
          to={ROUTES.main}
          aria-label="Close"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 hover:bg-neutral-100"
        >
          ✕
        </Link>

        <nav className="flex items-center gap-2 rounded-full bg-white px-2 py-1 shadow-sm">
          {PROJECTS.map((p) => (
            <Link
              key={p.slug}
              to={projectDetailPath(p.slug)}
              className={
                'rounded-full px-4 py-2 text-sm transition-colors ' +
                (p.slug === project.slug
                  ? 'bg-brand-50 text-brand-500 font-semibold'
                  : 'text-neutral-600 hover:text-brand-500')
              }
            >
              {p.name}
            </Link>
          ))}
        </nav>

        <div className="w-10" />
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center px-6 py-16">
        <p className="text-2xl font-bold text-neutral-800">
          여기에 PDF 들어갑니다.
        </p>
      </main>
    </div>
  );
}
