import workcheckLogo from '@shared/assets/projects/workcheck-logo.png';
import homeezLogo from '@shared/assets/projects/homeez-logo.png';
import leafitLogo from '@shared/assets/projects/leafit-logo.png';

import type { Project } from './types';

export const PROJECTS: Project[] = [
  {
    slug: 'workcheck',
    name: '워크체크',
    pdfUrl: '/pdfs/workcheck.pdf',
    logoSrc: workcheckLogo,
    brandColor: '#FF4B33',
    role: '기획 / 디자인',
    teamSize: '3인 프로젝트',
    description:
      '워크체크는 알바생과 사장님 모두를 위한 가장 직관적인 근태 관리 솔루션으로 위치 기반의 정교한 체크인부터 실시간 급여 계산까지, 이제 불필요한 행정 업무는 줄이고 본질적인 업무에만 집중하세요.',
  },
  {
    slug: 'homeez',
    name: '홈이즈',
    pdfUrl: '/pdfs/homeez.pdf',
    logoSrc: homeezLogo,
    brandColor: '#2AA890',
    role: '기획 / 디자인',
    teamSize: '팀 프로젝트',
    description:
      '홈이즈는 AI가 IOT와 연결하여 자신의 집을 관리해주고 기본달력 앱과 연동되어 일정을 짜주는 AI앱입니다.',
  },
  {
    slug: 'leafit',
    name: '리핏',
    pdfUrl: '/pdfs/leafit.pdf',
    logoSrc: leafitLogo,
    brandColor: '#256F46',
    role: '기획 / 디자인',
    teamSize: '개인 프로젝트',
    description:
      '리핏은 개인화된 샐러드 어플로 자신의 몸 상태 혹은 자신의 지향점에 따라 영양성분을 추천해주고 자신이 원하는 재료들을 채울수 있는 완전 맞춤형 샐러드 어플입니다.',
  },
];

export const findProjectBySlug = (slug: string) =>
  PROJECTS.find((p) => p.slug === slug);
