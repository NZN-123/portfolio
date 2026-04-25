import { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router';
import { findProjectBySlug, PROJECTS } from '@entities/project';
import { projectDetailPath, ROUTES } from '@shared/config';
import { PdfViewer } from '@shared/ui';

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? findProjectBySlug(slug) : undefined;
  const [pdfUrl, setPdfUrl] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    if (!project) return;
    setPdfUrl(undefined);
    let cancelled = false;
    fetch(`/api/pdf?slug=${encodeURIComponent(project.slug)}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: { url: string | null }) => {
        if (!cancelled) setPdfUrl(data.url ?? project.pdfUrl);
      })
      .catch(() => {
        if (!cancelled) setPdfUrl(project.pdfUrl);
      });
    return () => {
      cancelled = true;
    };
  }, [project]);

  if (!project) {
    return <Navigate to={ROUTES.main} replace />;
  }

  return (
    <div
      className="relative flex w-full flex-col bg-[#FAFAFA]"
      style={{ minHeight: '100dvh' }}
    >
      <div
        className="flex items-end justify-between gap-4"
        style={{
          paddingTop: 'clamp(24px, 4vh, 40px)',
          paddingBottom: 'clamp(24px, 4vh, 40px)',
          paddingLeft: 'clamp(24px, 8vw, 120px)',
          paddingRight: 'clamp(24px, 8vw, 120px)',
        }}
      >
        <Link
          to={ROUTES.main}
          aria-label="Close"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_0_12px_rgba(0,0,0,0.08)]"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M5 5l14 14M19 5L5 19"
              stroke="#171717"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </Link>

        <nav
          aria-label="Project"
          className="flex h-14 items-center gap-4 rounded-full bg-white/60 px-4 backdrop-blur-md sm:gap-10 sm:px-8 md:gap-12"
        >
          {PROJECTS.map((p) => {
            const isActive = p.slug === project.slug;
            return (
              <Link
                key={p.slug}
                to={projectDetailPath(p.slug)}
                className={
                  'text-base leading-6 tracking-[0.057px] transition-colors ' +
                  (isActive
                    ? 'font-bold text-[#FF7474]'
                    : 'font-medium text-[#171717] hover:text-[#FF7474]')
                }
              >
                {p.enName}
              </Link>
            );
          })}
        </nav>
      </div>

      <div
        className="flex flex-1"
        style={{
          paddingLeft: 'clamp(24px, 8vw, 120px)',
          paddingRight: 'clamp(24px, 8vw, 120px)',
        }}
      >
        <div className="flex flex-1 overflow-hidden rounded-t-[32px] bg-white">
          <PdfViewer file={pdfUrl ?? null} className="p-6 lg:p-10" />
        </div>
      </div>
    </div>
  );
}
