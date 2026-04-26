import qualificationsGraphic from '@shared/assets/graphics/qualifications-graphic.png';
import educationGraphic from '@shared/assets/graphics/Education-graphic.png';
import awardsGraphic from '@shared/assets/graphics/Awards-graphic.png';
import experienceGraphic from '@shared/assets/graphics/experience-graphic.png';

import type { ExperienceGroup } from './types';

export const EXPERIENCE_GROUPS: ExperienceGroup[] = [
  {
    id: 'qualifications',
    title: '자격증',
    iconSrc: qualificationsGraphic,
    width: 289,
    items: [
      '컴퓨터 그래픽 기능사',
      '웹디자인 기능사',
      '자동차 운전면허증 2종보통',
    ],
  },
  {
    id: 'education',
    title: '학력사항',
    iconSrc: educationGraphic,
    width: 382,
    items: [
      '디자인 계열 4년제 학사학위',
      '서초구 UX/UI 디자인 부트캠프 최우수 수료',
    ],
  },
  {
    id: 'awards',
    title: '수상내역',
    iconSrc: awardsGraphic,
    width: 396,
    items: [
      '00대학교 캡스톤 우수상',
      '00대학교 창업캠프 우수상',
      '지역문화 기반 로컬 컨텐츠 아이디어톤 장려상',
    ],
  },
  {
    id: 'related',
    title: '관련 경험',
    iconSrc: experienceGraphic,
    width: 354,
    items: [
      '000 용역제안서 PPT 시안 디자인',
      '000 홈페이지 시안 디자인',
      '00대 캡스톤 메타버스 PPT, 영상 제작',
    ],
  },
];
