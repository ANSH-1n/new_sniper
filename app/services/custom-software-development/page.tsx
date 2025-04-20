"use client"


import React, { useEffect, useState } from "react";
import { Home, Code, Database, Server, Zap, Users, Shield, BarChart } from "lucide-react";

const SniperCodersWebsite: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    // Initialize animations
    generateBubbles();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  const generateBubbles = () => {
    const bubbles = document.getElementById("bubbles-container");
    if (!bubbles) return;
    
    for (let i = 0; i < 20; i++) {
      const bubble = document.createElement("div");
      bubble.className = "bubble";
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.animationDuration = `${Math.random() * 10 + 5}s`;
      bubble.style.animationDelay = `${Math.random() * 5}s`;
      bubbles.appendChild(bubble);
    }
  };
  
  return (
    <div className="relative bg-gray-900 text-gray-300 min-h-screen overflow-hidden">
      {/* Animated background */}
      <div id="bubbles-container" className="fixed w-full h-full pointer-events-none opacity-20 z-0" />
      
   
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4">
          <div 
            className="text-center" 
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
              opacity: 1 - scrollY * 0.001
            }}
          >
            <div className="inline-block mb-4 px-4 py-2 bg-blue-900/20 text-blue-400 rounded-full animate-bounce">
              💻 Powerful Software Solutions
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-violet-600 bg-clip-text text-transparent animate-text">
              Custom Software Development
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
              Transform your business with tailor-made software solutions that 
              <span className="text-blue-400"> solve your unique challenges</span>, 
              <span className="text-purple-400"> streamline operations</span>, and 
              <span className="text-cyan-400"> accelerate growth</span>.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <button className="bg-gradient-to-r from-violet-600 to-blue-500 text-white px-6 py-3 rounded-md hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2">
                <span>Schedule a Free Consultation</span>
                <span className="animate-bounce">→</span>
              </button>
              <button className="border border-gray-700 px-6 py-3 rounded-md hover:bg-gray-800 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm transform hover:scale-105 transition-all cursor-pointer">
              <div className="text-4xl font-bold text-purple-400 mb-2 counter" data-target="250">250+</div>
              <div className="text-gray-400">Projects Delivered</div>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm transform hover:scale-105 transition-all cursor-pointer">
              <div className="text-4xl font-bold text-purple-400 mb-2">96%</div>
              <div className="text-gray-400">Client Satisfaction</div>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm transform hover:scale-105 transition-all cursor-pointer">
              <div className="text-4xl font-bold text-purple-400 mb-2">10+ Years</div>
              <div className="text-gray-400">Industry Experience</div>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm transform hover:scale-105 transition-all cursor-pointer">
              <div className="text-4xl font-bold text-purple-400 mb-2">30+</div>
              <div className="text-gray-400">Tech Specialists</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We deliver cutting-edge software solutions tailored to your business needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group">
              <div className="bg-gray-800/50 rounded-xl p-8 hover:bg-gray-800/80 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 h-full transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-blue-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:animate-ping">
                  <Code className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Web Application Development</h3>
                <p className="text-gray-400 mb-4">
                  Scalable, responsive web applications built with modern frameworks and future-proof architecture.
                </p>
                <a href="#" className="text-blue-400 inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn more <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
            
            <div className="group">
              <div className="bg-gray-800/50 rounded-xl p-8 hover:bg-gray-800/80 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 h-full transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-purple-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:animate-ping">
                  <Server className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">API Development & Integration</h3>
                <p className="text-gray-400 mb-4">
                  Robust APIs that connect your systems and enable seamless data flow across your organization.
                </p>
                <a href="#" className="text-purple-400 inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn more <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
            
            <div className="group">
              <div className="bg-gray-800/50 rounded-xl p-8 hover:bg-gray-800/80 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 h-full transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-cyan-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:animate-ping">
                  <Database className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Database Architecture</h3>
                <p className="text-gray-400 mb-4">
                  Optimized database solutions designed for performance, security, and scalability.
                </p>
                <a href="#" className="text-cyan-400 inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn more <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    

    {/* Tech Stack Section */}
<section className="py-16 bg-gray-800/30">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">Our Technology Stack</h2>

    {/* Frontend Technologies */}
    <div className="mb-10">
      <h3 className="text-xl font-semibold mb-4 text-center text-gray-200">Frontend</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {["React", "Angular", "Vue", "Next.js", "Svelte", "Tailwind CSS", "Bootstrap"].map((tech, idx) => (
          <div key={tech} className={`bg-gray-800 px-6 py-3 rounded-full text-blue-${400 + (idx % 3) * 100} hover:bg-gray-700 cursor-pointer transition-all animate-float-delay-${idx % 4}`}>{tech}</div>
        ))}
      </div>
    </div>

    {/* Backend Technologies */}
    <div className="mb-10">
      <h3 className="text-xl font-semibold mb-4 text-center text-gray-200">Backend</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {["Node.js", "Python", "Django", "Flask", "Ruby on Rails", "Java", "Spring Boot", ".NET Core", "Go", "PHP", "Laravel"].map((tech, idx) => (
          <div key={tech} className={`bg-gray-800 px-6 py-3 rounded-full text-green-${400 + (idx % 3) * 100} hover:bg-gray-700 cursor-pointer transition-all animate-float-delay-${idx % 4}`}>{tech}</div>
        ))}
      </div>
    </div>

    {/* Databases */}
    <div className="mb-10">
      <h3 className="text-xl font-semibold mb-4 text-center text-gray-200">Databases</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {["PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite", "Oracle DB", "Microsoft SQL Server", "Firebase"].map((db, idx) => (
          <div key={db} className={`bg-gray-800 px-6 py-3 rounded-full text-yellow-${300 + (idx % 3) * 100} hover:bg-gray-700 cursor-pointer transition-all animate-float-delay-${idx % 4}`}>{db}</div>
        ))}
      </div>
    </div>

    {/* DevOps & Cloud */}
    <div className="mb-10">
      <h3 className="text-xl font-semibold mb-4 text-center text-gray-200">DevOps & Cloud</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform", "Jenkins", "GitLab CI/CD", "GitHub Actions", "Nginx", "Apache"].map((devops, idx) => (
          <div key={devops} className={`bg-gray-800 px-6 py-3 rounded-full text-blue-${300 + (idx % 3) * 100} hover:bg-gray-700 cursor-pointer transition-all animate-float-delay-${idx % 4}`}>{devops}</div>
        ))}
      </div>
    </div>

    {/* Tools & Utilities */}
    <div className="mb-10">
      <h3 className="text-xl font-semibold mb-4 text-center text-gray-200">Tools & Utilities</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {["Git", "Figma", "Jira", "Postman", "Swagger", "ESLint", "Prettier", "Webpack", "Vite", "Babel"].map((tool, idx) => (
          <div key={tool} className={`bg-gray-800 px-6 py-3 rounded-full text-purple-${300 + (idx % 3) * 100} hover:bg-gray-700 cursor-pointer transition-all animate-float-delay-${idx % 4}`}>{tool}</div>
        ))}
      </div>
    </div>

    {/* Testing Frameworks */}
    <div className="mb-10">
      <h3 className="text-xl font-semibold mb-4 text-center text-gray-200">Testing</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {["Jest", "Mocha", "Chai", "Cypress", "Selenium", "Playwright", "JUnit", "Postman (Tests)"].map((test, idx) => (
          <div key={test} className={`bg-gray-800 px-6 py-3 rounded-full text-red-${300 + (idx % 3) * 100} hover:bg-gray-700 cursor-pointer transition-all animate-float-delay-${idx % 4}`}>{test}</div>
        ))}
      </div>
    </div>

  </div>
</section>



      
      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Benefits of Custom Software</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-gray-800/50 p-8 rounded-xl hover:bg-gray-800/80 transition-all hover:-translate-y-2">
              <div className="text-purple-500 mb-4">
                <Zap className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-4">Increased Efficiency</h3>
              <p className="text-gray-400">Automate repetitive tasks and streamline workflows</p>
            </div>
            
            <div className="bg-gray-800/50 p-8 rounded-xl hover:bg-gray-800/80 transition-all hover:-translate-y-2">
              <div className="text-blue-500 mb-4">
                <Users className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-4">Enhanced User Experience</h3>
              <p className="text-gray-400">Tailored interfaces that match your exact needs</p>
            </div>
            
            <div className="bg-gray-800/50 p-8 rounded-xl hover:bg-gray-800/80 transition-all hover:-translate-y-2">
              <div className="text-green-500 mb-4">
                <Shield className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-4">Improved Security</h3>
              <p className="text-gray-400">Built-in safeguards for your sensitive data</p>
            </div>
            
            <div className="bg-gray-800/50 p-8 rounded-xl hover:bg-gray-800/80 transition-all hover:-translate-y-2">
              <div className="text-cyan-500 mb-4">
                <BarChart className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-4">Scalable Solutions</h3>
              <p className="text-gray-400">Grow your software as your business expands</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Our Development Process</h2>
          
          <div className="flex flex-col md:flex-row mb-8 relative">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <div className="bg-gray-800/50 p-8 rounded-xl hover:bg-gray-800/80 transition-all">
                <div className="absolute left-1/2 md:left-auto md:right-0 transform -translate-x-1/2 md:translate-x-1/2 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                <h3 className="text-2xl font-bold mb-4">Discovery & Planning</h3>
                <p className="text-gray-400">Requirements gathering and project roadmap development</p>
              </div>
            </div>
            <div className="md:w-1/2"></div>
          </div>
          
          <div className="flex flex-col md:flex-row mb-8 relative">
            <div className="md:w-1/2"></div>
            <div className="md:w-1/2 md:pl-8">
              <div className="bg-gray-800/50 p-8 rounded-xl hover:bg-gray-800/80 transition-all">
                <div className="absolute left-1/2 md:left-0 transform -translate-x-1/2 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                <h3 className="text-2xl font-bold mb-4">Design & Architecture</h3>
                <p className="text-gray-400">UI/UX design and technical architecture planning</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row mb-8 relative">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <div className="bg-gray-800/50 p-8 rounded-xl hover:bg-gray-800/80 transition-all">
                <div className="absolute left-1/2 md:left-auto md:right-0 transform -translate-x-1/2 md:translate-x-1/2 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                <h3 className="text-2xl font-bold mb-4">Development</h3>
                <p className="text-gray-400">Agile development with regular iterations and feedback</p>
              </div>
            </div>
            <div className="md:w-1/2"></div>
          </div>
          
          <div className="flex flex-col md:flex-row mb-8 relative">
            <div className="md:w-1/2"></div>
            <div className="md:w-1/2 md:pl-8">
              <div className="bg-gray-800/50 p-8 rounded-xl hover:bg-gray-800/80 transition-all">
                <div className="absolute left-1/2 md:left-0 transform -translate-x-1/2 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">4</div>
                <h3 className="text-2xl font-bold mb-4">Quality Assurance</h3>
                <p className="text-gray-400">Comprehensive testing and bug fixing</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row mb-8 relative">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <div className="bg-gray-800/50 p-8 rounded-xl hover:bg-gray-800/80 transition-all">
                <div className="absolute left-1/2 md:left-auto md:right-0 transform -translate-x-1/2 md:translate-x-1/2 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">5</div>
                <h3 className="text-2xl font-bold mb-4">Deployment</h3>
                <p className="text-gray-400">Smooth deployment to production environments</p>
              </div>
            </div>
            <div className="md:w-1/2"></div>
          </div>
          
          <div className="flex flex-col md:flex-row relative">
            <div className="md:w-1/2"></div>
            <div className="md:w-1/2 md:pl-8">
              <div className="bg-gray-800/50 p-8 rounded-xl hover:bg-gray-800/80 transition-all">
                <div className="absolute left-1/2 md:left-0 transform -translate-x-1/2 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">6</div>
                <h3 className="text-2xl font-bold mb-4">Maintenance & Support</h3>
                <p className="text-gray-400">Ongoing updates, improvements, and technical support</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-violet-900/50 to-blue-900/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Build Your Custom Solution?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Let's discuss your project and create software that perfectly fits your business needs.
          </p>
          <button className="bg-gradient-to-r from-violet-600 to-blue-500 text-white px-8 py-4 rounded-md hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2 mx-auto">
            Schedule a Free Consultation
            <span className="animate-bounce">→</span>
          </button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2 mb-6">
                <div className="text-blue-500">
                  <span className="text-2xl text-orange-500">{`{`}</span>
                  <span className="text-2xl font-bold text-blue-400">SniperCoders</span>
                  <span className="text-2xl text-orange-500">{`}`}</span>
                </div>
              </div>
              <p className="text-gray-400 max-w-md mb-6">
                At SniperCoders, we specialize in turning visionary ideas into reality. Our expertise in
                consulting helps businesses transform aspirations into tangible solutions, paving the way for future growth.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-red-400 hover:text-red-300 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.372 14.894V7.108H7.937v9.786h2.691zm-1.346-11.116c.94 0 1.522-.622 1.522-1.394-.018-.795-.581-1.397-1.494-1.397-.912 0-1.508.602-1.508 1.397 0 .772.582 1.394 1.48 1.394h.001zm10.678 11.116v-5.558c0-2.483-1.329-3.638-3.103-3.638-1.429 0-2.069.786-2.427 1.338h.045V7.108h-2.691v9.786h2.691v-5.462c0-.242.017-.484.086-.657.188-.484.618-.988 1.339-.988.946 0 1.325.722 1.325 1.779v5.328h2.734z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.923 7.382l-1.762.513a.708.708 0 00-.396.284.62.62 0 00-.115.447v9.11a.627.627 0 00.115.446.709.709 0 00.396.285l1.762.513a.363.363 0 00.467-.253.38.38 0 00.013-.113V9.748a.377.377 0 00-.014-.113.363.363 0 00-.466-.253zM9.84 18.446h-2.38V9.745h2.38v8.701z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-pink-400 hover:text-pink-300 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2c-5.523 0-10 4.477-10 10 0 5.237 4.262 9.5 9.5 9.5 5.238 0 9.5-4.263 9.5-9.5 0-5.523-4.477-10-10-10zm0 16c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6zm0-10c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">Our Service</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Custom Software Development</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Website Development</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Mobile App Development</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">IT Consulting</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Digital Marketing</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-4">Useful Links</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Refund Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Careers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Case Studies</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-4">Know More</h3>
                <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">About Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Contact Us</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} SniperCoders. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      
      {/* Custom Styling for Animations */}
      <style jsx>{`
        .animate-text {
          background-size: 200% auto;
          animation: textShine 2s linear infinite;
        }
        
        @keyframes textShine {
          to {
            background-position: 200% center;
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delay-1 {
          animation: float 3s ease-in-out 0.5s infinite;
        }
        
        .animate-float-delay-2 {
          animation: float 3s ease-in-out 1s infinite;
        }
        
        .animate-float-delay-3 {
          animation: float 3s ease-in-out 1.5s infinite;
        }
        
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        
        .bubble {
          position: absolute;
          bottom: -100px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2), transparent);
          animation: rise linear forwards;
        }
        
        @keyframes rise {
          to {
            transform: translateY(-100vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default SniperCodersWebsite;

























