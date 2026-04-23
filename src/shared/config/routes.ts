export const ROUTES = {
  main: '/',
  projectDetail: '/project/:slug',
} as const;

export const projectDetailPath = (slug: string) => `/project/${slug}`;
