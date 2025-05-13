import './globals.css';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from '../context/ThemeContext';
import ThemeWrapper from '../components/ThemeWrapper';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

export const metadata = {
  title: 'SniperCoders - Software Services',
  description: 'Innovative web development and digital solutions',
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
    favicon: '/images/logo.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo.ico" type="image/x-icon" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${poppins.className} transition-all duration-300`}>
        <ThemeProvider>
          <ThemeWrapper>{children}</ThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
