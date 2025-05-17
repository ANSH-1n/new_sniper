

// app/layout.tsx

import './globals.css';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Load the Poppins font
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});


export const metadata = {
  title: 'SniperCoders - Software Services',
  description: 'Innovative web development and digital solutions',
  icons: {
    icon: '/images/logo.ico',

  },
};






export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} transition-all duration-300`}>
        <ThemeProvider>
          <Navbar />

          {/* Main page content with top padding for fixed navbar */}
          <main className="pt-20">
            {children}
          </main>

          {/* Toast notifications */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
