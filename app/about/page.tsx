"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, ChevronRight, Code } from "lucide-react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

interface BubbleProps {
  id: number;
  size: number;
  left: number;
  animationDuration: number;
  delay: number;
}

export default function SniperCodersWebsite() {
  const [bubbles, setBubbles] = useState<BubbleProps[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mountRef = useRef<HTMLDivElement>(null);

  // Three.js setup
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // 3D Particles
    const particleCount = 100;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 100;
      colors[i] = Math.random();
      colors[i + 1] = Math.random();
      colors[i + 2] = Math.random();
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    const particles = new THREE.Points(particlesGeometry, particleMaterial);
    scene.add(particles);

    camera.position.z = 50;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.y += 0.002;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Generate bubbles
    const newBubbles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 40 + 10,
      left: Math.random() * 100,
      animationDuration: Math.random() * 10 + 5,
      delay: Math.random() * 5,
    }));
    setBubbles(newBubbles);

    // Handle scroll for navbar
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  const navItems = [
    { href: "#services", label: "Our Services" },
    { href: "#links", label: "Useful Links" },
    { href: "#more", label: "Know More" },
  ];

  // Colorful text animation variants
  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    initial: { opacity: 0, y: 50, rotateX: 10 },
    animate: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      rotateY: 5,
      boxShadow: "0 10px 20px rgba(59, 130, 246, 0.3)",
      transition: {
        duration: 0.3,
      },
    },
  };

  const [isAnimating, setIsAnimating] = useState(true);

  // Toggle animation every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 text-white relative overflow-hidden">
      {/* Three.js Canvas */}
      <div ref={mountRef} className="absolute inset-0 z-0 opacity-50" />

      {/* Animated Bubbles */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full bg-blue-500/20 z-1"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            bottom: "-100px",
          }}
          animate={{ y: -1000, opacity: [0.3, 0] }}
          transition={{
            duration: bubble.animationDuration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Hero Section */}
      <section className="py-16 relative z-10 pt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <motion.h1
              variants={textVariants}
              initial="initial"
              animate="animate"
              className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient"
            >
              SniperCoders
            </motion.h1>
            <div className="w-full max-w-6xl mx-auto p-6 flex items-center justify-between bg-gray-900 rounded-lg">
              {/* Text content on the left */}
              <div className="flex-1 pr-4">
                <h2 className="text-2xl font-bold text-blue-400 mb-3"></h2>
                <p className="text-gray-300">
                  At SniperCoders Global Technologies, we specialize in turning
                  visionary ideas into reality. Our expertise in consulting
                  helps businesses transform aspirations into tangible
                  solutions, paving the way for future growth.
                </p>
              </div>

              {/* Logo on the extreme right with animation and hover effects */}
              <div className="flex-shrink-0 relative ">
                <div
                  className={`  
            w-24 h-24 rounded-full overflow-hidden border-2 border-blue-400
            transition-all duration-1000 ease-in-out 
            transform hover:scale-110 hover:shadow-lg hover:border-blue-300
            ${isAnimating ? "scale-100" : "scale-95"}
          `}
                >
                  <img
                    src="images/logo.png"
                    alt="SniperCoders Global Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              {[
                {
                  color: "from-pink-500 to-purple-500",
                  hover: "from-pink-600 to-purple-600",
                  icon: "github",
                },
                {
                  color: "from-red-500 to-red-700",
                  hover: "from-red-600 to-red-800",
                  icon: "youtube",
                },
                {
                  color: "from-blue-500 to-blue-700",
                  hover: "from-blue-600 to-blue-800",
                  icon: "twitter",
                },
                {
                  color: "from-blue-600 to-blue-800",
                  hover: "from-blue-700 to-blue-900",
                  icon: "facebook",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className={`bg-gradient-to-r ${social.color} hover:${social.hover} p-2 rounded-full transition-all duration-300 transform hover:scale-110`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    {social.icon === "github" && (
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    )}
                    {social.icon === "youtube" && (
                      <path
                        fillRule="evenodd"
                        d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                        clipRule="evenodd"
                      />
                    )}
                    {social.icon === "twitter" && (
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    )}
                    {social.icon === "facebook" && (
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    )}
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Links */}
      <section id="services" className="py-10 relative z-10">
        <div className="container mx-auto px-4">
          <motion.h2
            variants={textVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-gradient"
          >
            Our Services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "Custom Software Development",
              "Website Development",
              "Mobile App Development",
              "IT Consulting",
              "Digital Marketing",
            ].map((service, index) => (
              <motion.div
                key={index}
                className="group bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 relative overflow-hidden"
                variants={cardVariants}
                initial="initial"
                whileInView="animate"
                whileHover="hover"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  {service}
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mb-4"></div>
                <p className="text-gray-400">
                  Professional {service.toLowerCase()} services tailored to your
                  business needs.
                </p>
                <div className="progress-bar absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <motion.h2
            variants={textVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-4xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-gradient"
          >
            Join Our{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500">
              Journey
            </span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto mb-8"
          ></motion.div>
          <motion.p
            variants={textVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center text-gray-300 max-w-3xl mx-auto mb-16"
          >
            As we continue to grow and evolve, we invite you to be part of our
            journey. Whether you're a business looking for a technology partner,
            a potential team member interested in joining our mission, or a
            technology enthusiast wanting to stay connected, we welcome your
            involvement in the SniperCoders story.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "For Businesses",
                icon: "🚀",
                description:
                  "Transform your operations with our cutting-edge technology solutions tailored to your needs.",
                cta: "Schedule a Consultation",
                ctaLink: "/contact",
              },
              {
                title: "Join Our Team",
                icon: "👥",
                description:
                  "Passionate about technology? We’re always looking for talented individuals to join our mission.",
                cta: "View Open Positions",
                ctaLink: "#",
              },
              {
                title: "Stay Connected",
                icon: "📧",
                description:
                  "Follow our journey and be the first to know about our latest innovations and insights.",
                cta: "Subscribe to Updates",
                ctaLink: "/showcase",
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                className="group bg-indigo-900/40 p-8 rounded-2xl relative overflow-hidden"
                variants={cardVariants}
                initial="initial"
                whileInView="animate"
                whileHover="hover"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-800/20 to-purple-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <motion.div
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-3xl mb-6 relative z-10"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  {card.icon}
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  {card.title}
                </h3>
                <p className="text-gray-300 mb-8 relative z-10">
                  {card.description}
                </p>
                <motion.a
                  href={card.ctaLink}
                  className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-3 rounded-lg text-white font-medium relative z-10"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.3 }}
                >
                  {card.cta} <ChevronRight className="inline ml-1" size={16} />
                </motion.a>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tl from-blue-500/30 to-purple-500/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="progress-bar absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <motion.h2
            variants={textVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-gradient"
          >
            Our Story
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <motion.p
                variants={textVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="mb-6 text-gray-300"
              >
                SniperCoders Global Technologies Private Limited was born from a
                vision to transform how businesses leverage technology in
                today’s digital landscape. our company emerged from a
                recognition that many businesses were struggling to harness the
                full potential of digital technologies.
              </motion.p>
              <motion.p
                variants={textVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mb-6 text-gray-300"
              >
                Despite being a young company, our foundation is built on the
                extensive experience and expertise of our founder and team.
                Prior to establishing SniperCoders, accumulated over three years
                of invaluable industry experience, working with diverse clients
                and mastering the intricacies of web development, mobile
                applications, digital marketing, and IoT solutions.
              </motion.p>
              <motion.p
                variants={textVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-gray-300"
              >
                The name “SniperCoders” reflects who we are—sharp, focused, and
                creative. We blend the precision of coding with out-of-the-box
                thinking to build smart solutions that solve real problems for
                our clients.
              </motion.p>
            </div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="/images/TeamWork.jpg"
                alt="Team working"
                className="rounded-xl shadow-xl shadow-blue-500/10"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 to-purple-500/0 rounded-xl opacity-60"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-900/50 relative z-10">
        <div className="container mx-auto px-4">
          <motion.h2
            variants={textVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient"
          >
            Why Choose SniperCoders
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <ul className="space-y-4">
                {[
                  "Local Expertise with Global Standards",
                  "End-to-End Solutions",
                  "Client-Focused Approach",
                  "Technical Excellence",
                  "Affordable Quality",
                  "Ongoing Support",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start"
                    variants={textVariants}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="bg-blue-500 text-white p-1 rounded-full mr-3 mt-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    <span className="text-lg text-gray-300">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  title: "Social Engagement",
                  description: "Community building & management",
                  img: "/images/socialEngag.jpg",
                },
                {
                  title: "Web Innovation",
                  description: "Modern web applications",
                  img: "/images/webInnovation.jpg",
                },
              ].map((card, index) => (
                <motion.div
                  key={index}
                  className="group bg-gray-800 rounded-xl overflow-hidden transform transition-all duration-300 shadow-xl relative"
                  variants={cardVariants}
                  initial="initial"
                  whileInView="animate"
                  whileHover="hover"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 group-hover:from-cyan-400 group-hover:to-pink-500 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-400">{card.description}</p>
                  </div>
                  <div className="progress-bar absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transforming Businesses */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.h2
                variants={textVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="text-4xl font-bold mb-4"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                  Transforming
                </span>{" "}
                Businesses
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                  Through
                </span>{" "}
                Technology
              </motion.h2>
              <motion.p
                variants={textVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-300 mb-8"
              >
                SniperCoders Global Technologies is a full-service technology
                firm providing innovative digital solutions to help businesses
                thrive in today’s competitive landscape. From web development
                and mobile applications to digital marketing and IoT
                integration, we deliver tailored technology services that drive
                growth, enhance operational efficiency, and empower digital
                transformation across industries.
              </motion.p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  title: "App Development",
                  description: "Connected devices transforming industries",
                  img: "/images/mobileAppDevelop.jpg",
                  color: "blue",
                },
                {
                  title: "Mobile Experiences",
                  description: "Native & cross-platform apps",
                  img: "/images/mobileExp.png",
                  color: "green",
                },
                {
                  title: "Digital Strategy",
                  description: "Data-driven marketing campaigns",
                  img: "/images/digitalStrategy.png",
                  color: "purple",
                  colSpan: true,
                },
              ].map((card, index) => (
                <motion.div
                  key={index}
                  className={`group bg-${
                    card.color
                  }-900/30 p-6 rounded-xl border border-${
                    card.color
                  }-800 hover:border-${
                    card.color
                  }-500 hover:shadow-lg hover:shadow-${
                    card.color
                  }-500/20 transition-all duration-300 transform relative overflow-hidden ${
                    card.colSpan ? "col-span-2" : ""
                  }`}
                  variants={cardVariants}
                  initial="initial"
                  whileInView="animate"
                  whileHover="hover"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <img
                    src={card.img}
                    alt={card.title}
                    className={`w-full ${
                      card.colSpan ? "h-32" : "h-48"
                    } object-cover rounded-lg mb-4`}
                  />
                  <h3 className="text-xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-400">{card.description}</p>
                  <div className="progress-bar absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
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

      {/* CSS Animation */}
      <style jsx>{`
        .progress-bar {
          transform-origin: left;
        }
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
}
