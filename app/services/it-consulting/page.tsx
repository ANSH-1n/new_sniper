






"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Shield, Cloud, List, Server, Lock, Code, ArrowRight, CheckCircle } from 'lucide-react';

// Types
interface BubbleProps {
  positionX: number;
  positionY: number;
  size: number;
  speed: number;
  color: string;
}

// Navbar Component (emulating components/Navbar.tsx)
const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#', label: 'Home', active: true },
    { href: '#services', label: 'Services' },
    { href: '#methodology', label: 'Methodology' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center text-white">
              <Code className="text-blue-500 mr-2" size={28} />
              <span className="text-xl font-bold">
                Sniper<span className="text-blue-500">Coders</span>
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                  item.active ? 'text-blue-400' : 'text-gray-200 hover:text-blue-400'
                }`}
              >
                {item.label}
              </a>
            ))}
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105">
              Book Consultation
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-200 hover:text-white"
            >
              <List size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-gray-900 bg-opacity-95 backdrop-blur-md"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                    item.active
                      ? 'bg-blue-900 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700 px-2">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300">
                Book Consultation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 text-white">
   
      <Hero />
      <ConsultingMethodology />
      <ServiceOfferings />
      <WhyPartnerWithUs />
      <StatsSection />
      <CallToAction />
      <Footer />
      <BubbleBackground />
    </div>
  );
};

const BubbleBackground: React.FC = () => {
  const [bubbles, setBubbles] = useState<BubbleProps[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generateBubbles = () => {
      const newBubbles: BubbleProps[] = [];
      const colors = ['rgba(59, 130, 246, 0.2)', 'rgba(99, 102, 241, 0.15)', 'rgba(139, 92, 246, 0.1)'];

      for (let i = 0; i < 15; i++) {
        newBubbles.push({
          positionX: Math.random() * 100,
          positionY: Math.random() * 100,
          size: Math.random() * 150 + 50,
          speed: Math.random() * 50 + 20,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      setBubbles(newBubbles);
    };

    generateBubbles();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {bubbles.map((bubble, index) => (
        <motion.div
          key={index}
          className="rounded-full absolute"
          style={{
            backgroundColor: bubble.color,
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.positionX}%`,
            top: `${bubble.positionY}%`,
          }}
          animate={{
            y: [0, -bubble.speed, 0],
            x: [0, bubble.speed * 0.5, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 10 + bubble.speed / 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const Hero: React.FC = () => {
  return (
    <div className="relative pt-24 pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-900 text-blue-300">
              <Code size={16} className="mr-2" /> Transform Your Technology Strategy
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-6"
          >
            Strategic IT Leadership
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-3 max-w-2xl mx-auto md:mx-0 text-xl text-gray-300 sm:mt-5 mb-10"
          >
            Bridge the gap between business goals and technology execution with solutions
            that <span className="text-blue-400 font-medium">innovate</span>,
            <span className="text-purple-400 font-medium"> secure</span>, and
            <span className="text-cyan-400 font-medium"> accelerate</span> your digital future.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-5 max-w-md mx-auto md:mx-0 sm:flex sm:justify-center md:justify-start"
          >
            <div className="rounded-md shadow">
              <a
                href="#"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-all duration-300 transform hover:scale-105"
              >
                Get Started <ArrowRight className="ml-2" size={20} />
              </a>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <a
                href="#"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-blue-400 bg-gray-800 hover:bg-gray-700 md:py-4 md:text-lg md:px-10 transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const ConsultingMethodology: React.FC = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-white"
          >
            Our Consulting Methodology
          </motion.h2>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-700 z-0"></div>

          <div className="relative z-10">
            <TimelineItem
              number={1}
              title="Discovery Workshop"
              description="Comprehensive business technology analysis"
              isLeft={true}
            />

            <TimelineItem
              number={2}
              title="Gap Assessment"
              description="Identifying inefficiencies and opportunities"
              isLeft={false}
            />

            <TimelineItem
              number={3}
              title="Solution Design"
              description="Tailored roadmap development"
              isLeft={true}
            />

            <TimelineItem
              number={4}
              title="Implementation Support"
              description="Vendor management and deployment oversight"
              isLeft={false}
            />

            <TimelineItem
              number={5}
              title="Adoption Strategy"
              description="Change management and staff training"
              isLeft={true}
            />

            <TimelineItem
              number={6}
              title="Continuous Optimization"
              description="Quarterly reviews and strategy updates"
              isLeft={false}
              isLast={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineItem: React.FC<{
  number: number;
  title: string;
  description: string;
  isLeft: boolean;
  isLast?: boolean;
}> = ({ number, title, description, isLeft, isLast = false }) => {
  return (
    <div className={`mb-8 ${isLast ? '' : 'pb-8'} flex justify-center items-center`}>
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`w-5/12 ${isLeft ? 'text-right pr-8' : 'text-left pl-8'}`}
      >
        <div
          className={`${
            isLeft ? 'ml-auto' : 'mr-auto'
          } max-w-sm bg-gray-800 bg-opacity-60 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:scale-105`}
        >
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-gray-300">{description}</p>
        </div>
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

      <div className={`w-5/12 ${isLeft ? 'text-left pl-8' : 'text-right pr-8'}`}>
        {/* Empty section for layout */}
      </div>
    </div>
  );
};

const ServiceOfferings: React.FC = () => {
  return (
    <section className="py-16 bg-gray-900 bg-opacity-60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-white"
          >
            Our Services
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            icon={<List className="text-blue-400" size={24} />}
            title="IT Strategy Planning"
            description="Align technology initiatives with business objectives through comprehensive digital roadmaps."
            color="blue"
          />

          <ServiceCard
            icon={<Shield className="text-purple-400" size={24} />}
            title="Cybersecurity Audit"
            description="Enterprise-grade security assessments and vulnerability management solutions."
            color="purple"
          />

          <ServiceCard
            icon={<Cloud className="text-green-400" size={24} />}
            title="Cloud Migration"
            description="Seamless transition to AWS, Azure, and Google Cloud with optimized architecture."
            color="green"
          />

          <ServiceCard
            icon={<Code className="text-orange-400" size={24} />}
            title="Digital Transformation"
            description="End-to-end modernization of legacy systems and workflows."
            color="orange"
          />

          <ServiceCard
            icon={<Server className="text-red-400" size={24} />}
            title="IT Infrastructure Design"
            description="Future-proof network architecture and scalable system solutions."
            color="red"
          />

          <ServiceCard
            icon={<Lock className="text-indigo-400" size={24} />}
            title="Compliance Advisory"
            description="GDPR, HIPAA, and ISO 27001 compliance strategy implementation."
            color="indigo"
          />
        </div>
      </div>
    </section>
  );
};

const ServiceCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}> = ({ icon, title, description, color }) => {
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
      whileHover={{ y: -5 }}
      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700"
    >
      <div className={`h-2 bg-gradient-to-r ${gradientClass}`}></div>
      <div className="p-6">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};

const WhyPartnerWithUs: React.FC = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-white"
          >
            Why Partner With Us?
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Code className="text-blue-400" size={24} />}
            title="Certified Experts"
            description="AWS, Azure, Cisco, and PMP certified professionals"
          />

          <FeatureCard
            icon={<CheckCircle className="text-blue-400" size={24} />}
            title="Client-First Approach"
            description="Dedicated account managers and SLA guarantees"
          />

          <FeatureCard
            icon={<Shield className="text-blue-400" size={24} />}
            title="Vendor Neutral"
            description="Technology-agnostic recommendations"
          />

          <FeatureCard
            icon={<ArrowRight className="text-blue-400" size={24} />}
            title="ROI Focused"
            description="Clear metrics-driven success tracking"
          />
        </div>
      </div>
    </section>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 bg-opacity-50 rounded-xl p-6 backdrop-blur-sm border border-gray-700 hover:border-blue-500 transition-all duration-300"
    >
      <div className="flex flex-col items-center text-center">
        <div className="bg-blue-900 rounded-full p-3 mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};

const StatsSection: React.FC = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard number="200+" label="Enterprise Clients" />
          <StatCard number="98%" label="Client Retention" />
          <StatCard number="40%" label="Cost Reduction" />
        </div>
      </div>
    </section>
  );
};

const StatCard: React.FC<{ number: string; label: string }> = ({ number, label }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 bg-opacity-30 rounded-xl p-8 backdrop-blur-sm border border-gray-700 hover:border-blue-500 transition-all duration-300"
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

const CallToAction: React.FC = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 shadow-lg text-center relative z-10 overflow-hidden"
        >
          {/* Animated background bubbles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white opacity-10"
                style={{
                  width: Math.random() * 300 + 100,
                  height: Math.random() * 300 + 100,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: Math.random() * 10 + 10,
                }}
              />
            ))}
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Future-Proof Your IT?</h2>
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
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center text-white">
              <Code className="text-blue-500 mr-2" size={28} />
              <span className="text-xl font-bold">
                Sniper<span className="text-blue-500">Coders</span>
              </span>
            </div>
            <p className="mt-4 text-gray-400">
              At SniperCoders Global Technologies, we specialize in turning visionary ideas into reality.
              Our expertise in consulting helps businesses transform aspirations into tangible solutions,
              paving the way for future growth.
            </p>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Our Service</h3>
            <ul className="space-y-2">
              <FooterLink href="#">Custom Software Development</FooterLink>
              <FooterLink href="#">Website Development</FooterLink>
              <FooterLink href="#">Mobile App Development</FooterLink>
              <FooterLink href="#">IT Strategy Planning</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <FooterLink href="#">Terms of Service</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Refund Policy</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} SniperCoders Global Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <li>
    <a href={href} className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
      {children}
    </a>
  </li>
);

export default App;























