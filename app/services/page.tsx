
// 'use client';

// import { motion } from 'framer-motion';
// import Link from 'next/link';
// import { FaGlobe, FaMobile, FaChartLine, FaCode, FaChartPie, FaCloud } from 'react-icons/fa';

// export default function ServicesPage() {
//   const services = [
//     {
//       name: 'Web Development',
//       href: '/services/web-development',
//       description: 'Create powerful web experiences with cutting-edge development and responsive design.',
//       icon: FaGlobe,
//       iconColor: 'from-purple-500 to-pink-500',
//     },
//     {
//       name: 'Mobile App Development',
//       href: '/services/mobile-app-development',
//       description: 'Build native and cross-platform mobile solutions that users love.',
//       icon: FaMobile,
//       iconColor: 'from-green-400 to-blue-500',
//     },
//     {
//       name: 'Digital Marketing',
//       href: '/services/digital-marketing',
//       description: 'Data-driven strategies to boost visibility and drive conversions.',
//       icon: FaChartLine,
//       iconColor: 'from-pink-400 to-red-500',
//     },
//     {
//       name: 'Custom Software Development',
//       href: '/services/custom-software-development',
//       description: 'Custom software solutions tailored to your business logic and growth goals.',
//       icon: FaCode,
//       iconColor: 'from-yellow-400 to-orange-500',
//     },
//     {
//       name: 'IT Consulting & Digital Transformation',
//       href: '/services/it-consulting',
//       description: 'Strategic technology guidance for digital transformation.',
//       icon: FaChartPie,
//       iconColor: 'from-blue-400 to-indigo-500',
//     },
//     {
//       name: 'IoT Integration',
//       href: '/services/iot-integration',
//       description: 'Smart connected solutions for automated, data-driven operations.',
//       icon: FaCloud,
//       iconColor: 'from-teal-400 to-cyan-500',
//     },
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//       },
//     },
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
//       <div className="container mx-auto max-w-7xl">
//         <motion.h1
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//           className="text-4xl sm:text-5xl font-extrabold text-center mb-8 text-teal-300 drop-shadow-md"
//         >
//           Our Services
//         </motion.h1>
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3, duration: 0.7 }}
//           className="text-center text-gray-400 mb-12 max-w-3xl mx-auto text-lg sm:text-xl"
//         >
//           Comprehensive technology services to power your digital transformation journey.
//         </motion.p>

//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
//         >
//           {services.map((service, index) => (
//             <motion.div
//               key={index}
//               variants={cardVariants}
//               whileHover={{ scale: 1.05, rotate: 1 }}
//               whileTap={{ scale: 0.98 }}
//               className="group"
//             >
//               <Link
//                 href={service.href}
//                 className="relative flex flex-col justify-between bg-gray-800/50 backdrop-blur-md border border-gray-700 hover:border-teal-500 rounded-xl p-6 h-full transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-teal-700/30"
//               >
//                 <div className="flex items-center mb-4">
//                   <service.icon
//                     className={`w-8 h-8 mr-4 text-white bg-gradient-to-br ${service.iconColor} p-1 rounded-full`}
//                   />
//                   <h4 className="text-xl font-semibold group-hover:text-teal-300 transition-colors duration-300">
//                     {service.name}
//                   </h4>
//                 </div>
//                 <p className="text-gray-300 text-base leading-relaxed mb-6 transition-colors duration-300">
//                   {service.description}
//                 </p>
//                 <span className="text-teal-400 group-hover:text-white text-sm font-medium transition-colors duration-300">
//                   Learn More →
//                 </span>
//               </Link>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </div>
//   );
// }




















'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaGlobe, FaMobile, FaChartLine, FaCode, FaChartPie, FaCloud } from 'react-icons/fa';
import { FaInstagram, FaYoutube, FaLinkedin, FaFacebook } from 'react-icons/fa'; // Social media icons for footer

export default function ServicesPage() {
  const services = [
    {
      name: 'Web Development',
      href: '/services/web-development',
      description: 'Create powerful web experiences with cutting-edge development and responsive design.',
      icon: FaGlobe,
      iconColor: 'from-purple-500 to-pink-500',
    },
    {
      name: 'Mobile App Development',
      href: '/services/mobile-app-development',
      description: 'Build native and cross-platform mobile solutions that users love.',
      icon: FaMobile,
      iconColor: 'from-green-400 to-blue-500',
    },
    {
      name: 'Digital Marketing',
      href: '/services/digital-marketing',
      description: 'Data-driven strategies to boost visibility and drive conversions.',
      icon: FaChartLine,
      iconColor: 'from-pink-400 to-red-500',
    },
    {
      name: 'Custom Software Development',
      href: '/services/custom-software-development',
      description: 'Custom software solutions tailored to your business logic and growth goals.',
      icon: FaCode,
      iconColor: 'from-yellow-400 to-orange-500',
    },
    {
      name: 'IT Consulting & Digital Transformation',
      href: '/services/it-consulting',
      description: 'Strategic technology guidance for digital transformation.',
      icon: FaChartPie,
      iconColor: 'from-blue-400 to-indigo-500',
    },
    {
      name: 'IoT Integration',
      href: '/services/iot-integration',
      description: 'Smart connected solutions for automated, data-driven operations.',
      icon: FaCloud,
      iconColor: 'from-teal-400 to-cyan-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const footerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, delay: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl font-extrabold text-center mb-8 text-teal-300 drop-shadow-md"
        >
          Our Services
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-center text-gray-400 mb-12 max-w-3xl mx-auto text-lg sm:text-xl"
        >
          Comprehensive technology services to power your digital transformation journey.
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.98 }}
              className="group"
            >
              <Link
                href={service.href}
                className="relative flex flex-col justify-between bg-gray-800/50 backdrop-blur-md border border-gray-700 hover:border-teal-500 rounded-xl p-6 h-full transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-teal-700/30"
              >
                <div className="flex items-center mb-4">
                  <service.icon
                    className={`w-8 h-8 mr-4 text-white bg-gradient-to-br ${service.iconColor} p-1 rounded-full`}
                  />
                  <h4 className="text-xl font-semibold group-hover:text-teal-300 transition-colors duration-300">
                    {service.name}
                  </h4>
                </div>
                <p className="text-gray-300 text-base leading-relaxed mb-6 transition-colors duration-300">
                  {service.description}
                </p>
                <span className="text-teal-400 group-hover:text-white text-sm font-medium transition-colors duration-300">
                  Learn More →
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section from Screenshot */}
        <motion.section
          variants={ctaVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 py-12 px-6 sm:px-8 bg-gradient-to-r from-indigo-900 to-purple-900 rounded-xl shadow-lg backdrop-blur-md text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="text-3xl sm:text-4xl font-bold mb-4 text-white drop-shadow-md"
          >
            Need Custom Solutions?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg sm:text-xl"
          >
            Let’s discuss how we can combine these services to create your perfect digital ecosystem.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Link
              href="/contact"
              className="inline-block bg-gray-800 text-cyan-300 py-3 px-8 rounded-full text-lg font-semibold hover:bg-gray-700 hover:text-white transition-all duration-300 shadow-md"
            >
              Schedule Free Consultation →
            </Link>
          </motion.div>
        </motion.section>

        {/* Footer Section from Screenshot */}
        <motion.footer
          variants={footerVariants}
          initial="hidden"
          animate="visible"
          className="mt-16 py-12 px-4 sm:px-6 bg-gray-800 text-gray-400"
        >
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
              {/* Company Info */}
              <div>
                <div className="flex items-center justify-center sm:justify-start mb-4">
                  <span className="text-teal-400 font-bold text-xl">SniperCoders</span>
                </div>
                <p className="mb-4 max-w-xs mx-auto sm:mx-0">
                  At SniperCoders Global Technologies, we specialize in turning visionary ideas into reality. Our expertise in consulting helps businesses transform aspirations into tangible solutions, paving the way for future growth.
                </p>
                <div className="flex justify-center sm:justify-start space-x-4">
                  <a href="#" aria-label="Instagram">
                    <FaInstagram className="text-red-400 hover:text-red-300 transition-colors" />
                  </a>
                  <a href="#" aria-label="YouTube">
                    <FaYoutube className="text-red-400 hover:text-red-300 transition-colors" />
                  </a>
                  <a href="#" aria-label="LinkedIn">
                    <FaLinkedin className="text-blue-400 hover:text-blue-300 transition-colors" />
                  </a>
                  <a href="#" aria-label="Facebook">
                    <FaFacebook className="text-blue-400 hover:text-blue-300 transition-colors" />
                  </a>
                </div>
              </div>

              {/* Our Services */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Our Services</h3>
                <ul className="space-y-2">
                  <li><Link href="/services/custom-software-development" className="hover:text-teal-300 transition-colors">Custom Software Development</Link></li>
                  <li><Link href="/services/web-development" className="hover:text-teal-300 transition-colors">Website Development</Link></li>
                  <li><Link href="/services/mobile-app-development" className="hover:text-teal-300 transition-colors">Mobile App Development</Link></li>
                  <li><Link href="/services/it-consulting" className="hover:text-teal-300 transition-colors">IT Consulting</Link></li>
                  <li><Link href="/services/digital-marketing" className="hover:text-teal-300 transition-colors">Digital Marketing</Link></li>
                </ul>
              </div>

              {/* Useful Links & Know More */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Useful Links</h3>
                  <ul className="space-y-2">
                    <li><Link href="/terms" className="hover:text-teal-300 transition-colors">Terms of Service</Link></li>
                    <li><Link href="/privacy" className="hover:text-teal-300 transition-colors">Privacy Policy</Link></li>
                    <li><Link href="/refund" className="hover:text-teal-300 transition-colors">Refund Policy</Link></li>
                    <li><Link href="/careers" className="hover:text-teal-300 transition-colors">Careers</Link></li>
                    <li><Link href="/case-studies" className="hover:text-teal-300 transition-colors">Case Studies</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Know More</h3>
                  <ul className="space-y-2">
                    <li><Link href="/what-we-offer" className="hover:text-teal-300 transition-colors">What We Offer</Link></li>
                    <li><Link href="/our-team" className="hover:text-teal-300 transition-colors">Our Team</Link></li>
                    <li><Link href="/faqs" className="hover:text-teal-300 transition-colors">FAQs</Link></li>
                    <li><Link href="/testimonials" className="hover:text-teal-300 transition-colors">Testimonials</Link></li>
                    <li><Link href="/blog" className="hover:text-teal-300 transition-colors">Blog & Insights</Link></li>
                    <li><Link href="/partners" className="hover:text-teal-300 transition-colors">Our Partners</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}