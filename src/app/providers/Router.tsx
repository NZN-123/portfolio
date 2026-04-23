import { BrowserRouter, Routes, Route } from 'react-router';
import { MainPage } from '@pages/main';
import { ProjectDetailPage } from '@pages/project-detail';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/project/:slug" element={<ProjectDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
