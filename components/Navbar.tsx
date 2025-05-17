
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [openedByClick, setOpenedByClick] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
        setOpenedByClick(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Three.js background animation setup
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Materials - Brighter color for better visibility on dark backgrounds
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.008,
      color: 0x00ffff, // Brighter teal color for better visibility
      transparent: true,
      opacity: 0.8,
    });
    
    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 2;
    
    // Animation
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX / window.innerWidth - 0.5;
      mouseY = event.clientY / window.innerHeight - 0.5;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate particles
      particlesMesh.rotation.y += 0.001;
      particlesMesh.rotation.x += 0.0005;
      
      // Follow mouse with slight delay
      particlesMesh.rotation.x += mouseY * 0.001;
      particlesMesh.rotation.y += mouseX * 0.001;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      scene.remove(particlesMesh);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services', hasDropdown: true },
    { name: 'Ai-Agents', href: '/agents' },
    { name: 'Showcase', href: '/showcase' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const serviceItems = [
    { name: 'Web Development', href: '/services/web-development' },
    { name: 'Mobile App Development', href: '/services/mobile-development' },
    { name: 'Digital Marketing', href: '/services/digital-marketing' },
    { name: 'Custom Software Development', href: '/services/custom-software-development' },
    { name: 'IT Consulting & Digital Transformation', href: '/services/it-consulting' },
  ];

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, transition: { duration: 0.3, ease: 'easeInOut' } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: 'easeInOut' } },
  };

  const handleArrowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsServicesOpen(!isServicesOpen);
    setOpenedByClick(!isServicesOpen);
  };

  const handleServiceHover = () => {
    setIsServicesOpen(true);
    setOpenedByClick(false);
  };

  const handleServiceLeave = () => {
    if (!openedByClick) {
      setIsServicesOpen(false);
    }
  };

  return (
    <>
      {/* Three.js Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full z-10 pointer-events-none"
      />
      
      <header 
        className={`py-4 fixed top-0 w-full z-20 shadow-md transition-all duration-300 
                   ${scrolled ? 'bg-black/70' : 'bg-black/40'} backdrop-blur-md`}
      >
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center z-20">
            <Link href="/" className="flex items-center">
              <Image 
                src="/images/logo.png" 
                alt="SniperCoders Technologies" 
                width={45} 
                height={45} 
                className="mr-3" 
              />
              <span className="text-lg font-bold text-white">SniperCoders</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-6 items-center">
            {navItems.map((item) => (
              <div key={item.name} className="relative" ref={item.hasDropdown ? dropdownRef : undefined}>
                <div className="flex items-center group">
                  <Link
                    href={item.href}
                    className="uppercase px-3 py-2 text-white hover:text-teal-300 transition-all font-medium tracking-wide relative"
                    onMouseEnter={() => item.hasDropdown && handleServiceHover()}
                    onMouseLeave={() => item.hasDropdown && handleServiceLeave()}
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-300 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                  {item.hasDropdown && (
                    <button
                      onClick={handleArrowClick}
                      className="text-white hover:text-teal-300 transition-all ml-1 focus:outline-none"
                      aria-label="Toggle services dropdown"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        style={{ transform: isServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}
                </div>
                {item.hasDropdown && isServicesOpen && (
                  <AnimatePresence>
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute left-0 mt-2 w-64 rounded-lg shadow-xl py-2 z-30 bg-black/80 backdrop-blur-lg border border-teal-900/30"
                      onMouseEnter={handleServiceHover}
                      onMouseLeave={handleServiceLeave}
                    >
                      {serviceItems.map((service) => (
                        <div key={service.name} className="relative group">
                          <Link
                            href={service.href}
                            className="block px-4 py-3 text-white hover:bg-teal-900/50 transition-all relative overflow-hidden"
                            onClick={() => {
                              setIsServicesOpen(false);
                              setOpenedByClick(false);
                            }}
                          >
                            <span className="relative z-10">{service.name}</span>
                            <span className="absolute inset-0 w-0 bg-teal-800/40 group-hover:w-full transition-all duration-300 -z-0"></span>
                          </Link>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden focus:outline-none text-white z-30"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden w-full bg-black/90 backdrop-blur-md z-40 shadow-lg"
            >
              <div className="container mx-auto px-4 py-2">
                <ul className="flex flex-col space-y-1">
                  {navItems.map((item) => (
                    <li key={item.name} className="border-b border-gray-800/50 last:border-0">
                      {item.hasDropdown ? (
                        <>
                          <div className="flex justify-between items-center py-3">
                            <Link
                              href={item.href}
                              className="uppercase text-white hover:text-teal-300 font-medium w-full"
                              onClick={() => setIsOpen(false)}
                            >
                              {item.name}
                            </Link>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                setIsServicesOpen(!isServicesOpen);
                              }}
                              className="text-white p-2 focus:outline-none"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                style={{ transform: isServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                          <AnimatePresence>
                            {isServicesOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-teal-900/20 rounded-md mb-2"
                              >
                                {serviceItems.map((service) => (
                                  <Link
                                    key={service.name}
                                    href={service.href}
                                    className="block py-3 px-4 text-sm text-white hover:bg-teal-800/30 transition-all"
                                    onClick={() => {
                                      setIsOpen(false);
                                      setIsServicesOpen(false);
                                    }}
                                  >
                                    {service.name}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className="block uppercase py-3 text-white hover:text-teal-300 font-medium"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
















