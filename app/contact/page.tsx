
"use client";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import {
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineWhatsApp,
  AiOutlineYoutube,
} from "react-icons/ai";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  const [bubbles, setBubbles] = useState<
    Array<{ id: number; x: number; y: number; size: number; speed: number }>
  >([]);

  useEffect(() => {
    // Responsive bubble count based on screen size
    const bubbleCount = window.innerWidth < 768 ? 8 : 15;
    
    const newBubbles = Array.from({ length: bubbleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 50 + 20,
      speed: Math.random() * 0.5 + 0.2,
    }));
    setBubbles(newBubbles);

    const interval = setInterval(() => {
      setBubbles((prev) =>
        prev.map((bubble) => ({
          ...bubble,
          y: bubble.y - bubble.speed > -10 ? bubble.y - bubble.speed : 110,
        }))
      );
    }, 100);

    // Handle window resize for responsive bubbles
    const handleResize = () => {
      const newBubbleCount = window.innerWidth < 768 ? 8 : 15;
      setBubbles(prev => {
        if (prev.length === newBubbleCount) return prev;
        
        return Array.from({ length: newBubbleCount }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 50 + 20,
          speed: Math.random() * 0.5 + 0.2,
        }));
      });
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus({ type: null, message: "" });
    
    try {
      // Create a server endpoint to handle email sending
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recipientEmail: 'anshjamwal10102003@gmail.com', // This will be used by the API route
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Message sent successfully! We'll get back to you soon.",
        });
        // Clear form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        throw new Error(data.message || 'Failed to send email');
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus({
        type: "error",
        message: "Failed to send message. Please try again later or contact us directly.",
      });
    } finally {
      setLoading(false);
    }
  };

  const textVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen relative overflow-hidden">
      {/* Bubble animation */}
      <div className="absolute inset-0 pointer-events-none">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute rounded-full bg-blue-500 opacity-10"
            style={{
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Contact Us Header */}
        <div className="mb-8 md:mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">
            <span className="text-blue-500">Contact</span>
            <span className="text-purple-500"> Us</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-400 text-sm sm:text-base">
            With years of industry experience, our team is passionate about
            helping businesses leverage technology to improve efficiency,
            enhance customer engagement, and drive growth.
          </p>
        </div>

        {/* Contact Info + Form */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Left Column */}
          <div className="w-full lg:w-1/2 bg-gray-800 p-5 sm:p-6 md:p-8 rounded-lg">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 md:mb-8">Get in Touch</h2>

            {/* Phone */}
            <div className="flex items-start mb-6 md:mb-8 group">
              <div className="bg-blue-700 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4 group-hover:bg-blue-500 transition-colors">
                <FaPhone className="text-lg sm:text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg">Phone</h3>
                <p className="text-gray-400 text-sm sm:text-base">+91 7006377796, +91 6006254188</p>
                <p className="text-gray-400 text-sm sm:text-base">Mon - Sun | 9:00 AM - 7:00 PM</p>
              </div>
            </div>

            {/* Office */}
            <div className="flex items-start mb-6 md:mb-8 group">
              <div className="bg-blue-700 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4 group-hover:bg-blue-500 transition-colors">
                <FaMapMarkerAlt className="text-lg sm:text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg">Office</h3>
                <p className="text-gray-400 text-sm sm:text-base">SniperCoders</p>
                <p className="text-gray-400 text-sm sm:text-base">
                  Near Old Hospital, Chenani, Jammu and Kashmir-182141
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start mb-6 md:mb-8 group">
              <div className="bg-blue-700 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4 group-hover:bg-blue-500 transition-colors">
                <FaEnvelope className="text-lg sm:text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg">Email</h3>
                <p className="text-blue-400 hover:underline text-sm sm:text-base">
                  <a href="mailto:snipercoders25@gmail.com">
                    snipercoders25@gmail.com
                  </a>
                </p>
                <p className="text-gray-400 text-sm sm:text-base">
                  Typically replies within 24 hours
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-pink-500 hover:text-pink-400">
                  <AiOutlineInstagram size={20} className="sm:text-2xl" />
                </a>
                <a href="#" className="text-blue-500 hover:text-blue-400">
                  <AiOutlineLinkedin size={20} className="sm:text-2xl" />
                </a>
                <a href="#" className="text-green-500 hover:text-green-400">
                  <AiOutlineWhatsApp size={20} className="sm:text-2xl" />
                </a>
                <a href="#" className="text-red-500 hover:text-red-400">
                  <AiOutlineYoutube size={20} className="sm:text-2xl" />
                </a>
              </div>
            </div>

            {/* Map - Fully Responsive */}
            <div className="mt-6 md:mt-8">
              <div className="bg-gray-700 rounded-lg overflow-hidden relative pb-[56.25%] h-0">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3441.6605313655365!2d75.2840861!3d33.041876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391cfa6d35f2cc3b%3A0xadb05b30c7dfdc2f!2sChenani%2C%20Jammu%20and%20Kashmir%20182141!5e0!3m2!1sen!2sin!4v1683886319272!5m2!1sen!2sin"
                  className="absolute top-0 left-0 w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Chenani Location Map"
                />
              </div>
              <p className="text-xs text-center py-2 text-gray-400">
                <a
                  href="https://www.google.com/maps/place/Chenani,+Jammu+and+Kashmir+182141"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400"
                >
                  View larger map
                </a>
              </p>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="w-full lg:w-1/2 bg-gray-800 p-5 sm:p-6 md:p-8 rounded-lg mt-6 lg:mt-0">
            <div className="mb-6 md:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Send a Message</h2>
              <p className="text-gray-400 text-sm sm:text-base">
                Have questions? We are here to help! Reach out anytime.
              </p>
            </div>

            <div className="mb-6 md:mb-8">
              <button className="w-full py-3 sm:py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 font-bold text-sm sm:text-base">
                Schedule a Free Consultation
              </button>
            </div>

            <div className="text-center text-gray-400 mb-6 md:mb-8 text-sm sm:text-base">OR</div>

            {/* Status messages */}
            {submitStatus.type && (
              <div 
                className={`mb-4 p-3 rounded-lg text-sm ${
                  submitStatus.type === "success" 
                    ? "bg-green-800/50 text-green-200" 
                    : "bg-red-800/50 text-red-200"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            {/* Contact Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="fullName" className="block mb-1 sm:mb-2 text-sm sm:text-base">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full p-2 sm:p-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  required
                  disabled={loading}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="w-full sm:w-1/2">
                  <label htmlFor="email" className="block mb-1 sm:mb-2 text-sm sm:text-base">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    className="w-full p-2 sm:p-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="w-full sm:w-1/2">
                  <label htmlFor="phone" className="block mb-1 sm:mb-2 text-sm sm:text-base">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 12345 67890"
                    className="w-full p-2 sm:p-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="mb-5 sm:mb-6">
                <label htmlFor="message" className="block mb-1 sm:mb-2 text-sm sm:text-base">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  rows={5}
                  className="w-full p-2 sm:p-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3 sm:py-4 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors transform hover:scale-105 font-bold text-sm sm:text-base ${
                  loading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 bg-gray-950/70 backdrop-blur-lg border-t border-gray-800/50 text-white py-10 sm:py-12 md:py-16 mt-12 sm:mt-16 md:mt-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <motion.div
              variants={textVariants}
              initial="initial"
              animate="animate"
            >
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="text-2xl sm:text-3xl font-extrabold">
                  <span className="bg-clip-text bg-gradient-to-r text-white animate-gradient">
                    SniperCoders
                  </span>
                </div>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
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
                className={idx < 2 ? "mt-6 sm:mt-0" : "mt-6 md:mt-0"}
              >
                <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-gray-200">
                  {section.title}
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {section.items.map((item, i) => (
                    <motion.li
                      key={i}
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <a
                        href={item.href}
                        className="text-gray-300 hover:text-cyan-400 transition-colors text-xs sm:text-sm"
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
            className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 md:pt-10 border-t border-gray-800/50 text-center text-gray-400 text-xs sm:text-sm"
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

export default ContactPage;