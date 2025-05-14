
"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";

// Define component
const AIAgentsLandingPage: React.FC = () => {
  const router = useRouter();

  // Initialize AOS animation library
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });

    return () => {
      AOS.refreshHard(); // Reset AOS on unmount
    };
  }, []);

  // Three.js animation setup
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene: THREE.Scene = new THREE.Scene();
    const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create particle system for background effect
    const particlesCount: number = 1000;
    const particlesGeometry: THREE.BufferGeometry = new THREE.BufferGeometry();
    const posArray: Float32Array = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial: THREE.PointsMaterial = new THREE.PointsMaterial({
      size: 0.015,
      color: 0x8560ff,
      transparent: true,
      opacity: 0.7,
    });

    const particlesMesh: THREE.Points = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    camera.position.z = 5;

    // Handling window resize
    const handleResize = (): void => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    let animationFrameId: number;
    const animate = (): void => {
      animationFrameId = requestAnimationFrame(animate);

      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      scene.remove(particlesMesh);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  const textVariants: Variants = {
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

  return (
    <div className="relative bg-[#0a0a2e] text-white min-h-screen overflow-x-hidden">
      {/* Three.js Canvas for background effect */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-10"
      />

      {/* Hero Section */}
      <section className="relative z-10 pt-20 mt-8 pb-20">
        <div className="container mx-auto px-4 md:px-10 flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 lg:pr-8" data-aos="fade-right">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
              The Future of AI Agent Management: Intelligent & Unified.
            </h1>
            <p className="text-xl mb-8">
              Stop juggling multiple AI tools. Manage, automate, and grow your
              AI workflows from one intuitive platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => router.push("/contact")}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition duration-300"
              >
                Get Started
              </button>

              <button
                onClick={() => router.push("/learn-more")}
                className="border border-purple-500 hover:bg-purple-800/20 text-white font-bold py-3 px-8 rounded-full transition duration-300"
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 mt-10 lg:mt-0" data-aos="fade-left">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="text-xl font-bold">Hello, OP!</div>
                <div className="ml-auto flex items-center text-sm">
                  <span>1 connected channel</span>
                  <span className="mx-2">•</span>
                  <span>2 contacts</span>
                  <span className="ml-2 text-blue-400 cursor-pointer">
                    See Insights
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-bold mb-2">Start Here</h3>
                <div className="bg-white/5 p-4 rounded-md mb-4">
                  <p className="text-sm">Auto-DM links from comments</p>
                  <p className="text-xs text-gray-300">
                    Send a link when people comment on a post or reel
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <span>Quick Actions</span>
                  </div>
                  <span className="bg-purple-600 text-xs px-2 py-1 rounded">
                    AUTOMATED
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center mb-3">
                  <div className="w-6 h-6 flex items-center justify-center bg-gradient-to-br from-pink-500 to-red-500 rounded-md mr-2">
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
                        strokeWidth={2}
                        d="M5 12h14M12 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                  <div className="font-bold">Automated Activity</div>
                </div>
                <p className="text-sm mb-4">
                  Automated 0 out of 0 interactions
                </p>

                <div className="grid grid-cols-4 gap-2 text-xs text-center">
                  <div>
                    <div className="font-bold mb-1">Comments</div>
                    <div>Out of 0</div>
                  </div>
                  <div>
                    <div className="font-bold mb-1">Story Replies</div>
                    <div>Out of 0</div>
                  </div>
                  <div>
                    <div className="font-bold mb-1">DMs</div>
                    <div>Out of 0</div>
                  </div>
                  <div>
                    <div className="font-bold mb-1">Story Mentions</div>
                    <div>Out of 0</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 bg-gradient-to-b from-[#0a0a2e]/0 to-[#1a1a4a]/30">
        <div className="container mx-auto px-4 md:px-10">
          <h2
            className="text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500"
            data-aos="fade-up"
          >
            The Future of AI Agent Management: AI-Powered & Unified.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:transform hover:scale-105 transition duration-300"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <h3 className="text-xl font-bold mb-3">
                Agent Automation, Seamlessly Integrated:
              </h3>
              <p>
                Engage your audience effortlessly with automated agent
                interactions across all your connected platforms, all within a
                unified inbox.
              </p>
            </div>

            <div
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:transform hover:scale-105 transition duration-300"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h3 className="text-xl font-bold mb-3">
                One-Click Cross-Platform Deployment:
              </h3>
              <p>
                Deploy your AI agents instantly across all platforms. Set up
                your agents once and let them work simultaneously across all
                your connected accounts.
              </p>
            </div>

            <div
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:transform hover:scale-105 transition duration-300"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <h3 className="text-xl font-bold mb-3">
                Captivating Responses, AI-Crafted:
              </h3>
              <p>
                Enhance your customer interactions with engaging and relevant
                responses generated by our advanced AI, tailored to your brand
                voice.
              </p>
            </div>

            <div
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:transform hover:scale-105 transition duration-300"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <h3 className="text-xl font-bold mb-3">
                AI-Powered Content Generation:
              </h3>
              <p>
                Break writer’s block and create compelling content effortlessly
                with our intelligent AI content generator tailored for your
                audience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-24">
        <div className="container mx-auto px-4 md:px-10">
          <div className="flex flex-col-reverse lg:flex-row items-center">
            <div
              className="w-full lg:w-1/2 mt-10 lg:mt-0"
              data-aos="fade-right"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="text-xl font-bold">Hello, OP!</div>
                  <div className="ml-auto flex items-center text-sm">
                    <span>1 connected channel</span>
                    <span className="mx-2">•</span>
                    <span>2 contacts</span>
                    <span className="ml-2 text-blue-400 cursor-pointer">
                      See Insights
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold mb-2">Start Here</h3>
                  <div className="bg-white/5 p-4 rounded-md mb-4">
                    <p className="text-sm">Auto-DM links from comments</p>
                    <p className="text-xs text-gray-300">
                      Send a link when people comment on a post or reel
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      <span>Quick Actions</span>
                    </div>
                    <span className="bg-purple-600 text-xs px-2 py-1 rounded">
                      AUTOMATED
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 lg:pl-8" data-aos="fade-left">
              <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                Scale Your Social Presence
              </h2>
              <p className="text-xl mb-8">
                Effortlessly manage and grow your presence across multiple
                platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Sections */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-4 md:px-10">
          <div className="flex flex-col-reverse lg:flex-row items-center mb-32">
            <div
              className="w-full lg:w-1/2 mt-10 lg:mt-0"
              data-aos="fade-right"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="text-xl font-bold">Hello, OP!</div>
                  <div className="ml-auto flex items-center text-sm">
                    <span>1 connected channel</span>
                    <span className="mx-2">•</span>
                    <span>2 contacts</span>
                    <span className="ml-2 text-blue-400 cursor-pointer">
                      See Insights
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold mb-2">Start Here</h3>
                  <div className="bg-white/5 p-4 rounded-md mb-4">
                    <p className="text-sm">Auto-DM links from comments</p>
                    <p className="text-xs text-gray-300">
                      Send a link when people comment on a post or reel
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      <span>Quick Actions</span>
                    </div>
                    <span className="bg-purple-600 text-xs px-2 py-1 rounded">
                      AUTOMATED
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-3">
                    <div className="w-6 h-6 flex items-center justify-center bg-gradient-to-br from-pink-500 to-red-500 rounded-md mr-2">
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
                          strokeWidth={2}
                          d="M5 12h14M12 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                    <div className="font-bold">Automated Activity</div>
                  </div>
                  <p className="text-sm mb-4">
                    Automated 0 out of 0 interactions
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 lg:pl-8" data-aos="fade-left">
              <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                Increase Efficiency
              </h2>
              <p className="text-xl mb-6">
                Streamline your AI agent workflow for maximum productivity.
              </p>
              <button
                onClick={() => router.push("/learn-more")}
                className="border border-purple-500 hover:bg-purple-800/20 text-white font-bold py-3 px-8 rounded-full transition duration-300"
              >
                Learn More
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center mb-32">
            <div className="w-full lg:w-1/2 lg:pr-8" data-aos="fade-right">
              <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                Boost Engagement
              </h2>
              <p className="text-xl mb-6">
                Deliver consistent and engaging content across all your
                channels.
              </p>
              <button
                onClick={() => router.push("/learn-more")}
                className="border border-purple-500 hover:bg-purple-800/20 text-white font-bold py-3 px-8 rounded-full transition duration-300"
              >
                Learn More
              </button>
            </div>
            <div className="w-full lg:w-1/2 mt-10 lg:mt-0" data-aos="fade-left">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="text-xl font-bold">Hello, OP!</div>
                  <div className="ml-auto flex items-center text-sm">
                    <span>1 connected channel</span>
                    <span className="mx-2">•</span>
                    <span>2 contacts</span>
                    <span className="ml-2 text-blue-400 cursor-pointer">
                      See Insights
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold mb-2">Start Here</h3>
                  <div className="bg-white/5 p-4 rounded-md mb-4">
                    <p className="text-sm">Auto-DM links from comments</p>
                    <p className="text-xs text-gray-300">
                      Send a link when people comment on a post or reel
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-3">
                    <div className="w-6 h-6 flex items-center justify-center bg-gradient-to-br from-pink-500 to-red-500 rounded-md mr-2">
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
                          strokeWidth={2}
                          d="M5 12h14M12 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                    <div className="font-bold">Automated Activity</div>
                  </div>
                  <p className="text-sm mb-4">
                    Automated 0 out of 0 interactions
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse lg:flex-row items-center">
            <div
              className="w-full lg:w-1/2 mt-10 lg:mt-0"
              data-aos="fade-right"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="text-xl font-bold">Hello, OP!</div>
                  <div className="ml-auto flex items-center text-sm">
                    <span>1 connected channel</span>
                    <span className="mx-2">•</span>
                    <span>2 contacts</span>
                    <span className="ml-2 text-blue-400 cursor-pointer">
                      See Insights
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold mb-2">Start Here</h3>
                  <div className="bg-white/5 p-4 rounded-md mb-4">
                    <p className="text-sm">Auto-DM links from comments</p>
                    <p className="text-xs text-gray-300">
                      Send a link when people comment on a post or reel
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 lg:pl-8" data-aos="fade-left">
              <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                Save Valuable Time
              </h2>
              <p className="text-xl mb-6">
                Automate repetitive tasks and manage everything from one central
                hub.
              </p>
              <button
                onClick={() => router.push("/learn-more")}
                className="border border-purple-500 hover:bg-purple-800/20 text-white font-bold py-3 px-8 rounded-full transition duration-300"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* New Section: Maintain Brand Consistency */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-4 md:px-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2 lg:pr-8" data-aos="fade-right">
              <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                Maintain Brand Consistency
              </h2>
              <p className="text-xl mb-8">
                Ensure a unified voice and message across all your profiles.
              </p>
              <button
                onClick={() => router.push("/learn-more")}
                className="border border-purple-500 hover:bg-purple-800/20 text-white font-bold py-3 px-8 rounded-full transition duration-300"
              >
                Learn More
              </button>
            </div>
            <div className="w-full lg:w-1/2 mt-10 lg:mt-0" data-aos="fade-left">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="text-xl font-bold">Hello, OP!</div>
                  <div className="ml-auto flex items-center text-sm">
                    <span>1 connected channel</span>
                    <span className="mx-2">•</span>
                    <span>2 contacts</span>
                    <span className="ml-2 text-blue-400 cursor-pointer">
                      See Insights
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold mb-2">Start Here</h3>
                  <div className="bg-white/5 p-4 rounded-md mb-4">
                    <p className="text-sm">Auto-DM links from comments</p>
                    <p className="text-xs text-gray-300">
                      Send a link when people comment on a post or reel
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      <span>Quick Actions</span>
                    </div>
                    <span className="bg-purple-600 text-xs px-2 py-1 rounded">
                      AUTOMATED
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-3">
                    <div className="w-6 h-6 flex items-center justify-center bg-gradient-to-br from-pink-500 to-red-500 rounded-md mr-2">
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
                          strokeWidth={2}
                          d="M5 12h14M12 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                    <div className="font-bold">Automated Activity</div>
                  </div>
                  <p className="text-sm mb-4">
                    Automated 0 out of 0 interactions
                  </p>

                  <div className="grid grid-cols-4 gap-2 text-xs text-center">
                    <div>
                      <div className="font-bold mb-1">Comments</div>
                      <div>Out of 0</div>
                    </div>
                    <div>
                      <div className="font-bold mb-1">Story Replies</div>
                      <div>Out of 0</div>
                    </div>
                    <div>
                      <div className="font-bold mb-1">DMs</div>
                      <div>Out of 0</div>
                    </div>
                    <div>
                      <div className="font-bold mb-1">Story Mentions</div>
                      <div>Out of 0</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-24 bg-gradient-to-b from-[#1a1a4a]/30 to-[#0a0a2e]/0">
        <div className="container mx-auto px-4 md:px-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2 lg:pr-8" data-aos="fade-right">
              <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                Unify Your AI Presence. Effortlessly.
              </h2>
              <p className="text-xl mb-8">
                Stop juggling multiple tools. Manage, automate, and grow all
                your AI agents from one intuitive platform.
              </p>
              <button
                onClick={() => router.push("/contact")}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition duration-300"
              >
                Get Started for Free
              </button>
            </div>
            <div className="w-full lg:w-1/2 mt-10 lg:mt-0" data-aos="fade-left">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="bg-purple-600/20 p-3 rounded-md mr-4">
                    <div className="text-lg font-bold">DM Automation</div>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <div className="text-xl font-bold">Hello, OP!</div>
                  <div className="ml-auto flex items-center text-sm">
                    <span>1 connected channel</span>
                    <span className="mx-2">•</span>
                    <span>2 contacts</span>
                    <span className="ml-2 text-blue-400 cursor-pointer">
                      See Insights
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold mb-2">Start Here</h3>
                  <div className="bg-white/5 p-4 rounded-md mb-4">
                    <p className="text-sm">Auto-DM links from comments</p>
                    <p className="text-xs text-gray-300">
                      Send a link when people comment on a post or reel
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      <span>Quick Actions</span>
                    </div>
                    <span className="bg-purple-600 text-xs px-2 py-1 rounded">
                      AUTOMATED
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-3">
                    <div className="w-6 h-6 flex items-center justify-center bg-gradient-to-br from-pink-500 to-red-500 rounded-md mr-2">
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
                          strokeWidth={2}
                          d="M5 12h14M12 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                    <div className="font-bold">Automated Activity</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-24">
        <div className="container mx-auto px-4 md:px-10">
          <h2
            className="text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500"
            data-aos="fade-up"
          >
            How Clients Partner With SniperCoders for Social Media Success
          </h2>
          <ol className="space-y-6 max-w-3xl mx-auto">
            <li className="text-xl" data-aos="fade-up" data-aos-delay="100">
              <span className="font-bold text-purple-400">
                1. Share Your Goals:
              </span>{" "}
              Our journey starts with understanding your brand, audience, and growth vision.
            </li>
            <li className="text-xl" data-aos="fade-up" data-aos-delay="200">
              <span className="font-bold text-purple-400">
                2. We Strategize & Build:
              </span>{" "}
              The SniperCoders team designs AI-powered workflows, custom automation, and content systems tailored to your needs.
            </li>
            <li className="text-xl" data-aos="fade-up" data-aos-delay="300">
              <span className="font-bold text-purple-400">
                3. We Launch & Execute:
              </span>{" "}
              From scheduling to smart engagement — we deploy everything, fine-tuned for results across your social platforms.
            </li>
            <li className="text-xl" data-aos="fade-up" data-aos-delay="400">
              <span className="font-bold text-purple-400">
                4. You Grow, We Optimize:
              </span>{" "}
              As performance data comes in, we adjust, optimize, and scale your strategy together.
            </li>
          </ol>
          <div
            className="text-center mt-10"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <button
              onClick={() => router.push("/contact")}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition duration-300"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-24">
        <div className="container mx-auto px-4 md:px-10">
          <h2
            className="text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500"
            data-aos="fade-up"
          >
            What We’ve Delivered for Our Clients — In Their Own Words
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "The custom AI workflows developed by the SniperCoders team fit perfectly into our internal systems. They were quick to understand our business logic and delivered exactly what we needed — fast and scalable solutions.",
                name: "Maya Tran",
                title: "CTO at SynthEdge AI",
                delay: "100",
              },
              {
                quote:
                  "We approached SniperCoders with a vague idea and left with a fully deployed AI support system tailored to our use case. Their ability to turn vision into execution is unmatched.",
                name: "Liam Okoro",
                title: "Founder at Convertly.io",
                delay: "200",
              },
              {
                quote:
                  "We needed a partner who could handle complex automation challenges, and SniperCoders delivered. From discovery to delivery, the process was seamless, and our internal team gained back dozens of hours weekly.",
                name: "Sophia Mendes",
                title: "COO at BrightForge",
                delay: "300",
              },
            ].map(({ quote, name, title, delay }, index: number) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
                data-aos="zoom-in"
                data-aos-delay={delay}
              >
                <p className="text-lg italic mb-4">{quote}</p>
                <p className="font-bold">{name}</p>
                <p className="text-sm text-gray-400">{title}</p>
              </div>
            ))}
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
            ].map((section, idx: number) => (
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
                  {section.items.map((item, i: number) => (
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
  );
};

export default AIAgentsLandingPage;