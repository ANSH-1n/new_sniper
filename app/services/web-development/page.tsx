

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaYoutube, FaLinkedin, FaFacebook } from 'react-icons/fa';
import Link from 'next/link';

export default function WebDevelopmentPage() {
  const [isVisible, setIsVisible] = useState({});
  const [hoverCard, setHoverCard] = useState(null);

  // Intersection Observer for animation triggers
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('.animate-section').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Stats counter animation
  const [stats, setStats] = useState({ projects: 0, rating: 0, roi: 0 });

  useEffect(() => {
    if (isVisible.stats) {
      const duration = 2000; // 2 seconds animation
      const interval = 20; // Update every 20ms
      const steps = duration / interval;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        setStats({
          projects: Math.min(500, Math.floor((500 * step) / steps)),
          rating: Math.min(4.9, parseFloat(((4.9 * step) / steps).toFixed(1))),
          roi: Math.min(300, Math.floor((300 * step) / steps)),
        });

        if (step >= steps) clearInterval(timer);
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isVisible.stats]);

  // Footer variants
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  // Custom bubble component
  const Bubble = ({ delay, duration, size, position }) => (
    <motion.div
      className="absolute rounded-full bg-gradient-to-br from-blue-400/10 to-purple-500/10 backdrop-blur-sm"
      style={{
        width: size,
        height: size,
        ...position,
      }}
      animate={{
        y: [0, -15, 0],
        x: [0, 5, 0],
        scale: [1, 1.05, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: 'reverse',
        delay: delay,
        ease: 'easeInOut',
      }}
    />
  );

  // Services data
  const services = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
      title: 'Custom Website Design',
      description:
        'Visually stunning, responsive websites tailored to your brand identity and business objectives.',
      color: 'bg-purple-500',
      progress: 90,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: 'E-Commerce Solutions',
      description:
        'Transform your products into online sales with secure payment gateways and seamless shopping experiences.',
      color: 'bg-blue-500',
      progress: 85,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
      ),
      title: 'Content Management Systems',
      description:
        'Websites built on robust platforms like WordPress, allowing easy updates and management.',
      color: 'bg-green-500',
      progress: 95,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: 'Web Application Development',
      description:
        'Custom web applications to automate processes and improve efficiency.',
      color: 'bg-red-500',
      progress: 88,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: 'Website Maintenance & Support',
      description:
        'Keep your website secure, up-to-date, and performing optimally.',
      color: 'bg-gray-700',
      progress: 92,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
      title: 'Performance Optimization',
      description:
        'Fast-loading, SEO-optimized websites that provide an excellent user experience.',
      color: 'bg-purple-600',
      progress: 93,
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-gray-300 overflow-x-hidden relative flex flex-col"> {/* Removed min-h-screen */}
      {/* Global Floating Bubbles */}
      {[...Array(20)].map((_, i) => (
        <Bubble
          key={`global-${i}`}
          delay={i * 0.7}
          duration={5 + Math.random() * 5}
          size={50 + Math.random() * 150}
          position={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 500}%`,
            zIndex: 0,
          }}
        />
      ))}

      {/* Animated Header Banner */}
      <motion.section
        className="bg-gradient-to-r from-blue-700 to-purple-700 p-8 text-white text-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background particle effects */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full opacity-20"
              initial={{
                width: Math.random() * 30 + 5,
                height: Math.random() * 30 + 5,
                x: Math.random() * 100,
                y: Math.random() * 100,
                opacity: 0.1,
              }}
              animate={{
                x: `calc(${Math.random() * 100}vw)`,
                y: `calc(${Math.random() * 100}%)`,
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          ))}
        </div>

        <motion.h1
          className="text-4xl md:text-5xl mt-10 font-bold mb-3 relative z-10"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Ready to Dominate Your Market?
        </motion.h1>

        <motion.p
          className="mb-8 max-w-2xl mx-auto relative z-10 text-lg"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Let's build a website that becomes your most powerful sales tool. Schedule your free strategy session today!
        </motion.p>

        <motion.button
          className="bg-white text-blue-600 font-medium py-3 px-8 rounded-full hover:bg-blue-50 transition duration-300 relative z-10 shadow-lg"
          whileHover={{
            scale: 1.05,
            boxShadow: '0px 0px 20px rgba(255,255,255,0.5)',
            backgroundColor: '#f8fafc'
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          Start Your Digital Transformation Now →
        </motion.button>
      </motion.section>

      {/* Development Process */}
      <section className="max-w-6xl mx-auto py-20 px-4 animate-section relative" id="process">
        {/* Section Bubbles */}
        {[...Array(6)].map((_, i) => (
          <Bubble
            key={`process-${i}`}
            delay={i * 0.5}
            duration={3 + Math.random() * 3}
            size={40 + Math.random() * 80}
            position={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              zIndex: 0,
            }}
          />
        ))}

        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-white mb-16 relative z-10"
          initial={{ opacity: 0 }}
          animate={isVisible.process ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          Our Development Process
        </motion.h2>

        <div className="relative">
          {/* Timeline */}
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-600 transform -translate-x-1/2"
            initial={{ height: 0 }}
            animate={isVisible.process ? { height: '100%' } : { height: 0 }}
            transition={{ duration: 1.5 }}
          ></motion.div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Step 1 */}
            <motion.div
              className="md:text-right md:pr-12 relative"
              initial={{ x: -100, opacity: 0 }}
              animate={isVisible.process ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-lg hover:bg-gray-700/90 transition-all duration-300 transform hover:-translate-y-2 shadow-lg border border-gray-700/40">
                <h3 className="text-xl font-bold mb-3 text-blue-300">Discovery & Strategy</h3>
                <p className="text-gray-300">Deep-dive into your business goals and target audience</p>
              </div>
              <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 md:block hidden">
                <motion.div
                  className="bg-gradient-to-r from-blue-600 to-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-lg shadow-blue-500/30"
                  whileHover={{ scale: 1.2, boxShadow: '0px 0px 15px rgba(59, 130, 246, 0.8)' }}
                >
                  1
                </motion.div>
              </div>
            </motion.div>
            <div className="md:col-start-2 md:pl-12"></div>

            {/* Step 2 */}
            <motion.div
              className="md:col-start-2 md:pl-12 relative"
              initial={{ x: 100, opacity: 0 }}
              animate={isVisible.process ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-lg hover:bg-gray-700/90 transition-all duration-300 transform hover:-translate-y-2 shadow-lg border border-gray-700/40">
                <h3 className="text-xl font-bold mb-3 text-indigo-300">UI/UX Design</h3>
                <p className="text-gray-300">Creating wireframes and interactive prototypes</p>
              </div>
              <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 md:block hidden">
                <motion.div
                  className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-lg shadow-indigo-500/30"
                  whileHover={{ scale: 1.2, boxShadow: '0px 0px 15px rgba(99, 102, 241, 0.8)' }}
                >
                  2
                </motion.div>
              </div>
            </motion.div>
            <div></div>

            {/* Step 3 */}
            <motion.div
              className="md:text-right md:pr-12 relative"
              initial={{ x: -100, opacity: 0 }}
              animate={isVisible.process ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-lg hover:bg-gray-700/90 transition-all duration-300 transform hover:-translate-y-2 shadow-lg border border-gray-700/40">
                <h3 className="text-xl font-bold mb-3 text-purple-300">Development</h3>
                <p className="text-gray-300">Agile development with modern technologies</p>
              </div>
              <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 md:block hidden">
                <motion.div
                  className="bg-gradient-to-r from-purple-600 to-purple-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-lg shadow-purple-500/30"
                  whileHover={{ scale: 1.2, boxShadow: '0px 0px 15px rgba(147, 51, 234, 0.8)' }}
                >
                  3
                </motion.div>
              </div>
            </motion.div>
            <div className="md:col-start-2"></div>

            {/* Step 4 */}
            <motion.div
              className="md:col-start-2 md:pl-12 relative"
              initial={{ x: 100, opacity: 0 }}
              animate={isVisible.process ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-lg hover:bg-gray-700/90 transition-all duration-300 transform hover:-translate-y-2 shadow-lg border border-gray-700/40">
                <h3 className="text-xl font-bold mb-3 text-cyan-300">Testing</h3>
                <p className="text-gray-300">Rigorous quality assurance across devices</p>
              </div>
              <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 md:block hidden">
                <motion.div
                  className="bg-gradient-to-r from-cyan-600 to-cyan-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-lg shadow-cyan-500/30"
                  whileHover={{ scale: 1.2, boxShadow: '0px 0px 15px rgba(14, 165, 233, 0.8)' }}
                >
                  4
                </motion.div>
              </div>
            </motion.div>
            <div></div>

            {/* Step 5 */}
            <motion.div
              className="md:text-right md:pr-12 relative"
              initial={{ x: -100, opacity: 0 }}
              animate={isVisible.process ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
            >
              <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-lg hover:bg-gray-700/90 transition-all duration-300 transform hover:-translate-y-2 shadow-lg border border-gray-700/40">
                <h3 className="text-xl font-bold mb-3 text-teal-300">Launch</h3>
                <p className="text-gray-300">Deployment and performance monitoring</p>
              </div>
              <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 md:block hidden">
                <motion.div
                  className="bg-gradient-to-r from-teal-600 to-teal-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-lg shadow-teal-500/30"
                  whileHover={{ scale: 1.2, boxShadow: '0px 0px 15px rgba(20, 184, 166, 0.8)' }}
                >
                  5
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-6xl mx-auto py-20 px-4 animate-section relative" id="services">
        {/* Section Bubbles */}
        {[...Array(6)].map((_, i) => (
          <Bubble
            key={`services-${i}`}
            delay={i * 0.5}
            duration={3 + Math.random() * 3}
            size={40 + Math.random() * 80}
            position={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              zIndex: 0,
            }}
          />
        ))}

        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-white mb-16 relative z-10"
          initial={{ opacity: 0 }}
          animate={isVisible.services ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          Our Services
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="relative bg-gray-800/70 backdrop-blur-sm rounded-xl p-8 text-center overflow-hidden"
              initial={{ y: 50, opacity: 0 }}
              animate={isVisible.services ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                scale: 1.03,
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'rgba(31, 41, 55, 0.9)',
              }}
              onHoverStart={() => setHoverCard(index)}
              onHoverEnd={() => setHoverCard(null)}
            >
              {/* Animated glow effect */}
              <div className="absolute inset-0 opacity-20">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute rounded-full ${service.color}`}
                    style={{
                      width: Math.random() * 100 + 50,
                      height: Math.random() * 100 + 50,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  />
                ))}
              </div>

              {/* Service Card Content */}
              <motion.div
                className={`${service.color} w-16 h-16 mx-auto rounded-xl mb-6 flex items-center justify-center shadow-lg relative z-10`}
                whileHover={{ rotate: 5, scale: 1.1 }}
              >
                {service.icon}
              </motion.div>
              <h3 className="text-xl font-bold mb-4 text-white relative z-10">{service.title}</h3>
              <p className="mb-6 relative z-10">{service.description}</p>

              {/* Progress bar that shows on hover */}
              <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden mt-auto relative z-10">
                <motion.div
                  className={`h-full ${service.color}`}
                  initial={{ width: '0%' }}
                  animate={{
                    width: hoverCard === index ? `${service.progress}%` : '0%'
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
              {hoverCard === index && (
                <motion.p
                  className="text-sm mt-2 text-gray-300 relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  Expertise: {service.progress}%
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Next-Gen Web Development Section */}
      <section className="py-20 animate-section relative" id="stats">
        {/* Section Bubbles */}
        {[...Array(8)].map((_, i) => (
          <Bubble
            key={`stats-${i}`}
            delay={i * 0.4}
            duration={3 + Math.random() * 3}
            size={60 + Math.random() * 100}
            position={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              zIndex: 0,
            }}
          />
        ))}

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible.stats ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7 }}
          >
            <motion.span
              className="inline-block px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full text-sm mb-6 shadow-lg shadow-blue-500/20"
              whileHover={{ scale: 1.05, boxShadow: '0px 0px 15px rgba(59, 130, 246, 0.3)' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 inline mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Transform Your Digital Presence
            </motion.span>

            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible.stats ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Next-Gen Web Development Solutions
            </motion.h2>

            <motion.p
              className="text-xl max-w-3xl mx-auto text-gray-300"
              initial={{ opacity: 0 }}
              animate={isVisible.stats ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Elevate your online presence with cutting-edge websites that combine stunning aesthetics with{' '}
              <span className="text-blue-400 font-medium">peak performance</span>. We create digital experiences that don't just
              look good - <span className="text-purple-400 font-medium">they convert visitors into customers</span>.
            </motion.p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              { value: stats.projects, label: 'Projects Completed', icon: 'chart-bar', color: 'from-blue-500 to-blue-400' },
              { value: stats.rating, label: 'Client Satisfaction', icon: 'star', color: 'from-yellow-500 to-yellow-400', suffix: '/5' },
              { value: stats.roi, label: 'Average ROI', icon: 'trending-up', color: 'from-green-500 to-green-400', suffix: '%' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl text-center relative overflow-hidden group"
                initial={{ y: 50, opacity: 0 }}
                animate={isVisible.stats ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                whileHover={{ scale: 1.03, backgroundColor: 'rgba(31, 41, 55, 0.9)' }}
              >
                <div className="absolute inset-0 bg-gradient-radial from-transparent to-transparent group-hover:from-gray-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={
                        stat.icon === 'chart-bar'
                          ? 'M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z'
                          : stat.icon === 'star'
                            ? 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                            : 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                      }
                    />
                  </svg>
                </div>
                <div className="space-y-2">
                  <motion.div
                    className="text-4xl font-bold text-white flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={isVisible.stats ? { scale: 1 } : { scale: 0 }}
                    transition={{ type: 'spring', stiffness: 100, delay: 0.7 + index * 0.2 }}
                  >
                    {stat.value}
                    {stat.suffix && <span className="text-2xl ml-1">{stat.suffix}</span>}
                  </motion.div>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-action Section */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-purple-700 overflow-hidden relative">
        <div className="max-w-6xl mx-auto px-4 text-center text-white relative z-10">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Ready to Build Your Digital Success Story?
          </motion.h2>
          <motion.p
            className="text-xl mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            We're not just building websites - we're creating digital assets that generate real business results.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <button className="bg-white text-blue-600 font-medium py-3 px-8 rounded-full hover:bg-blue-50 transition duration-300 shadow-lg">
              Schedule Your Free Consultation
            </button>
          </motion.div>
        </div>

        {/* Animated Waves */}
        <motion.div
          className="absolute bottom-0 left-0 right-0"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path
              fill="rgba(17, 24, 39, 1)"
              fillOpacity="1"
              d="M0,192L60,202.7C120,213,240,235,360,229.3C480,224,600,192,720,186.7C840,181,960,203,1080,197.3C1200,192,1320,160,1380,144L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
          </svg>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        variants={footerVariants}
        initial="hidden"
        animate="visible"
        className="mt-auto py-12 px-4 sm:px-6 bg-gray-800 text-gray-400" // Added mt-auto here
      >
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
            {/* Company Info */}
            <div>
              <div className="flex items-center justify-center sm:justify-start mb-4">
                <span className="text-teal-400 font-bold text-xl">SniperCoders</span>
              </div>
              <p className="mb-4 max-w-xs mx-auto sm:mx-0">
                At SniperCoders Global Technologies, we specialize in turning visionary ideas into reality. Our expertise
                in consulting helps businesses transform aspirations into tangible solutions, paving the way for future
                growth.
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
                <li>
                  <Link
                    href="/services/custom-software-development"
                    className="hover:text-teal-300 transition-colors"
                  >
                    Custom Software Development
                  </Link>
                </li>
                <li>
                  <Link href="/services/web-development" className="hover:text-teal-300 transition-colors">
                    Website Development
                  </Link>
                </li>
                <li>
                  <Link href="/services/mobile-app-development" className="hover:text-teal-300 transition-colors">
                    Mobile App Development
                  </Link>
                </li>
                <li>
                  <Link href="/services/it-consulting" className="hover:text-teal-300 transition-colors">
                    IT Consulting
                  </Link>
                </li>
                <li>
                  <Link href="/services/digital-marketing" className="hover:text-teal-300 transition-colors">
                    Digital Marketing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Useful Links & Know More */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Useful Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/terms" className="hover:text-teal-300 transition-colors">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="hover:text-teal-300 transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/refund" className="hover:text-teal-300 transition-colors">
                      Refund Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers" className="hover:text-teal-300 transition-colors">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="/case-studies" className="hover:text-teal-300 transition-colors">
                      Case Studies
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Know More</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/what-we-offer" className="hover:text-teal-300 transition-colors">
                      What We Offer
                    </Link>
                  </li>
                  <li>
                    <Link href="/our-team" className="hover:text-teal-300 transition-colors">
                      Our Team
                    </Link>
                  </li>
                  <li>
                    <Link href="/faqs" className="hover:text-teal-300 transition-colors">
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link href="/testimonials" className="hover:text-teal-300 transition-colors">
                      Testimonials
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="hover:text-teal-300 transition-colors">
                      Blog & Insights
                    </Link>
                  </li>
                  <li>
                    <Link href="/partners" className="hover:text-teal-300 transition-colors">
                      Our Partners
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

















