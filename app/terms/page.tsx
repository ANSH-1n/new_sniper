

"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import * as THREE from 'three';
import { motion, useScroll, useTransform } from 'framer-motion';

// Define proper type for threeRef
interface ThreeRefType {
  cleanup: () => void;
}

const TermsOfService = () => {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const threeRef = useRef<ThreeRefType | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax and animation transforms
  const bgTransform = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0.2, 1, 0.2]);

  // Enhanced Three.js animation
  useEffect(() => {
    setMounted(true);
    
    if (canvasRef.current && !threeRef.current) {
      // Scene setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      
      renderer.setSize(window.innerWidth, 400);
      renderer.setClearColor(0x000000, 0);
      canvasRef.current.appendChild(renderer.domElement);
      
      // Create particle system
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 2000;
      
      const positionArray = new Float32Array(particlesCount * 3);
      const colorArray = new Float32Array(particlesCount * 3);
      
      for (let i = 0; i < particlesCount * 3; i++) {
        positionArray[i] = (Math.random() - 0.5) * 20;
        colorArray[i] = Math.random() * 0.5 + 0.5; // Varying intensity
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
      particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
      
      // Load a texture for glowing particles
      const textureLoader = new THREE.TextureLoader();
      const particleTexture = textureLoader.load(
        'https://threejsfundamentals.org/threejs/resources/images/star.png'
      );
      
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.8,
        map: particleTexture,
        sizeAttenuation: true,
      });
      
      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);
      
      // Add point light for glow effect
      const pointLight = new THREE.PointLight(0x00ffff, 1, 20);
      pointLight.position.set(0, 0, 5);
      scene.add(pointLight);
      
      camera.position.z = 5;
      
      // Animation
      const animate = () => {
        requestAnimationFrame(animate);
        
        // Particle rotation
        particlesMesh.rotation.y += 0.0015;
        particlesMesh.rotation.x += 0.0008;
        particlesMesh.rotation.z += 0.0005;
        
        // Pulsing effect
        particlesMesh.scale.x = 1 + Math.sin(Date.now() * 0.001) * 0.02;
        particlesMesh.scale.y = 1 + Math.cos(Date.now() * 0.001) * 0.02;
        
        renderer.render(scene, camera);
      };
      
      animate();
      
      // Handle resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / 400;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, 400);
      };
      
      window.addEventListener('resize', handleResize);
      
      threeRef.current = {
        cleanup: () => {
          window.removeEventListener('resize', handleResize);
          if (canvasRef.current && renderer.domElement.parentNode === canvasRef.current) {
            canvasRef.current.removeChild(renderer.domElement);
          }
          scene.remove(particlesMesh);
          particlesGeometry.dispose();
          particlesMaterial.dispose();
          renderer.dispose();
        }
      };
    }

    return () => {
      if (threeRef.current) {
        threeRef.current.cleanup();
        threeRef.current = null; // Ensure it's cleaned up for next render if needed
      }
    };
  }, []);

  // Function to scroll to section when sidebar link is clicked
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!mounted) return null;

  const textVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: 'easeOut' 
      } 
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  const hoverVariants = {
    hover: { scale: 1.05, color: '#60A5FA', transition: { duration: 0.3 } },
  };

  return (
    <div 
      ref={containerRef}
      className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 min-h-screen relative overflow-hidden"
    >
      {/* Parallax Three.js animation container */}
      <motion.div 
        ref={canvasRef} 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '400px',
          pointerEvents: 'none',
          opacity: 0.3,
          y: bgTransform
        }}
        className="z-0"
      />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.header 
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Terms of Service
          </motion.h1>
          <motion.p 
            className="text-gray-300 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Welcome to SniperCoders. Please review our Terms of Service to understand the
            guidelines and policies governing the use of our services and solutions.
          </motion.p>
          
          <div className="flex text-sm mt-4">
            <Link href="/" className="text-gray-400 hover:text-blue-400 transition-colors">
              Home
            </Link>
            <span className="mx-2 text-gray-500">›</span>
            <span className="text-blue-400">Terms of Service</span>
          </div>
        </motion.header>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar/Contents */}
          <motion.aside 
            className="md:w-64 flex-shrink-0"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="sticky top-8 bg-gray-800/50 backdrop-blur-lg p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-blue-400 mb-4">Contents</h3>
              <nav className="space-y-3">
                {['Introduction', 'Eligibility', 'Account Registration', 'Services', 
                  'User Responsibilities', 'Fees And Payment', 'Intellectual Property', 
                  'Confidentiality', 'Term And Termination', 'Warranty Disclaimer', 
                  'Limitation Of Liability', 'Indemnification', 'Governing Law And Jurisdiction', 
                  'Dispute Resolution', 'Severability', 'Entire Agreement', 'Waiver', 
                  'Assignment', 'Notices', 'Changes To Terms Of Service', 'Contact Information'].map((item) => (
                  <motion.div 
                    key={item} 
                    className="text-sm"
                    whileHover="hover"
                    variants={hoverVariants}
                  >
                    <button 
                      onClick={() => scrollToSection(item.toLowerCase().replace(/\s+/g, '-'))}
                      className="block text-gray-300 py-2 px-3 rounded-lg hover:bg-gray-700/50 transition-colors w-full text-left"
                    >
                      {item}
                    </button>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.aside>

          {/* Main Content with Scroll-Driven Opacity */}
          <motion.main 
            className="flex-1 bg-gray-800/30 backdrop-blur-lg p-8 rounded-lg shadow-xl"
            style={{ opacity: sectionOpacity }}
          >
            <section id="introduction" className="mb-12">
              <motion.h2 
                className="text-2xl font-semibold text-blue-400 mb-4"
                whileInView={{ opacity: [0, 1], y: [-20, 0] }}
                transition={{ duration: 0.5 }}
              >
                1. Introduction
              </motion.h2>
              <p className="text-gray-300">
                These Terms of Service ({'"Terms"'}) govern your use of the services provided by SniperCoders. By accessing or using our services, you agree to be bound by these Terms.
              </p>
            </section>

            <section id="eligibility" className="mb-12">
              <motion.h2 
                className="text-2xl font-semibold text-blue-400 mb-4"
                whileInView={{ opacity: [0, 1], y: [-20, 0] }}
                transition={{ duration: 0.5 }}
              >
                2. Eligibility
              </motion.h2>
              <p className="text-gray-300">
                You must be at least 18 years of age to use our services. By agreeing to these Terms, you represent that you meet this eligibility requirement.
              </p>
            </section>

            <section id="account-registration" className="mb-12">
              <motion.h2 
                className="text-2xl font-semibold text-blue-400 mb-4"
                whileInView={{ opacity: [0, 1], y: [-20, 0] }}
                transition={{ duration: 0.5 }}
              >
                3. Account Registration
              </motion.h2>
              <p className="text-gray-300">
                To access certain services, you may need to register for an account. You agree to provide accurate information during registration and to keep your account information updated.
              </p>
            </section>

            <section id="services" className="mb-12">
              <motion.h2 
                className="text-2xl font-semibold text-blue-400 mb-4"
                whileInView={{ opacity: [0, 1], y: [-20, 0] }}
                transition={{ duration: 0.5 }}
              >
                4. Services
              </motion.h2>
              <p className="text-gray-300">
                SniperCoders provides software development, web design, mobile app development, and IT consulting services. The specifics of each service will be outlined in separate agreements.
              </p>
            </section>

            <section id="user-responsibilities" className="mb-12">
              <motion.h2 
                className="text-2xl font-semibold text-blue-400 mb-4"
                whileInView={{ opacity: [0, 1], y: [-20, 0] }}
                transition={{ duration: 0.5 }}
              >
                5. User Responsibilities
              </motion.h2>
              <p className="text-gray-300">
                You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.
              </p>
            </section>

            <section id="fees-and-payment" className="mb-12">
              <motion.h2 
                className="text-2xl font-semibold text-blue-400 mb-4"
                whileInView={{ opacity: [0, 1], y: [-20, 0] }}
                transition={{ duration: 0.5 }}
              >
                6. Fees And Payment
              </motion.h2>
              <p className="text-gray-300">
                Fees for our services will be specified in your service agreement. Payments are due as per the agreed-upon schedule.
              </p>
            </section>

            <section id="intellectual-property" className="mb-12">
              <motion.h2 
                className="text-2xl font-semibold text-blue-400 mb-4"
                whileInView={{ opacity: [0, 1], y: [-20, 0] }}
                transition={{ duration: 0.5 }}
              >
                7. Intellectual Property
              </motion.h2>
              <p className="text-gray-300">
                All intellectual property rights in the services and deliverables provided by SniperCoders remain our property unless otherwise agreed in writing.
              </p>
            </section>

            <section id="confidentiality" className="mb-12">
              <motion.h2 
                className="text-2xl font-semibold text-blue-400 mb-4"
                whileInView={{ opacity: [0, 1], y: [-20, 0] }}
                transition={{ duration: 0.5 }}
              >
                8. Confidentiality
              </motion.h2>
              <p className="text-gray-300">
                Both parties agree to maintain the confidentiality of any proprietary or sensitive information shared during the engagement.
              </p>
            </section>

            <section id="term-and-termination" className="mb-12">
              <motion.h2 
                className="text-2xl font-semibold text-blue-400 mb-4"
                whileInView={{ opacity: [0, 1], y: [-20, 0] }}
                transition={{ duration: 0.5 }}
              >
                9. Term And Termination
              </motion.h2>
              <p className="text-gray-300">
                These Terms are effective until terminated. Either party may terminate the agreement with written notice if the other party breaches these Terms.
              </p>
            </section>

            <section id="warranty-disclaimer" className="mb-12">
              <motion.h2 
                className="text-2xl font-semibold text-blue-400 mb-4"
                whileInView={{ opacity: [0, 1], y: [-20, 0] }}
                transition={{ duration: 0.5 }}
              >
                10. Warranty Disclaimer
              </motion.h2>
              {/* <p className="text-gray-300">
                Our services are provided "as is" without any warranties, express or implied, except as specified in a service agreement.
              </p> */}

              <p className="text-gray-300">
  Our services are provided &quot;as is&quot; without any warranties, express or implied, except as specified in a service agreement.
</p>

            </section>

            <section id="limitation-of-liability" className="mb-12">
              <motion.h2 
                className="text-2xl font-semibold text-blue-400 mb-4"
                whileInView={{ opacity: [0, 1], y: [-20, 0] }}
                transition={{ duration: 0.5 }}
              >
                11. Limitation Of Liability
              </motion.h2>
              <p className="text-gray-300">
                SniperCoders shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.
              </p>
            </section>

            <section id="indemnification" className="mb-12">
              <motion.h2 
                className="text-2xl font-semibold text-blue-400 mb-4"
                whileInView={{ opacity: [0, 1], y: [-20, 0] }}
                transition={{ duration: 0.5 }}
              >
                12. Indemnification
              </motion.h2>
              <p className="text-gray-300">
                You agree to indemnify SniperCoders against any claims arising from your use of our services.
              </p>
            </section>

            <section id="governing-law-and-jurisdiction" className="mb-12">
              <motion.h2 
                className="text-2xl font-semibold text-blue-400 mb-4"
                whileInView={{ opacity: [0, 1], y: [-20, 0] }}
                transition={{ duration: 0.5 }}
              >
                13. Governing Law And Jurisdiction
              </motion.h2>
              <p className="text-gray-300">
                These Terms are governed by local and national legal frameworks.
              </p>
            </section>

            <section id="dispute-resolution" className="mb-12">
              <motion.h2 
                className="text-2xl font-semibold text-blue-400 mb-4"
                whileInView={{ opacity: [0, 1], y: [-20, 0] }}
                transition={{ duration: 0.5 }}
              >
                14. Dispute Resolution
              </motion.h2>
              <p className="text-gray-300">
                Disputes will be resolved through mediation before proceeding to legal action, as per local laws.
              </p>
            </section>

            <section id="severability" className="mb-12">
              <motion.h2 
                className="text-2xl font-semibold text-blue-400 mb-4"
                whileInView={{ opacity: [0, 1], y: [-20, 0] }}
                transition={{ duration: 0.5 }}
              >
                15. Severability
              </motion.h2>
              <p className="text-gray-300">
                If any provision of these Terms is found to be invalid, the remaining provisions will remain in effect.
              </p>
            </section>

            <section id="entire-agreement" className="mb-12">
              <motion.h2 
                className="text-2xl font-semibold text-blue-400 mb-4"
                whileInView={{ opacity: [0, 1], y: [-20, 0] }}
                transition={{ duration: 0.5 }}
              >
                16. Entire Agreement
              </motion.h2>
              <p className="text-gray-300">
                These Terms constitute the entire agreement between you and SniperCoders regarding the use of our services.
              </p>
            </section>

            <section id="waiver" className="mb-12">
              <motion.h2 
                className="text-2xl font-semibold text-blue-400 mb-4"
                whileInView={{ opacity: [0, 1], y: [-20, 0] }}
                transition={{ duration: 0.5 }}
              >
                17. Waiver
              </motion.h2>
              <p className="text-gray-300">
                No waiver of any term will be deemed a further or continuing waiver of such term.
              </p>
            </section>

            <section id="assignment" className="mb-12">
              <motion.h2 
                className="text-2xl font-semibold text-blue-400 mb-4"
                whileInView={{ opacity: [0, 1], y: [-20, 0] }}
                transition={{ duration: 0.5 }}
              >
                18. Assignment
              </motion.h2>
              <p className="text-gray-300">
                You may not assign your rights under these Terms without our prior written consent.
              </p>
            </section>

            <section id="notices" className="mb-12">
              <motion.h2 
                className="text-2xl font-semibold text-blue-400 mb-4"
                whileInView={{ opacity: [0, 1], y: [-20, 0] }}
                transition={{ duration: 0.5 }}
              >
                19. Notices
              </motion.h2>
              <p className="text-gray-300">
                Notices will be sent to the email address provided during registration.
              </p>
            </section>

            <section id="changes-to-terms-of-service" className="mb-12">
              <motion.h2 
                className="text-2xl font-semibold text-blue-400 mb-4"
                whileInView={{ opacity: [0, 1], y: [-20, 0] }}
                transition={{ duration: 0.5 }}
              >
                20. Changes To Terms Of Service
              </motion.h2>
              <p className="text-gray-300">
                We may update these Terms from time to time. The latest version will be available on our website.
              </p>
            </section>

            <section id="contact-information" className="mb-12">
              <motion.h2 
                className="text-2xl font-semibold text-blue-400 mb-4"
                whileInView={{ opacity: [0, 1], y: [-20, 0] }}
                transition={{ duration: 0.5 }}
              >
                21. Contact Information
              </motion.h2>
              <p className="mb-4 text-gray-300">For any questions regarding these Terms:</p>
              <div className="bg-gray-700/50 p-6 rounded-lg shadow-lg">
                <p className="mb-2 text-gray-300">
                  <strong>Email:</strong> <a href="mailto:snipercoders25@gmail.com" className="text-blue-400 hover:underline">snipercoders25@gmail.com</a>
                </p>
              </div>
            </section>
          </motion.main>
        </div>
      </div>

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
                  { label: "Custom Software Dev", href: "/services/custom-software-development" },
                  { label: "Website Development", href: "/services/web-development" },
                  { label: "Mobile App Development", href: "/services/mobile-development" },
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
                      whileHover={{ scale: 1.1, color: '#60A5FA' }}
                      transition={{ duration: 0.3 }}
                    >
                      <a
                        href={item.href}
                        className="text-gray-300 text-sm transition-colors"
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
            © {new Date().getFullYear()} SniperCoders. All rights reserved.
          </motion.div>
        </div>
      </footer>

      {/* CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default TermsOfService;