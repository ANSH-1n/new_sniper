
"use client"

import React, { useEffect, useState, useRef } from 'react';
import { ChevronRight, CheckCircle, MapPin, Clock, Zap, Share2, Search, MessageCircle, BarChart2, Mail, Layout, Code } from 'lucide-react';
import CountUp from 'react-countup';

const MarketingWebsite = () => {
  const [visible, setVisible] = useState([false, false, false, false, false, false]);
  const processRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [bubbles, setBubbles] = useState([]);
  const [heroTextAnimated, setHeroTextAnimated] = useState(false);
  const [cardAnimations, setCardAnimations] = useState(false);
  const [timelineAnimated, setTimelineAnimated] = useState(false);

  useEffect(() => {
    setTimelineAnimated(true);

    const heroTextTimer = setTimeout(() => {
      setHeroTextAnimated(true);
    }, 300);

    const cardTimer = setTimeout(() => {
      setCardAnimations(true);
    }, 800);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = processRefs.current.findIndex(ref => ref === entry.target);
          if (index !== -1 && entry.isIntersecting) {
            setVisible(prev => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    processRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    // Bubble animation setup
    generateBubbles();
    const bubbleInterval = setInterval(() => {
      generateBubbles(3);
    }, 3000);


    return () => {
      clearTimeout(heroTextTimer);
      clearTimeout(cardTimer);
      clearInterval(bubbleInterval);
      processRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Bubble animation function
  const generateBubbles = (count = 10) => {
    const newBubbles = [];

    for (let i = 0; i < count; i++) {
      newBubbles.push({
        id: Date.now() + i,
        size: Math.random() * 40 + 15,
        left: Math.random() * 100,
        duration: Math.random() * 12 + 8,
        delay: Math.random() * 3,
        opacity: Math.random() * 0.2 + 0.1
      });
    }

    setBubbles(prev => [...prev, ...newBubbles]);

    if (bubbles.length > 50) {
      setTimeout(() => {
        setBubbles(prev => prev.slice(count));
      }, 15000);
    }
  };


  return (
    <div className="bg-slate-900 text-gray-100 min-h-screen overflow-hidden relative">
      {/* Bubble Animation */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {bubbles.map(bubble => (
          <div
            key={bubble.id}
            className="absolute rounded-full bg-gradient-to-tr from-blue-500/10 to-teal-500/10"
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
            background-color: #2D3748;
          }
          100% {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
            background-color: #4A5568;
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

      {/* Header & Nav */}
      <header className="py-6 px-8 flex justify-between items-center border-b border-slate-800 backdrop-blur-sm bg-slate-900/80 z-10 sticky top-0">
        <div className="flex items-center">
          <div className="text-purple-500 mr-2 text-3xl font-bold animate-pulse-slow">
            {"{"}<span className="text-orange-500">SC</span>{"}"}
          </div>
          <div className="font-bold text-xl text-white">SniperCoders</div>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="hover:text-purple-400 transition-colors duration-300">Services</a>
          <a href="#" className="hover:text-purple-400 transition-colors duration-300">Process</a>
          <a href="#" className="hover:text-purple-400 transition-colors duration-300">About</a>
          <a href="#" className="hover:text-purple-400 transition-colors duration-300">Contact</a>
        </nav>
        <button className="bg-gradient-to-r from-purple-600 to-orange-500 px-5 py-2.5 rounded-md font-medium hover:shadow-lg hover:shadow-orange-500/50 transition-shadow duration-300">
          Get a Quote
        </button>
      </header>

      {/* Hero */}
      <section className="py-24 px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block bg-gradient-to-r from-purple-600 to-orange-500 px-4 py-1 rounded-full mb-6 opacity-0 animate-fade-in-delayed" style={{animationDelay: '0.4s', animationFillMode: 'forwards'}}>
            <span className="flex items-center text-sm">
              <Zap size={16} className="mr-2" />
              Maximize Your Digital Impact
            </span>
          </div>
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent drop-shadow-md ${heroTextAnimated ? 'animate-hero-text-animate' : 'opacity-0'}`} style={{ animationDuration: '1.2s', animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            Data-Driven Marketing Solutions
          </h1>
          <p className="text-xl mb-10 text-gray-300 opacity-0 animate-fade-in-delayed" style={{animationDelay: '0.8s', animationFillMode: 'forwards'}}>
            Transform your online presence with strategies that
            <span className="text-purple-400 font-semibold"> attract</span>,
            <span className="text-pink-400 font-semibold"> engage</span>, and
            <span className="text-blue-400 font-semibold"> convert</span>.
            We turn digital interactions into measurable business growth.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <div className={`bg-slate-800/70 backdrop-blur-sm p-7 rounded-xl text-center w-64 shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105 ${cardAnimations ? 'animate-card-scale-up' : 'opacity-0'}`} style={{animationDelay: '1s', animationFillMode: 'forwards'}}>
              <div className="text-4xl font-bold text-purple-400 mb-2">
                <CountUp end={300} duration={2} suffix="%" />
              </div>
              <div className="text-gray-400">ROI Increase</div>
            </div>
            <div className={`bg-slate-800/70 backdrop-blur-sm p-7 rounded-xl text-center w-64 shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105 ${cardAnimations ? 'animate-card-scale-up' : 'opacity-0'}`} style={{animationDelay: '1.2s', animationFillMode: 'forwards'}}>
              <div className="text-4xl font-bold text-purple-400 mb-2">#<CountUp end={1} duration={1} /></div>
              <div className="text-gray-400">Google Rankings</div>
            </div>
            <div className={`bg-slate-800/70 backdrop-blur-sm p-7 rounded-xl text-center w-64 shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105 ${cardAnimations ? 'animate-card-scale-up' : 'opacity-0'}`} style={{animationDelay: '1.4s', animationFillMode: 'forwards'}}>
              <div className="text-4xl font-bold text-purple-400 mb-2">
                <CountUp end={90} duration={2} suffix="%" />
              </div>
              <div className="text-gray-400">Client Retention</div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-20 bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent drop-shadow-md">Our 360° Marketing Process</h2>

          <div className="relative">
            {/* Zig-Zag Vertical Line */}
            <svg className="absolute left-1/2 transform -translate-x-1/2 h-full z-0" width="2" fill="none" viewBox="0 0 2 100%" aria-hidden="true">
              <path
                d="M1 0V20L0 30V50L1 60V80L0 90V100%"
                stroke="url(#zigZagGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                className={`${timelineAnimated ? 'animate-timeline-line-draw-zigzag' : 'stroke-dashoffset-[1000]'} origin-top`}
                style={{animationDuration: '2s', animationDelay: '0.5s', animationTimingFunction: 'ease-out', animationFillMode: 'forwards'}}
              />
              <defs>
                <linearGradient id="zigZagGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" /> {/* Purple */}
                  <stop offset="100%" stopColor="#f97316" /> {/* Orange */}
                </linearGradient>
              </defs>
            </svg>


            {/* Process Steps */}
            <div className="space-y-32 relative z-10">
              {/* Step 1 */}
              <div
                ref={el => processRefs.current[0] = el}
                className={`flex items-center transition-opacity duration-1000 ${visible[0] ? 'opacity-100' : 'opacity-0'}`}
              >
                <div className="w-1/2 pr-12 text-right">
                  <div className={`transform translate-x-4 transition-transform duration-1000 ${visible[0] ? 'translate-x-0 opacity-100' : 'opacity-0'}`} style={{transitionDelay: '0.2s'}}>
                    <h3 className="text-2xl font-bold mb-3 text-purple-400">Audit & Analysis</h3>
                    <p className="text-gray-300">Comprehensive website health check and competitor analysis</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/50 transform scale-0 transition-transform duration-500 ${visible[0] ? 'scale-100' : ''}`} style={{transitionDelay: '0.6s'}}>
                    <CheckCircle size={28} className="text-white animate-pulse-slow" />
                  </div>
                </div>
                <div className="w-1/2"></div>
              </div>

              {/* Step 2 */}
              <div
                ref={el => processRefs.current[1] = el}
                className={`flex items-center transition-opacity duration-1000 ${visible[1] ? 'opacity-100' : 'opacity-0'}`}
              >
                <div className="w-1/2"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center shadow-lg shadow-blue-500/50 transform scale-0 transition-transform duration-500 ${visible[1] ? 'scale-100' : ''}`} style={{transitionDelay: '0.6s'}}>
                    <Layout size={28} className="text-white animate-pulse-slow" />
                  </div>
                </div>
                <div className="w-1/2 pl-12">
                  <div className={`transform translate-x-4 transition-transform duration-1000 ${visible[1] ? 'translate-x-0 opacity-100' : 'opacity-0'}`} style={{transitionDelay: '0.2s'}}>
                    <h3 className="text-2xl font-bold mb-3 text-blue-400">Strategy Development</h3>
                    <p className="text-gray-300">Customized marketing roadmap with KPIs</p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div
                ref={el => processRefs.current[2] = el}
                className={`flex items-center transition-opacity duration-1000 ${visible[2] ? 'opacity-100' : 'opacity-0'}`}
              >
                <div className="w-1/2 pr-12 text-right">
                  <div className={`transform translate-x-4 transition-transform duration-1000 ${visible[2] ? 'translate-x-0 opacity-100' : 'opacity-0'}`} style={{transitionDelay: '0.2s'}}>
                    <h3 className="text-2xl font-bold mb-3 text-teal-400">Implementation</h3>
                    <p className="text-gray-300">Integrated campaign execution across channels</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-green-500 flex items-center justify-center shadow-lg shadow-teal-500/50 transform scale-0 transition-transform duration-500 ${visible[2] ? 'scale-100' : ''}`} style={{transitionDelay: '0.6s'}}>
                    <Zap size={28} className="text-white animate-pulse-slow" />
                  </div>
                </div>
                <div className="w-1/2"></div>
              </div>

              {/* Step 4 */}
              <div
                ref={el => processRefs.current[3] = el}
                className={`flex items-center transition-opacity duration-1000 ${visible[3] ? 'opacity-100' : 'opacity-0'}`}
              >
                <div className="w-1/2"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-orange-500 flex items-center justify-center shadow-lg shadow-green-500/50 transform scale-0 transition-transform duration-500 ${visible[3] ? 'scale-100' : ''}`} style={{transitionDelay: '0.6s'}}>
                    <Clock size={28} className="text-white animate-pulse-slow" />
                  </div>
                </div>
                <div className="w-1/2 pl-12">
                  <div className={`transform translate-x-4 transition-transform duration-1000 ${visible[3] ? 'translate-x-0 opacity-100' : 'opacity-0'}`} style={{transitionDelay: '0.2s'}}>
                    <h3 className="text-2xl font-bold mb-3 text-green-400">Monitoring</h3>
                    <p className="text-gray-300">Real-time performance tracking and adjustments</p>
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div
                ref={el => processRefs.current[4] = el}
                className={`flex items-center transition-opacity duration-1000 ${visible[4] ? 'opacity-100' : 'opacity-0'}`}
              >
                <div className="w-1/2 pr-12 text-right">
                  <div className={`transform translate-x-4 transition-transform duration-1000 ${visible[4] ? 'translate-x-0 opacity-100' : 'opacity-0'}`} style={{transitionDelay: '0.2s'}}>
                    <h3 className="text-2xl font-bold mb-3 text-orange-400">Optimization</h3>
                    <p className="text-gray-300">Continuous A/B testing and strategy refinement</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center shadow-lg shadow-orange-500/50 transform scale-0 transition-transform duration-500 ${visible[4] ? 'scale-100' : ''}`} style={{transitionDelay: '0.6s'}}>
                    <BarChart2 size={28} className="text-white animate-pulse-slow" />
                  </div>
                </div>
                <div className="w-1/2"></div>
              </div>

              {/* Step 6 */}
              <div
                ref={el => processRefs.current[5] = el}
                className={`flex items-center transition-opacity duration-1000 ${visible[5] ? 'opacity-100' : 'opacity-0'}`}
              >
                <div className="w-1/2"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center shadow-lg shadow-pink-500/50 transform scale-0 transition-transform duration-500 ${visible[5] ? 'scale-100' : ''}`} style={{transitionDelay: '0.6s'}}>
                    <Mail size={28} className="text-white animate-pulse-slow" />
                  </div>
                </div>
                <div className="w-1/2 pl-12">
                  <div className={`transform translate-x-4 transition-transform duration-1000 ${visible[5] ? 'translate-x-0 opacity-100' : 'opacity-0'}`} style={{transitionDelay: '0.2s'}}>
                    <h3 className="text-2xl font-bold mb-3 text-pink-400">Reporting</h3>
                    <p className="text-gray-300">Monthly ROI analysis and stakeholder reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketing Advantage */}
      <section className="py-24 px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-20 bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent drop-shadow-md">Our Marketing Advantage</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className={`group bg-slate-800/70 backdrop-blur-sm p-8 rounded-2xl transition-all duration-500 hover:animate-advantage-card-hover shadow-md hover:shadow-lg border border-slate-700/40 relative overflow-hidden ${cardAnimations ? 'animate-card-scale-up' : 'opacity-0'}`} style={{animationDelay: '1.1s', animationFillMode: 'forwards'}}>
              <div className="bg-purple-600 w-14 h-14 rounded-xl flex items-center justify-center mb-5 shadow-md">
                <CheckCircle size={32} className="text-white animate-pulse-slow" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Data-Driven Approach</h3>
              <p className="text-gray-300">AI-powered insights and competitor analysis</p>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-500 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
            </div>

            <div className={`group bg-slate-800/70 backdrop-blur-sm p-8 rounded-2xl transition-all duration-500 hover:animate-advantage-card-hover shadow-md hover:shadow-lg border border-slate-700/40 relative overflow-hidden ${cardAnimations ? 'animate-card-scale-up' : 'opacity-0'}`} style={{animationDelay: '1.3s', animationFillMode: 'forwards'}}>
              <div className="bg-blue-600 w-14 h-14 rounded-xl flex items-center justify-center mb-5 shadow-md">
                <MapPin size={32} className="text-white animate-pulse-slow" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Local SEO Mastery</h3>
              <p className="text-gray-300">Dominating local searches in target regions</p>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
            </div>

            <div className={`group bg-slate-800/70 backdrop-blur-sm p-8 rounded-2xl transition-all duration-500 hover:animate-advantage-card-hover shadow-md hover:shadow-lg border border-slate-700/40 relative overflow-hidden ${cardAnimations ? 'animate-card-scale-up' : 'opacity-0'}`} style={{animationDelay: '1.5s', animationFillMode: 'forwards'}}>
              <div className="bg-teal-600 w-14 h-14 rounded-xl flex items-center justify-center mb-5 shadow-md">
                <Clock size={32} className="text-white animate-pulse-slow" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Integrated Strategies</h3>
              <p className="text-gray-300">Omnichannel campaign synchronization</p>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-teal-500 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
            </div>

            <div className={`group bg-slate-800/70 backdrop-blur-sm p-8 rounded-2xl transition-all duration-500 hover:animate-advantage-card-hover shadow-md hover:shadow-lg border border-slate-700/40 relative overflow-hidden ${cardAnimations ? 'animate-card-scale-up' : 'opacity-0'}`} style={{animationDelay: '1.7s', animationFillMode: 'forwards'}}>
              <div className="bg-orange-600 w-14 h-14 rounded-xl flex items-center justify-center mb-5 shadow-md">
                <BarChart2 size={32} className="text-white animate-pulse-slow" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Transparent Tracking</h3>
              <p className="text-gray-300">Real-time dashboard with KPIs</p>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-500 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-8 relative z-10 bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-20 bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent drop-shadow-md">Our Services</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className={`group bg-slate-800/70 backdrop-blur-sm p-8 rounded-2xl transition-all duration-300 hover:animate-service-card-hover shadow-md hover:shadow-lg border border-slate-700/40 relative overflow-hidden ${cardAnimations ? 'animate-card-scale-up' : 'opacity-0'}`} style={{animationDelay: '1.2s', animationFillMode: 'forwards'}}>
              <div className="bg-orange-500 w-14 h-14 rounded-xl flex items-center justify-center mb-5 shadow-md">
                <Search size={32} className="text-white animate-pulse-slow" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Search Engine Optimization</h3>
              <p className="text-gray-300">Dominate search rankings with technical, on-page, and off-page SEO strategies that drive organic growth.</p>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-500 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
            </div>

            <div className={`group bg-slate-800/70 backdrop-blur-sm p-8 rounded-2xl transition-all duration-300 hover:animate-service-card-hover shadow-md hover:shadow-lg border border-slate-700/40 relative overflow-hidden ${cardAnimations ? 'animate-card-scale-up' : 'opacity-0'}`} style={{animationDelay: '1.4s', animationFillMode: 'forwards'}}>
              <div className="bg-blue-500 w-14 h-14 rounded-xl flex items-center justify-center mb-5 shadow-md">
                <Share2 size={32} className="text-white animate-pulse-slow" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Social Media Marketing</h3>
              <p className="text-gray-300">Strategic campaigns that build brand loyalty and convert followers into customers.</p>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
            </div>

            <div className={`group bg-slate-800/70 backdrop-blur-sm p-8 rounded-2xl transition-all duration-300 hover:animate-service-card-hover shadow-md hover:shadow-lg border border-slate-700/40 relative overflow-hidden ${cardAnimations ? 'animate-card-scale-up' : 'opacity-0'}`} style={{animationDelay: '1.6s', animationFillMode: 'forwards'}}>
              <div className="bg-pink-500 w-14 h-14 rounded-xl flex items-center justify-center mb-5 shadow-md">
                <MessageCircle size={32} className="text-white animate-pulse-slow" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Content Marketing</h3>
              <p className="text-gray-300">Compelling storytelling that positions your brand as an industry thought leader.</p>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-pink-500 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
            </div>

            <div className={`group bg-slate-800/70 backdrop-blur-sm p-8 rounded-2xl transition-all duration-300 hover:animate-service-card-hover shadow-md hover:shadow-lg border border-slate-700/40 relative overflow-hidden ${cardAnimations ? 'animate-card-scale-up' : 'opacity-0'}`} style={{animationDelay: '1.8s', animationFillMode: 'forwards'}}>
              <div className="bg-red-500 w-14 h-14 rounded-xl flex items-center justify-center mb-5 shadow-md">
                <BarChart2 size={32} className="text-white animate-pulse-slow" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">PPC Advertising</h3>
              <p className="text-gray-300">Targeted ad campaigns with precise audience targeting and conversion optimization.</p>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-red-500 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
            </div>

            <div className={`group bg-slate-800/70 backdrop-blur-sm p-8 rounded-2xl transition-all duration-300 hover:animate-service-card-hover shadow-md hover:shadow-lg border border-slate-700/40 relative overflow-hidden ${cardAnimations ? 'animate-card-scale-up' : 'opacity-0'}`} style={{animationDelay: '2s', animationFillMode: 'forwards'}}>
              <div className="bg-green-500 w-14 h-14 rounded-xl flex items-center justify-center mb-5 shadow-md">
                <Mail size={32} className="text-white animate-pulse-slow" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Email Marketing</h3>
              <p className="text-gray-300">Automated nurture sequences that guide leads through the sales funnel.</p>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-green-500 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
            </div>

            <div className={`group bg-slate-800/70 backdrop-blur-sm p-8 rounded-2xl transition-all duration-300 hover:animate-service-card-hover shadow-md hover:shadow-lg border border-slate-700/40 relative overflow-hidden ${cardAnimations ? 'animate-card-scale-up' : 'opacity-0'}`} style={{animationDelay: '2.2s', animationFillMode: 'forwards'}}>
              <div className="bg-purple-500 w-14 h-14 rounded-xl flex items-center justify-center mb-5 shadow-md">
                <Layout size={32} className="text-white animate-pulse-slow" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Analytics & Reporting</h3>
              <p className="text-gray-300">Actionable insights from comprehensive campaign performance tracking.</p>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-500 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 p-16 rounded-3xl text-center shadow-2xl shadow-purple-900/30 border border-purple-500/20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-md">Ready to Outperform Competitors?</h2>
            <p className="text-xl mb-10 text-gray-100 max-w-2xl mx-auto drop-shadow-sm">
              Get a free marketing audit and discover how we can 10x your digital presence! Let's elevate your brand to new heights.
            </p>
            <button className="bg-white text-purple-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors flex items-center mx-auto hover:animate-cta-button-pulse shadow-lg group">
              Get Free Marketing Analysis
              <ChevronRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-24 px-8 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center mb-6">
              <div className="text-purple-500 mr-2 text-3xl font-bold animate-pulse-slow">
                {"{"}<span className="text-orange-500">SC</span>{"}"}
              </div>
              <div className="font-bold text-xl text-white">SniperCoders</div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              At SniperCoders, we specialize in turning visionary ideas into reality. Our expertise in digital marketing helps businesses transform aspirations into tangible solutions, paving the way for future growth.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Our Service</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-purple-400 transition-colors duration-300">Custom Software Development</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors duration-300">Website Development</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors duration-300">Mobile App Development</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Useful Links</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-purple-400 transition-colors duration-300">Terms of Service</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors duration-300">Refund Policy</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors duration-300">Careers</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Know More</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-purple-400 transition-colors duration-300">What We Offer</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors duration-300">Our Team</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors duration-300">FAQs</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors duration-300">Testimonials</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-slate-800 text-center text-gray-500">
          <p>© 2025 SniperCoders. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MarketingWebsite;


































