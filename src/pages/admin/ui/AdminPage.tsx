import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { PROJECTS } from '@entities/project';
import {
  LoginForm,
  ProjectUploadRow,
  fetchSession,
  logout,
} from '@features/pdf-admin';
import { ROUTES } from '@shared/config';

export function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    fetchSession().then((session) => setAuthenticated(session.authenticated));
  }, []);

  const handleLogout = async () => {
    await logout();
    setAuthenticated(false);
  };

  if (authenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] text-[#525252]">
        확인 중…
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] p-6">
        <LoginForm onSuccess={() => setAuthenticated(true)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-6 lg:p-12">
      <div className="mx-auto flex w-full max-w-[800px] flex-col gap-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl leading-8 font-bold text-[#171717]">
              PDF 관리
            </h1>
            <p className="mt-1 text-sm text-[#525252]">
              프로젝트별 PDF를 업로드하면 바로 반영돼요.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to={ROUTES.main}
              className="text-sm font-medium text-[#525252] hover:text-[#171717]"
            >
              메인으로
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-[#E5E5E5] bg-white px-3 py-2 text-sm font-medium text-[#171717] hover:bg-[#FAFAFA]"
            >
              로그아웃
            </button>
          </div>
        </header>

        <div className="flex flex-col gap-4">
          {PROJECTS.map((project) => (
            <ProjectUploadRow key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
