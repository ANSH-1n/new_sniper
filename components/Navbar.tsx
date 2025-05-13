

// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import * as THREE from 'three';

// interface NavbarProps {
//   isDarkTheme: boolean;
//   setIsDarkTheme: (value: boolean) => void;
// }

// export default function Navbar({ isDarkTheme, setIsDarkTheme }: NavbarProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isServicesOpen, setIsServicesOpen] = useState(false);
//   const [openedByClick, setOpenedByClick] = useState(false);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
  
//   // Three.js background animation setup
//   useEffect(() => {
//     if (!canvasRef.current) return;
    
//     // Create scene, camera, and renderer
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({
//       canvas: canvasRef.current,
//       alpha: true,
//       antialias: true
//     });
    
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
//     // Create particles
//     const particlesGeometry = new THREE.BufferGeometry();
//     const particlesCount = 500;
    
//     const posArray = new Float32Array(particlesCount * 3);
    
//     for (let i = 0; i < particlesCount * 3; i++) {
//       posArray[i] = (Math.random() - 0.5) * 5;
//     }
    
//     particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
//     // Materials
//     const particlesMaterial = new THREE.PointsMaterial({
//       size: 0.005,
//       color: isDarkTheme ? 0x00ffaa : 0x0066cc,
//     });
    
//     // Mesh
//     const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
//     scene.add(particlesMesh);
    
//     camera.position.z = 2;
    
//     // Animation
//     let mouseX = 0;
//     let mouseY = 0;
    
//     const handleMouseMove = (event: MouseEvent) => {
//       mouseX = event.clientX / window.innerWidth - 0.5;
//       mouseY = event.clientY / window.innerHeight - 0.5;
//     };
    
//     window.addEventListener('mousemove', handleMouseMove);
    
//     // Handle resize
//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };
    
//     window.addEventListener('resize', handleResize);
    
//     // Animation loop
//     const animate = () => {
//       requestAnimationFrame(animate);
      
//       // Rotate particles
//       particlesMesh.rotation.y += 0.001;
//       particlesMesh.rotation.x += 0.0005;
      
//       // Follow mouse with slight delay
//       particlesMesh.rotation.x += mouseY * 0.001;
//       particlesMesh.rotation.y += mouseX * 0.001;
      
//       renderer.render(scene, camera);
//     };
    
//     animate();
    
//     // Cleanup
//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('resize', handleResize);
//       scene.remove(particlesMesh);
//       particlesGeometry.dispose();
//       particlesMaterial.dispose();
//       renderer.dispose();
//     };
//   }, [isDarkTheme]);

//   const navItems = [
//     { name: 'Home', href: '/' },
//     { name: 'Services', href: '/services', hasDropdown: true },
//     { name: 'Ai-Agents', href: '/agents' },
//     { name: 'Showcase', href: '/showcase' },
//     { name: 'About Us', href: '/about' },
//     { name: 'Contact', href: '/contact' },
//   ];

//   const serviceItems = [
//     { name: 'Web Development', href: '/services/web-development' },
//     { name: 'Mobile App Development', href: '/services/mobile-development' },
//     { name: 'Digital Marketing', href: '/services/digital-marketing' },
//     { name: 'Custom Software Development', href: '/services/custom-software-development' },
//     { name: 'IT Consulting & Digital Transformation', href: '/services/it-consulting' },
//   ];

//   const dropdownVariants = {
//     hidden: { opacity: 0, y: -10, transition: { duration: 0.3, ease: 'easeInOut' } },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
//     exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: 'easeInOut' } },
//   };

//   const handleArrowClick = () => {
//     setIsServicesOpen(!isServicesOpen);
//     setOpenedByClick(!isServicesOpen); // Track if opened by click
//   };

//   const handleServiceHover = () => {
//     setIsServicesOpen(true);
//     setOpenedByClick(false); // Hover overrides click state
//   };

//   const handleServiceLeave = () => {
//     if (!openedByClick) {
//       setIsServicesOpen(false); // Close only if not opened by click
//     }
//   };

//   return (
//     <>
//       {/* Three.js Background Canvas */}
//       <canvas 
//         ref={canvasRef} 
//         className="fixed top-0 left-0 w-full h-full z-10 pointer-events-none"
//       />
      
//       <header
//         className={`${
//           isDarkTheme ? 'bg-gray-900 bg-opacity-80 text-white' : 'bg-white bg-opacity-80 text-gray-900'
//         } py-4 fixed top-0 w-full z-20 shadow-md transition-all duration-300 backdrop-blur-sm`}
//       >
//         <nav className="container mx-auto flex justify-between items-center px-4">
//           <div className="flex items-center">
//             <Image src="/images/logo.png" alt="SniperCoders Technologies" width={40} height={40} className="mr-2" />
//             <span className="text-lg font-semibold">SniperCoders</span>
//           </div>
//           <div className="hidden md:flex space-x-6 items-center">
//             {navItems.map((item) => (
//               <div key={item.name} className="relative">
//                 <div className="flex items-center">
//                   <Link
//                     href={item.href}
//                     className={`${
//                       isDarkTheme ? 'text-white' : 'text-gray-900'
//                     } uppercase px-3 py-2 hover:text-teal-300 transition-all`}
//                     onMouseEnter={() => item.hasDropdown && handleServiceHover()}
//                     onMouseLeave={() => item.hasDropdown && handleServiceLeave()}
//                   >
//                     {item.name}
//                   </Link>
//                   {item.hasDropdown && (
//                     <button
//                       onClick={handleArrowClick}
//                       className={`${
//                         isDarkTheme ? 'text-white' : 'text-gray-900'
//                       } hover:text-teal-300 transition-all ml-1 focus:outline-none`}
//                       aria-label="Toggle services dropdown"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-5 w-5"
//                         viewBox="0 0 20 20"
//                         fill="currentColor"
//                         style={{ transform: isServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     </button>
//                   )}
//                 </div>
//                 {item.hasDropdown && isServicesOpen && (
//                   <AnimatePresence>
//                     <motion.ul
//                       variants={dropdownVariants}
//                       initial="hidden"
//                       animate="visible"
//                       exit="exit"
//                       className={`${
//                         isDarkTheme ? 'bg-gray-900' : 'bg-white'
//                       } absolute left-0 mt-2 w-64 rounded-lg shadow-lg py-2 ${
//                         isDarkTheme ? 'text-white' : 'text-gray-900'
//                       } z-30`}
//                       onMouseEnter={handleServiceHover}
//                       onMouseLeave={handleServiceLeave}
//                     >
//                       {serviceItems.map((service) => (
//                         <li key={service.name}>
//                           <Link
//                             href={service.href}
//                             className={`${
//                               isDarkTheme ? 'text-white' : 'text-gray-900'
//                             } block px-4 py-2 hover:bg-teal-700 hover:text-white transition-all`}
//                             onClick={() => {
//                               setIsServicesOpen(false);
//                               setOpenedByClick(false);
//                             }}
//                           >
//                             {service.name}
//                           </Link>
//                         </li>
//                       ))}
//                     </motion.ul>
//                   </AnimatePresence>
//                 )}
//               </div>
//             ))}
//           </div>
//           <button
//             className="md:hidden focus:outline-none"
//             onClick={() => setIsOpen(!isOpen)}
//             aria-label="Toggle mobile menu"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               className={`w-6 h-6 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
//               />
//             </svg>
//           </button>
//         </nav>
//         <AnimatePresence>
//           {isOpen && (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className={`${
//                 isDarkTheme ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
//               } md:hidden absolute top-16 left-0 w-full z-10 shadow-md`}
//             >
//               <ul className="flex flex-col items-center space-y-4 py-4">
//                 {navItems.map((item) => (
//                   <li key={item.name} className="w-full text-center">
//                     <div className="relative">
//                       <div className="flex items-center justify-center">
//                         <Link
//                           href={item.href}
//                           className={`${
//                             isDarkTheme ? 'text-white' : 'text-gray-900'
//                           } uppercase px-3 py-2 hover:text-teal-300 transition-all`}
//                           onClick={() => setIsOpen(false)}
//                         >
//                           {item.name}
//                         </Link>
//                         {item.hasDropdown && (
//                           <button
//                             onClick={handleArrowClick}
//                             className={`${
//                               isDarkTheme ? 'text-white' : 'text-gray-900'
//                             } hover:text-teal-300 transition-all ml-1 focus:outline-none`}
//                             aria-label="Toggle services dropdown"
//                           >
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               className="h-5 w-5"
//                               viewBox="0 0 20 20"
//                               fill="currentColor"
//                               style={{ transform: isServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
//                             >
//                               <path
//                                 fillRule="evenodd"
//                                 d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                                 clipRule="evenodd"
//                               />
//                             </svg>
//                           </button>
//                         )}
//                       </div>
//                       {item.hasDropdown && isServicesOpen && (
//                         <motion.ul
//                           variants={dropdownVariants}
//                           initial="hidden"
//                           animate="visible"
//                           exit="exit"
//                           className={`${
//                             isDarkTheme ? 'bg-gray-900' : 'bg-white'
//                           } w-full py-2 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}
//                         >
//                           {serviceItems.map((service) => (
//                             <li key={service.name}>
//                               <Link
//                                 href={service.href}
//                                 className={`${
//                                   isDarkTheme ? 'text-white' : 'text-gray-900'
//                                 } block px-4 py-2 hover:bg-teal-700 hover:text-white transition-all`}
//                                 onClick={() => {
//                                   setIsOpen(false);
//                                   setIsServicesOpen(false);
//                                   setOpenedByClick(false);
//                                 }}
//                               >
//                                 {service.name}
//                               </Link>
//                             </li>
//                           ))}
//                         </motion.ul>
//                       )}
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </header>
//     </>
//   );
// }















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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
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
    
    // Materials
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0x0066cc, // Removed theme-based color
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

  const handleArrowClick = () => {
    setIsServicesOpen(!isServicesOpen);
    setOpenedByClick(!isServicesOpen); // Track if opened by click
  };

  const handleServiceHover = () => {
    setIsServicesOpen(true);
    setOpenedByClick(false); // Hover overrides click state
  };

  const handleServiceLeave = () => {
    if (!openedByClick) {
      setIsServicesOpen(false); // Close only if not opened by click
    }
  };

  return (
    <>
      {/* Three.js Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full z-10 pointer-events-none"
      />
      
      <header className="py-4 fixed top-0 w-full z-20 shadow-md transition-all duration-300 backdrop-blur-sm">
        <nav className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center">
            <Image src="/images/logo.png" alt="SniperCoders Technologies" width={40} height={40} className="mr-2" />
            <span className="text-lg font-semibold">SniperCoders</span>
          </div>
          <div className="hidden md:flex space-x-6 items-center">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    className="uppercase px-3 py-2 hover:text-teal-300 transition-all"
                    onMouseEnter={() => item.hasDropdown && handleServiceHover()}
                    onMouseLeave={() => item.hasDropdown && handleServiceLeave()}
                  >
                    {item.name}
                  </Link>
                  {item.hasDropdown && (
                    <button
                      onClick={handleArrowClick}
                      className="hover:text-teal-300 transition-all ml-1 focus:outline-none"
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
                    <motion.ul
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute left-0 mt-2 w-64 rounded-lg shadow-lg py-2 z-30"
                      onMouseEnter={handleServiceHover}
                      onMouseLeave={handleServiceLeave}
                    >
                      {serviceItems.map((service) => (
                        <li key={service.name}>
                          <Link
                            href={service.href}
                            className="block px-4 py-2 hover:bg-teal-700 hover:text-white transition-all"
                            onClick={() => {
                              setIsServicesOpen(false);
                              setOpenedByClick(false);
                            }}
                          >
                            {service.name}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </nav>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-16 left-0 w-full bg-white shadow-lg z-40"
            >
              <ul className="flex flex-col items-center py-4 space-y-4">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="uppercase px-6 py-2 hover:text-teal-300"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}




