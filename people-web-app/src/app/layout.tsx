import '@/styles/globals.css';

import { Providers } from '@/app/providers';
import PeopleNavbar from '@/components/navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <PeopleNavbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
