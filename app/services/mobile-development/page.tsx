




'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Smartphone, RefreshCw, Palette, Settings, Briefcase, LineChart, Shield, Rocket, Edit, BarChart3, Code } from 'lucide-react';
import CountUp from 'react-countup';
import * as THREE from 'three';
import Link from 'next/link';

export default  function MobileAppDevelopment() {
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
    const particleCount = 800;
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 80;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.4,
      color: 0x88ccff,
      transparent: true,
      opacity: 0.5,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    camera.position.z = 40;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.y += 0.002;
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
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [0.2, 0.7]);
  const headerScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);

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

  // Services data
  const services = [
    {
      icon: <Smartphone className="text-white" size={24} />,
      title: 'Native Excellence',
      description: 'Platform-specific iOS and Android apps with smooth, native performance.',
      color: 'from-purple-500 to-blue-500',
      borderColor: 'purple-500',
    },
    {
      icon: <RefreshCw className="text-white" size={24} />,
      title: 'Hybrid Solutions',
      description: 'Cross-platform apps with React Native and Flutter for optimal performance.',
      color: 'from-blue-500 to-teal-500',
      borderColor: 'blue-500',
    },
    {
      icon: <Palette className="text-white" size={24} />,
      title: 'Design Excellence',
      description: 'Behavior-driven UI with micro-interactions for emotional engagement.',
      color: 'from-teal-500 to-emerald-500',
      borderColor: 'teal-500',
    },
    {
      icon: <Settings className="text-white" size={24} />,
      title: 'Lifecycle Management',
      description: 'Continuous optimization and feature evolution based on analytics.',
      color: 'from-emerald-500 to-orange-500',
      borderColor: 'emerald-500',
    },
    {
      icon: <Briefcase className="text-white" size={24} />,
      title: 'Enterprise Mobility',
      description: 'Secure solutions for workflow automation and data visualization.',
      color: 'from-orange-500 to-purple-500',
      borderColor: 'orange-500',
    },
    {
      icon: <LineChart className="text-white" size={24} />,
      title: 'Growth Acceleration',
      description: 'App store optimization and user acquisition strategies.',
      color: 'from-purple-500 to-blue-500',
      borderColor: 'purple-500',
    },
  ];

  // Features data
  const features = [
    {
      icon: <Rocket className="text-white" size={28} />,
      title: 'Cutting-Edge Stack',
      description: 'Swift, Kotlin, React Native with native module integration.',
      color: 'from-purple-500 to-blue-500',
    },
    {
      icon: <Edit className="text-white" size={28} />,
      title: 'Precision QA Protocol',
      description: '75+ device test matrix with performance benchmarking.',
      color: 'from-blue-500 to-teal-500',
    },
    {
      icon: <BarChart3 className="text-white" size={28} />,
      title: 'Performance Optimized',
      description: 'Sub-16ms frame time and minimal memory footprint.',
      color: 'from-teal-500 to-emerald-500',
    },
    {
      icon: <Shield className="text-white" size={28} />,
      title: 'Security Architecture',
      description: 'Zero-knowledge encryption and penetration-tested codebase.',
      color: 'from-emerald-500 to-purple-500',
    },
  ];


    const textVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };
  

  return (
    <div ref={containerRef} className="relative bg-slate-900 text-white min-h-screen overflow-hidden font-sans">
      {/* Three.js Canvas */}
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 opacity-20" style={{ opacity: backgroundOpacity.get() }} />

      {/* Header */}
      <header className="container mx-auto p-4 z-10 backdrop-blur-sm bg-slate-900/80 sticky top-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold">
              <Code className="mr-2 inline" size={24} />
              <span className="bg-gradient-to-r from-purple-500 to-teal-500 bg-clip-text text-transparent">SniperCoders</span>
            </div>
          </div>
          <nav className="hidden md:flex gap-6">
            {['Services', 'Solutions', 'Portfolio', 'Contact'].map((item) => (
              <Link key={item} href="#" className="hover:text-purple-400 transition-all duration-300">
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section
        className="container mx-auto px-4 py-24 relative z-10 text-center"
        style={{ scale: headerScale }}
      >
        <motion.span
          className="inline-block bg-purple-900/50 backdrop-blur-sm text-purple-200 px-6 py-2 rounded-full mb-6 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Smartphone className="inline mr-2" size={18} />
          Precision Mobile Development
        </motion.span>
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-8 bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Crafted Mobile Experiences
        </motion.h1>
        <motion.p
          className="text-xl max-w-3xl mx-auto mb-12 text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Transform ideas into <span className="text-purple-400 font-semibold">captivating mobile solutions</span> that drive{' '}
          <span className="text-teal-400 font-semibold">business growth</span>.
        </motion.p>
        <div className="flex justify-center gap-8 mb-20">
          {[
            { end: 120, suffix: '+', label: 'Precision Apps', color: 'from-purple-400 to-blue-400' },
            { end: 4.9, suffix: '/5', label: 'Client Satisfaction', color: 'from-blue-400 to-teal-400', decimals: 1 },
            { end: 3, suffix: 'x', label: 'ROI Average', color: 'from-teal-400 to-purple-400' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
            >
              <div className={`text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                <CountUp end={stat.end} duration={2} suffix={stat.suffix} decimals={stat.decimals} />
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Development Lifecycle */}
      <section className="container mx-auto px-4 py-12 relative z-10 animate-section" id="lifecycle">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -30 }}
          animate={isVisible.lifecycle ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8 }}
        >
          Our Precision Development Approach
        </motion.h2>
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500 to-teal-500"
            initial={{ height: 0 }}
            animate={isVisible.lifecycle ? { height: '100%' } : { height: 0 }}
            transition={{ duration: 1.5 }}
          />
          <div className="space-y-24 relative">
            {[
              { title: 'Strategic Discovery', desc: 'Analyze business goals and user behaviors.', icon: <Shield size={24} />, color: 'from-purple-500 to-blue-500', side: 'right' },
              { title: 'UX Architecture', desc: 'Design interactive wireframes and systems.', icon: <Palette size={24} />, color: 'from-blue-500 to-blue-600', side: 'left' },
              { title: 'Precision Development', desc: 'Clean code with agile iterations.', icon: <Code size={24} />, color: 'from-blue-500 to-teal-500', side: 'right' },
              { title: 'Advanced Quality Control', desc: 'Automated testing and device validation.', icon: <RefreshCw size={24} />, color: 'from-teal-500 to-teal-600', side: 'left' },
              { title: 'Strategic Deployment', desc: 'App store optimization and rollout.', icon: <Rocket size={24} />, color: 'from-teal-500 to-purple-500', side: 'right' },
              { title: 'Continuous Evolution', desc: 'Analytics-driven enhancements.', icon: <LineChart size={24} />, color: 'from-purple-500 to-purple-600', side: 'left' },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center relative"
                initial={{ x: item.side === 'right' ? -100 : 100, opacity: 0 }}
                animate={isVisible.lifecycle ? { x: 0, opacity: 1 } : { x: item.side === 'right' ? -100 : 100, opacity: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className={`w-1/2 ${item.side === 'right' ? 'pr-12 text-right' : 'pl-12'}`}>
                  <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl shadow-xl">
                    <h3 className="text-2xl font-bold mb-2 text-white">{item.title}</h3>
                    <p className="text-gray-300">{item.desc}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <motion.div
                    className={`w-14 h-14 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center shadow-lg`}
                    initial={{ scale: 0 }}
                    animate={isVisible.lifecycle ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.7, delay: index * 0.2 + 0.2 }}
                    whileHover={{ scale: 1.2 }}
                  >
                    {item.icon}
                  </motion.div>
                </div>
                <div className={`w-1/2 ${item.side === 'right' ? 'pl-12' : 'pr-12'}`}></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-24 relative z-10 animate-section" id="advantages">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -30 }}
          animate={isVisible.advantages ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8 }}
        >
          The SniperCoders Advantage
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/30 shadow-xl"
              initial={{ y: 50, opacity: 0 }}
              animate={isVisible.advantages ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{
                scale: 1.05,
                x: index % 2 === 0 ? 10 : -10,
                boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
              }}
            >
              <div className={`bg-gradient-to-br ${feature.color} p-4 rounded-xl inline-block mb-6 shadow-lg`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 py-24 relative z-10 animate-section" id="services">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent"
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
              className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-${service.borderColor}/10 shadow-lg`}
              initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
              animate={isVisible.services ? { x: 0, opacity: 1 } : { x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{
                scale: 1.05,
                x: index % 2 === 0 ? 10 : -10,
                boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
              }}
              onHoverStart={() => setHoverCard(index)}
              onHoverEnd={() => setHoverCard(null)}
            >
              <div className={`bg-gradient-to-br ${service.color} p-4 rounded-xl inline-block mb-6 shadow-lg`}>
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
              {hoverCard === index && (
                <motion.p
                  className="text-sm mt-2 text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  Explore More
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-24 relative z-10">
        <motion.div
          className="bg-gradient-to-r from-purple-600/90 to-teal-600/90 backdrop-blur-sm rounded-3xl p-16 text-center shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Ready for Mobile Excellence?
          </motion.h2>
          <motion.p
            className="text-xl text-white mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Craft an app that elevates your brand. Begin with a strategic consultation.
          </motion.p>
          <motion.button
            className="bg-white text-slate-900 font-bold py-4 px-8 rounded-xl flex items-center gap-3 mx-auto shadow-xl"
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255,255,255,0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Begin Your Mobile Transformation</span>
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-slate-900/80 backdrop-blur-sm pt-20 pb-10 relative z-10 border-t border-gray-800">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="text-2xl font-bold">
           
                <span className="bg-gradient-to-r  text-white">SniperCoders</span>
              </div>
            </div>
            <p className="text-gray-400">
              Transforming digital visions into precise, elegant mobile experiences.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Our Expertise</h3>
            <ul className="space-y-4">
              {['Enterprise Applications', 'Cross-Platform Development', 'Native Mobile Applications'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Company</h3>
            <ul className="space-y-4">
              {['About SniperCoders', 'Our Work', 'Privacy Policy', 'Join Our Team'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Resources</h3>
            <ul className="space-y-4">
              {['Development Blog', 'Case Studies', 'Client Testimonials', 'Tech Stack'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 mt-10 text-center text-gray-500">
          © 2025 SniperCoders. Delivering precision mobile excellence worldwide.
        </div>
      </footer> */}

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
     
                         { label: "IT Consulting", href: "/services/it-consulting" }, // Replaces Cloud Solutions
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
}










