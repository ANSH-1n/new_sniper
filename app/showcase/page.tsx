

"use client"

import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import * as THREE from 'three';
import { motion, Variants } from 'framer-motion';

// Define TypeScript interfaces
interface ProjectCategory {
  id: string;
  name: string;
  color: string;
  hoverColor: string;
}

interface Project {
  id: string;
  title: string;
  image: string;
  categories: string[];
  description: string;
  href : string;
  tags: string[];
}

interface BubbleProps {
  count: number;
}


  const textVariants: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };


// 3D Particle Background Component
const ThreeJSBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number>(null);
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    mountRef.current.appendChild(renderer.domElement);
    
    // Create particle system
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 2000;
    
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);
    
    const color1 = new THREE.Color(0x0ea5e9); // Cyan blue
    const color2 = new THREE.Color(0x14b8a6); // Teal
    const color3 = new THREE.Color(0xa656ff); // Purple
    
    for (let i = 0; i < particleCount; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 10; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10 - 3; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5; // z
      
      // Size
      sizes[i] = Math.random() * 0.05 + 0.01;
      
      // Color - mix between three colors
      const mixFactor1 = Math.random();
      const mixFactor2 = Math.random() * (1 - mixFactor1);
      const mixFactor3 = 1 - mixFactor1 - mixFactor2;
      
      colors[i * 3] = color1.r * mixFactor1 + color2.r * mixFactor2 + color3.r * mixFactor3;
      colors[i * 3 + 1] = color1.g * mixFactor1 + color2.g * mixFactor2 + color3.g * mixFactor3;
      colors[i * 3 + 2] = color1.b * mixFactor1 + color2.b * mixFactor2 + color3.b * mixFactor3;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // Create particle material
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.1,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
      vertexColors: true,
      blending: THREE.AdditiveBlending
    });
    
    // Create particle system
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);
    
    camera.position.z = 5;
    
    // Mouse interaction
    const mouse = new THREE.Vector2();
    
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    let lastScrollY = window.scrollY;
    
    const animate = () => {
      // Get the current scroll position
      const scrollY = window.scrollY;
      const scrollDelta = scrollY - lastScrollY;
      lastScrollY = scrollY;
      
      // Update particle positions
      const positions = particleGeometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        // Subtle movement based on index
        positions[i * 3] += Math.sin(Date.now() * 0.001 + i * 0.1) * 0.001;
        positions[i * 3 + 1] += Math.cos(Date.now() * 0.0015 + i * 0.1) * 0.001;
        
        // Scroll effect - push particles slightly in the direction of scroll
        if (Math.abs(scrollDelta) > 0) {
          positions[i * 3 + 1] -= scrollDelta * 0.0003 * Math.random();
        }
        
        // Mouse interaction - attract particles slightly toward mouse position
        positions[i * 3] += (mouse.x * 0.0001);
        positions[i * 3 + 1] += (mouse.y * 0.0001);
      }
      
      particleGeometry.attributes.position.needsUpdate = true;
      
      // Slowly rotate the entire particle system
      particleSystem.rotation.y += 0.0005;
      particleSystem.rotation.x += 0.0001;
      
      renderer.render(scene, camera);
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      mountRef.current?.removeChild(renderer.domElement);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      scene.remove(particleSystem);
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, []);
  
  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full z-0" />;
};

// Separate Bubble Animation Component
const BubbleAnimation: React.FC<BubbleProps> = ({ count }) => {
  return (
    <div className="bubble-animation">
      {[...Array(count)].map((_, index) => (
        <div key={index} className="bubble" style={{
          '--size': `${Math.random() * 4 + 1}rem`,
          '--distance': `${Math.random() * 6 + 4}rem`,
          '--position': `${Math.random() * 100}%`,
          '--time': `${Math.random() * 2 + 2}s`,
          '--delay': `${Math.random() * 2}s`,
        } as React.CSSProperties} />
      ))}
    </div>
  );
};

// Observer Hook for scroll animations
const useIntersectionObserver = (options = {}) => {
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);
  const [elements, setElements] = useState<HTMLElement[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver((observedEntries) => {
      setEntries(observedEntries);
    }, options);
    
    elements.forEach(element => {
      observer.current?.observe(element);
    });

    return () => {
      elements.forEach(element => {
        observer.current?.unobserve(element);
      });
    };
  }, [elements, options]);

  const observe = (element: HTMLElement) => {
    if (element && !elements.includes(element)) {
      setElements(prev => [...prev, element]);
    }
  };

  return [observe, entries];
};

// AnimatedText component for the description
const AnimatedText: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 20); // Adjust typing speed here

      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, text]);

  // Reset animation when text changes
  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
    setIsComplete(false);
  }, [text]);

  return (
    <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12">
      {displayedText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </p>
  );
};

const SniperCodersPortfolio: React.FC = () => {
  // State for active filter category
  const [activeCategory, setActiveCategory] = useState<string>("all");
  // State for projects to display
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  // State for hover effects
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  // State for animation visibility
  const [animationVisible, setAnimationVisible] = useState<boolean>(false);
  // State for scroll progress
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  // State for mouse position (for hover effects)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Refs
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  // Setup intersection observer
  const [observeElement, entries] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '-100px 0px',
  });
  
  // Project categories with colors for hover effects
  const categories: ProjectCategory[] = [
    { id: "all", name: "All", color: "from-cyan-500 to-blue-600", hoverColor: "from-cyan-600 to-blue-700" },
    { id: "academy-website", name: "Academy Website", color: "from-purple-500 to-indigo-600", hoverColor: "from-purple-600 to-indigo-700" },
    { id: "agency-website", name: "Agency Website", color: "from-amber-500 to-orange-600", hoverColor: "from-amber-600 to-orange-700" },
    { id: "articles-website", name: "Articles Website", color: "from-emerald-500 to-teal-600", hoverColor: "from-emerald-600 to-teal-700" },
    { id: "blog-website", name: "Blog Website", color: "from-rose-500 to-pink-600", hoverColor: "from-rose-600 to-pink-700" },
    { id: "business-portfolio-website", name: "Business Portfolio Website", color: "from-violet-500 to-fuchsia-600", hoverColor: "from-violet-600 to-fuchsia-700" },
    { id: "clothing-brand", name: "Clothing Brand", color: "from-sky-500 to-cyan-600", hoverColor: "from-sky-600 to-cyan-700" },
    { id: "dental-website", name: "Dental Website", color: "from-green-500 to-emerald-600", hoverColor: "from-green-600 to-emerald-700" },
    { id: "driving-school", name: "Driving School", color: "from-yellow-500 to-amber-600", hoverColor: "from-yellow-600 to-amber-700" },
    { id: "ngo-website", name: "NGO Website", color: "from-red-500 to-orange-600", hoverColor: "from-red-600 to-orange-700" },
    { id: "news-website", name: "News Website", color: "from-indigo-500 to-blue-600", hoverColor: "from-indigo-600 to-blue-700" },
    { id: "portfolio-website", name: "Portfolio Website", color: "from-pink-500 to-rose-600", hoverColor: "from-pink-600 to-rose-700" },
    { id: "traveling-website", name: "Traveling Website", color: "from-blue-500 to-indigo-600", hoverColor: "from-blue-600 to-indigo-700" },
    { id: "web-application", name: "Web Application", color: "from-teal-500 to-emerald-600", hoverColor: "from-teal-600 to-emerald-700" },
    { id: "website", name: "Website", color: "from-orange-500 to-red-600", hoverColor: "from-orange-600 to-red-700" },
    { id: "UIUX", name: "UIUX", color: "from-orange-500 to-red-600", hoverColor: "from-orange-600 to-red-700" },
  ];

 


 const projects: Project[] = [
    {
      id: "UIUX",
      title: "UIUX",
      image: "/images/image.png", // Placeholder
      categories: ["CRM  Automation", "UIUX"],
      description: "Aim to be the go-to platform for businesses seeking seamless management, automation, and innovation",
      tags: ["CRM  Automation", "UI-UX Design"],
      href: "https://www.torkehub.com/"
    },
    {
      id: "brg-finery",
      title: "BRG Finery",
      image: "/images/frfr[1].png", // Placeholder
      categories: ["clothing-brand", "web-application"],
      description: "Fashion e-commerce platform with a modern design and seamless user experience.",
      tags: ["Clothing Brand", "Web Application"],
      href: "https://brgfinery.com/"
    },
    {
      id: "karunadu-products",
      title: "Karunadu Products",
      image: "/images/karunadu-products-kodekalp[1].png", // Placeholder
      categories: ["website", "web-application"],
      description: "Empowering communities and enriching lives through sustainable products.",
      tags: ["Website", "Web Application"],
      href: "https://karunaduproducts.com/"
    },
    {
      id: "dr-sharad-dental",
      title: "Dr. Sharad Dental Clinic",
      image: "/images/denta[1].png", // Placeholder
      categories: ["dental-website", "website", "web-application"],
      description: "Professional dental care website with appointment booking system.",
      tags: ["Dental Website", "Website", "Web Application"],
      href: "https://drsharaddentalclinic.com/"
    },
    {
      id: "ashirwad-driving",
      title: "Ashirwad Driving School",
      image: "/images/ashirwaddrivingschool-kodekalp[1].png", // Placeholder
      categories: ["driving-school", "website", "web-application"],
      description: "Comprehensive driving school platform with course management.",
      tags: ["Driving School", "Website", "Web Application"],
      href: "https://ashirwaddrivingschool.com/"
    },
    {
      id: "chevox",
      title: "Chevox",
      image: "/images/cloflex-kodekalp[1].png", // Placeholder
      categories: ["clothing-brand", "website", "web-application"],
      description: "Crafted to seamlessly blend fashion with fashion.",
      tags: ["Clothing Brand", "Website", "Web Application"],
      href: "https://chevox.in/"
    },
    {
      id: "airborn-aviation",
      title: "Airborn Aviation Academy",
      image: "/images/airborne-kodekalp[1].png", // Placeholder
      categories: ["academy-website", "web-application"],
      description: "Your gateway to a successful career in Aviation.",
      tags: ["Academy Website", "Web Application"],
      href: "https://www.airborne.org.in/"
    },
    {
      id: "kodevedic",
      title: "KodeVedic",
      image: "/images/ctc25zsgzsq8kbgh6ztb[1] copy.png", // Placeholder
      categories: ["web-application", "agency-website"],
      description: "Elevate Your Expertise with Coding Skills.",
      tags: ["Web Application", "Agency Website"],
      href: "https://www.kodevedic.com/"
    },
    {
      id: "your-project-code",
      title: "Your Project Code",
      image: "/images/your[1].png", // Placeholder
      categories: ["articles-website", "blog-website"],
      description: "Science Adventures: Unleashing The Power Of Data.",
      tags: ["Articles Website", "Blog Website"],
      href: "https://www.yourprojectcode.com/"
    },
    {
      id: "omniminds-consulting",
      title: "Omniminds Consulting",
      image: "/images/awif1vuvznvfnkikwl03[1].png", // Placeholder
      categories: ["agency-website", "web-application"],
      description: "We promise to bring the best solution for your business.",
      tags: ["Agency Website", "Web Application"],
      href: "https://omnimindsconsulting.com/"
    },
    {
      id: "renuka-world",
      title: "Renuka World",
      image: "/images/renuk[1].png", // Placeholder
      categories: ["traveling-website", "web-application"],
      description: "Discover Goa: Your Ultimate Travel Destination.",
      tags: ["Traveling Website", "Web Application"],
      href: "https://www.renukaworld.com/"
    },
    {
      id: "jain-jaivik",
      title: "Jain Jaivik",
      image: "/images/jj[1].png", // Placeholder
      categories: ["portfolio-website", "agency-website"],
      description: "A New Way to Invest in Agriculture.",
      tags: ["Portfolio Website", "Agency Website"],
      href: "https://www.jainjaivik.com/"
    },
    {
      id: "mash-digital",
      title: "Mash Digital",
      image: "/images/mash[1].png", // Placeholder
      categories: ["agency-website", "web-application"],
      description: "Elevate Your Expertise with Coding Skills.",
      tags: ["Agency Website", "Web Application"],
      href: "https://mashdigital.com/"
    },
    {
      id: "shakthi-nakshatra",
      title: "Shakthi Nakshatra-Book",
      image: "/images/thelandschaft-kodekalp[1].png", // Placeholder
      categories: ["portfolio-website", "web-application"],
      description: "Literary portfolio showcasing author's work with online ordering.",
      tags: ["Portfolio Website", "Web Application"],
      href: "https://www.udayashiva.in/"
    },
    {
      id: "super-women",
      title: "Super Women",
      image: "/images/superwomen-kodekalp[1].png", // Placeholder
      categories: ["news-website", "website", "web-application"],
      description: "News platform dedicated to women's achievements and stories.",
      tags: ["News Website", "Website", "Web Application"],
      href: "https://superwomen.live/"
    },
    {
      id: "adflux-agency",
      title: "Adflux Agency",
      image: "/images/adfkux[1].png", // Placeholder
      categories: ["agency-website", "web-application"],
      description: "Unleash the Power of Digital Marketing.",
      tags: ["Agency Website", "Web Application"],
      href: "https://adfluxagency.com/"
    },
  ];


  // Initialize with all projects on mount
  useEffect(() => {
    setFilteredProjects(projects);
    setAnimationVisible(true);
    
    // Setup scroll listener for parallax and progress tracking
    const handleScroll = () => {
      if (headerRef.current) {
        const scrollPosition = window.scrollY;
        headerRef.current.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        
        // Calculate scroll progress percentage
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (scrollPosition / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    
    // Setup mouse move listener for interactive effects
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2, // Normalize to -1 to 1
        y: (e.clientY / window.innerHeight - 0.5) * 2 // Normalize to -1 to 1
      });
    };
    
    // Observe elements for animations
    // if (headerRef.current) observeElement(headerRef.current);\
    if (headerRef.current && typeof observeElement === 'function') {
  observeElement(headerRef.current);
}





    
    // Set up document event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Apply initial animations
    setTimeout(() => {
      document.querySelectorAll('.animate-on-mount').forEach((el, i) => {
        setTimeout(() => {
          el.classList.add('animate-in');
        }, 100 * i);
      });
    }, 500);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // Filter projects when activeCategory changes
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter(project => project.categories.includes(activeCategory))
      );
    }
    // Reset hover state when filter changes
    setHoveredProject(null);
  }, [activeCategory]); // Dependency: re-run only when activeCategory changes

  // Animate in projects when filteredProjects changes
  useEffect(() => {
    // Ensure elements exist before trying to manipulate them
    const projectElements = document.querySelectorAll('.project-card');
    // if (projectElements.length > 0) {
    //   projectElements.forEach((element) => {
    //     // Reset animation classes before applying
    //     element.classList.remove('animate-in');
    //     // Force reflow to restart animation
    //     void element.offsetWidth;
    //   });


    if (projectElements.length > 0) {
  projectElements.forEach((element) => {
    const htmlElement = element as HTMLElement;
    // Reset animation classes before applying
    htmlElement.classList.remove('animate-in');
    // Force reflow to restart animation
    void htmlElement.offsetWidth;
  });


      projectElements.forEach((element, index) => {
        // Apply animation with delay
        const timer = setTimeout(() => {
          element.classList.add('animate-in');
        }, 100 * index);
        // Cleanup timeout
        return () => clearTimeout(timer);
      });
    }
  }, [filteredProjects]); // Dependency: re-run when filteredProjects updates

  const YourComponent = () => {
  const statsRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);



    useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in-view');

          // If it's the stats section, trigger counter animation
          if (entry.target === statsRef.current) {
            document.querySelectorAll('.counter').forEach((counter, index) => {
              const counterElement = counter as HTMLElement;
              const target = parseFloat(counterElement.getAttribute('data-target') || '0');
              const isDecimal = target % 1 !== 0;
              const suffix = counterElement.textContent?.replace(/[0-9.]/g, '') || '';

              let currentCount = 0;
              const duration = 2000; // Animation duration in ms
              const startTime = Date.now();

              const updateCounter = () => {
                const now = Date.now();
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function for smoother animation
                const easeOutQuad = (x: number) => 1 - (1 - x) * (1 - x);
                const easedProgress = easeOutQuad(progress);

                currentCount = target * easedProgress;

                // Format and display the current count
                const displayValue = isDecimal
                  ? currentCount.toFixed(1)
                  : Math.floor(currentCount).toString();
                counterElement.textContent = displayValue + suffix;

                if (progress < 1) {
                  requestAnimationFrame(updateCounter);
                }
              };

              setTimeout(() => {
                requestAnimationFrame(updateCounter);
              }, index * 150);
            });
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });

    if (statsRef.current) observer.observe(statsRef.current);
    if (titleRef.current) observer.observe(titleRef.current);

    return () => observer.disconnect(); // Cleanup on unmount
  }, []);

  return (
    <>
      <h1 ref={titleRef} className="title">Welcome</h1>
      <section ref={statsRef} className="stats">
        <div className="counter" data-target="1500">0+</div>
        <div className="counter" data-target="3.5">0.0</div>
        {/* more counters */}
      </section>
    </>
  );
};



  // 3D transform effect for project cards based on mouse position
  const applyMouseEffect = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    if (hoveredProject !== id) return;
    
    const card = e.currentTarget.querySelector('.glass-card') as HTMLElement;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    
    // Add highlight effect based on mouse position
    const highlightX = ((x / rect.width) * 100);
    const highlightY = ((y / rect.height) * 100);
    card.style.backgroundImage = `radial-gradient(circle at ${highlightX}% ${highlightY}%, rgba(56, 182, 255, 0.1) 0%, rgba(0, 0, 0, 0) 60%)`;
  };
  
  // Reset 3D transform on mouse leave
  const resetMouseEffect = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget.querySelector('.glass-card') as HTMLElement;
    if (!card) return;
    
    card.style.transform = '';
    card.style.backgroundImage = '';
  };

  return (
    // Main container div with gradient background and ThreeJS animation
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white relative overflow-hidden">
      {/* 3D Background */}
      <ThreeJSBackground />
      
      {/* Bubble Animation Background */}
      {animationVisible && <BubbleAnimation count={15} />}
      
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 z-50 transition-all duration-300" style={{ width: `${scrollProgress}%` }} />
      
      {/* Glowing orbs in background */}
      <div className="glow-orb blue"></div>
      <div className="glow-orb purple"></div>
      
      {/* Header Section with Parallax Effect */}
      <div 
        ref={headerRef}
        className="relative z-10 container mx-auto px-4 pt-24 pb-12 animate-on-mount opacity-0 transform translate-y-8"
      >
        {/* Animated heading with glow effect */}
        <h2 ref={titleRef} className="text-6xl font-bold text-center mb-4 glow-text split-text animate-on-mount opacity-0 transform translate-y-8">
          <span className="text-gradient">Case Studies</span>
        </h2>
        <div className="mt-6">
  {/* Enhanced animated and styled description text */}
  <AnimatedText
    text="At SniperCoders Global Technologies, we're proud of the digital solutions we've created. Explore our expertise in web development, mobile applications, and cutting-edge IoT integrations."

  />
</div>


        {/* Category Filter with enhanced hover effects */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 filter-container animate-on-mount opacity-0 transform translate-y-8 delay-300"> 
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-500 filter-btn ${
                activeCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/70"
              }`}
              style={{ 
                transitionDelay: `${index * 50}ms`,
                transform: activeCategory === category.id ? 'translateY(-2px)' : 'none',
                boxShadow: activeCategory === category.id ? `0 5px 15px rgba(var(--tw-gradient-from), 0.4)` : '0 2px 5px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== category.id) {
                  e.currentTarget.style.background = `linear-gradient(to right, var(--tw-gradient-stops))`;
                  e.currentTarget.style.backgroundImage = `linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))`;
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== category.id) {
                  e.currentTarget.style.background = '';
                }
              }}
            >
              <span className="relative z-10">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Project Grid with Glass Morphism Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="project-card opacity-0 transform translate-y-12 transition-all duration-700 ease-out"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onMouseMove={(e) => applyMouseEffect(e, project.id)}
              onMouseOut={resetMouseEffect}
              style={{ 
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Enhanced glass morphism effect with 3D transform */}
              <div className="glass-card bg-opacity-10 backdrop-filter backdrop-blur-md rounded-lg overflow-hidden group/card cursor-pointer relative h-full flex flex-col border border-white/10 shadow-xl hover:shadow-cyan-500/20 transition-all duration-500">
                {/* Project Image Container */}
                <div className="relative overflow-hidden h-60 group/image"> 
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover/image:scale-110"
                  />

                  {/* Enhanced Overlay on Hover with improved gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-cyan-600/90 via-blue-800/70 to-transparent transition-all duration-500 flex items-end justify-center pb-6 ${
                      hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <a href="#" 
                       className="px-6 py-3 bg-white bg-opacity-15 backdrop-blur-sm rounded-lg text-white border border-white border-opacity-30 flex items-center text-sm hover:bg-opacity-25 transition-all duration-300 hover:scale-105 transform group/btn">
                      View Details 
                      <ExternalLink className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" size={16} />
                    </a>
                  </div>
                </div>

                {/* Project Info with improved typography and animated elements */}
                <div className="p-6 flex flex-col flex-grow"> 
                  <h3 className="text-xl font-semibold mb-2 text-white group-hover/card:text-cyan-400 transition-colors duration-500">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2 flex-grow"> 
                      {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs text-gray-300 bg-gray-700/50 border border-gray-600/30 px-2.5 py-1 rounded-full transform transition-all duration-300 hover:scale-105 hover:border-cyan-500/50"
                        style={{ transitionDelay: `${index * 50}ms` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-2">
                    <a href="#"
                       className="text-sm font-medium flex items-center text-cyan-400 transition-all duration-500 group-hover/card:text-white"
                    >
                      Know More <span className="ml-1 transition-transform duration-300 group-hover/card:translate-x-2">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Handle case where no projects match filter */}
          {filteredProjects.length === 0 && activeCategory !== "all" && (
            <div className="col-span-3 py-12 text-center">
              <div className="bg-gray-800/50 backdrop-filter backdrop-blur-md rounded-lg border border-gray-700/50 p-8 mx-auto max-w-lg">
                <h3 className="text-xl font-medium mb-2 text-gray-200">No projects found</h3>
                <p className="text-gray-400 mb-4">No projects match the selected category. Please try a different filter.</p>
                <button
                  onClick={() => setActiveCategory("all")}
                  className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50"
                >
                  View All Projects
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Section with Counter Animation */}
      <div 
        ref={statsRef}
        className="container mx-auto px-4 py-16 relative z-10 opacity-0 transform translate-y-8"
      >
        <div className="bg-gray-800/30 backdrop-filter backdrop-blur-lg rounded-xl border border-white/10 p-8 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="stats-item p-4">
              <h3 className="counter text-4xl font-bold mb-2 text-cyan-400" data-target="100">0+</h3>
              <p className="text-gray-300">Satisfied Clients</p>
            </div>
            <div className="stats-item p-4">
              <h3 className="counter text-4xl font-bold mb-2 text-blue-400" data-target="250">0+</h3>
              <p className="text-gray-300">Projects Completed</p>
            </div>
            <div className="stats-item p-4">
              <h3 className="counter text-4xl font-bold mb-2 text-purple-400" data-target="5.0">0.0</h3>
              <p className="text-gray-300">Average Rating</p>
            </div>
            <div className="stats-item p-4">
              <h3 className="counter text-4xl font-bold mb-2 text-indigo-400" data-target="7">0+</h3>
              <p className="text-gray-300">Years of Experience</p>
            </div>
          </div>
        </div>
      </div>


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

            
      {/* Custom CSS for animations and effects */}
      <style jsx>{`
        /* Gradient text effect */
        .text-gradient {
          background: linear-gradient(to right, #0ea5e9, #14b8a6, #a656ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        /* Glow text effect */
        .glow-text {
          text-shadow: 0 0 15px rgba(14, 165, 233, 0.6);
        }
        
        /* Filter button styles */
        .filter-btn {
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
          z-index: 1;
        }
        
        .filter-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to));
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }
        
        .filter-btn:hover::before {
          opacity: 1;
        }
        
        /* Glass card effect */
        .glass-card {
          background: rgba(20, 24, 31, 0.4);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s;
        }
        
        /* Animation classes */
        .animate-on-mount {
          transition: opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-in-view {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        
        /* Bubble animation */
        .bubble-animation {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
        }
        
        .bubble {
          position: absolute;
          bottom: -10vh;
          opacity: 0.4;
          border-radius: 50%;
          background: radial-gradient(
            circle at 50% 50%,
            rgba(76, 194, 255, 0.8),
            rgba(76, 194, 255, 0.1)
          );
          animation: rise var(--time) ease-in infinite;
          left: var(--position);
          width: var(--size);
          height: var(--size);
          animation-delay: var(--delay);
        }
        
        @keyframes rise {
          0% {
            bottom: -10vh;
            transform: translateX(0) scale(0.4);
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
            transform: translateX(calc(var(--position) * 0.1)) scale(0.8);
          }
          100% {
            bottom: 110vh;
            transform: translateX(calc(var(--position) * 0.2)) scale(0.2);
            opacity: 0;
          }
        }
        
        /* Glowing orbs in background */
        .glow-orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(80px);
          z-index: 0;
          opacity: 0.3;
          pointer-events: none;
        }
        
        .glow-orb.blue {
          width: 40vw;
          height: 40vw;
          background: radial-gradient(circle, rgba(56, 182, 255, 0.8) 0%, rgba(56, 182, 255, 0) 70%);
          top: 10%;
          left: 20%;
          animation: float 20s ease-in-out infinite alternate;
        }
        
        .glow-orb.purple {
          width: 50vw;
          height: 50vw;
          background: radial-gradient(circle, rgba(166, 86, 255, 0.6) 0%, rgba(166, 86, 255, 0) 70%);
          bottom: -10%;
          right: -10%;
          animation: float 25s ease-in-out infinite alternate-reverse;
        }
        
        @keyframes float {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-5%, 5%);
          }
          100% {
            transform: translate(5%, -5%);
          }
        }
        
        /* Split text animation effect */
        .split-text {
          display: inline-block;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default SniperCodersPortfolio;

























