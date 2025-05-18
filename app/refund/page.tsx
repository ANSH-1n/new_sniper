
// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import * as THREE from "three";
// import { motion } from "framer-motion";

// type Bubble = THREE.Mesh & {
//   velocityY: number;
//   sway: number;
// };

// const RefundPolicy = () => {
//   const [mounted, setMounted] = useState(false);
//   const canvasRef = useRef<HTMLDivElement>(null);
//   const threeRef = useRef<{ cleanup: () => void } | null>(null);

//   useEffect(() => {
//     setMounted(true);

//     if (canvasRef.current && !threeRef.current) {
//       const scene = new THREE.Scene();
//       const camera = new THREE.PerspectiveCamera(
//         75,
//         window.innerWidth / window.innerHeight,
//         0.1,
//         1000
//       );
//       const renderer = new THREE.WebGLRenderer({
//         alpha: true,
//         antialias: true,
//       });

//       renderer.setSize(window.innerWidth, window.innerHeight);
//       renderer.setClearColor(0x000000, 0);
//       canvasRef.current.appendChild(renderer.domElement);

//       const bubbles: Bubble[] = [];
//       const bubbleGeometry = new THREE.SphereGeometry(0.1, 16, 16);
//       const bubbleMaterial = new THREE.MeshBasicMaterial({
//         color: 0x60a5fa,
//         transparent: true,
//         opacity: 0.5,
//       });

//       //   for (let i = 0; i < 100; i++) {
//       //     const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial) as Bubble;
//       //     bubble.position.set(
//       //       (Math.random() - 0.5) * 20,
//       //       -10 + (Math.random() * 5),
//       //       (Math.random() - 0.5) * 10
//       //     );
//       //     bubble.velocityY = 0.02 + Math.random() * 0.03;
//       //     bubble.sway = Math.random() * 0.02;
//       //     bubbles.push(bubble);
//       //     scene.add(bubble);
//       //   }

//       for (let i = 0; i < 100; i++) {
//         const bubble = new THREE.Mesh(
//           bubbleGeometry,
//           bubbleMaterial
//         ) as unknown as Bubble;
//         bubble.position.set(
//           (Math.random() - 0.5) * 20,
//           -10 + Math.random() * 5,
//           (Math.random() - 0.5) * 10
//         );
//         bubble.velocityY = 0.02 + Math.random() * 0.03;
//         bubble.sway = Math.random() * 0.02;
//         bubbles.push(bubble);
//         scene.add(bubble);
//       }

//       camera.position.z = 10;

//       const animate = () => {
//         requestAnimationFrame(animate);

//         bubbles.forEach((bubble, index) => {
//           bubble.position.y += bubble.velocityY;
//           bubble.position.x +=
//             Math.sin(Date.now() * 0.001 + index) * bubble.sway;

//           if (bubble.position.y > 10) {
//             bubble.position.y = -10;
//             bubble.position.x = (Math.random() - 0.5) * 20;
//           }
//         });

//         renderer.render(scene, camera);
//       };

//       animate();

//       const handleResize = () => {
//         camera.aspect = window.innerWidth / window.innerHeight;
//         camera.updateProjectionMatrix();
//         renderer.setSize(window.innerWidth, window.innerHeight);
//       };

//       window.addEventListener("resize", handleResize);

//       threeRef.current = {
//         cleanup: () => {
//           window.removeEventListener("resize", handleResize);
//           if (canvasRef.current) {
//             canvasRef.current.removeChild(renderer.domElement);
//           }
//           bubbles.forEach((bubble) => scene.remove(bubble));
//           bubbleGeometry.dispose();
//           bubbleMaterial.dispose();
//         },
//       };
//     }

//     return () => {
//       if (threeRef.current) {
//         threeRef.current.cleanup();
//       }
//     };
//   }, []);

//   const scrollToSection = (id: string) => {
//     const element = document.getElementById(id);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   if (!mounted) return null;

//   const textVariants = {
//     initial: { opacity: 0, y: 30 },
//     animate: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.8, ease: "easeOut" },
//     },
//   };

//   const hoverVariants = {
//     hover: { scale: 1.05, color: "#60A5FA", transition: { duration: 0.3 } },
//   };

//   return (
//     <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 min-h-screen">
//       <div
//         ref={canvasRef}
//         className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20 z-0"
//       />
//       <div className="container mx-auto px-4 py-8 relative z-10">
//         <header className="mb-12">
//           <motion.h1
//             className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             Refund Policy
//           </motion.h1>
//           <motion.p
//             className="text-gray-300 text-lg"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//           >
//             At SniperCoders, we are committed to delivering high-quality digital
//             services. Our Refund Policy ensures customer satisfaction, outlining
//             the conditions under which refunds may be provided.
//           </motion.p>

//           <div className="flex text-sm mt-4">
//             <Link
//               href="/"
//               className="text-gray-400 hover:text-blue-400 transition-colors"
//             >
//               Home
//             </Link>
//             <span className="mx-2 text-gray-500">›</span>
//             <span className="text-blue-400">Refund Policy</span>
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
//             <div className="sticky top-8 bg-gray-800/50 backdrop-blur-lg p-6 rounded-lg shadow-lg">
//               <h3 className="text-2xl font-semibold text-blue-400 mb-4">
//                 Contents
//               </h3>
//               <nav className="space-y-3">
//                 {[
//                   "Purpose",
//                   "Service Categories and Refund Terms",
//                   "Refund Request Process",
//                   "Exclusions",
//                   "Warranty and Guarantees",
//                   "Dispute Resolution",
//                   "Contact Information",
//                   "Policy Updates",
//                 ].map((item) => (
//                   <motion.div
//                     key={item}
//                     className="text-sm"
//                     whileHover="hover"
//                     variants={hoverVariants}
//                   >
//                     <button
//                       onClick={() =>
//                         scrollToSection(item.toLowerCase().replace(/\s+/g, "-"))
//                       }
//                       className="block text-gray-300 py-2 px-3 rounded-lg hover:bg-gray-700/50 transition-colors w-full text-left"
//                     >
//                       {item}
//                     </button>
//                   </motion.div>
//                 ))}
//               </nav>
//             </div>
//           </motion.aside>

//           {/* Main Content */}
//           <motion.main
//             className="flex-1 bg-gray-800/30 backdrop-blur-lg p-8 rounded-lg shadow-xl"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//           >
//             <section id="purpose" className="mb-12">
//               <motion.h2
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 1. Purpose
//               </motion.h2>
//               <p className="text-gray-300">
//                 This Refund Policy outlines our approach to refunds across our
//                 various service offerings.
//               </p>
//             </section>

//             <section id="service-categories-and-refund-terms" className="mb-12">
//               <motion.h2
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 2. Service Categories and Refund Terms
//               </motion.h2>

//               <h3 className="text-xl font-medium text-blue-300 mb-3">
//                 2.1 Web Design & Development Services
//               </h3>
//               <p className="mb-2 text-gray-300">
//                 <strong>Initial Consultation:</strong> Free of charge
//               </p>
//               <p className="mb-4 text-gray-300">
//                 Deposit: 50% non-refundable deposit required before project
//                 commencement
//               </p>

//               <p className="mb-2 text-gray-300">
//                 <strong>Refund Eligibility:</strong>
//               </p>
//               <ul className="list-disc ml-6 space-y-2 mb-4 text-gray-300">
//                 <li>If we fail to meet agreed-upon project specifications</li>
//                 <li>
//                   If delivery is significantly delayed beyond the agreed
//                   timeline
//                 </li>
//               </ul>

//               <p className="mb-2 text-gray-300">
//                 <strong>Non-Refundable Scenarios:</strong>
//               </p>
//               <ul className="list-disc ml-6 space-y-2 mb-4 text-gray-300">
//                 <li>Client-requested changes</li>
//                 <li>Scope modifications</li>
//                 <li>Additional development requirements</li>
//               </ul>

//               <h3 className="text-xl font-medium text-blue-300 mb-3">
//                 2.2 Mobile App Development Services
//               </h3>
//               <p className="mb-2 text-gray-300">
//                 <strong>Initial Consultation:</strong> Free of charge
//               </p>
//               <p className="mb-4 text-gray-300">
//                 Milestone-Based Pricing: Refunds considered on a case-by-case
//                 basis
//               </p>

//               <p className="mb-2 text-gray-300">
//                 <strong>Refund Conditions:</strong>
//               </p>
//               <ul className="list-disc ml-6 space-y-2 mb-4 text-gray-300">
//                 <li>Incomplete delivery of core project requirements</li>
//                 <li>Substantial deviation from initial project scope</li>
//               </ul>

//               <p className="mb-2 text-gray-300">
//                 <strong>Non-Refundable Elements:</strong>
//               </p>
//               <ul className="list-disc ml-6 space-y-2 mb-4 text-gray-300">
//                 <li>Custom features</li>
//                 <li>Advanced integrations</li>
//                 <li>Platform-specific development costs</li>
//               </ul>

//               <h3 className="text-xl font-medium text-blue-300 mb-3">
//                 2.3 Digital Marketing Services
//               </h3>
//               <p className="mb-2 text-gray-300">
//                 <strong>Initial Strategy Consultation:</strong> Free of charge
//               </p>
//               <p className="mb-4 text-gray-300">
//                 <strong>Refund Policy:</strong>
//               </p>
//               <ul className="list-disc ml-6 space-y-2 mb-4 text-gray-300">
//                 <li>
//                   Partial refunds may be considered for underperforming
//                   campaigns
//                 </li>
//                 <li>
//                   Performance metrics will be used to evaluate refund requests
//                 </li>
//               </ul>

//               <p className="mb-2 text-gray-300">
//                 <strong>Non-Refundable Expenses:</strong>
//               </p>
//               <ul className="list-disc ml-6 space-y-2 mb-4 text-gray-300">
//                 <li>Ad spend</li>
//                 <li>Platform subscription costs</li>
//               </ul>

//               <h3 className="text-xl font-medium text-blue-300 mb-3">
//                 2.4 IoT Integration Services
//               </h3>
//               <p className="mb-2 text-gray-300">
//                 <strong>Consultation:</strong> Free initial technical assessment
//               </p>
//               <p className="mb-4 text-gray-300">
//                 <strong>Refund Conditions:</strong>
//               </p>
//               <ul className="list-disc ml-6 space-y-2 mb-4 text-gray-300">
//                 <li>
//                   Refunds considered if solution fails to meet core technical
//                   specifications
//                 </li>
//                 <li>Partial refunds for incomplete system integrations</li>
//               </ul>

//               <p className="mb-2 text-gray-300">
//                 <strong>Non-Refundable Components:</strong>
//               </p>
//               <ul className="list-disc ml-6 space-y-2 mb-4 text-gray-300">
//                 <li>Hardware costs</li>
//                 <li>Specialized equipment</li>
//                 <li>Custom integration expenses</li>
//               </ul>
//             </section>

//             <section id="refund-request-process" className="mb-12">
//               <motion.h2
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 3. Refund Request Process
//               </motion.h2>

//               <h3 className="text-xl font-medium text-blue-300 mb-3">
//                 3.1 Submission of Refund Request
//               </h3>
//               <p className="mb-4 text-gray-300">
//                 Submit requests in writing to support@snipercoders.com
//               </p>
//               <p className="mb-2 text-gray-300">
//                 <strong>Include:</strong>
//               </p>
//               <ul className="list-disc ml-6 space-y-2 mb-4 text-gray-300">
//                 <li>Project details</li>
//                 <li>Specific reasons for the refund request</li>
//                 <li>Supporting documentation</li>
//               </ul>
//               <p className="text-gray-300">
//                 Requests must be submitted within 30 days of project completion.
//               </p>
//             </section>

//             <section id="exclusions" className="mb-12">
//               <motion.h2
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 4. Exclusions
//               </motion.h2>

//               <h3 className="text-xl font-medium text-blue-300 mb-3">
//                 4.1 Non-Refundable Services
//               </h3>
//               <ul className="list-disc ml-6 space-y-2 mb-4 text-gray-300">
//                 <li>Consulting hours</li>
//                 <li>Training sessions</li>
//                 <li>Customizations with specialized requirements</li>
//               </ul>

//               <h3 className="text-xl font-medium text-blue-300 mb-3">
//                 4.2 Circumstances Preventing Refunds
//               </h3>
//               <ul className="list-disc ml-6 space-y-2 mb-4 text-gray-300">
//                 <li>Client-induced project changes</li>
//                 <li>Failure to provide necessary project information</li>
//                 <li>Cancellation after significant work has been completed</li>
//               </ul>
//             </section>

//             <section id="warranty-and-guarantees" className="mb-12">
//               <motion.h2
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 5. Warranty and Guarantees
//               </motion.h2>

//               <h3 className="text-xl font-medium text-blue-300 mb-3">
//                 5.1 Service Warranty
//               </h3>
//               <ul className="list-disc ml-6 space-y-2 mb-4 text-gray-300">
//                 <li>30-day post-delivery support for all digital solutions</li>
//                 <li>Free minor bug fixes and adjustments</li>
//                 <li>Performance optimization assistance</li>
//               </ul>

//               <h3 className="text-xl font-medium text-blue-300 mb-3">
//                 5.2 Performance Guarantees
//               </h3>
//               <ul className="list-disc ml-6 space-y-2 mb-4 text-gray-300">
//                 <li>Transparent reporting of project milestones</li>
//                 <li>Regular progress updates</li>
//                 <li>Commitment to meeting agreed-upon specifications</li>
//               </ul>
//             </section>

//             <section id="dispute-resolution" className="mb-12">
//               <motion.h2
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 6. Dispute Resolution
//               </motion.h2>

//               <h3 className="text-xl font-medium text-blue-300 mb-3">
//                 6.1 Mediation Process
//               </h3>
//               <p className="mb-4 text-gray-300">
//                 Internal review committee for an objective assessment of refund
//                 requests.
//               </p>

//               <h3 className="text-xl font-medium text-blue-300 mb-3">
//                 6.2 Legal Jurisdiction
//               </h3>
//               <p className="text-gray-300">
//                 Disputes to be resolved governed by local and national legal
//                 frameworks.
//               </p>
//             </section>

//             <section id="contact-information" className="mb-12">
//               <motion.h2
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 7. Contact Information
//               </motion.h2>
//               <p className="mb-4 text-gray-300">
//                 For all refund-related inquiries:
//               </p>
//               <div className="bg-gray-700/50 p-6 rounded-lg shadow-lg">
//                 <p className="mb-2 text-gray-300">
//                   <strong>Email:</strong>{" "}
//                   <a
//                     href="mailto:snipercoders25@gmail.com"
//                     className="text-blue-400 hover:underline"
//                   >
//                     support@snipercoders.com
//                   </a>
//                 </p>
//                 <p className="text-gray-300">
//                   <strong>Address:</strong> SniperCoders
//                 </p>
//               </div>
//             </section>

//             <section id="policy-updates" className="mb-12">
//               <motion.h2
//                 className="text-2xl font-semibold text-blue-400 mb-4"
//                 whileInView={{ opacity: [0, 1], y: [-20, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 8. Policy Updates
//               </motion.h2>
//               <p className="mb-4 text-gray-300">Last Updated: 17/03/2025</p>
//               <p className="text-gray-300">
//                 Subject to change without prior notice. Most recent version
//                 available on our website.
//               </p>
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
//                   {
//                     label: "Custom Software Dev",
//                     href: "/services/custom-software-development",
//                   },
//                   {
//                     label: "Website Development",
//                     href: "/services/web-development",
//                   },
//                   {
//                     label: "Mobile App Development",
//                     href: "/services/mobile-development",
//                   },

//                   { label: "IT Consulting", href: "/services/it-consulting" }, // Replaces Cloud Solutions
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
//                       whileHover={{ x: 8 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <a
//                         href={item.href}
//                         className="text-gray-300 hover:text-cyan-400 transition-colors text-sm"
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
//             © {new Date().getFullYear()} SniperCoders Global Technologies. All
//             rights reserved.
//           </motion.div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default RefundPolicy;
















"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";

type Bubble = THREE.Mesh & {
  velocityY: number;
  sway: number;
  scale: number;
  color: THREE.Color;
};

const RefundPolicy = () => {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const threeRef = useRef<{ cleanup: () => void } | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    setMounted(true);

    if (canvasRef.current && !threeRef.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      canvasRef.current.appendChild(renderer.domElement);

      const bubbles: Bubble[] = [];
      const bubbleGeometry = new THREE.SphereGeometry(1, 32, 32);
      const bubbleColors = [
        new THREE.Color(0x60a5fa),
        new THREE.Color(0x93c5fd),
        new THREE.Color(0xbae6fd),
      ];

      for (let i = 0; i < 150; i++) {
        const scale = 0.05 + Math.random() * 0.15;
        const bubbleMaterial = new THREE.MeshBasicMaterial({
          color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
          transparent: true,
          opacity: 0.3 + Math.random() * 0.4,
        });

        const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial) as Bubble;
        bubble.scale.set(scale, scale, scale);
        bubble.position.set(
          (Math.random() - 0.5) * 25,
          -12 + Math.random() * 6,
          (Math.random() - 0.5) * 15
        );
        bubble.velocityY = 0.03 + Math.random() * 0.05;
        bubble.sway = Math.random() * 0.03;
        bubble.color = bubbleMaterial.color;
        bubbles.push(bubble);
        scene.add(bubble);
      }

      camera.position.z = 12;

      const animate = () => {
        requestAnimationFrame(animate);

        bubbles.forEach((bubble, index) => {
          bubble.position.y += bubble.velocityY;
          bubble.position.x +=
            Math.sin(Date.now() * 0.001 + index * 0.1) * bubble.sway;
          bubble.position.z +=
            Math.cos(Date.now() * 0.002 + index * 0.2) * bubble.sway * 0.5;

          // Subtle scale pulse
          const pulse = Math.sin(Date.now() * 0.003 + index) * 0.02 + 1;
          bubble.scale.set(
            bubble.scale.x * pulse,
            bubble.scale.y * pulse,
            bubble.scale.z * pulse
          );

          if (bubble.position.y > 12) {
            bubble.position.y = -12;
            bubble.position.x = (Math.random() - 0.5) * 25;
            bubble.position.z = (Math.random() - 0.5) * 15;
          }
        });

        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener("resize", handleResize);

      threeRef.current = {
        cleanup: () => {
          window.removeEventListener("resize", handleResize);
          if (canvasRef.current) {
            canvasRef.current.removeChild(renderer.domElement);
          }
          bubbles.forEach((bubble) => scene.remove(bubble));
          bubbleGeometry.dispose();
          bubbles.forEach((bubble) => bubble.material.dispose());
        },
      };
    }

    return () => {
      if (threeRef.current) {
        threeRef.current.cleanup();
      }
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!mounted) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    rest: { scale: 1, x: 0 },
    hover: {
      scale: 1.05,
      x: 8,
      color: "#93C5FD",
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 min-h-screen" ref={containerRef}>
      <div
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-25 z-0"
      />
      <motion.div
        className="container mx-auto px-6 py-12 relative z-10"
        style={{ y: parallaxY }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <header className="mb-16">
          <motion.h1
            className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-6"
            variants={itemVariants}
          >
            Refund Policy
          </motion.h1>
          <motion.p
            className="text-gray-300 text-xl max-w-2xl"
            variants={itemVariants}
          >
            At SniperCoders, we are committed to delivering exceptional digital
            services. Our Refund Policy ensures customer satisfaction, outlining
            clear conditions for refund eligibility.
          </motion.p>

          <motion.div
            className="flex text-sm mt-6"
            variants={itemVariants}
          >
            <Link
              href="/"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              Home
            </Link>
            <span className="mx-2 text-gray-500">›</span>
            <span className="text-blue-400">Refund Policy</span>
          </motion.div>
        </header>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar/Contents */}
          <motion.aside
            className="md:w-72 flex-shrink-0"
            variants={itemVariants}
          >
            <div className="sticky top-12 bg-gray-800/70 backdrop-blur-xl p-8 rounded-xl shadow-2xl">
              <h3 className="text-3xl font-semibold text-blue-400 mb-6">
                Contents
              </h3>
              <nav className="space-y-4">
                {[
                  "Purpose",
                  "Service Categories and Refund Terms",
                  "Refund Request Process",
                  "Exclusions",
                  "Warranty and Guarantees",
                  "Dispute Resolution",
                  "Contact Information",
                  "Policy Updates",
                ].map((item) => (
                  <motion.div
                    key={item}
                    className="text-base"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      onClick={() =>
                        scrollToSection(item.toLowerCase().replace(/\s+/g, "-"))
                      }
                      className="block text-gray-300 py-3 px-4 rounded-lg hover:bg-gray-700/70 transition-all w-full text-left font-medium"
                    >
                      {item}
                    </button>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.aside>

          {/* Main Content */}
          <motion.main
            className="flex-1 bg-gray-800/40 backdrop-blur-xl p-10 rounded-xl shadow-2xl"
            variants={itemVariants}
          >
            <section id="purpose" className="mb-16">
              <motion.h2
                className="text-3xl font-semibold text-blue-400 mb-6"
                variants={itemVariants}
              >
                1. Purpose
              </motion.h2>
              <motion.p
                className="text-gray-300 text-lg"
                variants={itemVariants}
              >
                This Refund Policy outlines our approach to refunds across our
                diverse service offerings, ensuring transparency and fairness.
              </motion.p>
            </section>

            <section id="service-categories-and-refund-terms" className="mb-16">
              <motion.h2
                className="text-3xl font-semibold text-blue-400 mb-6"
                variants={itemVariants}
              >
                2. Service Categories and Refund Terms
              </motion.h2>

              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-medium text-blue-300 mb-4">
                  2.1 Web Design & Development Services
                </h3>
                <p className="mb-3 text-gray-300">
                  <strong>Initial Consultation:</strong> Free of charge
                </p>
                <p className="mb-6 text-gray-300">
                  Deposit: 50% non-refundable deposit required before project
                  commencement
                </p>

                <p className="mb-3 text-gray-300">
                  <strong>Refund Eligibility:</strong>
                </p>
                <ul className="list-disc ml-8 space-y-3 mb-6 text-gray-300">
                  <li>If we fail to meet agreed-upon project specifications</li>
                  <li>
                    If delivery is significantly delayed beyond the agreed timeline
                  </li>
                </ul>

                <p className="mb-3 text-gray-300">
                  <strong>Non-Refundable Scenarios:</strong>
                </p>
                <ul className="list-disc ml-8 space-y-3 mb-6 text-gray-300">
                  <li>Client-requested changes</li>
                  <li>Scope modifications</li>
                  <li>Additional development requirements</li>
                </ul>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-medium text-blue-300 mb-4">
                  2.2 Mobile App Development Services
                </h3>
                <p className="mb-3 text-gray-300">
                  <strong>Initial Consultation:</strong> Free of charge
                </p>
                <p className="mb-6 text-gray-300">
                  Milestone-Based Pricing: Refunds considered on a case-by-case
                  basis
                </p>

                <p className="mb-3 text-gray-300">
                  <strong>Refund Conditions:</strong>
                </p>
                <ul className="list-disc ml-8 space-y-3 mb-6 text-gray-300">
                  <li>Incomplete delivery of core project requirements</li>
                  <li>Substantial deviation from initial project scope</li>
                </ul>

                <p className="mb-3 text-gray-300">
                  <strong>Non-Refundable Elements:</strong>
                </p>
                <ul className="list-disc ml-8 space-y-3 mb-6 text-gray-300">
                  <li>Custom features</li>
                  <li>Advanced integrations</li>
                  <li>Platform-specific development costs</li>
                </ul>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-medium text-blue-300 mb-4">
                  2.3 Digital Marketing Services
                </h3>
                <p className="mb-3 text-gray-300">
                  <strong>Initial Strategy Consultation:</strong> Free of charge
                </p>
                <p className="mb-6 text-gray-300">
                  <strong>Refund Policy:</strong>
                </p>
                <ul className="list-disc ml-8 space-y-3 mb-6 text-gray-300">
                  <li>
                    Partial refunds may be considered for underperforming campaigns
                  </li>
                  <li>
                    Performance metrics will be used to evaluate refund requests
                  </li>
                </ul>

                <p className="mb-3 text-gray-300">
                  <strong>Non-Refundable Expenses:</strong>
                </p>
                <ul className="list-disc ml-8 space-y-3 mb-6 text-gray-300">
                  <li>Ad spend</li>
                  <li>Platform subscription costs</li>
                </ul>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-medium text-blue-300 mb-4">
                  2.4 IoT Integration Services
                </h3>
                <p className="mb-3 text-gray-300">
                  <strong>Consultation:</strong> Free initial technical assessment
                </p>
                <p className="mb-6 text-gray-300">
                  <strong>Refund Conditions:</strong>
                </p>
                <ul className="list-disc ml-8 space-y-3 mb-6 text-gray-300">
                  <li>
                    Refunds considered if solution fails to meet core technical
                    specifications
                  </li>
                  <li>Partial refunds for incomplete system integrations</li>
                </ul>

                <p className="mb-3 text-gray-300">
                  <strong>Non-Refundable Components:</strong>
                </p>
                <ul className="list-disc ml-8 space-y-3 mb-6 text-gray-300">
                  <li>Hardware costs</li>
                  <li>Specialized equipment</li>
                  <li>Custom integration expenses</li>
                </ul>
              </motion.div>
            </section>

            <section id="refund-request-process" className="mb-16">
              <motion.h2
                className="text-3xl font-semibold text-blue-400 mb-6"
                variants={itemVariants}
              >
                3. Refund Request Process
              </motion.h2>

              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-medium text-blue-300 mb-4">
                  3.1 Submission of Refund Request
                </h3>
                <p className="mb-6 text-gray-300">
                  Submit requests in writing to support@snipercoders.com
                </p>
                <p className="mb-3 text-gray-300">
                  <strong>Include:</strong>
                </p>
                <ul className="list-disc ml-8 space-y-3 mb-6 text-gray-300">
                  <li>Project details</li>
                  <li>Specific reasons for the refund request</li>
                  <li>Supporting documentation</li>
                </ul>
                <p className="text-gray-300">
                  Requests must be submitted within 30 days of project completion.
                </p>
              </motion.div>
            </section>

            <section id="exclusions" className="mb-16">
              <motion.h2
                className="text-3xl font-semibold text-blue-400 mb-6"
                variants={itemVariants}
              >
                4. Exclusions
              </motion.h2>

              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-medium text-blue-300 mb-4">
                  4.1 Non-Refundable Services
                </h3>
                <ul className="list-disc ml-8 space-y- ataxia: 3 mb-6 text-gray-300">
                  <li>Consulting hours</li>
                  <li>Training sessions</li>
                  <li>Customizations with specialized requirements</li>
                </ul>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-medium text-blue-300 mb-4">
                  4.2 Circumstances Preventing Refunds
                </h3>
                <ul className="list-disc ml-8 space-y-3 mb-6 text-gray-300">
                  <li>Client-induced project changes</li>
                  <li>Failure to provide necessary project information</li>
                  <li>Cancellation after significant work has been completed</li>
                </ul>
              </motion.div>
            </section>

            <section id="warranty-and-guarantees" className="mb-16">
              <motion.h2
                className="text-3xl font-semibold text-blue-400 mb-6"
                variants={itemVariants}
              >
                5. Warranty and Guarantees
              </motion.h2>

              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-medium text-blue-300 mb-4">
                  5.1 Service Warranty
                </h3>
                <ul className="list-disc ml-8 space-y-3 mb-6 text-gray-300">
                  <li>30-day post-delivery support for all digital solutions</li>
                  <li>Free minor bug fixes and adjustments</li>
                  <li>Performance optimization assistance</li>
                </ul>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-medium text-blue-300 mb-4">
                  5.2 Performance Guarantees
                </h3>
                <ul className="list-disc ml-8 space-y-3 mb-6 text-gray-300">
                  <li>Transparent reporting of project milestones</li>
                  <li>Regular progress updates</li>
                  <li>Commitment to meeting agreed-upon specifications</li>
                </ul>
              </motion.div>
            </section>

            <section id="dispute-resolution" className="mb-16">
              <motion.h2
                className="text-3xl font-semibold text-blue-400 mb-6"
                variants={itemVariants}
              >
                6. Dispute Resolution
              </motion.h2>

              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-medium text-blue-300 mb-4">
                  6.1 Mediation Process
                </h3>
                <p className="mb-6 text-gray-300">
                  Internal review committee for an objective assessment of refund
                  requests.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-medium text-blue-300 mb-4">
                  6.2 Legal Jurisdiction
                </h3>
                <p className="text-gray-300">
                  Disputes to be resolved governed by local and national legal
                  frameworks.
                </p>
              </motion.div>
            </section>

            <section id="contact-information" className="mb-16">
              <motion.h2
                className="text-3xl font-semibold text-blue-400 mb-6"
                variants={itemVariants}
              >
                7. Contact Information
              </motion.h2>
              <motion.div
                className="bg-gray-700/70 backdrop-blur-lg p-8 rounded-xl shadow-lg"
                variants={itemVariants}
              >
                <p className="mb-3 text-gray-300">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:snipercoders25@gmail.com"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    support@snipercoders.com
                  </a>
                </p>
                <p className="text-gray-300">
                  <strong>Address:</strong> SniperCoders
                </p>
              </motion.div>
            </section>

            <section id="policy-updates" className="mb-16">
              <motion.h2
                className="text-3xl font-semibold text-blue-400 mb-6"
                variants={itemVariants}
              >
                8. Policy Updates
              </motion.h2>
              <motion.p
                className="mb-6 text-gray-300"
                variants={itemVariants}
              >
                Last Updated: 17/03/2025
              </motion.p>
              <motion.p
                className="text-gray-300"
                variants={itemVariants}
              >
                Subject to change without prior notice. Most recent version
                available on our website.
              </motion.p>
            </section>
          </motion.main>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="relative z-20 bg-gray-950/80 backdrop-blur-xl border-t border-gray-800/70 text-white py-20 mt-24"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
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
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-6 text-gray-200">
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.items.map((item, i) => (
                    <motion.li
                      key={i}
                      whileHover={{ x: 10, color: "#93C5FD" }}
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
            className="mt-12 pt-10 border-t border-gray-800/70 text-center text-gray-400 text-sm"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            © {new Date().getFullYear()} SniperCoders Global Technologies. All
            rights reserved.
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
};

export default RefundPolicy;