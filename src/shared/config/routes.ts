export const ROUTES = {
  main: '/',
  projectDetail: '/project/:slug',
  admin: '/admin',
} as const;

export const projectDetailPath = (slug: string) => `/project/${slug}`;
