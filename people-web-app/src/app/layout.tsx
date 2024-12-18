import '@/styles/globals.css';
import { Metadata } from 'next';

import { Providers } from '@/app/providers';

import { siteConfig } from '@/config/site';
import { Navbar } from '@/components/navbar';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
