





'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';

export default function WebDevelopmentPage() {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [hoverCard, setHoverCard] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Three.js setup
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.5,
      color: 0x88ccff,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    camera.position.z = 50;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.y += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Scroll-based animations
  const { scrollYProgress } = useScroll();
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.8]);
  const headerScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  // Intersection Observer for section animations
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
      const duration = 2000;
      const interval = 20;
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

  // Bubble component
  const Bubble = ({ delay, duration, size, position }: { delay: number; duration: number; size: number; position: { left: string; top: string } }) => (
    <motion.div
      className="absolute rounded-full bg-gradient-to-br from-blue-400/30 to-purple-500/30 backdrop-blur-sm"
      style={{
        width: size,
        height: size,
        left: position.left,
        top: position.top,
      }}
      animate={{
        y: [0, -20, 0],
        x: [0, 10, 0],
        scale: [1, 1.1, 1],
        opacity: [0.2, 0.6, 0.2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: 'reverse',
        delay,
        ease: 'easeInOut',
      }}
    />
  );






  // Services data
  const services = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: 'Custom Website Design',
      description: 'Visually stunning, responsive websites tailored to your brand identity.',
      color: 'bg-purple-500',
      progress: 90,
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'E-Commerce Solutions',
      description: 'Secure, seamless online stores with advanced payment integrations.',
      color: 'bg-blue-500',
      progress: 85,
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      title: 'Content Management Systems',
      description: 'Easy-to-manage websites built on robust platforms like WordPress.',
      color: 'bg-green-500',
      progress: 95,
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Web Application Development',
      description: 'Custom applications to streamline your business processes.',
      color: 'bg-red-500',
      progress: 88,
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Website Maintenance & Support',
      description: 'Keep your website secure, updated, and optimized.',
      color: 'bg-gray-700',
      progress: 92,
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: 'Performance Optimization',
      description: 'Fast, SEO-optimized websites for superior user experiences.',
      color: 'bg-purple-600',
      progress: 93,
    },
  ];

  const textVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };
  
  return (
    <div ref={containerRef} className="relative bg-gray-900 text-white min-h-screen overflow-hidden font-sans">
      {/* Three.js Canvas */}
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 opacity-30" style={{ opacity: backgroundOpacity.get() }} />

      {/* Floating Bubbles */}
      {[...Array(15)].map((_, i) => (
        <Bubble
          key={`global-${i}`}
          delay={i * 0.5}
          duration={4 + Math.random() * 4}
          size={60 + Math.random() * 120}
          position={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 400}%`,
          }}
        />
      ))}

      {/* Header Banner */}
      <motion.section
        className="relative bg-gradient-to-r from-blue-800 to-purple-800 p-10 text-center"
        style={{ scale: headerScale }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r mt-12 from-blue-400 to-purple-400 bg-clip-text text-transparent"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Elevate Your Digital Presence
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-8 max-w-3xl mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Build a website that drives results. Start with a free strategy session today!
        </motion.p>
        <motion.button
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-8 rounded-full font-medium hover:from-blue-600 hover:to-purple-600 transition-all"
          whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(255,255,255,0.5)' }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started →
        </motion.button>
      </motion.section>

      {/* Development Process */}
      <section className="max-w-7xl mx-auto py-20 px-6 animate-section relative" id="process">
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -30 }}
          animate={isVisible.process ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8 }}
        >
          Our Development Process
        </motion.h2>
        <div className="relative">
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 -translate-x-1/2"
            initial={{ height: 0 }}
            animate={isVisible.process ? { height: '100%' } : { height: 0 }}
            transition={{ duration: 1.2 }}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { title: 'Discovery & Strategy', desc: 'Understand your goals and audience', color: 'blue-400', step: 1 },
              { title: 'UI/UX Design', desc: 'Craft intuitive designs and prototypes', color: 'indigo-400', step: 2 },
              { title: 'Development', desc: 'Build with modern technologies', color: 'purple-400', step: 3 },
              { title: 'Testing', desc: 'Ensure quality across devices', color: 'cyan-400', step: 4 },
              { title: 'Launch', desc: 'Deploy and monitor performance', color: 'teal-400', step: 5 },
            ].map((step, index) => (
              <motion.div
                key={index}
                className={`relative ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}
                initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                animate={isVisible.process ? { x: 0, opacity: 1 } : { x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="bg-gray-800/50 backdrop-blur-lg p-8 rounded-xl hover:bg-gray-700/70 transition-all transform hover:-translate-y-2 shadow-xl border border-gray-700/30">
                  <h3 className={`text-xl font-bold mb-3 text-${step.color}`}>{step.title}</h3>
                  <p className="text-gray-300">{step.desc}</p>
                </div>
                <div
                  className={`absolute top-1/2 transform -translate-y-1/2 ${index % 2 === 0 ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'} md:block hidden`}
                >
                  <motion.div
                    className={`bg-gradient-to-r from-${step.color} to-${step.color.replace('400', '500')} text-white w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-lg`}
                    whileHover={{ scale: 1.2, boxShadow: `0 0 15px ${step.color}` }}
                  >
                    {step.step}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto py-20 px-6 animate-section relative" id="services">
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -30 }}
          animate={isVisible.services ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8 }}
        >
          Our Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="relative bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 text-center overflow-hidden"
              initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
              animate={isVisible.services ? { x: 0, opacity: 1 } : { x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{
                scale: 1.05,
                x: index % 2 === 0 ? 10 : -10,
                boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
              }}
              onHoverStart={() => setHoverCard(index)}
              onHoverEnd={() => setHoverCard(null)}
            >
              <motion.div
                className={`${service.color} w-16 h-16 mx-auto rounded-xl mb-6 flex items-center justify-center shadow-lg`}
                whileHover={{ rotate: 10, scale: 1.15 }}
              >
                {service.icon}
              </motion.div>
              <h3 className="text-xl font-bold mb-4 text-white">{service.title}</h3>
              <p className="mb-6 text-gray-300">{service.description}</p>
              <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${service.color}`}
                  initial={{ width: '0%' }}
                  animate={{ width: hoverCard === index ? `${service.progress}%` : '0%' }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
              {hoverCard === index && (
                <motion.p
                  className="text-sm mt-2 text-gray-300"
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

      {/* Stats Section */}
      <section className="py-20 animate-section relative" id="stats">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible.stats ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible.stats ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Next-Gen Web Solutions
            </motion.h2>
            <motion.p
              className="text-xl max-w-3xl mx-auto text-gray-300"
              initial={{ opacity: 0 }}
              animate={isVisible.stats ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Create digital experiences that captivate and convert with our cutting-edge solutions.
            </motion.p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              { value: stats.projects, label: 'Projects Completed', icon: 'chart-bar', color: 'from-blue-500 to-blue-400' },
              { value: stats.rating, label: 'Client Satisfaction', icon: 'star', color: 'from-yellow-500 to-yellow-400', suffix: '/5' },
              { value: stats.roi, label: 'Average ROI', icon: 'trending-up', color: 'from-green-500 to-green-400', suffix: '%' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/50 backdrop-blur-lg p-8 rounded-xl text-center relative overflow-hidden group"
                initial={{ y: 50, opacity: 0 }}
                animate={isVisible.stats ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.2 }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(31, 41, 55, 0.9)' }}
              >
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-purple-800 text-center relative">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Ready to Transform Your Business?
        </motion.h2>
        <motion.p
          className="text-xl mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Create a digital asset that drives real results. Let&apos;s get started!
        </motion.p>
        <motion.button
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-8 rounded-full font-medium hover:from-blue-600 hover:to-purple-600 transition-all"
          whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(255,255,255,0.5)' }}
          whileTap={{ scale: 0.95 }}
        >
          Schedule a Free Consultation
        </motion.button>
      </section>

      {/* Footer */}
     <footer className="relative z-20 bg-gray-950/70 backdrop-blur-lg border-t border-gray-800/50 text-white py-16 mt-20">
              <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                  <motion.div
                    variants={textVariants}
                    initial="initial"
                    animate="animate"
                  >
                    <div className="flex items-center mb-6">
                      <div className="text-3xl font-extrabold">
                        <span className="bg-clip-text bg-gradient-to-r text-white animate-gradient">
                          SniperCoders
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      We specialize in turning visionary ideas into reality. Our
                      expertise helps businesses transform aspirations into tangible
                      solutions, paving the way for future growth.
                    </p>
                  </motion.div>
    
                  {[
                    {
                      title: "Our Services",
                      items: [
                        {
                          label: "Custom Software Dev",
                          href: "/services/custom-software-development",
                        },
                        {
                          label: "Website Development",
                          href: "/services/web-development",
                        },
                        {
                          label: "Mobile App Development",
                          href: "/services/mobile-development",
                        },
                        { label: "IT Consulting", href: "/services/it-consulting" },
                      ],
                    },
                    {
                      title: "Useful Links",
                      items: [
                        { label: "Terms of Service", href: "/terms" },
                        { label: "Privacy Policy", href: "/privacy" },
                        { label: "Refund Policy", href: "/refund" },
                      ],
                    },
                    {
                      title: "Get In Touch",
                      items: [
                        { label: "About Us", href: "/about" },
                        { label: "Contact Us", href: "/contact" },
                        { label: "FAQs", href: "/faqs" },
                        { label: "Testimonials", href: "/showcase" },
                      ],
                    },
                  ].map((section, idx) => (
                    <motion.div
                      key={idx}
                      variants={textVariants}
                      initial="initial"
                      animate="animate"
                    >
                      <h3 className="text-lg font-semibold mb-6 text-gray-200">
                        {section.title}
                      </h3>
                      <ul className="space-y-3">
                        {section.items.map((item, i) => (
                          <motion.li
                            key={i}
                            whileHover={{ x: 8 }}
                            transition={{ duration: 0.3 }}
                          >
                            <a
                              href={item.href}
                              className="text-gray-300 hover:text-cyan-400 transition-colors text-sm"
                            >
                              {item.label}
                            </a>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  className="mt-12 pt-10 border-t border-gray-800/50 text-center text-gray-400 text-sm"
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                >
                  © {new Date().getFullYear()} SniperCoders Global Technologies. All
                  rights reserved.
                </motion.div>
              </div>
            </footer>

                 </div>
   
  );
};