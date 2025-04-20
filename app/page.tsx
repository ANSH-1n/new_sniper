// 'use client';

// import Hero from '../components/Hero';
// import ServiceCard from '../components/ServiceCard';
// import { motion } from 'framer-motion';
// import Image from 'next/image';

// export default function Home() {
//   const services = [
//     {
//       title: 'Custom Web Solutions',
//       description: 'We design and develop websites tailored to your specific requirements using cutting-edge technologies.',
//       gradient: 'from-blue-500 via-purple-600 to-pink-500',
//     },
//     {
//       title: 'Mobile-Friendly Design',
//       description: 'Our websites are optimized for seamless user experiences across all devices.',
//       gradient: 'from-green-500 via-yellow-500 to-red-500',
//     },
//     {
//       title: 'E-commerce Integration',
//       description: 'Robust e-commerce solutions with secure payment gateways and efficient inventory management.',
//       gradient: 'from-pink-500 via-yellow-500 to-teal-500',
//     },
//   ];

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Hero />
//       <section className="py-16 px-4 sm:px-8 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="container mx-auto text-center"
//         >
//           <h2 className="text-4xl font-bold mb-4">Our Specialization</h2>
//           <p className="text-xl mb-8">We build scalable, responsive, and high-performance websites.</p>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {services.map((service, index) => (
//               <ServiceCard key={index} {...service} />
//             ))}
//           </div>
//         </motion.div>
//       </section>
//       <section className="py-16 px-4 sm:px-8 text-center">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//         >
//           <h3 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
//             Ready to Elevate Your Business?
//           </h3>
//           <p className="text-lg mt-4 animate-pulse">Take the first step towards growth and innovation today.</p>
//           <a
//             href="/services"
//             className="mt-6 inline-block bg-gradient-to-r from-orange-400 to-yellow-500 text-white py-3 px-6 rounded-full text-lg hover:from-yellow-500 hover:to-orange-600 transition-all"
//           >
//             Get Your Custom Solution
//           </a>
//         </motion.div>
//       </section>
//     </div>
//   );
// }


















'use client';

import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isDarkTheme, setIsDarkTheme] = useState(true); // Sync with layout state

  // Sync with layout.tsx theme state (simulated; use context in a real app)
  useEffect(() => {
    const bodyClass = document.body.className;
    setIsDarkTheme(bodyClass.includes('bg-gray-900'));
  }, []);

  const services = [
    {
      title: 'Custom Web Solutions',
      description: 'We design and develop websites tailored to your specific requirements using cutting-edge technologies.',
      gradient: 'from-blue-500 via-purple-600 to-pink-500',
    },
    {
      title: 'Mobile-Friendly Design',
      description: 'Our websites are optimized for seamless user experiences across all devices.',
      gradient: 'from-green-500 via-yellow-500 to-red-500',
    },
    {
      title: 'E-commerce Integration',
      description: 'Robust e-commerce solutions with secure payment gateways and efficient inventory management.',
      gradient: 'from-pink-500 via-yellow-500 to-teal-500',
    },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col transition-all duration-300 ${
        isDarkTheme
          ? 'bg-gradient-to-r from-teal-900 via-cyan-900 to-blue-900 text-white'
          : 'bg-gradient-to-r from-teal-200 via-cyan-200 to-blue-200 text-gray-900'
      }`}
    >
      <Hero />
      <section
        className={`py-16 px-4 sm:px-8 transition-all duration-300 ${
          isDarkTheme
            ? 'bg-gradient-to-r from-teal-900 via-cyan-900 to-blue-900'
            : 'bg-gradient-to-r from-teal-300 via-cyan-300 to-blue-300'
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-4">Our Specialization</h2>
          <p className="text-xl mb-8">We build scalable, responsive, and high-performance websites.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} isDarkTheme={isDarkTheme} />
            ))}
          </div>
        </motion.div>
      </section>
      <section
        className={`py-16 px-4 sm:px-8 text-center transition-all duration-300 ${
          isDarkTheme ? 'text-white' : 'text-gray-900'
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className={`text-4xl font-bold bg-clip-text text-transparent ${
            isDarkTheme
              ? 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500'
              : 'bg-gradient-to-r from-pink-300 via-red-300 to-yellow-300'
          }`}>
            Ready to Elevate Your Business?
          </h3>
          <p className="text-lg mt-4 animate-pulse">Take the first step towards growth and innovation today.</p>
          <a
            href="/services"
            className={`mt-6 inline-block py-3 px-6 rounded-full text-lg transition-all ${
              isDarkTheme
                ? 'bg-gradient-to-r from-orange-700 to-yellow-700 text-white hover:from-yellow-800 hover:to-orange-800'
                : 'bg-gradient-to-r from-orange-400 to-yellow-500 text-gray-900 hover:from-yellow-500 hover:to-orange-500'
            }`}
          >
            Get Your Custom Solution
          </a>
        </motion.div>
      </section>
    </div>
  );
}