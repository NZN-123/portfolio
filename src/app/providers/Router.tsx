import { BrowserRouter, Routes, Route } from 'react-router';
import { MainPage } from '@pages/main';
import { ProjectDetailPage } from '@pages/project-detail';
import { AdminPage } from '@pages/admin';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/project/:slug" element={<ProjectDetailPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}
