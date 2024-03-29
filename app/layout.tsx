import '@radix-ui/themes/styles.css';
import './theme-config.css';
import './globals.css';
import type { Metadata } from 'next';
import { Container, Theme } from '@radix-ui/themes';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

import NavBar from './NavBar';
import AuthProvider from './auth/Provider';
import QueryClientProvider from './QueryClientProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const Yekan = localFont({ src: '../public/Yekan.ttf', variable: '--font-yekan' });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={Yekan.variable} dir="rtl">
        <QueryClientProvider>
          <AuthProvider>
            <Theme accentColor="violet">
              <NavBar />
              <main className="p-5">
                <Container>{children}</Container>
              </main>
              {/* <ThemePanel /> */}
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
