
"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ChevronRight,
  CheckCircle,
  MapPin,
  Clock,
  Zap,
  Share2,
  Search,
  MessageCircle,
  BarChart2,
  Mail,
  Layout,
} from "lucide-react";
import CountUp from "react-countup";
import * as THREE from "three";

// Define interface for Bubble
interface Bubble {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
  opacity: number;
}

// Define interfaces for userData
interface MeshUserData {
  index: number;
  originalY: number;
  hover: boolean;
}

interface PointsUserData {
  velocities: Float32Array;
  index: number;
  hover: boolean;
}

const MarketingWebsite = () => {
  const [visible, setVisible] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const processRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [cardAnimations, setCardAnimations] = useState(false);
  const [timelineAnimated, setTimelineAnimated] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // Store models and particle systems in state to access in event handlers
  const [models, setModels] = useState<THREE.Mesh[]>([]);
  const [particleSystems, setParticleSystems] = useState<THREE.Points[]>([]);

  // Scroll-based animations
  const { scrollYProgress } = useScroll({ target: scrollRef });
  const cameraZ = useTransform(scrollYProgress, [0, 1], [5, 12]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 1], [0.2, 0.7]);

  // Bubble animation function
  const generateBubbles = useCallback((count: number = 10) => {
    const newBubbles: Bubble[] = [];

    for (let i = 0; i < count; i++) {
      newBubbles.push({
        id: Date.now() + i,
        size: Math.random() * 40 + 15,
        left: Math.random() * 100,
        duration: Math.random() * 12 + 8,
        delay: Math.random() * 3,
        opacity: Math.random() * 0.2 + 0.1,
      });
    }

    setBubbles((prev) => {
      const updatedBubbles = [...prev, ...newBubbles];
      if (updatedBubbles.length > 50) {
        return updatedBubbles.slice(count);
      }
      return updatedBubbles;
    });
  }, []);

  // Three.js setup
  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // Store canvasRef.current in a variable to avoid issues in cleanup
    const canvasElement = canvasRef.current;
    canvasElement.appendChild(renderer.domElement);

    // Create models and particles
    const newModels: THREE.Mesh[] = [];
    const newParticleSystems: THREE.Points[] = [];
    const geometries = [
      new THREE.SphereGeometry(0.8, 32, 32),
      new THREE.TorusKnotGeometry(0.6, 0.2, 100, 16),
      new THREE.IcosahedronGeometry(0.9, 1),
      new THREE.BoxGeometry(1, 1, 1),
    ];
    const colors = [0x8b5cf6, 0x10b981, 0xec4899, 0xf59e0b];

    geometries.forEach((geometry, index) => {
      const material = new THREE.MeshStandardMaterial({
        color: colors[index % colors.length],
        emissive: colors[index % colors.length],
        emissiveIntensity: 0.3,
        roughness: 0.5,
        metalness: 0.8,
        transparent: true,
        opacity: 0.9,
      });
      const model = new THREE.Mesh(geometry, material);
      const angle = (index / geometries.length) * Math.PI * 2;
      const radius = 6;
      model.position.x = Math.cos(angle) * radius;
      model.position.y = Math.sin(angle) * radius * 0.5;
      model.position.z = -8;
      model.userData = { index, originalY: model.position.y, hover: false } as MeshUserData;
      newModels.push(model);
      scene.add(model);

      // Particle System
      const particleCount = 40;
      const particlesGeometry = new THREE.BufferGeometry();
      const posArray = new Float32Array(particleCount * 3);
      const velocities = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i += 3) {
        posArray[i] = model.position.x + (Math.random() - 0.5) * 2;
        posArray[i + 1] = model.position.y + (Math.random() - 0.5) * 2;
        posArray[i + 2] = model.position.z + (Math.random() - 0.5) * 2;
        velocities[i] = (Math.random() - 0.5) * 0.02;
        velocities[i + 1] = (Math.random() - 0.5) * 0.02;
        velocities[i + 2] = (Math.random() - 0.5) * 0.02;
      }
      particlesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(posArray, 3)
      );
      const particleMaterial = new THREE.PointsMaterial({
        color: colors[index % colors.length],
        size: 0.1,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
      });
      const particleSystem = new THREE.Points(
        particlesGeometry,
        particleMaterial
      );
      particleSystem.userData = { velocities, index, hover: false } as PointsUserData;
      newParticleSystems.push(particleSystem);
      scene.add(particleSystem);
    });

    // Update state
    setModels(newModels);
    setParticleSystems(newParticleSystems);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x606060, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    const pointLight = new THREE.PointLight(0xffffff, 2, 50);
    pointLight.position.set(0, 10, 10);
    scene.add(pointLight);

    // Camera position
    camera.position.z = 5;

    // Mouse interaction
    const mouse = new THREE.Vector2();
    const windowHalf = new THREE.Vector2(
      window.innerWidth / 2,
      window.innerHeight / 2
    );

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX - windowHalf.x) / windowHalf.x;
      mouse.y = (event.clientY - windowHalf.y) / windowHalf.y;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Scroll interaction
    let scrollY = window.scrollY;
    let targetScrollY = window.scrollY;

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      // Smooth scroll effect
      scrollY += (targetScrollY - scrollY) * 0.1;

      // Update models and particles
      newModels.forEach((model, index) => {
        const angle = (index / newModels.length) * Math.PI * 2 + scrollY * 0.002;
        const radius = 6 + Math.sin(scrollY * 0.005) * 1.5;
        model.position.x = Math.cos(angle) * radius;
        model.position.y =
          (model.userData as MeshUserData).originalY + Math.sin(scrollY * 0.005 + index) * 1.5;
        model.position.z = -8 + Math.cos(scrollY * 0.003 + index) * 2;

        // Hover effect
        const hoverScale = (model.userData as MeshUserData).hover ? 1.4 : 1;
        model.scale.setScalar(
          hoverScale + Math.sin(Date.now() * 0.001 + index) * 0.1
        );
        model.rotation.x += (model.userData as MeshUserData).hover ? 0.03 : 0.01;
        model.rotation.y += (model.userData as MeshUserData).hover ? 0.04 : 0.015;
        (model.material as THREE.MeshStandardMaterial).emissiveIntensity = (model
          .userData as MeshUserData).hover
          ? 0.7
          : 0.3;
      });

      // Update particle systems
      newParticleSystems.forEach((system) => {
        const positions = system.geometry.attributes.position
          .array as Float32Array;
        const velocities = (system.userData as PointsUserData).velocities;
        const model = newModels[(system.userData as PointsUserData).index];
        const hover = (system.userData as PointsUserData).hover;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += velocities[i] * (hover ? 1.5 : 1);
          positions[i + 1] += velocities[i + 1] * (hover ? 1.5 : 1);
          positions[i + 2] += velocities[i + 2] * (hover ? 1.5 : 1);
          const dist = Math.sqrt(
            Math.pow(positions[i] - model.position.x, 2) +
              Math.pow(positions[i + 1] - model.position.y, 2) +
              Math.pow(positions[i + 2] - model.position.z, 2)
          );
          if (dist > (hover ? 3.5 : 2.5)) {
            positions[i] = model.position.x + (Math.random() - 0.5) * 2;
            positions[i + 1] = model.position.y + (Math.random() - 0.5) * 2;
            positions[i + 2] = model.position.z + (Math.random() - 0.5) * 2;
            velocities[i] = (Math.random() - 0.5) * (hover ? 0.03 : 0.02);
            velocities[i + 1] = (Math.random() - 0.5) * (hover ? 0.03 : 0.02);
            velocities[i + 2] = (Math.random() - 0.5) * (hover ? 0.03 : 0.02);
          }
        }
        system.geometry.attributes.position.needsUpdate = true;
        (system.material as THREE.PointsMaterial).size = hover ? 0.12 : 0.1;
        (system.material as THREE.PointsMaterial).opacity = hover ? 0.9 : 0.7;
      });

      // Camera movement
      camera.position.x += (mouse.x * 2 - camera.position.x) * 0.05;
      camera.position.y += (-mouse.y * 2 - camera.position.y) * 0.05;
      camera.position.z = cameraZ.get();
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      windowHalf.set(window.innerWidth / 2, window.innerHeight / 2);
    };

    window.addEventListener("resize", handleResize);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (canvasElement && renderer.domElement) {
        canvasElement.removeChild(renderer.domElement);
      }
      geometries.forEach((geom) => geom.dispose());
    };
  }, [cameraZ]);

  useEffect(() => {
    // Set initial animations
    setTimelineAnimated(true);

    const cardTimer = setTimeout(() => {
      setCardAnimations(true);
    }, 800);

    // Intersection Observer for process steps
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = processRefs.current.findIndex(
            (ref) => ref === entry.target
          );
          if (index !== -1 && entry.isIntersecting) {
            setVisible((prev) => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    // Store processRefs.current in a variable to avoid issues in cleanup
    const currentProcessRefs = processRefs.current;
    currentProcessRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // Bubble animation setup
    generateBubbles();
    const bubbleInterval = setInterval(() => {
      generateBubbles(3);
    }, 3000);

    return () => {
      clearTimeout(cardTimer);
      clearInterval(bubbleInterval);
      currentProcessRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
      observer.disconnect();
    };
  }, [generateBubbles]); // Added generateBubbles to dependency array

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      scale: 1.05,
      y: -10,
      rotateX: 5,
      rotateY: 5,
      boxShadow: "0 15px 30px rgba(0, 255, 255, 0.3)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
    tap: { scale: 0.98 },
  };

  const iconVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.3,
      rotate: 10,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
  };

  const textVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Handle hover state for models and particles
  const handleCardHover = (index: number) => {
    if (
      models[index % models.length] &&
      particleSystems[index % particleSystems.length]
    ) {
      (models[index % models.length].userData as MeshUserData).hover = true;
      (particleSystems[index % particleSystems.length].userData as PointsUserData).hover = true;
    }
  };

  const handleCardHoverEnd = (index: number) => {
    if (
      models[index % models.length] &&
      particleSystems[index % particleSystems.length]
    ) {
      (models[index % models.length].userData as MeshUserData).hover = false;
      (particleSystems[index % particleSystems.length].userData as PointsUserData).hover = false;
    }
  };

  return (
    <div className="bg-slate-900 text-gray-100 min-h-screen overflow-hidden relative font-sans">
      {/* Three.js Canvas */}
      <div
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
        style={{ opacity: backgroundOpacity.get() }}
      />

      {/* Bubble Animation */}
      <div className="fixed inset-0 pointer-events-none z-1">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute rounded-full bg-gradient-to-tr from-blue-500/10 to-teal-500/10"
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${bubble.left}%`,
              bottom: `-${bubble.size}px`,
              opacity: bubble.opacity,
              animation: `float ${bubble.duration}s linear ${bubble.delay}s forwards`,
            }}
          />
        ))}
      </div>

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: var(--opacity);
          }
          90% {
            opacity: var(--opacity);
          }
          100% {
            transform: translateY(-120vh) rotate(540deg);
            opacity: 0;
          }
        }
        @keyframes hero-text-animate {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes card-scale-up {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes timeline-line-draw-zigzag {
          0% {
            height: 0%;
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
          }
          100% {
            height: 100%;
            stroke-dashoffset: 0;
          }
        }
        @keyframes process-step-in {
          0% {
            opacity: 0;
            transform: translateX(20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes advantage-card-hover {
          0% {
            transform: translateY(0) scale(1);
            box-shadow: none;
          }
          100% {
            transform: translateY(-8px) scale(1.05);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          }
        }
        @keyframes service-card-hover {
          0% {
            transform: translateY(0);
            box-shadow: none;
            background-color: #2d3748;
          }
          100% {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
            background-color: #4a5568;
          }
        }
        @keyframes cta-button-pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes progress-bar-animate {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }
      `}</style>

      <div ref={scrollRef}>
        {/* Hero */}
        <section className="py-24 px-8 mt-2 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="inline-block bg-gradient-to-r from-purple-600 to-orange-500 px-4 py-1 rounded-full mb-6"
            >
              <span className="flex items-center text-sm">
                <Zap size={16} className="mr-2" />
                Maximize Your Digital Impact
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent drop-shadow-md"
            >
              Data-Driven Marketing Solutions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-xl mb-10 text-gray-300"
            >
              Transform your online presence with strategies that
              <span className="text-purple-400 font-semibold"> attract</span>,
              <span className="text-pink-400 font-semibold"> engage</span>, and
              <span className="text-blue-400 font-semibold"> convert</span>. We
              turn digital interactions into measurable business growth.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2, delayChildren: 0.8 },
                },
              }}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap justify-center gap-6 mb-16"
            >
              {[
                { value: 300, suffix: "%", label: "ROI Increase" },
                { value: 1, suffix: "", label: "Google Rankings", prefix: "#" },
                { value: 90, suffix: "%", label: "Client Retention" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onHoverStart={() => handleCardHover(index)}
                  onHoverEnd={() => handleCardHoverEnd(index)}
                  className="group bg-slate-800/70 backdrop-blur-lg p-7 rounded-xl text-center w-64 border border-slate-700/50 hover:border-cyan-500/80 shadow-md hover:shadow-xl hover:shadow-cyan-500/30 relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300" />
                  <motion.div
                    variants={textVariants}
                    className="text-4xl font-bold text-purple-400 mb-2"
                  >
                    {stat.prefix || ""}
                    <CountUp
                      end={stat.value}
                      duration={2}
                      suffix={stat.suffix}
                    />
                  </motion.div>
                  <motion.div
                    variants={textVariants}
                    className="text-gray-300 group-hover:text-gray-100"
                  >
                    {stat.label}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 px-20 relative z-10">
          <div className="max-w-5xl mt-2 mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold text-center mb-20 bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent drop-shadow-md"
            >
              Our 360° Marketing Process
            </motion.h2>

            <div className="relative">
              <svg
                className="absolute left-1/2 transform -translate-x-1/2 h-full z-0"
                width="2"
                fill="none"
                viewBox="0 0 2 100%"
                aria-hidden="true"
              >
                <path
                  d="M1 0V20L0 30V50L1 60V80L0 90V100%"
                  stroke="url(#zigZagGradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className={`${
                    timelineAnimated
                      ? "animate-timeline-line-draw-zigzag"
                      : "stroke-dashoffset-[1000]"
                  } origin-top`}
                  style={{
                    animationDuration: "2s",
                    animationDelay: "0.5s",
                    animationTimingFunction: "ease-out",
                    animationFillMode: "forwards",
                  }}
                />
                <defs>
                  <linearGradient
                    id="zigZagGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="space-y-32 relative z-10">
                {[
                  {
                    title: "Audit & Analysis",
                    desc: "Comprehensive website health check and competitor analysis",
                    icon: CheckCircle,
                    color: "from-purple-500 to-blue-500",
                    textColor: "text-purple-400",
                  },
                  {
                    title: "Strategy Development",
                    desc: "Customized marketing roadmap with KPIs",
                    icon: Layout,
                    color: "from-blue-500 to-teal-500",
                    textColor: "text-blue-400",
                  },
                  {
                    title: "Implementation",
                    desc: "Integrated campaign execution across channels",
                    icon: Zap,
                    color: "from-teal-500 to-green-500",
                    textColor: "text-teal-400",
                  },
                  {
                    title: "Monitoring",
                    desc: "Real-time performance tracking and adjustments",
                    icon: Clock,
                    color: "from-green-500 to-orange-500",
                    textColor: "text-green-400",
                  },
                  {
                    title: "Optimization",
                    desc: "Continuous A/B testing and strategy refinement",
                    icon: BarChart2,
                    color: "from-orange-500 to-pink-500",
                    textColor: "text-orange-400",
                  },
                  {
                    title: "Reporting",
                    desc: "Monthly ROI analysis and stakeholder reviews",
                    icon: Mail,
                    color: "from-pink-500 to-purple-500",
                    textColor: "text-pink-400",
                  },
                ].map((step, index) => (
                  <div
                    key={index}
                    ref={(el: HTMLDivElement | null) => {
                      processRefs.current[index] = el;
                    }}
                    className={`flex items-center transition-opacity duration-1000 ${
                      visible[index] ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div
                      className={`w-1/2 ${
                        index % 2 === 0 ? "pr-12 text-right" : ""
                      }`}
                    >
                      {index % 2 === 0 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{
                            opacity: visible[index] ? 1 : 0,
                            x: visible[index] ? 0 : 20,
                          }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                        >
                          <h3
                            className={`text-2xl font-bold mb-3 ${step.textColor}`}
                          >
                            {step.title}
                          </h3>
                          <p className="text-gray-300">{step.desc}</p>
                        </motion.div>
                      )}
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: visible[index] ? 1 : 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className={`w-14 h-14 rounded-full bg-gradient-to-br ${
                          step.color
                        } flex items-center justify-center shadow-lg shadow-${
                          step.textColor.split("-")[1]
                        }-500/50`}
                      >
                        <step.icon
                          size={28}
                          className="text-white animate-pulse"
                        />
                      </motion.div>
                    </div>
                    <div className={`w-1/2 ${index % 2 === 1 ? "pl-12" : ""}`}>
                      {index % 2 === 1 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{
                            opacity: visible[index] ? 1 : 0,
                            x: visible[index] ? 0 : 20,
                          }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                        >
                          <h3
                            className={`text-2xl font-bold mb-3 ${step.textColor}`}
                          >
                            {step.title}
                          </h3>
                          <p className="text-gray-300">{step.desc}</p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Marketing Advantage */}
        <section className="py-24 px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold text-center mb-20 bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent drop-shadow-md"
            >
              Our Marketing Advantage
            </motion.h2>

            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2, delayChildren: 0.4 },
                },
              }}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {[
                {
                  title: "Data-Driven Approach",
                  desc: "AI-powered insights and competitor analysis",
                  icon: CheckCircle,
                  color: "purple-500",
                },
                {
                  title: "Local SEO Mastery",
                  desc: "Dominating local searches in target regions",
                  icon: MapPin,
                  color: "blue-500",
                },
                {
                  title: "Integrated Strategies",
                  desc: "Omnichannel campaign synchronization",
                  icon: Clock,
                  color: "teal-500",
                },
                {
                  title: "Transparent Tracking",
                  desc: "Real-time dashboard with KPIs",
                  icon: BarChart2,
                  color: "orange-500",
                },
              ].map((advantage, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onHoverStart={() => handleCardHover(index)}
                  onHoverEnd={() => handleCardHoverEnd(index)}
                  className={`group bg-slate-800/70 backdrop-blur-lg p-8 rounded-2xl border border-slate-700/50 hover:border-cyan-500/80 shadow-md hover:shadow-xl hover:shadow-cyan-500/30 relative overflow-hidden ${
                    cardAnimations ? "animate-card-scale-up" : "opacity-0"
                  }`}
                  style={{
                    animationDelay: `${1.1 + index * 0.2}s`,
                    animationFillMode: "forwards",
                  }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-${advantage.color}/20 opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300`}
                  />
                  <motion.div
                    variants={iconVariants}
                    className={`bg-${advantage.color} w-14 h-14 rounded-xl flex items-center justify-center mb-5 shadow-md group-hover:shadow-lg group-hover:shadow-cyan-500/50`}
                  >
                    <advantage.icon
                      size={32}
                      className="text-white animate-pulse"
                    />
                  </motion.div>
                  <motion.h3
                    variants={textVariants}
                    className="text-xl font-bold mb-3 text-white group-hover:text-cyan-300"
                  >
                    {advantage.title}
                  </motion.h3>
                  <motion.p
                    variants={textVariants}
                    className="text-gray-300 group-hover:text-gray-100"
                  >
                    {advantage.desc}
                  </motion.p>
                  <motion.div
                    className={`absolute bottom-0 left-0 w-full h-1 bg-${advantage.color} origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out`}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Services */}
        <section className="py-24 px-8 relative z-10 bg-slate-900">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold text-center mb-20 bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent drop-shadow-md"
            >
              Our Services
            </motion.h2>

            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2, delayChildren: 0.4 },
                },
              }}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                {
                  title: "Search Engine Optimization",
                  desc: "Dominate search rankings with technical, on-page, and off-page SEO strategies that drive organic growth.",
                  icon: Search,
                  color: "orange-500",
                },
                {
                  title: "Social Media Marketing",
                  desc: "Strategic campaigns that build brand loyalty and convert followers into customers.",
                  icon: Share2,
                  color: "blue-500",
                },
                {
                  title: "Content Marketing",
                  desc: "Compelling storytelling that positions your brand as an industry thought leader.",
                  icon: MessageCircle,
                  color: "pink-500",
                },
                {
                  title: "PPC Advertising",
                  desc: "Targeted ad campaigns with precise audience targeting and conversion optimization.",
                  icon: BarChart2,
                  color: "red-500",
                },
                {
                  title: "Email Marketing",
                  desc: "Automated nurture sequences that guide leads through the sales funnel.",
                  icon: Mail,
                  color: "green-500",
                },
                {
                  title: "Analytics & Reporting",
                  desc: "Actionable insights from comprehensive campaign performance tracking.",
                  icon: Layout,
                  color: "purple-500",
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onHoverStart={() => handleCardHover(index)}
                  onHoverEnd={() => handleCardHoverEnd(index)}
                  className={`group bg-slate-800/70 backdrop-blur-lg p-8 rounded-2xl border border-slate-700/50 hover:border-cyan-500/80 shadow-md hover:shadow-xl hover:shadow-cyan-500/30 relative overflow-hidden ${
                    cardAnimations ? "animate-card-scale-up" : "opacity-0"
                  }`}
                  style={{
                    animationDelay: `${1.2 + index * 0.2}s`,
                    animationFillMode: "forwards",
                  }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-${service.color}/20 opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300`}
                  />
                  <motion.div
                    variants={iconVariants}
                    className={`bg-${service.color} w-14 h-14 rounded-xl flex items-center justify-center mb-5 shadow-md group-hover:shadow-lg group-hover:shadow-cyan-500/50`}
                  >
                    <service.icon
                      size={32}
                      className="text-white animate-pulse"
                    />
                  </motion.div>
                  <motion.h3
                    variants={textVariants}
                    className="text-xl font-bold mb-3 text-white group-hover:text-cyan-300"
                  >
                    {service.title}
                  </motion.h3>
                  <motion.p
                    variants={textVariants}
                    className="text-gray-300 group-hover:text-gray-100"
                  >
                    {service.desc}
                  </motion.p>
                  <motion.div
                    className={`absolute bottom-0 left-0 w-full h-1 bg-${service.color} origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out`}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 p-16 rounded-3xl text-center shadow-2xl shadow-purple-900/30 border border-purple-500/20"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-md"
              >
                Ready to Outperform Competitors?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-xl mb-10 text-gray-100 max-w-2xl mx-auto drop-shadow-sm"
              >
Get a free marketing audit and discover how we can 10x your
  digital presence! Let&apos;s elevate your brand to new heights.
              </motion.p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors flex items-center mx-auto hover:animate-cta-button-pulse shadow-lg group"
              >
                Get Free Marketing Analysis
                <ChevronRight
                  size={20}
                  className="ml-3 group-hover:translate-x-1 transition-transform duration-300"
                />
              </motion.button>
            </motion.div>
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
    </div>
  );
};

export default MarketingWebsite;