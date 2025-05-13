
// "use client";

// import React, { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';
// import * as THREE from 'three';
// import { motion } from 'framer-motion';

// const TermsOfService = () => {
//   const [mounted, setMounted] = useState(false);
//   const canvasRef = useRef<HTMLDivElement>(null);
//   const threeRef = useRef<any>(null);

//   // Initialize Three.js animation
//   useEffect(() => {
//     setMounted(true);
    
//     if (canvasRef.current && !threeRef.current) {
//       // Scene setup
//       const scene = new THREE.Scene();
//       const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);
//       const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      
//       renderer.setSize(window.innerWidth, 400);
//       renderer.setClearColor(0x000000, 0);
//       canvasRef.current.appendChild(renderer.domElement);
      
//       // Create particles
//       const particlesGeometry = new THREE.BufferGeometry();
//       const particlesCount = 500;
      
//       const positionArray = new Float32Array(particlesCount * 3);
//       for (let i = 0; i < particlesCount * 3; i++) {
//         positionArray[i] = (Math.random() - 0.5) * 10;
//       }
      
//       particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
      
//       const particlesMaterial = new THREE.PointsMaterial({
//         size: 0.01,
//         color: 0x1e90ff,
//         transparent: true,
//         opacity: 0.8,
//       });
      
//       const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
//       scene.add(particlesMesh);
      
//       camera.position.z = 5;
      
//       // Animation
//       const animate = () => {
//         requestAnimationFrame(animate);
//         particlesMesh.rotation.y += 0.001;
//         particlesMesh.rotation.x += 0.0005;
//         renderer.render(scene, camera);
//       };
      
//       animate();
      
//       // Handle resize
//       const handleResize = () => {
//         camera.aspect = window.innerWidth / 400;
//         camera.updateProjectionMatrix();
//         renderer.setSize(window.innerWidth, 400);
//       };
      
//       window.addEventListener('resize', handleResize);
      
//       threeRef.current = {
//         cleanup: () => {
//           window.removeEventListener('resize', handleResize);
//           if (canvasRef.current) {
//             canvasRef.current.removeChild(renderer.domElement);
//           }
//           scene.remove(particlesMesh);
//           particlesGeometry.dispose();
//           particlesMaterial.dispose();
//         }
//       };
//     }
    



  


//     return () => {
//       if (threeRef.current) {
//         threeRef.current.cleanup();
//       }
//     };
//   }, []);

//   // Function to scroll to section when sidebar link is clicked
//   const scrollToSection = (sectionId) => {
//     const section = document.getElementById(sectionId);
//     if (section) {
//       section.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   if (!mounted) return null;


//          const textVariants = {
//     initial: { opacity: 0, y: 30 },
//     animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
//   };


  
//   return (
//     <div className="bg-gray-900 text-gray-200 min-h-screen">
//       {/* Three.js animation container */}
//       <div 
//         ref={canvasRef} 
//         className="absolute top-0 left-0 w-full h-96 pointer-events-none opacity-30 z-0"
//       />
      
//       <div className="container mx-auto px-4 py-8 relative z-10">
//         <header className="mb-12">
//           <motion.h1 
//             className="text-3xl font-semibold text-blue-400 mb-4"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             Terms of Service
//           </motion.h1>
//           <motion.p 
//             className="text-gray-300"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//           >
//             Welcome to SniperCoders. Please review our Terms of Service to understand the
//             guidelines and policies governing the use of our services and solutions.
//           </motion.p>
          
//           <div className="flex text-sm mt-4">
//             <Link href="/" className="text-gray-400 hover:text-blue-400 transition-colors">
//               Home
//             </Link>
//             <span className="mx-2 text-gray-500">›</span>
//             <span className="text-blue-400">Terms of Service</span>
//           </div>
//         </header>

//         <div className="flex flex-col md:flex-row gap-8">
//           {/* Sidebar/Contents */}
//           <motion.aside 
//             className="md:w-64 flex-shrink-0"
//             initial={{ opacity: 0, x: -30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             <div className="sticky top-8">
//               <h3 className="text-blue-400 font-medium mb-4">Contents</h3>
//               <nav className="space-y-2">
//                 {['Introduction', 'Eligibility', 'Account Registration', 'Services', 
//                   'User Responsibilities', 'Fees And Payment', 'Intellectual Property', 
//                   'Confidentiality', 'Term And Termination', 'Warranty Disclaimer', 
//                   'Limitation Of Liability', 'Indemnification', 'Governing Law And Jurisdiction', 
//                   'Dispute Resolution', 'Severability', 'Entire Agreement', 'Waiver', 
//                   'Assignment', 'Notices', 'Changes To Terms Of Service', 'Contact Information'].map((item) => (
//                   <div key={item} className="text-sm">
//                     <button 
//                       onClick={() => scrollToSection(item.toLowerCase().replace(/\s+/g, '-'))}
//                       className="block text-left w-full text-gray-400 hover:text-blue-400 transition-colors py-1"
//                     >
//                       {item}
//                     </button>
//                   </div>
//                 ))}
//               </nav>
//             </div>
//           </motion.aside>

//           {/* Main Content */}
//           <motion.main 
//             className="flex-1"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//           >
//             <section id="introduction" className="mb-12">
//               <motion.h2 
//                 className="text-2xl text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 1. Introduction
//               </motion.h2>
//               <p className="mb-4">
//                 These Terms of Service ("Terms") govern your access to and use of our website (www.snipercoders.com),
//                 mobile applications, and services (collectively, the "Services").
//               </p>
//               <p>
//                 By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these
//                 Terms, please do not access or use our Services.
//               </p>
//             </section>

//             <section id="eligibility" className="mb-12">
//               <motion.h2 
//                 className="text-2xl text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 2. Eligibility
//               </motion.h2>
//               <p>
//                 You must be at least 18 years old to use our Services. By using our Services, you represent and warrant
//                 that you are at least 18 years of age and have the legal capacity to enter into these Terms.
//               </p>
//             </section>

//             <section id="account-registration" className="mb-12">
//               <motion.h2 
//                 className="text-2xl text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 3. Account Registration
//               </motion.h2>
              
//               <h3 className="text-xl text-blue-300 mb-3">3.1 Account Creation</h3>
//               <p className="mb-4">
//                 When you create an account with us, you must provide accurate, complete, and current information. You
//                 are responsible for maintaining the confidentiality of your account credentials and for all activities that
//                 occur under your account.
//               </p>
              
//               <h3 className="text-xl text-blue-300 mb-3">3.2 Account Security</h3>
//               <p>
//                 You agree to notify us immediately of any unauthorized access to or use of your account. We cannot and
//                 will not be liable for any loss or damage arising from your failure to maintain the security of your
//                 account.
//               </p>
//             </section>

//             <section id="services" className="mb-12">
//               <motion.h2 
//                 className="text-2xl text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 4. Services
//               </motion.h2>
              
//               <h3 className="text-xl text-blue-300 mb-3">4.1 Service Description</h3>
//               <p className="mb-4">
//                 SniperCoders provides various technology services, including but not limited to web design and
//                 development, mobile app development, digital marketing, and IoT integration. The specific features and
//                 functionality of our Services may change from time to time.
//               </p>
              
//               <h3 className="text-xl text-blue-300 mb-3">4.2 Service Modifications</h3>
//               <p>
//                 We reserve the right to modify, suspend, or discontinue any part of our Services at any time, with or
//                 without notice. We will not be liable to you or any third party for any modification, suspension, or
//                 discontinuation of our Services.
//               </p>
//             </section>

//             <section id="user-responsibilities" className="mb-12">
//               <motion.h2 
//                 className="text-2xl text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 5. User Responsibilities
//               </motion.h2>
              
//               <h3 className="text-xl text-blue-300 mb-3">5.1 Compliance with Laws</h3>
//               <p className="mb-4">
//                 You agree to use our Services in compliance with all applicable laws, regulations, and industry
//                 standards.
//               </p>
              
//               <h3 className="text-xl text-blue-300 mb-3">5.2 Acceptable Use</h3>
//               <p className="mb-4">You are not to:</p>
//               <ul className="list-disc ml-6 space-y-2 mb-4">
//                 <li>Use our Services in any way that violates any applicable law or regulation</li>
//                 <li>Infringe upon the rights of others, including intellectual property rights</li>
//                 <li>Interfere with or disrupt the integrity or performance of our Services</li>
//                 <li>Attempt to gain unauthorized access to our Services, systems, or networks</li>
//                 <li>Use our Services to transmit harmful code, including viruses, malware, or spyware</li>
//                 <li>Engage in any fraudulent, deceptive, or misleading activities</li>
//                 <li>Harass, defame, or harm others through our Services</li>
//                 <li>Use our Services for any illegal or unauthorized purpose</li>
//               </ul>
              
//               <h3 className="text-xl text-blue-300 mb-3">5.3 Content Responsibility</h3>
//               <p>
//                 You are solely responsible for any content, materials, or information that you submit, upload, or
//                 otherwise make available through our Services ("Your Content"). You represent and warrant that you
//                 have all necessary rights to share Your Content and that Your Content does not violate these Terms or any
//                 applicable laws.
//               </p>
//             </section>

//             <section id="fees-and-payment" className="mb-12">
//               <motion.h2 
//                 className="text-2xl text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 6. Fees and Payment
//               </motion.h2>
              
//               <h3 className="text-xl text-blue-300 mb-3">6.1 Service Fees</h3>
//               <p className="mb-4">
//                 The fees for our Services will be as set forth in a separate agreement between you and SniperCoders or as
//                 otherwise specified. All fees are in Indian Rupees unless otherwise specified.
//               </p>
              
//               <h3 className="text-xl text-blue-300 mb-3">6.2 Payment Terms</h3>
//               <p>
//                 Payment terms will be as specified in your service agreement or project proposal. Unless otherwise
//                 agreed, invoices are due upon receipt. We reserve the right to suspend or terminate Services for non-
//                 payment.
//               </p>
//             </section>

//             <section id="taxes" className="mb-12">
//               <motion.h2 
//                 className="text-2xl text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 6.3 Taxes
//               </motion.h2>
//               <p>
//                 All fees are exclusive of taxes. You are responsible for paying all applicable taxes, including sales, use,
//                 VAT, GST, or similar taxes, except for taxes based on our net income.
//               </p>
//             </section>

//             <section id="intellectual-property" className="mb-12">
//               <motion.h2 
//                 className="text-2xl text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 7. Intellectual Property
//               </motion.h2>
              
//               <h3 className="text-xl text-blue-300 mb-3">7.1 Our Intellectual Property</h3>
//               <p className="mb-4">
//                 All content, features, and functionality of our Services, including but not limited to text, graphics, logos,
//                 icons, images, audio clips, digital downloads, data compilations, and software, are the property of SniperCoders or its
//                 licensors and are protected by Indian and international copyright, trademark, patent, trade secret, and
//                 other intellectual property laws.
//               </p>
              
//               <h3 className="text-xl text-blue-300 mb-3">7.2 License to Use</h3>
//               <p className="mb-4">
//                 We grant you a limited, non-exclusive, non-transferable, revocable license to access and use our
//                 Services for their intended purposes, subject to your compliance with these Terms.
//               </p>
              
//               <h3 className="text-xl text-blue-300 mb-3">7.3 Client Projects</h3>
//               <p className="mb-4">
//                 Ownership of deliverables created for clients will be as specified in the applicable service agreement or
//                 statement of work. Unless otherwise agreed in writing, clients typically receive ownership of custom
//                 deliverables created specifically for them, while SniperCoders retains ownership of pre-existing materials and tools
//                 used to create the deliverables.
//               </p>
              
//               <h3 className="text-xl text-blue-300 mb-3">7.4 Portfolio Rights</h3>
//               <p>
//                 Unless otherwise agreed in writing, you grant us permission to use your name, logo, and a general
//                 description of the work we performed for you in our portfolio and marketing materials.
//               </p>
//             </section>

//             <section id="confidentiality" className="mb-12">
//               <motion.h2 
//                 className="text-2xl text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 8. Confidentiality
//               </motion.h2>
              
//               <h3 className="text-xl text-blue-300 mb-3">8.1 Confidential Information</h3>
//               <p className="mb-4">
//                 During the course of our relationship, either party may disclose confidential information to the other.
//                 Each party agrees to protect the other's confidential information with the same degree of care it uses to
//                 protect its own confidential information, but in no event less than reasonable care.
//               </p>
              
//               <h3 className="text-xl text-blue-300 mb-3">8.2 Non-Disclosure</h3>
//               <p>
//                 Neither party will disclose the other party's confidential information to any third party without prior written
//                 consent, except as required by law or to the extent necessary to perform the Services.
//               </p>
//             </section>

//             <section id="term-and-termination" className="mb-12">
//               <motion.h2 
//                 className="text-2xl text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 9. Term and Termination
//               </motion.h2>
              
//               <h3 className="text-xl text-blue-300 mb-3">9.1 Term</h3>
//               <p className="mb-4">
//                 These Terms will remain in effect until terminated by either you or us.
//               </p>
              
//               <h3 className="text-xl text-blue-300 mb-3">9.2 Termination by You</h3>
//               <p className="mb-4">
//                 You may terminate these Terms at any time by ceasing to use our Services and, if applicable, closing
//                 your account.
//               </p>
              
//               <h3 className="text-xl text-blue-300 mb-3">9.3 Termination by Us</h3>
//               <p className="mb-4">
//                 We may terminate or suspend your access to our Services at any time, with or without cause, and with
//                 or without notice. Causes for termination may include, but are not limited to:
//               </p>
//               <ul className="list-disc ml-6 space-y-2 mb-4">
//                 <li>Violation of these Terms</li>
//                 <li>Failure to pay for Services</li>
//                 <li>Engaging in fraudulent or illegal activities</li>
//                 <li>Upon request by law enforcement or government agencies</li>
//               </ul>
              
//               <h3 className="text-xl text-blue-300 mb-3">9.4 Effect of Termination</h3>
//               <p>
//                 Upon termination, your right to use our Services will immediately cease. All provisions of these Terms
//                 that by their nature should survive termination shall survive, including ownership provisions, warranty
//                 disclaimers, indemnity, and limitations of liability.
//               </p>
//             </section>

//             <section id="warranty-disclaimer" className="mb-12">
//               <motion.h2 
//                 className="text-2xl text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 10. Warranty Disclaimer
//               </motion.h2>
//               <p className="uppercase mb-4">
//                 THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTY OF ANY KIND,
//                 EXPRESS OR IMPLIED, TO THE MAXIMUM EXTENT PERMITTED BY LAW. SNIPERCODERS DISCLAIMS ALL
//                 WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY,
//                 FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
//               </p>
//               <p className="uppercase">
//                 WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-
//                 FREE, OR THAT ANY DEFECTS WILL BE CORRECTED. WE MAKE NO WARRANTIES ABOUT THE
//                 ACCURACY, RELIABILITY, COMPLETENESS, OR TIMELINESS OF THE CONTENT, SERVICES, SOFTWARE,
//                 TEXT, GRAPHICS, AND LINKS.
//               </p>
//             </section>

//             <section id="limitation-of-liability" className="mb-12">
//               <motion.h2 
//                 className="text-2xl text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 11. Limitation of Liability
//               </motion.h2>
//               <p className="uppercase mb-4">
//                 IN NO EVENT SHALL SNIPERCODERS, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES,
//                 BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE
//                 DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER
//                 INTANGIBLE LOSSES, RESULTING FROM:
//               </p>
//               <ul className="list-disc ml-6 space-y-2 uppercase mb-4">
//                 <li>YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES</li>
//                 <li>ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICES</li>
//                 <li>ANY CONTENT OBTAINED FROM THE SERVICES</li>
//                 <li>UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT</li>
//                 <li>WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER
//                     LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN INFORMED OF THE POSSIBILITY OF SUCH
//                     DAMAGE, AND EVEN IF A REMEDY SET FORTH HEREIN IS FOUND TO HAVE FAILED OF ITS ESSENTIAL
//                     PURPOSE</li>
//               </ul>
//               <p className="uppercase">
//                 IN ANY EVENT, OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS SHALL NOT EXCEED THE AMOUNT
//                 PAID BY YOU TO SNIPERCODERS DURING THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE
//                 TO THE LIABILITY.
//               </p>
//             </section>

//             <section id="indemnification" className="mb-12">
//               <motion.h2 
//                 className="text-2xl text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 12. Indemnification
//               </motion.h2>
//               <p className="mb-4">
//                 You agree to defend, indemnify, and hold harmless SniperCoders, its officers, directors, employees, and
//                 agents, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and
//                 expenses (including but not limited to attorney's fees) arising from:
//               </p>
//               <ul className="list-disc ml-6 space-y-2">
//                 <li>Your use of and access to the Services</li>
//                 <li>Your violation of any term of these Terms</li>
//                 <li>Your violation of any third-party right, including without limitation any copyright, property, or privacy right</li>
//                 <li>Any claim that your User Content caused damage to a third party</li>
//                 <li>Your indemnification obligation will survive these Terms and your use of the Services.</li>
//               </ul>
//             </section>

//             <section id="governing-law-and-jurisdiction" className="mb-12">
//               <motion.h2 
//                 className="text-2xl text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 13. Governing Law and Jurisdiction
//               </motion.h2>
//               <p>
//                 These Terms shall be governed by and construed in accordance with the laws of India, without regard to
//                 its conflict of law provisions. You agree to submit to the exclusive jurisdiction of the courts located in
//                 Guwahati, Maharashtra, India for the resolution of any dispute arising from these Terms or your use of the
//                 Services.
//               </p>
//             </section>

//             <section id="dispute-resolution" className="mb-12">
//               <motion.h2 
//                 className="text-2xl text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 14. Dispute Resolution
//               </motion.h2>
//               <p>
//                 Any dispute arising out of or in connection with these Terms shall first be attempted to be resolved
//                 amicably through negotiation. If the dispute is not resolved through negotiation within 30 days, the
//                 dispute shall be settled by arbitration in accordance with the Arbitration and Conciliation Act, 1996 of
//                 India. The place of arbitration shall be Guwahati, India. The language of the arbitration shall be English.
//               </p>
//             </section>

//             <section id="severability" className="mb-12">
//               <motion.h2 
//                 className="text-2xl text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 15. Severability
//               </motion.h2>
//               <p>
//                 If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or
//                 eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and
//                 effect and enforceable.
//               </p>
//             </section>

//             <section id="entire-agreement" className="mb-12">
//               <motion.h2 
//                 className="text-2xl text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 16. Entire Agreement
//               </motion.h2>
//               <p>
//                 These Terms constitute the entire agreement between you and SniperCoders regarding our Services and
//                 supersede all prior agreements and understandings, whether written or oral.
//               </p>
//             </section>

//             <section id="waiver" className="mb-12">
//               <motion.h2 
//                 className="text-2xl text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 17. Waiver
//               </motion.h2>
//               <p>
//                 Our failure to enforce any right or provision of these Terms will not be considered a waiver of those
//                 rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining
//                 provisions of these Terms will remain in effect.
//               </p>
//             </section>

//             <section id="assignment" className="mb-12">
//               <motion.h2 
//                 className="text-2xl text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 18. Assignment
//               </motion.h2>
//               <p>
//                 You may not assign or transfer these Terms, by operation of law or otherwise, without our prior written
//                 consent. Any attempt by you to assign or transfer these Terms without such consent will be null and
//                 void.
//               </p>
//             </section>

//             <section id="notices" className="mb-12">
//               <motion.h2 
//                 className="text-2xl text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 19. Notices
//               </motion.h2>
//               <p>
//                 Any notices or other communications provided by us under these Terms, including those regarding
//                 modifications to these Terms, will be given by posting to the website or via email to the address
//                 specified in your account.
//               </p>
//             </section>

//             <section id="changes-to-terms-of-service" className="mb-12">
//               <motion.h2 
//                 className="text-2xl text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 20. Changes to Terms of Service
//               </motion.h2>
//               <p>
//                 We reserve the right to modify or replace these Terms at any time, at our sole discretion. We will provide
//                 notice of any material changes through our Services or by other means as determined by us. Your
//                 continued use of the Services after any such changes constitutes your acceptance of the new Terms.
//               </p>
//             </section>

//             <section id="contact-information" className="mb-12">
//               <motion.h2 
//                 className="text-2xl text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 Contact Information
//               </motion.h2>
//               <p className="mb-4">
//                 If you have any questions about these Terms, please contact us at:
//               </p>
//               <div className="bg-gray-800 p-6 rounded-lg">
//                 <p className="mb-2">SniperCoders</p>
               
//                 <p>
//                   <a href="mailto:legal@snipercoders.com" className="text-blue-400 hover:underline">
//                     snipercoders25@gmail.com
//                   </a>
//                 </p>
//               </div>
//             </section>


            


//           </motion.main>
           
//         </div>
//       </div>
//        <footer className="relative z-20 bg-gray-950/70 backdrop-blur-lg border-t border-gray-800/50 text-white py-16 mt-20">
//                       <div className="container mx-auto px-6">
//                         <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
//                           <motion.div
//                             variants={textVariants}
//                             initial="initial"
//                             animate="animate"
//                           >
//                             <div className="flex items-center mb-6">
//                               <div className="text-3xl font-extrabold">
//                                 <span className="bg-clip-text bg-gradient-to-r text-white animate-gradient">
//                                   SniperCoders
//                                 </span>
//                               </div>
//                             </div>
//                             <p className="text-gray-300 text-sm leading-relaxed">
//                               We specialize in turning visionary ideas into reality. Our
//                               expertise helps businesses transform aspirations into tangible
//                               solutions, paving the way for future growth.
//                             </p>
//                           </motion.div>
            
//                           {[
//                             {
//                               title: "Our Services",
//                               items: [
//                                 {
//                                   label: "Custom Software Dev",
//                                   href: "/services/custom-software-development",
//                                 },
//                                 {
//                                   label: "Website Development",
//                                   href: "/services/web-development",
//                                 },
//                                 {
//                                   label: "Mobile App Development",
//                                   href: "/services/mobile-development",
//                                 },
            
//                                 { label: "IT Consulting", href: "/services/it-consulting" }, // Replaces Cloud Solutions
//                               ],
//                             },
//                             {
//                               title: "Useful Links",
//                               items: [
//                                 { label: "Terms of Service", href: "/terms" },
//                                 { label: "Privacy Policy", href: "/privacy" },
//                                 { label: "Refund Policy", href: "/refund-policy" },
//                                 { label: "Careers", href: "/careers" },
//                               ],
//                             },
//                             {
//                               title: "Get In Touch",
//                               items: [
//                                 { label: "About Us", href: "/about" },
//                                 { label: "Contact Us", href: "/contact" },
//                                 { label: "FAQs", href: "/faqs" },
//                                 { label: "Testimonials", href: "/showcase" },
//                               ],
//                             },
//                           ].map((section, idx) => (
//                             <motion.div
//                               key={idx}
//                               variants={textVariants}
//                               initial="initial"
//                               animate="animate"
//                             >
//                               <h3 className="text-lg font-semibold mb-6 text-gray-200">
//                                 {section.title}
//                               </h3>
//                               <ul className="space-y-3">
//                                 {section.items.map((item, i) => (
//                                   <motion.li
//                                     key={i}
//                                     whileHover={{ x: 8 }}
//                                     transition={{ duration: 0.3 }}
//                                   >
//                                     <a
//                                       href={item.href}
//                                       className="text-gray-300 hover:text-cyan-400 transition-colors text-sm"
//                                     >
//                                       {item.label}
//                                     </a>
//                                   </motion.li>
//                                 ))}
//                               </ul>
//                             </motion.div>
//                           ))}
//                         </div>
//                         <motion.div
//                           className="mt-12 pt-10 border-t border-gray-800/50 text-center text-gray-400 text-sm"
//                           variants={textVariants}
//                           initial="initial"
//                           animate="animate"
//                         >
//                           © {new Date().getFullYear()} SniperCoders Global Technologies. All
//                           rights reserved.
//                         </motion.div>
//                       </div>
//                     </footer>

//     </div>
//   );
// };

// export default TermsOfService;






















// "use client";

// import React, { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';
// import * as THREE from 'three';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
// import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

// const TermsOfService = () => {
//   const [mounted, setMounted] = useState(false);
//   const canvasRef = useRef<HTMLDivElement>(null);
//   const threeRef = useRef<any>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end start"]
//   });

//   // Parallax and animation transforms
//   const bgTransform = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
//   const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0.2, 1, 0.2]);

//   // Enhanced Three.js animation
//   useEffect(() => {
//     setMounted(true);
    
//     if (canvasRef.current && !threeRef.current) {
//       // Scene setup
//       const scene = new THREE.Scene();
//       const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);
//       const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      
//       renderer.setSize(window.innerWidth, 400);
//       renderer.setClearColor(0x000000, 0);
//       canvasRef.current.appendChild(renderer.domElement);
      
//       // Create more complex particle system
//       const particlesGeometry = new THREE.BufferGeometry();
//       const particlesCount = 2000;
      
//       const positionArray = new Float32Array(particlesCount * 3);
//       const colorArray = new Float32Array(particlesCount * 3);
      
//       for (let i = 0; i < particlesCount * 3; i++) {
//         // Spread particles more dynamically
//         positionArray[i] = (Math.random() - 0.5) * 20;
//         // Create a color gradient
//         colorArray[i] = Math.random() * 0.5 + 0.5; // Varying intensity
//       }
      
//       particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
//       particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
      
//       const particlesMaterial = new THREE.PointsMaterial({
//         size: 0.02,
//         vertexColors: true,
//         blending: THREE.AdditiveBlending,
//         transparent: true,
//         opacity: 0.7,
//       });
      
//       const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
//       scene.add(particlesMesh);
      
//       // Add some directional light for depth
//       const light = new THREE.DirectionalLight(0x00ffff, 0.5);
//       light.position.set(0, 0, 10);
//       scene.add(light);
      
//       camera.position.z = 5;
      
//       // Post-processing effects
//       const composer = new EffectComposer(renderer);
//       const renderPass = new RenderPass(scene, camera);
//       composer.addPass(renderPass);
      
//       const bloomPass = new UnrealBloomPass(
//         new THREE.Vector2(window.innerWidth, 400),
//         1.5,  // strength
//         0.4,  // radius
//         0.85  // threshold
//       );
//       composer.addPass(bloomPass);
      
//       // Animation
//       const animate = () => {
//         requestAnimationFrame(animate);
        
//         // More dynamic particle rotation
//         particlesMesh.rotation.y += 0.0015;
//         particlesMesh.rotation.x += 0.0008;
//         particlesMesh.rotation.z += 0.0005;
        
//         // Slight pulsing effect
//         particlesMesh.scale.x = 1 + Math.sin(Date.now() * 0.001) * 0.02;
//         particlesMesh.scale.y = 1 + Math.cos(Date.now() * 0.001) * 0.02;
        
//         composer.render();
//       };
      
//       animate();
      
//       // Handle resize
//       const handleResize = () => {
//         camera.aspect = window.innerWidth / 400;
//         camera.updateProjectionMatrix();
//         renderer.setSize(window.innerWidth, 400);
//         composer.setSize(window.innerWidth, 400);
//       };
      
//       window.addEventListener('resize', handleResize);
      
//       threeRef.current = {
//         cleanup: () => {
//           window.removeEventListener('resize', handleResize);
//           if (canvasRef.current) {
//             canvasRef.current.removeChild(renderer.domElement);
//           }
//           scene.remove(particlesMesh);
//           particlesGeometry.dispose();
//           particlesMaterial.dispose();
//         }
//       };
//     }

//     return () => {
//       if (threeRef.current) {
//         threeRef.current.cleanup();
//       }
//     };
//   }, []);

//   // Function to scroll to section when sidebar link is clicked
//   const scrollToSection = (sectionId: string) => {
//     const section = document.getElementById(sectionId);
//     if (section) {
//       section.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   if (!mounted) return null;

//   const textVariants = {
//     initial: { opacity: 0, y: 30 },
//     animate: { 
//       opacity: 1, 
//       y: 0, 
//       transition: { 
//         duration: 0.8, 
//         ease: 'easeOut' 
//       } 
//     },
//     hover: {
//       scale: 1.02,
//       transition: { duration: 0.2 }
//     }
//   };

//   const hoverVariants = {
//     hover: { scale: 1.05, color: '#60A5FA', transition: { duration: 0.3 } },
//   };

//   return (
//     <div 
//       ref={containerRef}
//       className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 min-h-screen relative overflow-hidden"
//     >
//       {/* Parallax Three.js animation container */}
//       <motion.div 
//         ref={canvasRef} 
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '400px',
//           pointerEvents: 'none',
//           opacity: 0.3,
//           y: bgTransform
//         }}
//         className="z-0"
//       />
      
//       <div className="container mx-auto px-4 py-8 relative z-10">
//         <motion.header 
//           className="mb-12"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <motion.h1 
//             className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4"
//             whileHover={{ scale: 1.05 }}
//             transition={{ duration: 0.3 }}
//           >
//             Terms of Service
//           </motion.h1>
//           <motion.p 
//             className="text-gray-300 text-lg"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//           >
//             Welcome to SniperCoders. Please review our Terms of Service to understand the
//             guidelines and policies governing the use of our services and solutions.
//           </motion.p>
          
//           <div className="flex text-sm mt-4">
//             <Link href="/" className="text-gray-400 hover:text-blue-400 transition-colors">
//               Home
//             </Link>
//             <span className="mx-2 text-gray-500">›</span>
//             <span className="text-blue-400">Terms of Service</span>
//           </div>
//         </motion.header>

//         <div className="flex flex-col md:flex-row gap-8">
//           {/* Sidebar/Contents */}
//           <motion.aside 
//             className="md:w-64 flex-shrink-0"
//             initial={{ opacity: 0, x: -30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             <div className="sticky top-8 bg-gray-800/50 backdrop-blur-lg p-6 rounded-lg shadow-lg">
//               <h3 className="text-2xl font-semibold text-blue-400 mb-4">Contents</h3>
//               <nav className="space-y-3">
//                 {['Introduction', 'Eligibility', 'Account Registration', 'Services', 
//                   'User Responsibilities', 'Fees And Payment', 'Intellectual Property', 
//                   'Confidentiality', 'Term And Termination', 'Warranty Disclaimer', 
//                   'Limitation Of Liability', 'Indemnification', 'Governing Law And Jurisdiction', 
//                   'Dispute Resolution', 'Severability', 'Entire Agreement', 'Waiver', 
//                   'Assignment', 'Notices', 'Changes To Terms Of Service', 'Contact Information'].map((item) => (
//                   <motion.div 
//                     key={item} 
//                     className="text-sm"
//                     whileHover="hover"
//                     variants={hoverVariants}
//                   >
//                     <button 
//                       onClick={() => scrollToSection(item.toLowerCase().replace(/\s+/g, '-'))}
//                       className="block text-gray-300 py-2 px-3 rounded-lg hover:bg-gray-700/50 transition-colors w-full text-left"
//                     >
//                       {item}
//                     </button>
//                   </motion.div>
//                 ))}
//               </nav>
//             </div>
//           </motion.aside>

//           {/* Main Content with Scroll-Driven Opacity */}
//           <motion.main 
//             className="flex-1 bg-gray-800/30 backdrop-blur-lg p-8 rounded-lg shadow-xl"
//             style={{ opacity: sectionOpacity }}
//           >
//             <section id="introduction" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 1. Introduction
//               </motion.h2>
//               <p className="text-gray-300">
//                 These Terms of Service ("Terms") govern your use of the services provided by SniperCoders. By accessing or using our services, you agree to be bound by these Terms.
//               </p>
//             </section>

//             <section id="eligibility" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 2. Eligibility
//               </motion.h2>
//               <p className="text-gray-300">
//                 You must be at least 18 years of age to use our services. By agreeing to these Terms, you represent that you meet this eligibility requirement.
//               </p>
//             </section>

//             <section id="account-registration" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 3. Account Registration
//               </motion.h2>
//               <p className="text-gray-300">
//                 To access certain services, you may need to register for an account. You agree to provide accurate information during registration and to keep your account information updated.
//               </p>
//             </section>

//             <section id="services" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 4. Services
//               </motion.h2>
//               <p className="text-gray-300">
//                 SniperCoders provides software development, web design, mobile app development, and IT consulting services. The specifics of each service will be outlined in separate agreements.
//               </p>
//             </section>

//             <section id="user-responsibilities" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 5. User Responsibilities
//               </motion.h2>
//               <p className="text-gray-300">
//                 You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.
//               </p>
//             </section>

//             <section id="fees-and-payment" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 6. Fees And Payment
//               </motion.h2>
//               <p className="text-gray-300">
//                 Fees for our services will be specified in your service agreement. Payments are due as per the agreed-upon schedule.
//               </p>
//             </section>

//             <section id="intellectual-property" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 7. Intellectual Property
//               </motion.h2>
//               <p className="text-gray-300">
//                 All intellectual property rights in the services and deliverables provided by SniperCoders remain our property unless otherwise agreed in writing.
//               </p>
//             </section>

//             <section id="confidentiality" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 8. Confidentiality
//               </motion.h2>
//               <p className="text-gray-300">
//                 Both parties agree to maintain the confidentiality of any proprietary or sensitive information shared during the engagement.
//               </p>
//             </section>

//             <section id="term-and-termination" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 9. Term And Termination
//               </motion.h2>
//               <p className="text-gray-300">
//                 These Terms are effective until terminated. Either party may terminate the agreement with written notice if the other party breaches these Terms.
//               </p>
//             </section>

//             <section id="warranty-disclaimer" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 10. Warranty Disclaimer
//               </motion.h2>
//               <p className="text-gray-300">
//                 Our services are provided "as is" without any warranties, express or implied, except as specified in a service agreement.
//               </p>
//             </section>

//             <section id="limitation-of-liability" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 11. Limitation Of Liability
//               </motion.h2>
//               <p className="text-gray-300">
//                 SniperCoders shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.
//               </p>
//             </section>

//             <section id="indemnification" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 12. Indemnification
//               </motion.h2>
//               <p className="text-gray-300">
//                 You agree to indemnify SniperCoders against any claims arising from your use of our services.
//               </p>
//             </section>

//             <section id="governing-law-and-jurisdiction" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 13. Governing Law And Jurisdiction
//               </motion.h2>
//               <p className="text-gray-300">
//                 These Terms are governed by local and national legal frameworks.
//               </p>
//             </section>

//             <section id="dispute-resolution" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 14. Dispute Resolution
//               </motion.h2>
//               <p className="text-gray-300">
//                 Disputes will be resolved through mediation before proceeding to legal action, as per local laws.
//               </p>
//             </section>

//             <section id="severability" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 15. Severability
//               </motion.h2>
//               <p className="text-gray-300">
//                 If any provision of these Terms is found to be invalid, the remaining provisions will remain in effect.
//               </p>
//             </section>

//             <section id="entire-agreement" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 16. Entire Agreement
//               </motion.h2>
//               <p className="text-gray-300">
//                 These Terms constitute the entire agreement between you and SniperCoders regarding the use of our services.
//               </p>
//             </section>

//             <section id="waiver" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 17. Waiver
//               </motion.h2>
//               <p className="text-gray-300">
//                 No waiver of any term will be deemed a further or continuing waiver of such term.
//               </p>
//             </section>

//             <section id="assignment" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 18. Assignment
//               </motion.h2>
//               <p className="text-gray-300">
//                 You may not assign your rights under these Terms without our prior written consent.
//               </p>
//             </section>

//             <section id="notices" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 19. Notices
//               </motion.h2>
//               <p className="text-gray-300">
//                 Notices will be sent to the email address provided during registration.
//               </p>
//             </section>

//             <section id="changes-to-terms-of-service" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 20. Changes To Terms Of Service
//               </motion.h2>
//               <p className="text-gray-300">
//                 We may update these Terms from time to time. The latest version will be available on our website.
//               </p>
//             </section>

//             <section id="contact-information" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 21. Contact Information
//               </motion.h2>
//               <p className="mb-4 text-gray-300">For any questions regarding these Terms:</p>
//               <div className="bg-gray-700/50 p-6 rounded-lg shadow-lg">
//                 <p className="mb-2 text-gray-300">
//                   <strong>Email:</strong> <a href="mailto:snipercoders25@gmail.com" className="text-blue-400 hover:underline">snipercoders25@gmail.com</a>
//                 </p>
             
//               </div>
//             </section>
//           </motion.main>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="relative z-20 bg-gray-950/70 backdrop-blur-lg border-t border-gray-800/50 text-white py-16 mt-20">
//         <div className="container mx-auto px-6">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
//             <motion.div
//               variants={textVariants}
//               initial="initial"
//               animate="animate"
//             >
//               <div className="flex items-center mb-6">
//                 <div className="text-3xl font-extrabold">
//                   <span className="bg-clip-text bg-gradient-to-r text-white animate-gradient">
//                     SniperCoders
//                   </span>
//                 </div>
//               </div>
//               <p className="text-gray-300 text-sm leading-relaxed">
//                 We specialize in turning visionary ideas into reality. Our
//                 expertise helps businesses transform aspirations into tangible
//                 solutions, paving the way for future growth.
//               </p>
//             </motion.div>

//             {[
//               {
//                 title: "Our Services",
//                 items: [
//                   { label: "Custom Software Dev", href: "/services/custom-software-development" },
//                   { label: "Website Development", href: "/services/web-development" },
//                   { label: "Mobile App Development", href: "/services/mobile-development" },
//                   { label: "IT Consulting", href: "/services/it-consulting" },
//                 ],
//               },
//               {
//                 title: "Useful Links",
//                 items: [
//                   { label: "Terms of Service", href: "/terms" },
//                   { label: "Privacy Policy", href: "/privacy" },
//                   { label: "Refund Policy", href: "/refund" },
//                 ],
//               },
//               {
//                 title: "Get In Touch",
//                 items: [
//                   { label: "About Us", href: "/about" },
//                   { label: "Contact Us", href: "/contact" },
//                   { label: "FAQs", href: "/faqs" },
//                   { label: "Testimonials", href: "/showcase" },
//                 ],
//               },
//             ].map((section, idx) => (
//               <motion.div
//                 key={idx}
//                 variants={textVariants}
//                 initial="initial"
//                 animate="animate"
//               >
//                 <h3 className="text-lg font-semibold mb-6 text-gray-200">
//                   {section.title}
//                 </h3>
//                 <ul className="space-y-3">
//                   {section.items.map((item, i) => (
//                     <motion.li
//                       key={i}
//                       whileHover={{ scale: 1.1, color: '#60A5FA' }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <a
//                         href={item.href}
//                         className="text-gray-300 text-sm transition-colors"
//                       >
//                         {item.label}
//                       </a>
//                     </motion.li>
//                   ))}
//                 </ul>
//               </motion.div>
//             ))}
//           </div>
//           <motion.div
//             className="mt-12 pt-10 border-t border-gray-800/50 text-center text-gray-400 text-sm"
//             variants={textVariants}
//             initial="initial"
//             animate="animate"
//           >
//             © {new Date().getFullYear()} SniperCoders. All rights reserved.
//           </motion.div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default TermsOfService;





















// "use client";

// import React, { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';
// import * as THREE from 'three';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
// import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

// // Define proper type for threeRef instead of using any
// interface ThreeRefType {
//   cleanup: () => void;
// }

// const TermsOfService = () => {
//   const [mounted, setMounted] = useState(false);
//   const canvasRef = useRef<HTMLDivElement>(null);
//   const threeRef = useRef<ThreeRefType | null>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end start"]
//   });

//   // Parallax and animation transforms
//   const bgTransform = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
//   const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0.2, 1, 0.2]);

//   // Enhanced Three.js animation
//   useEffect(() => {
//     setMounted(true);
    
//     if (canvasRef.current && !threeRef.current) {
//       // Scene setup
//       const scene = new THREE.Scene();
//       const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);
//       const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      
//       renderer.setSize(window.innerWidth, 400);
//       renderer.setClearColor(0x000000, 0);
//       canvasRef.current.appendChild(renderer.domElement);
      
//       // Create more complex particle system
//       const particlesGeometry = new THREE.BufferGeometry();
//       const particlesCount = 2000;
      
//       const positionArray = new Float32Array(particlesCount * 3);
//       const colorArray = new Float32Array(particlesCount * 3);
      
//       for (let i = 0; i < particlesCount * 3; i++) {
//         // Spread particles more dynamically
//         positionArray[i] = (Math.random() - 0.5) * 20;
//         // Create a color gradient
//         colorArray[i] = Math.random() * 0.5 + 0.5; // Varying intensity
//       }
      
//       particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
//       particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
      
//       const particlesMaterial = new THREE.PointsMaterial({
//         size: 0.02,
//         vertexColors: true,
//         blending: THREE.AdditiveBlending,
//         transparent: true,
//         opacity: 0.7,
//       });
      
//       const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
//       scene.add(particlesMesh);
      
//       // Add some directional light for depth
//       const light = new THREE.DirectionalLight(0x00ffff, 0.5);
//       light.position.set(0, 0, 10);
//       scene.add(light);
      
//       camera.position.z = 5;
      
//       // Post-processing effects
//       const composer = new EffectComposer(renderer);
//       const renderPass = new RenderPass(scene, camera);
//       composer.addPass(renderPass);
      
//       const bloomPass = new UnrealBloomPass(
//         new THREE.Vector2(window.innerWidth, 400),
//         1.5,  // strength
//         0.4,  // radius
//         0.85  // threshold
//       );
//       composer.addPass(bloomPass);
      
//       // Animation
//       const animate = () => {
//         requestAnimationFrame(animate);
        
//         // More dynamic particle rotation
//         particlesMesh.rotation.y += 0.0015;
//         particlesMesh.rotation.x += 0.0008;
//         particlesMesh.rotation.z += 0.0005;
        
//         // Slight pulsing effect
//         particlesMesh.scale.x = 1 + Math.sin(Date.now() * 0.001) * 0.02;
//         particlesMesh.scale.y = 1 + Math.cos(Date.now() * 0.001) * 0.02;
        
//         composer.render();
//       };
      
//       animate();
      
//       // Handle resize
//       const handleResize = () => {
//         camera.aspect = window.innerWidth / 400;
//         camera.updateProjectionMatrix();
//         renderer.setSize(window.innerWidth, 400);
//         composer.setSize(window.innerWidth, 400);
//       };
      
//       window.addEventListener('resize', handleResize);
      
//       threeRef.current = {
//         cleanup: () => {
//           window.removeEventListener('resize', handleResize);
//           if (canvasRef.current) {
//             canvasRef.current.removeChild(renderer.domElement);
//           }
//           scene.remove(particlesMesh);
//           particlesGeometry.dispose();
//           particlesMaterial.dispose();
//         }
//       };
//     }

//     return () => {
//       if (threeRef.current) {
//         threeRef.current.cleanup();
//       }
//     };
//   }, []);

//   // Function to scroll to section when sidebar link is clicked
//   const scrollToSection = (sectionId: string) => {
//     const section = document.getElementById(sectionId);
//     if (section) {
//       section.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   if (!mounted) return null;

//   const textVariants = {
//     initial: { opacity: 0, y: 30 },
//     animate: { 
//       opacity: 1, 
//       y: 0, 
//       transition: { 
//         duration: 0.8, 
//         ease: 'easeOut' 
//       } 
//     },
//     hover: {
//       scale: 1.02,
//       transition: { duration: 0.2 }
//     }
//   };

//   const hoverVariants = {
//     hover: { scale: 1.05, color: '#60A5FA', transition: { duration: 0.3 } },
//   };

//   return (
//     <div 
//       ref={containerRef}
//       className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 min-h-screen relative overflow-hidden"
//     >
//       {/* Parallax Three.js animation container */}
//       <motion.div 
//         ref={canvasRef} 
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '400px',
//           pointerEvents: 'none',
//           opacity: 0.3,
//           y: bgTransform
//         }}
//         className="z-0"
//       />
      
//       <div className="container mx-auto px-4 py-8 relative z-10">
//         <motion.header 
//           className="mb-12"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <motion.h1 
//             className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4"
//             whileHover={{ scale: 1.05 }}
//             transition={{ duration: 0.3 }}
//           >
//             Terms of Service
//           </motion.h1>
//           <motion.p 
//             className="text-gray-300 text-lg"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//           >
//             Welcome to SniperCoders. Please review our Terms of Service to understand the
//             guidelines and policies governing the use of our services and solutions.
//           </motion.p>
          
//           <div className="flex text-sm mt-4">
//             <Link href="/" className="text-gray-400 hover:text-blue-400 transition-colors">
//               Home
//             </Link>
//             <span className="mx-2 text-gray-500">›</span>
//             <span className="text-blue-400">Terms of Service</span>
//           </div>
//         </motion.header>

//         <div className="flex flex-col md:flex-row gap-8">
//           {/* Sidebar/Contents */}
//           <motion.aside 
//             className="md:w-64 flex-shrink-0"
//             initial={{ opacity: 0, x: -30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             <div className="sticky top-8 bg-gray-800/50 backdrop-blur-lg p-6 rounded-lg shadow-lg">
//               <h3 className="text-2xl font-semibold text-blue-400 mb-4">Contents</h3>
//               <nav className="space-y-3">
//                 {['Introduction', 'Eligibility', 'Account Registration', 'Services', 
//                   'User Responsibilities', 'Fees And Payment', 'Intellectual Property', 
//                   'Confidentiality', 'Term And Termination', 'Warranty Disclaimer', 
//                   'Limitation Of Liability', 'Indemnification', 'Governing Law And Jurisdiction', 
//                   'Dispute Resolution', 'Severability', 'Entire Agreement', 'Waiver', 
//                   'Assignment', 'Notices', 'Changes To Terms Of Service', 'Contact Information'].map((item) => (
//                   <motion.div 
//                     key={item} 
//                     className="text-sm"
//                     whileHover="hover"
//                     variants={hoverVariants}
//                   >
//                     <button 
//                       onClick={() => scrollToSection(item.toLowerCase().replace(/\s+/g, '-'))}
//                       className="block text-gray-300 py-2 px-3 rounded-lg hover:bg-gray-700/50 transition-colors w-full text-left"
//                     >
//                       {item}
//                     </button>
//                   </motion.div>
//                 ))}
//               </nav>
//             </div>
//           </motion.aside>

//           {/* Main Content with Scroll-Driven Opacity */}
//           <motion.main 
//             className="flex-1 bg-gray-800/30 backdrop-blur-lg p-8 rounded-lg shadow-xl"
//             style={{ opacity: sectionOpacity }}
//           >
//             <section id="introduction" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 1. Introduction
//               </motion.h2>
//               <p className="text-gray-300">
//                 These Terms of Service (&quot;Terms&quot;) govern your use of the services provided by SniperCoders. By accessing or using our services, you agree to be bound by these Terms.
//               </p>
//             </section>

//             <section id="eligibility" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 2. Eligibility
//               </motion.h2>
//               <p className="text-gray-300">
//                 You must be at least 18 years of age to use our services. By agreeing to these Terms, you represent that you meet this eligibility requirement.
//               </p>
//             </section>

//             <section id="account-registration" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 3. Account Registration
//               </motion.h2>
//               <p className="text-gray-300">
//                 To access certain services, you may need to register for an account. You agree to provide accurate information during registration and to keep your account information updated.
//               </p>
//             </section>

//             <section id="services" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 4. Services
//               </motion.h2>
//               <p className="text-gray-300">
//                 SniperCoders provides software development, web design, mobile app development, and IT consulting services. The specifics of each service will be outlined in separate agreements.
//               </p>
//             </section>

//             <section id="user-responsibilities" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 5. User Responsibilities
//               </motion.h2>
//               <p className="text-gray-300">
//                 You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.
//               </p>
//             </section>

//             <section id="fees-and-payment" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 6. Fees And Payment
//               </motion.h2>
//               <p className="text-gray-300">
//                 Fees for our services will be specified in your service agreement. Payments are due as per the agreed-upon schedule.
//               </p>
//             </section>

//             <section id="intellectual-property" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 7. Intellectual Property
//               </motion.h2>
//               <p className="text-gray-300">
//                 All intellectual property rights in the services and deliverables provided by SniperCoders remain our property unless otherwise agreed in writing.
//               </p>
//             </section>

//             <section id="confidentiality" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 8. Confidentiality
//               </motion.h2>
//               <p className="text-gray-300">
//                 Both parties agree to maintain the confidentiality of any proprietary or sensitive information shared during the engagement.
//               </p>
//             </section>

//             <section id="term-and-termination" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 9. Term And Termination
//               </motion.h2>
//               <p className="text-gray-300">
//                 These Terms are effective until terminated. Either party may terminate the agreement with written notice if the other party breaches these Terms.
//               </p>
//             </section>

//             <section id="warranty-disclaimer" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 10. Warranty Disclaimer
//               </motion.h2>
//               <p className="text-gray-300">
//                 Our services are provided &quot;as is&quot; without any warranties, express or implied, except as specified in a service agreement.
//               </p>
//             </section>

//             <section id="limitation-of-liability" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 11. Limitation Of Liability
//               </motion.h2>
//               <p className="text-gray-300">
//                 SniperCoders shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.
//               </p>
//             </section>

//             <section id="indemnification" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 12. Indemnification
//               </motion.h2>
//               <p className="text-gray-300">
//                 You agree to indemnify SniperCoders against any claims arising from your use of our services.
//               </p>
//             </section>

//             <section id="governing-law-and-jurisdiction" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 13. Governing Law And Jurisdiction
//               </motion.h2>
//               <p className="text-gray-300">
//                 These Terms are governed by local and national legal frameworks.
//               </p>
//             </section>

//             <section id="dispute-resolution" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 14. Dispute Resolution
//               </motion.h2>
//               <p className="text-gray-300">
//                 Disputes will be resolved through mediation before proceeding to legal action, as per local laws.
//               </p>
//             </section>

//             <section id="severability" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 15. Severability
//               </motion.h2>
//               <p className="text-gray-300">
//                 If any provision of these Terms is found to be invalid, the remaining provisions will remain in effect.
//               </p>
//             </section>

//             <section id="entire-agreement" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 16. Entire Agreement
//               </motion.h2>
//               <p className="text-gray-300">
//                 These Terms constitute the entire agreement between you and SniperCoders regarding the use of our services.
//               </p>
//             </section>

//             <section id="waiver" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 17. Waiver
//               </motion.h2>
//               <p className="text-gray-300">
//                 No waiver of any term will be deemed a further or continuing waiver of such term.
//               </p>
//             </section>

//             <section id="assignment" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 18. Assignment
//               </motion.h2>
//               <p className="text-gray-300">
//                 You may not assign your rights under these Terms without our prior written consent.
//               </p>
//             </section>

//             <section id="notices" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 19. Notices
//               </motion.h2>
//               <p className="text-gray-300">
//                 Notices will be sent to the email address provided during registration.
//               </p>
//             </section>

//             <section id="changes-to-terms-of-service" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 20. Changes To Terms Of Service
//               </motion.h2>
//               <p className="text-gray-300">
//                 We may update these Terms from time to time. The latest version will be available on our website.
//               </p>
//             </section>

//             <section id="contact-information" className="mb-12">
//               <motion.h2 
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 21. Contact Information
//               </motion.h2>
//               <p className="mb-4 text-gray-300">For any questions regarding these Terms:</p>
//               <div className="bg-gray-700/50 p-6 rounded-lg shadow-lg">
//                 <p className="mb-2 text-gray-300">
//                   <strong>Email:</strong> <a href="mailto:snipercoders25@gmail.com" className="text-blue-400 hover:underline">snipercoders25@gmail.com</a>
//                 </p>
             
//               </div>
//             </section>
//           </motion.main>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="relative z-20 bg-gray-950/70 backdrop-blur-lg border-t border-gray-800/50 text-white py-16 mt-20">
//         <div className="container mx-auto px-6">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
//             <motion.div
//               variants={textVariants}
//               initial="initial"
//               animate="animate"
//             >
//               <div className="flex items-center mb-6">
//                 <div className="text-3xl font-extrabold">
//                   <span className="bg-clip-text bg-gradient-to-r text-white animate-gradient">
//                     SniperCoders
//                   </span>
//                 </div>
//               </div>
//               <p className="text-gray-300 text-sm leading-relaxed">
//                 We specialize in turning visionary ideas into reality. Our
//                 expertise helps businesses transform aspirations into tangible
//                 solutions, paving the way for future growth.
//               </p>
//             </motion.div>

//             {[
//               {
//                 title: "Our Services",
//                 items: [
//                   { label: "Custom Software Dev", href: "/services/custom-software-development" },
//                   { label: "Website Development", href: "/services/web-development" },
//                   { label: "Mobile App Development", href: "/services/mobile-development" },
//                   { label: "IT Consulting", href: "/services/it-consulting" },
//                 ],
//               },
//               {
//                 title: "Useful Links",
//                 items: [
//                   { label: "Terms of Service", href: "/terms" },
//                   { label: "Privacy Policy", href: "/privacy" },
//                   { label: "Refund Policy", href: "/refund" },
//                 ],
//               },
//               {
//                 title: "Get In Touch",
//                 items: [
//                   { label: "About Us", href: "/about" },
//                   { label: "Contact Us", href: "/contact" },
//                   { label: "FAQs", href: "/faqs" },
//                   { label: "Testimonials", href: "/showcase" },
//                 ],
//               },
//             ].map((section, idx) => (
//               <motion.div
//                 key={idx}
//                 variants={textVariants}
//                 initial="initial"
//                 animate="animate"
//               >
//                 <h3 className="text-lg font-semibold mb-6 text-gray-200">
//                   {section.title}
//                 </h3>
//                 <ul className="space-y-3">
//                   {section.items.map((item, i) => (
//                     <motion.li
//                       key={i}
//                       whileHover={{ scale: 1.1, color: '#60A5FA' }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <a
//                         href={item.href}
//                         className="text-gray-300 text-sm transition-colors"
//                       >
//                         {item.label}
//                       </a>
//                     </motion.li>
//                   ))}
//                 </ul>
//               </motion.div>
//             ))}
//           </div>
//           <motion.div
//             className="mt-12 pt-10 border-t border-gray-800/50 text-center text-gray-400 text-sm"
//             variants={textVariants}
//             initial="initial"
//             animate="animate"
//           >
//             © {new Date().getFullYear()} SniperCoders. All rights reserved.
//           </motion.div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default TermsOfService;














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