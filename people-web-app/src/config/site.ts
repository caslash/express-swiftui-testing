export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'People Web App',
  description: "A web app to manage people's information",
  navItems: [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'People',
      href: '/people',
    },
  ],
};
