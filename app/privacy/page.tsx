

"use client"

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const PrivacyPolicy: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>('introduction');
  
  // Init Three.js scene
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    const currentRef = mountRef.current;
    currentRef.appendChild(renderer.domElement);
    
    // Create animated particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0x8a2be2, // Purple color matching theme
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 2;
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0005;
      renderer.render(scene, camera);
    };
    
    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    
    window.addEventListener('resize', handleResize);
    animate();
    
    // Cleanup
    return () => {
      if (currentRef) {
        currentRef.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Content sections
  const sections = {
    introduction: {
      title: "1. Introduction",
      content: (
        <div>
          <p>This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (www.snipercoders.com), use our mobile applications, or engage with our services.</p>
          <p>Please read this Privacy Policy carefully. By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by the terms of this Privacy Policy. If you do not agree with our policies and practices, please do not use our services.</p>
        </div>
      )
    },
    informationCollect: {
      title: "2. Information We Collect",
      content: (
        <div>
          <h3>2.1 Personal Information</h3>
          <p>We may collect personal information that you voluntarily provide to us when you:</p>
          <ul>
            <li>Fill out forms on our website</li>
            <li>Register for an account</li>
            <li>Subscribe to our newsletter</li>
            <li>Request information or services</li>
            <li>Contact us through our website or via email</li>
            <li>Participate in surveys or promotions</li>
          </ul>
          <p>This personal information may include:</p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Mailing address</li>
            <li>Company name and position</li>
            <li>Login credentials</li>
            <li>Payment information (processed through secure third-party payment processors)</li>
            <li>Any other information you choose to provide</li>
          </ul>
          
          <h3>2.2 Automatically Collected Information</h3>
          <p>When you visit our website or use our applications, we may automatically collect certain information, including:</p>
          <ul>
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Device information</li>
            <li>Pages visited and time spent on each page</li>
            <li>Referring website</li>
            <li>Clickstream data</li>
            <li>Geographic location (city and country level)</li>
            <li>Date and time of visits</li>
          </ul>
          
          <h3>2.3 Cookies and Similar Technologies</h3>
          <p>We use cookies and similar tracking technologies to collect information about your browsing activities. These technologies help us analyze website traffic, customize content, and improve your experience.</p>
          <p>Types of cookies we use:</p>
          <ul>
            <li>Essential cookies: Necessary for the website to function properly</li>
            <li>Analytical/performance cookies: Help us understand how visitors interact with our website</li>
            <li>Functionality cookies: Enable enhanced functionality and personalization</li>
            <li>Targeting cookies: Deliver relevant advertisements and track campaign performance</li>
          </ul>
          <p>You can control cookies through your browser settings. However, disabling certain cookies may limit your ability to use some features of our website.</p>
        </div>
      )
    },
    useInformation: {
      title: "3. How We Use Your Information",
      content: (
        <div>
          <p>We may use the information we collect for various purposes, including to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and fulfill orders</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Send administrative information, such as updates to our terms or privacy policy</li>
            <li>Send marketing communications, newsletters, and promotional materials (with your consent)</li>
            <li>Personalize your experience and deliver tailored content</li>
            <li>Monitor and analyze usage patterns and trends</li>
            <li>Protect against fraudulent, unauthorized, or illegal activity</li>
            <li>Develop new products and services</li>
            <li>Fulfill any other purpose for which you provide the information</li>
            <li>Comply with legal obligations</li>
          </ul>
        </div>
      )
    },
    sharingDisclosure: {
      title: "4. Information Sharing and Disclosure",
      content: (
        <div>
          <p>We may share your information in the following circumstances:</p>
          
          <h3>4.1 Service Providers</h3>
          <p>We may share your information with third-party service providers who perform services on our behalf, such as web hosting, data analysis, payment processing, customer service, and marketing assistance.</p>
          
          <h3>4.2 Business Transfers</h3>
          <p>If SniperCoders is involved in a merger, acquisition, or sale of all or a portion of its assets, your information may be transferred as part of that transaction.</p>
          
          <h3>4.3 Legal Requirements</h3>
          <p>We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).</p>
          
          <h3>4.4 Protection of Rights</h3>
          <p>We may disclose your information to protect and defend the rights, property, or safety of SniperCoders, our customers, or others.</p>
          
          <h3>4.5 With Your Consent</h3>
          <p>We may share your information with third parties when we have your consent to do so.</p>
        </div>
      )
    },
    dataSecurity: {
      title: "5. Data Security",
      content: (
        <div>
          <p>We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>
        </div>
      )
    },
    dataRetention: {
      title: "6. Data Retention",
      content: (
        <div>
          <p>We will retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements.</p>
        </div>
      )
    },
    yourRights: {
      title: "7. Your Rights and Choices",
      content: (
        <div>
          <p>Depending on your location, you may have certain rights regarding your personal information:</p>
          
          <h3>7.1 Access and Update</h3>
          <p>You can review and update your account information by logging into your account or contacting us directly.</p>
          
          <h3>7.2 Marketing Communications</h3>
          <p>You can opt out of receiving marketing communications from us by following the unsubscribe instructions in any marketing email we send or by contacting us directly.</p>
          
          <h3>7.3 Additional Rights for Certain Jurisdictions</h3>
          <p>Depending on applicable laws (such as GDPR or similar regulations), you may have the right to:</p>
          <ul>
            <li>Request access to your personal information</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Object to or restrict processing of your information</li>
            <li>Request portability of your information</li>
            <li>Withdraw consent at any time, where processing is based on consent</li>
          </ul>
          <p>To exercise these rights, please contact us using the information provided in the &quot;Contact Us&quot; section below.</p>
        </div>
      )
    },
    childrensPrivacy: {
      title: "8. Children's Privacy",
      content: (
        <div>
          <p>Our services are not directed to individuals under the age of 18, and we do not knowingly collect personal information from children. If we learn that we have collected personal information from a child under 18, we will take steps to delete such information as soon as possible.</p>
        </div>
      )
    },
    thirdPartyLinks: {
      title: "9. Third-Party Links",
      content: (
        <div>
          <p>Our website and applications may contain links to third-party websites and services. We are not responsible for the privacy practices or content of these third parties. We encourage you to review the privacy policies of any third-party sites you visit.</p>
        </div>
      )
    },
    internationalTransfers: {
      title: "10. International Data Transfers",
      content: (
        <div>
          <p>Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that are different from those in your country. SniperCoders will take appropriate measures to ensure that your personal information receives an adequate level of protection in the jurisdictions in which we process it.</p>
        </div>
      )
    },
    changes: {
      title: "11. Changes to This Privacy Policy",
      content: (
        <div>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date. You are advised to review this Privacy Policy periodically for any changes.</p>
        </div>
      )
    },
    governingLaw: {
      title: "12. Governing Law",
      content: (
        <div>
          <p>This Privacy Policy shall be governed by and construed in accordance with the laws of India. Any disputes relating to this Privacy Policy shall be subject to the exclusive jurisdiction of the courts in India.</p>
        </div>
      )
    },
    contactUs: {
      title: "Contact Us",
      content: (
        <div>
          <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:</p>
          <div className="contact-info">
            <p>SniperCoders</p>
            <p><a href="mailto:snipercoders25@gmail.com">snipercoders25@gmail.com</a></p>
          </div>
        </div>
      )
    }
  };
  
  const handleSectionClick = (section: string) => {
    setActiveSection(section);
    // Scroll to the content
    const contentElement = document.getElementById('content-section');
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const textVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };
  
  return (
    <div className="privacy-policy-container">
      {/* 3D Background */}
      <div ref={mountRef} className="threejs-bg"></div>
      
      {/* Content */}
      <div className="content-wrapper">
        <header>
          <h1>Privacy Policy</h1>
          <p>
            At SniperCoders, we are committed to safeguarding your privacy. 
            Please read our Privacy Policy to understand how we collect, use, and protect your personal information.
          </p>
        </header>
        
        <div className="privacy-container">
          <div className="sidebar">
            <h2>Contents</h2>
            <nav>
              {Object.keys(sections).map((key) => (
                <button
                  key={key}
                  className={activeSection === key ? 'active' : ''}
                  onClick={() => handleSectionClick(key)}
                >
                  {sections[key as keyof typeof sections].title}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="main-content" id="content-section">
            <h2>{sections[activeSection as keyof typeof sections].title}</h2>
            {sections[activeSection as keyof typeof sections].content}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .privacy-policy-container {
          position: relative;
          font-family: 'Inter', sans-serif;
          color: #fff;
          min-height: 100vh;
          background: #1a1c2a;
        }
        
        .threejs-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
        
        .content-wrapper {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }
        
        header {
          text-align: center;
          padding: 2rem 0;
          border-bottom: 1px solid rgba(138, 43, 226, 0.3);
          margin-bottom: 2rem;
        }
        
        h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          background: linear-gradient(45deg, #8a2be2, #4b0082);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .privacy-container {
          display: flex;
          gap: 2rem;
        }
        
        .sidebar {
          flex: 0 0 25%;
          position: sticky;
          top: 2rem;
          height: fit-content;
          background: rgba(26, 28, 42, 0.8);
          border-radius: 8px;
          padding: 1.5rem;
          border: 1px solid rgba(138, 43, 226, 0.3);
        }
        
        .sidebar h2 {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          color: #8a2be2;
        }
        
        .sidebar nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .sidebar button {
          background: transparent;
          border: none;
          color: #a8b2d1;
          text-align: left;
          padding: 0.75rem;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }
        
        .sidebar button:hover {
          background: rgba(138, 43, 226, 0.1);
          color: #fff;
        }
        
        .sidebar button.active {
          background: rgba(138, 43, 226, 0.2);
          color: #8a2be2;
          font-weight: 600;
        }
        
        .main-content {
          flex: 1;
          background: rgba(26, 28, 42, 0.8);
          border-radius: 8px;
          padding: 2rem;
          border: 1px solid rgba(138, 43, 226, 0.3);
        }
        
        .main-content h2 {
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          color: #8a2be2;
          border-bottom: 1px solid rgba(138, 43, 226, 0.3);
          padding-bottom: 0.75rem;
        }
        
        .main-content h3 {
          font-size: 1.3rem;
          margin: 1.5rem 0 1rem;
          color: #a8b2d1;
        }
        
        .main-content p {
          margin-bottom: 1rem;
          line-height: 1.6;
        }
        
        .main-content ul {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        
        .main-content li {
          margin-bottom: 0.5rem;
        }
        
        .contact-info {
          background: rgba(138, 43, 226, 0.1);
          border-radius: 8px;
          padding: 1.5rem;
          margin-top: 1rem;
        }
        
        .contact-info a {
          color: #8a2be2;
          text-decoration: none;
        }
        
        @media (max-width: 768px) {
          .privacy-container {
            flex-direction: column;
          }
          
          .sidebar {
            position: relative;
            top: 0;
            width: 100%;
          }
        }
      `}</style>

      {/* footer */}
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
  );
};

export default PrivacyPolicy;