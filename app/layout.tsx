

// import './globals.css';
// import { Poppins } from 'next/font/google';
// import ThemeWrapper from '../components/ThemeWrapper'; // Import the client-side wrapper

// // Importing Poppins font for global usage
// const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

// // Define metadata for the layout (server-side only)
// export const metadata = {
//   title: 'SniperCoders - Software Services',
//   description: 'Innovative web development and digital solutions',
//   icons: {
//     icon: '/images/logo.png', // Favicon
//   },
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <head>
//         <link rel="icon" href="/images/logo.png" type="image/png" />
//       </head>
//       <body className={`${poppins.className} transition-all duration-300`}> {/* Removed theme-specific classes */}
//         {/* The client-side ThemeWrapper component to handle theme logic */}
//         <ThemeWrapper>{children}</ThemeWrapper>
//       </body>
//     </html>
//   );
// }














import './globals.css';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from '../context/ThemeContext'; // 👈 Import it
import ThemeWrapper from '../components/ThemeWrapper';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

export const metadata = {
  title: 'SniperCoders - Software Services',
  description: 'Innovative web development and digital solutions',
  icons: {
    icon: '/images/logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} transition-all duration-300`}>
        <ThemeProvider>
          <ThemeWrapper>{children}</ThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
