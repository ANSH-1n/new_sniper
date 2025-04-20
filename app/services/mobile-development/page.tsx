

"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Smartphone, RefreshCw, Palette, Settings, Briefcase, LineChart, Shield, Rocket, Edit, BarChart3, Code } from "lucide-react";
import CountUp from 'react-countup'; // Import CountUp for number animations

export default function MobileAppDevelopment() {
  // Animation states
  const [animateTimeline, setAnimateTimeline] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const [bubbles, setBubbles] = useState([]);
  const [heroTextAnimated, setHeroTextAnimated] = useState(false); // New state for hero text animation

  // Trigger animations on component mount
  useEffect(() => {
    setAnimateTimeline(true);

    const heroTextTimer = setTimeout(() => {
      setHeroTextAnimated(true); // Trigger hero text animation
    }, 300); // Small delay for hero text animation

    const cardsTimer = setTimeout(() => {
      setAnimateCards(true);
    }, 800);

    // Generate initial bubbles
    generateBubbles();

    // Generate new bubbles every 3 seconds
    const bubbleInterval = setInterval(() => {
      generateBubbles(2);
    }, 3000);

    return () => {
      clearTimeout(heroTextTimer);
      clearTimeout(cardsTimer);
      clearInterval(bubbleInterval);
    };
  }, []);

  // Bubble animation function
  const generateBubbles = (count = 15) => {
    const newBubbles = [];

    for (let i = 0; i < count; i++) {
      newBubbles.push({
        id: Date.now() + i,
        size: Math.random() * 60 + 20,
        left: Math.random() * 100,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.3 + 0.1
      });
    }

    setBubbles(prev => [...prev, ...newBubbles]);

    // Remove old bubbles to prevent memory buildup
    if (bubbles.length > 40) {
      setTimeout(() => {
        setBubbles(prev => prev.slice(count));
      }, 20000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-gray-100 overflow-hidden relative">
      {/* Bubble Animation */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {bubbles.map(bubble => (
          <div
            key={bubble.id}
            className="absolute rounded-full bg-gradient-to-tr from-blue-500/20 to-teal-500/20"
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${bubble.left}%`,
              bottom: `-${bubble.size}px`,
              opacity: bubble.opacity,
              animation: `float ${bubble.duration}s linear ${bubble.delay}s forwards`
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
            transform: translateY(-110vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes hero-text-animate { /* Hero Text Animation */
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes timeline-line-draw { /* Timeline Line Draw Animation */
          0% {
            height: 0%;
          }
          100% {
            height: 100%;
          }
        }

        @keyframes timeline-point-scale { /* Timeline Point Scale Animation */
          0% {
            transform: scale(0);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes card-hover-lift { /* Card Hover Lift Animation */
          0% {
            transform: translateY(0) scale(1) rotateX(0) rotateY(0);
            box-shadow: inherit;
          }
          100% {
            transform: translateY(-8px) scale(1.03) rotateX(5deg) rotateY(5deg);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
          }
        }

        @keyframes icon-pulse { /* Icon Pulse Animation */
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes subtle-gradient-move { /* Subtle Gradient Move Animation */
          0% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes button-pulse { /* Button Pulse Animation */
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>

      {/* Navigation (enhanced) */}
      <header className="container mx-auto p-4 z-10 backdrop-blur-sm bg-slate-900/80">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="text-purple-500 font-bold text-xl flex items-center">
              <Code className="mr-2" size={24} />
              <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 bg-clip-text text-transparent">SniperCoders</span>
            </div>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#" className="hover:text-purple-400 transition-all duration-300">Services</a>
            <a href="#" className="hover:text-purple-400 transition-all duration-300">Solutions</a>
            <a href="#" className="hover:text-purple-400 transition-all duration-300">Portfolio</a>
            <a href="#" className="hover:text-purple-400 transition-all duration-300">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 relative z-10">
        <div className="flex items-center justify-center mb-4">
          <span className="bg-purple-900/50 backdrop-blur-sm text-purple-200 px-6 py-2 rounded-full flex items-center gap-2 shadow-lg shadow-purple-900/20">
            <Smartphone size={18} />
            <span>Precision Mobile Development</span>
          </span>
        </div>

        <h1 className={`text-5xl md:text-7xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent drop-shadow-md ${heroTextAnimated ? 'animate-hero-text-animate' : 'opacity-0'}`} style={{ animationDuration: '1.2s', animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          Crafted Mobile Experiences
        </h1>

        <p className="text-xl text-center max-w-3xl mx-auto mb-12 leading-relaxed text-gray-300">
          We transform ideas into elegant mobile solutions that <span className="text-purple-400 font-semibold">captivate users</span> and <span className="text-teal-400 font-semibold">drive business growth</span>. Our precision code targets perfection at every pixel.
        </p>

        <div className="flex justify-center gap-16 mb-20">
          <div className={`transition-all duration-1000 transform ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl shadow-xl">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                <CountUp end={120} duration={2} suffix="+" /> {/* CountUp animation */}
              </div>
              <div className="text-gray-400">Precision Apps</div>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-300 transform ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl shadow-xl">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent mb-2">
                <CountUp end={4.9} duration={2} suffix="/5" decimals={1} /> {/* CountUp animation */}
              </div>
              <div className="text-gray-400">Client Satisfaction</div>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-500 transform ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl shadow-xl">
              <div className="text-5xl font-bold bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent mb-2">
                <CountUp end={3} duration={2} suffix="x" /> {/* CountUp animation */}
              </div>
              <div className="text-gray-400">ROI Average</div>
            </div>
          </div>
        </div>
      </section>

      {/* Development Lifecycle */}
      <section className="container mx-auto px-4 py-24 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">Our Precision Development Approach</h2>

        <div className="relative max-w-4xl mx-auto mb-24">
          {/* Timeline line */}
          <div className={`absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500 to-teal-500 shadow-lg shadow-purple-500/20 origin-top ${animateTimeline ? 'animate-timeline-line-draw' : 'h-0'}`} style={{ animationDuration: '1.5s', animationDelay: '0.4s', animationTimingFunction: 'ease-out', animationFillMode: 'forwards' }}></div>

          {/* Timeline items */}
          <div className="space-y-32 relative">
            {/* Item 1 */}
            <div className="flex items-center relative">
              <div className="w-1/2 pr-12 text-right">
                <div className={`transition-all duration-1000 transform ${animateTimeline ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                  <h3 className="text-2xl font-bold mb-2 text-purple-400">Strategic Discovery</h3>
                  <p className="text-gray-300">Deep analysis of business objectives and target user behaviors</p>
                </div>
              </div>

              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <div className={`transition-all duration-700 transform ${animateTimeline ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} animate-timeline-point-scale`} style={{ animationDelay: '0.2s', animationFillMode: 'forwards', animationTimingFunction: 'ease-out' }}>
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/30">
                    <Shield className="text-white" size={24} /> {/* Icon instead of number */}
                  </div>
                </div>
              </div>

              <div className="w-1/2 pl-12"></div>
            </div>

            {/* Item 2 */}
            <div className="flex items-center relative">
              <div className="w-1/2 pr-12"></div>

              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <div className={`transition-all duration-700 delay-200 transform ${animateTimeline ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} animate-timeline-point-scale`} style={{ animationDelay: '0.6s', animationFillMode: 'forwards', animationTimingFunction: 'ease-out' }}>
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30">
                    <Palette className="text-white" size={24} /> {/* Icon instead of number */}
                  </div>
                </div>
              </div>

              <div className="w-1/2 pl-12">
                <div className={`transition-all duration-1000 delay-200 transform ${animateTimeline ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                  <h3 className="text-2xl font-bold mb-2 text-blue-400">UX Architecture</h3>
                  <p className="text-gray-300">Interactive wireframes and behavior-driven design systems</p>
                </div>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-center relative">
              <div className="w-1/2 pr-12 text-right">
                <div className={`transition-all duration-1000 delay-300 transform ${animateTimeline ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                  <h3 className="text-2xl font-bold mb-2 text-blue-400">Precision Development</h3>
                  <p className="text-gray-300">Clean code architecture with one-week iteration cycles</p>
                </div>
              </div>

              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <div className={`transition-all duration-700 delay-300 transform ${animateTimeline ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} animate-timeline-point-scale`} style={{ animationDelay: '1.0s', animationFillMode: 'forwards', animationTimingFunction: 'ease-out' }}>
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg shadow-teal-500/30">
                    <Code className="text-white" size={24} /> {/* Icon instead of number */}
                  </div>
                </div>
              </div>

              <div className="w-1/2 pl-12"></div>
            </div>

            {/* Item 4 */}
            <div className="flex items-center relative">
              <div className="w-1/2 pr-12"></div>

              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <div className={`transition-all duration-700 delay-400 transform ${animateTimeline ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} animate-timeline-point-scale`} style={{ animationDelay: '1.4s', animationFillMode: 'forwards', animationTimingFunction: 'ease-out' }}>
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/30">
                    <RefreshCw className="text-white" size={24} /> {/* Icon instead of number */}
                  </div>
                </div>
              </div>

              <div className="w-1/2 pl-12">
                <div className={`transition-all duration-1000 delay-400 transform ${animateTimeline ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                  <h3 className="text-2xl font-bold mb-2 text-teal-400">Advanced Quality Control</h3>
                  <p className="text-gray-300">Automated testing suite and real-world device validation</p>
                </div>
              </div>
            </div>

            {/* Item 5 */}
            <div className="flex items-center relative">
              <div className="w-1/2 pr-12 text-right">
                <div className={`transition-all duration-1000 delay-500 transform ${animateTimeline ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                  <h3 className="text-2xl font-bold mb-2 text-teal-400">Strategic Deployment</h3>
                  <p className="text-gray-300">App store optimization and phased rollout strategy</p>
                </div>
              </div>

              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <div className={`transition-all duration-700 delay-500 transform ${animateTimeline ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} animate-timeline-point-scale`} style={{ animationDelay: '1.8s', animationFillMode: 'forwards', animationTimingFunction: 'ease-out' }}>
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-teal-500 to-purple-500 text-white shadow-lg shadow-purple-500/30">
                    <Rocket className="text-white" size={24} /> {/* Icon instead of number */}
                  </div>
                </div>
              </div>

              <div className="w-1/2 pl-12"></div>
            </div>

            {/* Item 6 */}
            <div className="flex items-center relative">
              <div className="w-1/2 pr-12"></div>

              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <div className={`transition-all duration-700 delay-600 transform ${animateTimeline ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} animate-timeline-point-scale`} style={{ animationDelay: '2.2s', animationFillMode: 'forwards', animationTimingFunction: 'ease-out' }}>
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/30">
                    <LineChart className="text-white" size={24} /> {/* Icon instead of number */}
                  </div>
                </div>
              </div>

              <div className="w-1/2 pl-12">
                <div className={`transition-all duration-1000 delay-600 transform ${animateTimeline ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                  <h3 className="text-2xl font-bold mb-2 text-purple-400">Continuous Evolution</h3>
                  <p className="text-gray-300">Analytics-driven enhancements and proactive feature development</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-24 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">The SniperCoders Advantage</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {/* Feature 1 */}
          <div className={`bg-gradient-to-b from-slate-800 to-slate-900 backdrop-blur-sm rounded-2xl p-8 transition-all duration-700 transform hover:scale-105 hover:animate-card-hover-lift ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} border border-slate-700/30 shadow-xl shadow-purple-900/10 group`}>
            <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-4 rounded-xl inline-block mb-6 shadow-lg shadow-purple-500/20 group-hover:animate-icon-pulse">
              <Rocket className="text-white" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">Cutting-Edge Stack</h3>
            <p className="text-gray-300">Swift, Kotlin, React Native with native module integration</p>
          </div>

          {/* Feature 2 */}
          <div className={`bg-gradient-to-b from-slate-800 to-slate-900 backdrop-blur-sm rounded-2xl p-8 transition-all duration-700 delay-100 transform hover:scale-105 hover:animate-card-hover-lift ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} border border-slate-700/30 shadow-xl shadow-blue-900/10 group`}>
            <div className="bg-gradient-to-br from-blue-500 to-teal-500 p-4 rounded-xl inline-block mb-6 shadow-lg shadow-blue-500/20 group-hover:animate-icon-pulse">
              <Edit className="text-white" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">Precision QA Protocol</h3>
            <p className="text-gray-300">75+ device test matrix with performance benchmarking</p>
          </div>

          {/* Feature 3 */}
          <div className={`bg-gradient-to-b from-slate-800 to-slate-900 backdrop-blur-sm rounded-2xl p-8 transition-all duration-700 delay-200 transform hover:scale-105 hover:animate-card-hover-lift ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} border border-slate-700/30 shadow-xl shadow-teal-900/10 group`}>
            <div className="bg-gradient-to-br from-teal-500 to-emerald-500 p-4 rounded-xl inline-block mb-6 shadow-lg shadow-teal-500/20 group-hover:animate-icon-pulse">
              <BarChart3 className="text-white" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">Performance Optimized</h3>
            <p className="text-gray-300">Sub-16ms frame time and minimal memory footprint</p>
          </div>

          {/* Feature 4 */}
          <div className={`bg-gradient-to-b from-slate-800 to-slate-900 backdrop-blur-sm rounded-2xl p-8 transition-all duration-700 delay-300 transform hover:scale-105 hover:animate-card-hover-lift ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} border border-slate-700/30 shadow-xl shadow-purple-900/10 group`}>
            <div className="bg-gradient-to-br from-emerald-500 to-purple-500 p-4 rounded-xl inline-block mb-6 shadow-lg shadow-emerald-500/20 group-hover:animate-icon-pulse">
              <Shield className="text-white" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">Security Architecture</h3>
            <p className="text-gray-300">Zero-knowledge encryption and penetration-tested codebase</p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {/* Service 1 */}
          <div className={`bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-8 transition-all duration-1000 transform hover:translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} border border-purple-500/10 shadow-lg group`} style={{ backgroundSize: '200% 200%', backgroundPosition: '90% 50%', backgroundImage: 'linear-gradient(45deg, #1e1b4b, #1e1b4b, #1e1b4b, #3b0764, #1e1b4b, #1e1b4b)' }}>
            <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-4 rounded-xl inline-block mb-6 shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300">
              <Smartphone className="text-white" size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-400 transition-colors duration-300">Native Excellence</h3>
            <p className="text-gray-300">Utilizing platform-specific capabilities for iOS and Android to create uncompromisingly smooth experiences.</p>
          </div>

          {/* Service 2 */}
          <div className={`bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-8 transition-all duration-1000 delay-200 transform hover:translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} border border-blue-500/10 shadow-lg group`} style={{ backgroundSize: '200% 200%', backgroundPosition: '90% 50%', backgroundImage: 'linear-gradient(45deg, #1e1b4b, #1e1b4b, #1e1b4b, #073b64, #1e1b4b, #1e1b4b)' }}>
            <div className="bg-gradient-to-br from-blue-500 to-teal-500 p-4 rounded-xl inline-block mb-6 shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300">
              <RefreshCw className="text-white" size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors duration-300">Hybrid Solutions</h3>
            <p className="text-gray-300">Strategic cross-platform development with React Native and Flutter enhanced by native modules for optimal performance.</p>
          </div>

          {/* Service 3 */}
          <div className={`bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-8 transition-all duration-1000 delay-300 transform hover:translate-y-2 hover:shadow-2xl hover:shadow-teal-500/20 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} border border-teal-500/10 shadow-lg group`} style={{ backgroundSize: '200% 200%', backgroundPosition: '90% 50%', backgroundImage: 'linear-gradient(45deg, #1e1b4b, #1e1b4b, #1e1b4b, #07643b, #1e1b4b, #1e1b4b)' }}>
            <div className="bg-gradient-to-br from-teal-500 to-emerald-500 p-4 rounded-xl inline-block mb-6 shadow-lg shadow-teal-500/30 group-hover:shadow-teal-500/50 transition-all duration-300">
              <Palette className="text-white" size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-teal-400 transition-colors duration-300">Design Excellence</h3>
            <p className="text-gray-300">Behavior-driven interfaces crafted with micro-interactions and motion design principles for emotional connection.</p>
          </div>

          {/* Service 4 */}
          <div className={`bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-8 transition-all duration-1000 delay-400 transform hover:translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/20 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} border border-emerald-500/10 shadow-lg group`} style={{ backgroundSize: '200% 200%', backgroundPosition: '90% 50%', backgroundImage: 'linear-gradient(45deg, #1e1b4b, #1e1b4b, #1e1b4b, #3b6407, #1e1b4b, #1e1b4b)' }}>
            <div className="bg-gradient-to-br from-emerald-500 to-orange-500 p-4 rounded-xl inline-block mb-6 shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-all duration-300">
              <Settings className="text-white" size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-emerald-400 transition-colors duration-300">Lifecycle Management</h3>
            <p className="text-gray-300">Continuous optimization, performance tuning, and feature evolution based on real-world analytics insights.</p>
          </div>

          {/* Service 5 */}
          <div className={`bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-8 transition-all duration-1000 delay-500 transform hover:translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} border border-orange-500/10 shadow-lg group`} style={{ backgroundSize: '200% 200%', backgroundPosition: '90% 50%', backgroundImage: 'linear-gradient(45deg, #1e1b4b, #1e1b4b, #1e1b4b, #643b07, #1e1b4b, #1e1b4b)' }}>
            <div className="bg-gradient-to-br from-orange-500 to-purple-500 p-4 rounded-xl inline-block mb-6 shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-all duration-300">
              <Briefcase className="text-white" size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-orange-400 transition-colors duration-300">Enterprise Mobility</h3>
            <p className="text-gray-300">Secure, compliant solutions for workflow automation, data visualization, and internal operations enhancement.</p>
          </div>

          {/* Service 6 */}
          <div className={`bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-8 transition-all duration-1000 delay-600 transform hover:translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} border border-purple-500/10 shadow-lg group`} style={{ backgroundSize: '200% 200%', backgroundPosition: '90% 50%', backgroundImage: 'linear-gradient(45deg, #1e1b4b, #1e1b4b, #1e1b4b, #3b0764, #1e1b4b, #1e1b4b)' }}>
            <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-4 rounded-xl inline-block mb-6 shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300">
              <LineChart className="text-white" size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-400 transition-colors duration-300">Growth Acceleration</h3>
            <p className="text-gray-300">App store conversion optimization, user acquisition funnels, and retention strategy development.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-24 relative z-10">
        <div className="bg-gradient-to-r from-purple-600/90 via-blue-600/90 to-teal-600/90 backdrop-blur-sm rounded-3xl p-16 text-center shadow-2xl shadow-purple-900/20 border border-purple-500/10" style={{ backgroundSize: '200% 200%', animation: 'subtle-gradient-move 15s linear infinite alternate' }}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready for Mobile Excellence?</h2>
          <p className="text-white text-xl mb-10 max-w-2xl mx-auto">
            Let's craft an application that exceeds expectations and elevates your brand above the competition. Begin with a strategic consultation.
          </p>
          <button className="bg-white text-slate-900 font-bold py-4 px-8 rounded-xl hover:bg-slate-100 transition-all duration-300 flex items-center gap-3 mx-auto group shadow-xl hover:shadow-white/20 hover:animate-button-pulse">
            <span>Begin Your Mobile Transformation</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/80 backdrop-blur-sm pt-20 pb-10 relative z-10 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="text-purple-500 font-bold text-xl flex items-center">
                  <Code className="mr-2" size={24} />
                  <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 bg-clip-text text-transparent">SniperCoders</span>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                At SniperCoders, we transform digital visions into precise, elegant reality. Our mobile development expertise empowers businesses to connect with their audience through exceptional digital experiences.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 text-white">Our Expertise</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">Enterprise Applications</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">Enterprise Applications</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">Cross-Platform Development</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">Native Mobile Applications</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 text-white">Company</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">About SniperCoders</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">Our Work</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">Join Our Team</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 text-white">Resources</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">Development Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">Case Studies</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">Client Testimonials</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">Tech Stack</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8">
            <p className="text-center text-gray-500">© 2025 SniperCoders. Delivering precision mobile excellence worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}