


// // // app/layout.tsx

// // import './globals.css'; // Ensure global styles are defined here
// // import { Poppins } from 'next/font/google';
// // import { ThemeProvider } from '../context/ThemeContext'; // Custom Theme Context

// // // Load the Poppins font
// // const poppins = Poppins({
// //   subsets: ['latin'],
// //   weight: ['400', '600', '700'],
// // });

// // // Define metadata for your app (used in <head>)
// // export const metadata = {
// //   title: 'SniperCoders - Software Services',
// //   description: 'Innovative web development and digital solutions',
// //   icons: {
// //     icon: '/images/logo.png', // Favicon
// //     apple: '/images/logo.png', // Apple icon
// //     shortcut: '/images/logo.ico', // Shortcut icon
// //   },
// // };

// // export default function RootLayout({ children }: { children: React.ReactNode }) {
// //   return (
// //     <html lang="en">
// //       <head>
// //         <link rel="icon" href="/images/logo.ico" type="image/x-icon" />
// //         <meta name="theme-color" content="#ffffff" />
// //       </head>
// //       <body className={`${poppins.className} transition-all duration-300`}>
// //         <ThemeProvider>
// //           {children} {/* Render the content of each page */}
// //         </ThemeProvider>
// //       </body>
// //     </html>
// //   );
// // }












// // app/layout.tsx

// import './globals.css'; // Ensure global styles are defined here
// import { Poppins } from 'next/font/google';
// import { ThemeProvider } from '../context/ThemeContext'; // Custom Theme Context
// import Navbar from '../components/Navbar'; // Import the Navbar component

// // Load the Poppins font
// const poppins = Poppins({
//   subsets: ['latin'],
//   weight: ['400', '600', '700'],
// });

// // Define metadata for your app (used in <head>)
// export const metadata = {
//   title: 'SniperCoders - Software Services',
//   description: 'Innovative web development and digital solutions',
//   icons: {
//     icon: '/images/logo.png', // Favicon
//     apple: '/images/logo.png', // Apple icon
//     shortcut: '/images/logo.ico', // Shortcut icon
//   },
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <head>
//         <link rel="icon" href="/images/logo.ico" type="image/x-icon" />
//         <meta name="theme-color" content="#ffffff" />
//       </head>
//       <body className={`${poppins.className} transition-all duration-300`}>
//         <ThemeProvider>
//           {/* Add the Navbar component here */}
//           <Navbar />
          
//           {/* Add padding-top to account for the fixed navbar */}
//           <main className="pt-20">
//             {children} {/* Render the content of each page */}
//           </main>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }











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

// Define metadata (used by Next.js App Router)
export const metadata = {
  title: 'SniperCoders - Software Services',
  description: 'Innovative web development and digital solutions',
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
    shortcut: '/images/logo.ico',
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
