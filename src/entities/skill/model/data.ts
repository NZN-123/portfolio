import figmaIcon from '@shared/assets/icons/figma-icon.png';
import aiIcon from '@shared/assets/icons/ai-icon.png';
import psIcon from '@shared/assets/icons/ps-icon.png';
import cssIcon from '@shared/assets/icons/css-icon.png';
import htmlIcon from '@shared/assets/icons/html-icon.png';
import pythonIcon from '@shared/assets/icons/python-icon.png';
import vscodeIcon from '@shared/assets/icons/vscode-icon.png';
import slackIcon from '@shared/assets/icons/slack-icon.png';
import notionIcon from '@shared/assets/icons/notion-icon.png';
import jiraIcon from '@shared/assets/icons/jira.png';

import type { SkillGroup } from './types';

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Design',
    skills: [
      { name: 'figma', label: 'Figma', iconSrc: figmaIcon, bgColor: '#323232' },
      { name: 'illustrator', label: 'Illustrator', iconSrc: aiIcon, bgColor: '#330000' },
      { name: 'photoshop', label: 'Photoshop', iconSrc: psIcon, bgColor: '#001E36' },
    ],
  },
  {
    title: 'Development',
    skills: [
      { name: 'css', label: 'CSS', iconSrc: cssIcon, bgColor: '#323232' },
      { name: 'html', label: 'HTML', iconSrc: htmlIcon, bgColor: '#323232' },
      { name: 'python', label: 'Python', iconSrc: pythonIcon, bgColor: '#323232' },
      { name: 'vscode', label: 'VS Code', iconSrc: vscodeIcon, bgColor: '#323232' },
    ],
  },
  {
    title: 'Communication',
    skills: [
      { name: 'slack', label: 'Slack', iconSrc: slackIcon, bgColor: '#323232' },
      { name: 'notion', label: 'Notion', iconSrc: notionIcon, bgColor: '#323232' },
      { name: 'jira', label: 'Jira', iconSrc: jiraIcon, bgColor: '#323232' },
    ],
  },
];
