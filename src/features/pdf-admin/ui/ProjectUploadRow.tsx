import { useEffect, useRef, useState } from 'react';
import type { Project } from '@entities/project';
import { fetchProjectPdfUrl, uploadPdf } from '../api/adminApi';

interface ProjectUploadRowProps {
  project: Project;
}

type Status =
  | { kind: 'idle' }
  | { kind: 'uploading' }
  | { kind: 'success'; url: string }
  | { kind: 'error'; message: string };

export function ProjectUploadRow({ project }: ProjectUploadRowProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  useEffect(() => {
    let cancelled = false;
    fetchProjectPdfUrl(project.slug).then((url) => {
      if (!cancelled) setCurrentUrl(url);
    });
    return () => {
      cancelled = true;
    };
  }, [project.slug]);

  const handleFileChange = async (file: File) => {
    setStatus({ kind: 'uploading' });
    try {
      const { url } = await uploadPdf(project.slug, file);
      setCurrentUrl(url);
      setStatus({ kind: 'success', url });
    } catch (err) {
      setStatus({
        kind: 'error',
        message: err instanceof Error ? err.message : '업로드에 실패했어요.',
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-6">
      <div className="flex items-center gap-4">
        <img
          src={project.logoSrc}
          alt=""
          aria-hidden="true"
          className="h-12 w-12 object-contain"
        />
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-[#171717]">
            {project.name} <span className="text-[#525252]">· {project.enName}</span>
          </span>
          <span className="text-sm text-[#525252]">
            {currentUrl ? (
              <a
                href={currentUrl}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                현재 PDF 보기
              </a>
            ) : (
              '업로드된 PDF 없음'
            )}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileChange(file);
            e.target.value = '';
          }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={status.kind === 'uploading'}
          className="rounded-lg bg-[#FF7474] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {status.kind === 'uploading' ? '업로드 중…' : 'PDF 교체'}
        </button>
        {status.kind === 'success' && (
          <span className="text-sm text-[#2AA890]">업로드 완료</span>
        )}
        {status.kind === 'error' && (
          <span className="text-sm text-[#FF7474]" role="alert">
            {status.message}
          </span>
        )}
      </div>
    </div>
  );
}
