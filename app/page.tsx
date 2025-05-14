
"use client";

import React from "react";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
// Removed unused imports: Image, AnimatePresence, Link
import ParallaxSection from "@/components/ParallaxSection";
import Agent from "../components/Agent";
import ServiceCard from "../components/ServiceCard";
import TrendService from "../components/TrendService";
import * as THREE from 'three';

// Define strict types
interface MousePosition {
  x: number;
  y: number;
}

interface Service {
  title: string;
  description: string;
  gradient: string;
}

interface SphereUserData {
  speedX: number;
  speedY: number;
  speedZ: number;
}

interface FooterSection {
  title: string;
  items: FooterItem[];
}

interface FooterItem {
  label: string;
  href: string;
}

// Define the image array - kept for future use
const images: string[] = [
  "/images/WhatsApp Image 2025-04-26 at 00.36.53_7a7c76d0.jpg",
  "/images/WhatsApp Image 2025-04-26 at 00.36.53_e9750733.jpg",
  "/images/WhatsApp Image 2025-04-26 at 00.36.54_0c30b183.jpg",
  "/images/WhatsApp Image 2025-04-26 at 00.36.54_0ff1fda2.jpg",
];

export default function Home(): React.ReactElement {
  // Removed unused state variables but kept the setter for future use
  const [, setCurrentImage] = useState<number>(0);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [, setScrollY] = useState<number>(0);
  
  const threeContainerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const spheresRef = useRef<THREE.Mesh[]>([]);
  const frameIdRef = useRef<number | null>(null);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = (): void => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Image carousel effect
  useEffect(() => {
    const interval: NodeJS.Timeout = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Mouse movement effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Three.js background effect
  useEffect(() => {
    if (!threeContainerRef.current) return;

    // Store ref value to use in cleanup function
    const container = threeContainerRef.current;

    // Initialize Three.js scene
    const scene: THREE.Scene = new THREE.Scene();
    const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    camera.position.z = 30;
    
    // Create spheres with different materials
    const spheres: THREE.Mesh<THREE.SphereGeometry, THREE.MeshPhongMaterial>[] = [];
    const colors: number[] = [0x4a2ef7, 0xff2a8a, 0x00fffc];
    
    for (let i = 0; i < 15; i++) {
      const geometry: THREE.SphereGeometry = new THREE.SphereGeometry(Math.random() * 1.5 + 0.3, 32, 32);
      const material: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        transparent: true,
        opacity: 0.6,
        shininess: 100
      });
      
      const sphere: THREE.Mesh<THREE.SphereGeometry, THREE.MeshPhongMaterial> = new THREE.Mesh(geometry, material);
      
      // Random positions
      sphere.position.x = (Math.random() - 0.5) * 60;
      sphere.position.y = (Math.random() - 0.5) * 60;
      sphere.position.z = (Math.random() - 0.5) * 30 - 10;
      
      // Random speeds
      sphere.userData = {
        speedX: (Math.random() - 0.5) * 0.05,
        speedY: (Math.random() - 0.5) * 0.05,
        speedZ: (Math.random() - 0.5) * 0.01,
      } as SphereUserData;
      
      scene.add(sphere);
      spheres.push(sphere);
    }
    
    // Add lights
    const ambientLight: THREE.AmbientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    
    const pointLight1: THREE.PointLight = new THREE.PointLight(0xff9dff, 1, 100);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);
    
    const pointLight2: THREE.PointLight = new THREE.PointLight(0x4a9fff, 1, 100);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);
    
    // Animation function
    const animate = (): void => {
      frameIdRef.current = requestAnimationFrame(animate);
      
      // Update sphere positions based on mouse
      spheres.forEach((sphere) => {
        const userData = sphere.userData as SphereUserData;
        sphere.position.x += userData.speedX;
        sphere.position.y += userData.speedY;
        sphere.position.z += userData.speedZ;
        
        // Boundaries check
        if (Math.abs(sphere.position.x) > 30) userData.speedX *= -1;
        if (Math.abs(sphere.position.y) > 30) userData.speedY *= -1;
        if (Math.abs(sphere.position.z) > 20) userData.speedZ *= -1;
        
        // Influence from mouse position
        sphere.position.x += (mousePosition.x * 2 - 1) * 0.01;
        sphere.position.y += (1 - mousePosition.y * 2) * 0.01;
        
        // Rotate each sphere
        sphere.rotation.x += 0.002;
        sphere.rotation.y += 0.003;
      });
      
      // Move lights slightly based on mouse
      pointLight1.position.x = 10 + mousePosition.x * 5;
      pointLight1.position.y = 10 + mousePosition.y * 5;
      
      renderer.render(scene, camera);
    };
    
    // Handle window resize
    const handleResize = (): void => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    animate();
    
    // Save refs for cleanup
    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;
    spheresRef.current = spheres;
    
    return () => {
      // Cleanup
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      // Dispose geometries and materials
      spheres.forEach(sphere => {
        sphere.geometry.dispose();
        sphere.material.dispose();
      });
    };
  }, [mousePosition]);

  const services: Service[] = [
    {
      title: "Custom Web Solutions",
      description:
        "We design and develop websites tailored to your specific requirements using cutting-edge technologies.",
      gradient:
        "from-purple-900 to-pink-500 hover:scale-110 hover:text-white transition-all duration-200",
    },
    {
      title: "Mobile-Friendly Design",
      description:
        "Our websites are optimized for seamless user experiences across all devices.",
      gradient:
        "from-pink-500 to-pink-400 hover:scale-110 hover:text-white transition-all duration-200",
    },
    {
      title: "E-commerce Integration",
      description:
        "Robust e-commerce solutions with secure payment gateways and efficient inventory management.",
      gradient:
        "from-pink-400 to-purple-900 hover:scale-110 hover:text-white transition-all duration-200",
    },
  ];

  const textVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Footer sections with typed interface
  const footerSections: FooterSection[] = [
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
  ];



  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    
    // Set initial values
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);




  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a2a] text-white overflow-hidden pt-12">
      {/* Three.js container */}
      <div ref={threeContainerRef} className="fixed inset-0 z-0"></div>
      
      <ParallaxSection />
      
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="animated-orb orb-primary"></div>
        <div className="animated-orb orb-secondary"></div>
        <div className="animated-orb orb-tertiary"></div>
        <div className="particles-container">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 15 + 10}s`,
              }}
            ></div>
          ))}
        </div>
        <div
          className="interactive-gradient"
          style={{
            backgroundPosition: `${mousePosition.x * 100}% ${
              mousePosition.y * 100
            }%`,
          }}
        ></div>
        <div className="background-grid"></div>
      </div>

      <div className="relative z-10">
        <section className="flex flex-col lg:flex-row items-center justify-between px-6 py-20 relative">
          <div className="lg:w-3/4 w-full relative flex justify-between">
            <div className="relative w-[600px] h-[700px] lg:w-[800px] lg:h-[900px]">
              <motion.div 
                className="absolute top-9 left-16 w-full h-full bg-[url(/images/06d4ecd8bd9e3431187222535399542e[1].png)] bg-contain bg-no-repeat bg-center opacity-70 rounded-xl"
                animate={{
                  opacity: [0.5, 0.7, 0.5],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              ></motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 p-6 text-center lg:text-left"
              >
                {/* <div className="pl-8">
                  <div className="flex flex-row">
                    <motion.h1 
                      className="text-8xl font-bold mb-10 pt-10 ml-10 whitespace-nowrap transition-transform duration-200 glowing-text"
                      animate={{
                        textShadow: [
                          "0 0 5px rgba(255,0,255,0.5), 0 0 15px rgba(255,0,255,0.3)",
                          "0 0 10px rgba(0,255,255,0.5), 0 0 30px rgba(0,255,255,0.3)",
                          "0 0 5px rgba(255,0,255,0.5), 0 0 15px rgba(255,0,255,0.3)"
                        ]
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                      whileHover={{ 
                        scale: 1.1, 
                        transition: { duration: 0.3 }
                      }}
                    >
                      SniperCoders
                    </motion.h1>
                  </div>

                  <motion.p 
                    className="text-xl mb-5 ml-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    We craft powerful digital experiences to boost your brand&apos;s
                    visibility and engagement. As a results-driven software
                    agency, we specialize in delivering custom web and mobile
                    applications, scalable backend systems, and seamless user
                    experiences tailored to your business goals. Whether you&apos;re
                    a startup or an enterprise, our team of expert developers,
                    designers, and strategists is here to turn your ideas into
                    impactful digital solutions that drive growth, efficiency,
                    and customer loyalty.
                  </motion.p>


                  
                </div> */}

   <div className="w-full px-4 md:px-8 lg:px-16">
      <div className="flex flex-col items-center lg:items-start">
        <h1 
          className={`font-bold mb-6 pt-6 text-center lg:text-left transition-transform duration-200 
            ${isMobile ? 'text-4xl' : isTablet ? 'text-6xl' : 'text-8xl'}
          `}
          style={{
            textShadow: '0 0 5px rgba(255,0,255,0.5), 0 0 15px rgba(255,0,255,0.3)',
            animation: 'glow 5s infinite alternate'
          }}
        >
          SniperCoders
        </h1>
        
        <p className={`text-base md:text-lg lg:text-xl mb-5 text-center lg:text-left max-w-3xl`}>
                 We craft powerful digital experiences to boost your brand&apos;s
  visibility and engagement. As a results-driven software
  agency, we specialize in delivering custom web and mobile
  applications, scalable backend systems, and seamless user
  experiences tailored to your business goals. Whether you&apos;re
  a startup or an enterprise, our team of expert developers,
  designers, and strategists is here to turn your ideas into
  impactful digital solutions that drive growth, efficiency,
  and customer loyalty.

        </p>
      </div>

      <style jsx>{`
        @keyframes glow {
          0% {
            text-shadow: 0 0 5px rgba(255,0,255,0.5), 0 0 15px rgba(255,0,255,0.3);
          }
          50% {
            text-shadow: 0 0 10px rgba(0,255,255,0.5), 0 0 30px rgba(0,255,255,0.3);
          }
          100% {
            text-shadow: 0 0 5px rgba(255,0,255,0.5), 0 0 15px rgba(255,0,255,0.3);
          }
        }
      `}</style>
    </div>


              </motion.div>
            </div>
          </div>

          {/* Video Section with animated frame */}
          <motion.div 
            className="lg:w-1/3 w-full mt-10 lg:mt-0 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
          >
            <div className="relative w-full h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
              {/* Animated frame */}
              <motion.div 
                className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-md"
                animate={{
                  background: [
                    "linear-gradient(90deg, rgba(124,58,237,1) 0%, rgba(219,39,119,1) 100%)",
                    "linear-gradient(90deg, rgba(219,39,119,1) 0%, rgba(124,58,237,1) 100%)",
                    "linear-gradient(90deg, rgba(124,58,237,1) 0%, rgba(219,39,119,1) 100%)"
                  ]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              ></motion.div>

              {/* Content container */}
              <div className="relative bg-gray-800 w-full h-full rounded-lg overflow-hidden">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 z-10"></div>

                {/* Autoplaying video */}
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="/videos/introVideo.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Services with enhanced animations */}
        <section className="py-16 px-4 sm:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto text-center text-white relative z-10"
          >
            <h2 className="text-4xl font-bold mb-4">Our Specialization</h2>
            <p className="text-xl mb-8">
              We build scalable, responsive, and high-performance websites.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 0 20px rgba(255,0,255,0.3)",
                    transition: { duration: 0.3 }
                  }}
                >
                  <ServiceCard {...service} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <TrendService />

        {/* Why Choose Us */}
        <div className="py-20 px-4 sm:px-8 bg-[#0a0a2a] text-white relative z-10">
          <Agent />
          <div className="fixed inset-0 z-0">
            <div className="animated-orb orb-primary"></div>
            <div className="animated-orb orb-secondary"></div>
            <div className="animated-orb orb-tertiary"></div>
            <div className="particles-container">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="particle"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${Math.random() * 15 + 10}s`,
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Call to Action with enhanced animations */}
          <section className="py-16 px-4 sm:px-8 text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-10"
            >
              <motion.h3 
                className="text-4xl font-bold bg-clip-text text-transparent bg-white"
                animate={{
                  color: ["#ffffff", "#a855f7", "#ec4899", "#ffffff"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                Ready to Elevate Your Business?
              </motion.h3>
              
              <motion.p 
                className="text-lg mt-4"
                animate={{
                  opacity: [0.7, 1, 0.7],
                  y: [0, -5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                Take the first step towards growth and innovation today.
              </motion.p>
              
              <motion.a
                href="/services"
                className="mt-6 inline-block bg-gradient-to-r from-orange-400 to-yellow-500 text-white py-3 px-6 rounded-full text-lg transition-all relative overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(255,165,0,0.5)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Get Your Custom Solution</span>
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.4 }}
                ></motion.span>
              </motion.a>
            </motion.div>
          </section>
        </div>
      </div>
      
      {/* Enhanced footer with animations */}
      <footer className="relative z-20 bg-gray-950/70 backdrop-blur-lg border-t border-gray-800/50 text-white py-16 mt-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <motion.div
              variants={textVariants}
              initial="initial"
              animate="animate"
            >
              <div className="flex items-center mb-6">
                <motion.div 
                  className="text-3xl font-extrabold"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.span 
                    className="bg-clip-text text-white"
                    animate={{
                      textShadow: [
                        "0 0 3px rgba(255,255,255,0.7)",
                        "0 0 6px rgba(255,255,255,0.9)",
                        "0 0 3px rgba(255,255,255,0.7)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    SniperCoders
                  </motion.span>
                </motion.div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                We specialize in turning visionary ideas into reality. Our
                expertise helps businesses transform aspirations into tangible
                solutions, paving the way for future growth.
              </p>
            </motion.div>

            {footerSections.map((section, idx) => (
              <motion.div
                key={idx}
                variants={textVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.2 * idx }}
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
                        className="text-gray-300 hover:text-cyan-400 transition-colors text-sm relative group"
                      >
                        <span>{item.label}</span>
                        <motion.span 
                          className="absolute bottom-0 left-0 w-0 h-px bg-cyan-400 group-hover:w-full"
                          transition={{ duration: 0.3 }}
                        ></motion.span>
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
            transition={{ delay: 0.8 }}
          >
            © {new Date().getFullYear()} SniperCoders Global Technologies. All
            rights reserved.
          </motion.div>
        </div>
      </footer>
    </div>
  );
}