
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Shield, Cloud, List, Server, Lock, Code, ArrowRight, CheckCircle } from 'lucide-react';
import * as THREE from 'three';

// Types
interface TimelineItemProps {
  number: number;
  title: string;
  description: string;
  isLeft: boolean;
  isLast?: boolean;
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  onHover: () => void;
  onHoverEnd: () => void;
  isHovered: boolean;
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface StatCardProps {
  number: string;
  label: string;
}

// Animation variants
const textVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

// Navbar Component


// Main App Component
const App: React.FC = () => {
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
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  // Scroll-based animations
  const { scrollYProgress } = useScroll();
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.8]);
  // const headerScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);

  // Note: The IntersectionObserver and 'isVisible' state were removed
  // as Framer Motion's 'whileInView' handles visibility-triggered animations.

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 text-white overflow-hidden font-sans">
      {/* <Navbar /> */}
      {/* Three.js Canvas */}
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 opacity-30" style={{ opacity: backgroundOpacity.get() }} />
      {/* <Hero headerScale={headerScale} /> */}
      <ConsultingMethodology />
      <ServiceOfferings /> 
       <WhyPartnerWithUs />
      <StatsSection />
      <CallToAction />
      <Footer />
    </div>
  );
};

// Hero Component


// Consulting Methodology Component
const ConsultingMethodology: React.FC = () => {
  return (
    <section className="py-16 relative overflow-hidden animate-section" id="methodology">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-16"
        >
          Our Consulting Methodology
        </motion.h2>
        <div className="relative">
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-700 to-purple-700 z-0"
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />
          <div className="relative z-10">
            {[
              { number: 1, title: 'Discovery Workshop', description: 'Comprehensive business technology analysis', isLeft: true },
              { number: 2, title: 'Gap Assessment', description: 'Identifying inefficiencies and opportunities', isLeft: false },
              { number: 3, title: 'Solution Design', description: 'Tailored roadmap development', isLeft: true },
              { number: 4, title: 'Implementation Support', description: 'Vendor management and deployment oversight', isLeft: false },
              { number: 5, title: 'Adoption Strategy', description: 'Change management and staff training', isLeft: true },
              { number: 6, title: 'Continuous Optimization', description: 'Quarterly reviews and strategy updates', isLeft: false, isLast: true },
            ].map((item, index) => (
              <TimelineItem
                key={index}
                number={item.number}
                title={item.title}
                description={item.description}
                isLeft={item.isLeft}
                isLast={item.isLast}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Timeline Item Component
const TimelineItem: React.FC<TimelineItemProps> = ({ number, title, description, isLeft, isLast = false }) => {
  return (
    <div className={`mb-8 ${isLast ? '' : 'pb-8'} flex justify-center items-center`}>
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`w-5/12 ${isLeft ? 'text-right pr-8' : 'text-left pl-8'}`}
      >
        <motion.div
          className={`${
            isLeft ? 'ml-auto' : 'mr-auto'
          } max-w-sm bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300`}
          whileHover={{ scale: 1.05, x: isLeft ? -10 : 10 }}
        >
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-gray-300">{description}</p>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="z-20"
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold shadow-lg">
          {number}
        </div>
      </motion.div>
      <div className={`w-5/12 ${isLeft ? 'text-left pl-8' : 'text-right pr-8'}`} />
    </div>
  );
};

// Service Offerings Component
const ServiceOfferings: React.FC = () => {
  const [hoverCard, setHoverCard] = useState<number | null>(null);

  const services = [
    {
      icon: <List className="text-blue-400" size={24} />,
      title: 'IT Strategy Planning',
      description: 'Align technology initiatives with business objectives through comprehensive digital roadmaps.',
      color: 'blue',
    },
    {
      icon: <Shield className="text-purple-400" size={24} />,
      title: 'Cybersecurity Audit',
      description: 'Enterprise-grade security assessments and vulnerability management solutions.',
      color: 'purple',
    },
    {
      icon: <Cloud className="text-green-400" size={24} />,
      title: 'Cloud Migration',
      description: 'Seamless transition to AWS, Azure, and Google Cloud with optimized architecture.',
      color: 'green',
    },
    {
      icon: <Code className="text-orange-400" size={24} />,
      title: 'Digital Transformation',
      description: 'End-to-end modernization of legacy systems and workflows.',
      color: 'orange',
    },
    {
      icon: <Server className="text-red-400" size={24} />,
      title: 'IT Infrastructure Design',
      description: 'Future-proof network architecture and scalable system solutions.',
      color: 'red',
    },
    {
      icon: <Lock className="text-indigo-400" size={24} />,
      title: 'Compliance Advisory',
      description: 'GDPR, HIPAA, and ISO 27001 compliance strategy implementation.',
      color: 'indigo',
    },
  ];

  return (
    <section className="py-16 bg-gray-900/60 animate-section" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-16"
        >
          Our Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              color={service.color}
              onHover={() => setHoverCard(index)}
              onHoverEnd={() => setHoverCard(null)}
              isHovered={hoverCard === index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Service Card Component
const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  color,
  onHover,
  onHoverEnd,
  isHovered,
}) => {
  const colorMap: Record<string, string> = {
    blue: 'from-blue-500 to-blue-700',
    purple: 'from-purple-500 to-purple-700',
    green: 'from-green-500 to-green-700',
    orange: 'from-orange-500 to-orange-700',
    red: 'from-red-500 to-red-700',
    indigo: 'from-indigo-500 to-indigo-700',
  };

  const gradientClass = colorMap[color] || 'from-blue-500 to-blue-700';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -10,
        scale: 1.05,
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
        transition: { duration: 0.3 }
      }}
      onHoverStart={onHover}
      onHoverEnd={onHoverEnd}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300"
    >
      <div className={`h-2 bg-gradient-to-r ${gradientClass}`} />
      <div className="p-6">
        <motion.div
          className="mb-4"
          whileHover={{
            scale: 1.2,
            rotate: 10,
            transition: { duration: 0.3 }
          }}
        >
          {icon}
        </motion.div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
        {isHovered && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-sm mt-2 text-blue-400"
          >
            Explore More
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

// Why Partner With Us Component
const WhyPartnerWithUs: React.FC = () => {
  return (
    <section className="py-16 animate-section" id="why-partner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-16"
        >
          Why Partner With Us?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Code className="text-blue-400" size={24} />,
              title: 'Certified Experts',
              description: 'AWS, Azure, Cisco, and PMP certified professionals',
            },
            {
              icon: <CheckCircle className="text-blue-400" size={24} />,
              title: 'Client-First Approach',
              description: 'Dedicated account managers and SLA guarantees',
            },
            {
              icon: <Shield className="text-blue-400" size={24} />,
              title: 'Vendor Neutral',
              description: 'Technology-agnostic recommendations',
            },
            {
              icon: <ArrowRight className="text-blue-400" size={24} />,
              title: 'ROI Focused',
              description: 'Clear metrics-driven success tracking',
            },
          ].map((feature, index) => (
            <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Feature Card Component
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.05,
        y: -10,
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
        transition: { duration: 0.3 }
      }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300"
    >
      <div className="flex flex-col items-center text-center">
        <motion.div
          className="bg-blue-900 rounded-full p-3 mb-4"
          whileHover={{
            scale: 1.2,
            rotate: 10,
            transition: { duration: 0.3 }
          }}
        >
          {icon}
        </motion.div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};

// Stats Section Component
const StatsSection: React.FC = () => {
  return (
    <section className="py-16 animate-section" id="stats">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: '200+', label: 'Enterprise Clients' },
            { number: '98%', label: 'Client Retention' },
            { number: '40%', label: 'Cost Reduction' },
          ].map((stat, index) => (
            <StatCard key={index} number={stat.number} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Stat Card Component
const StatCard: React.FC<StatCardProps> = ({ number, label }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-blue-500 transition-all duration-300"
    >
      <div className="text-center">
        <motion.p
          initial={{ scale: 0.5 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl font-bold text-blue-400 mb-2"
        >
          {number}
        </motion.p>
        <p className="text-gray-300">{label}</p>
      </div>
    </motion.div>
  );
};

// Call to Action Component
const CallToAction: React.FC = () => {
  return (
    <section className="py-16 relative overflow-hidden animate-section" id="cta">
      <div className="max-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 shadow-lg text-center relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Future-Proof Your IT?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Schedule a free technology assessment and discover your digital potential!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center mx-auto"
          >
            Book Free Consultation <ChevronRight className="ml-2" size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

// Footer Component
const Footer: React.FC = () => {
  return (
    <footer className="relative z-20 bg-gray-950/70 backdrop-blur-lg border-t border-gray-800/50 text-white py-16 mt-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <motion.div variants={textVariants} initial="initial" animate="animate">
            <div className="flex items-center mb-6">
              <div className="text-3xl font-extrabold">
                <span className="bg-clip-text bg-gradient-to-r text-white animate-gradient">SniperCoders</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              We specialize in turning visionary ideas into reality. Our expertise helps businesses transform aspirations
              into tangible solutions, paving the way for future growth.
            </p>
          </motion.div>

          {[
            {
              title: 'Our Services',
              items: [
                { label: 'Custom Software Dev', href: '/services/custom-software-development' },
                { label: 'Website Development', href: '/services/web-development' },
                { label: 'Mobile App Development', href: '/services/mobile-development' },
                { label: 'IT Consulting', href: '/services/it-consulting' },
              ],
            },
            {
              title: 'Useful Links',
              items: [
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Refund Policy', href: '/refund' },
              ],
            },
            {
              title: 'Get In Touch',
              items: [
                { label: 'About Us', href: '/about' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'FAQs', href: '/faqs' },
                { label: 'Testimonials', href: '/showcase' },
              ],
            },
          ].map((section, idx) => (
            <motion.div key={idx} variants={textVariants} initial="initial" animate="animate">
              <h3 className="text-lg font-semibold mb-6 text-gray-200">{section.title}</h3>
              <ul className="space-y-3">
                {section.items.map((item, i) => (
                  <motion.li key={i} whileHover={{ x: 8 }} transition={{ duration: 0.3 }}>
                    <a href={item.href} className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
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
          © {new Date().getFullYear()} SniperCoders Global Technologies. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
};

export default App;
