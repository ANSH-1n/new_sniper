// Header.tsx

"use client"

import React, { useState, useEffect } from 'react';
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import { AiOutlineInstagram, AiOutlineLinkedin, AiOutlineWhatsApp, AiOutlineYoutube } from 'react-icons/ai';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  // Bubble animation effect
  const [bubbles, setBubbles] = useState<Array<{ id: number; x: number; y: number; size: number; speed: number }>>([]);

  useEffect(() => {
    // Create random bubbles
    const newBubbles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 50 + 20,
      speed: Math.random() * 0.5 + 0.2
    }));
    setBubbles(newBubbles);

    // Animate bubbles
    const interval = setInterval(() => {
      setBubbles(prev => 
        prev.map(bubble => ({
          ...bubble,
          y: bubble.y - bubble.speed > -10 ? bubble.y - bubble.speed : 110
        }))
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add form submission logic here
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen relative overflow-hidden">
      {/* Bubble animation */}
      <div className="absolute inset-0 pointer-events-none">
        {bubbles.map(bubble => (
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

      {/* Header */}
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-3xl font-bold">
              <span className="text-orange-500">{'{'}</span>
              <span className="text-blue-500"> KodeKalp </span>
              <span className="text-orange-500">{'}'}</span>
            </div>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="#" className="text-blue-400 transition-colors">Contact Us</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {/* Contact Us Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-blue-500">Contact</span>
            <span className="text-purple-500"> Us</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-400">
            With years of industry experience, our team is passionate about helping businesses leverage technology to improve efficiency, enhance customer engagement, and drive growth.
          </p>
        </div>

        {/* Contact Information and Form */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="w-full lg:w-1/2 bg-gray-800 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-8">Get in Touch</h2>

            {/* Phone */}
            <div className="flex items-start mb-8 group">
              <div className="bg-blue-700 p-3 rounded-lg mr-4 group-hover:bg-blue-500 transition-colors">
                <FaPhone className="text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Phone</h3>
                <p className="text-gray-400">+91 7006377796, +91 6006254188</p>
                <p className="text-gray-400">Mon - Sun | 9:00 AM - 7:00 PM</p>
              </div>
            </div>

            {/* Office */}
            <div className="flex items-start mb-8 group">
              <div className="bg-blue-700 p-3 rounded-lg mr-4 group-hover:bg-blue-500 transition-colors">
                <FaMapMarkerAlt className="text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Office</h3>
                <p className="text-gray-400">SniperCoders</p>
                <p className="text-gray-400">Near Old  Hospital, Chenani, Jammu and Kashmir-182141</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start mb-8 group">
              <div className="bg-blue-700 p-3 rounded-lg mr-4 group-hover:bg-blue-500 transition-colors">
                <FaEnvelope className="text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Email</h3>
                <p className="text-blue-400 hover:underline">
                  <a href="mailto:snipercoders25@gmail.com">snipercoders25@gmail.com</a>
                </p>
                <p className="text-gray-400">Typically replies within 24 hours</p>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="font-bold text-lg mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-pink-500 hover:text-pink-400 transition-colors">
                  <AiOutlineInstagram size={24} />
                </a>
                <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors">
                  <AiOutlineLinkedin size={24} />
                </a>
                <a href="#" className="text-green-500 hover:text-green-400 transition-colors">
                  <AiOutlineWhatsApp size={24} />
                </a>
                <a href="#" className="text-red-500 hover:text-red-400 transition-colors">
                  <AiOutlineYoutube size={24} />
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="mt-8">
              <div className="bg-gray-700 rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.7315295859454!2d79.6614!3d21.1645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2bb1b138ca4fb7%3A0x4c6d3e1e7c8bd1ba!2sGondia%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1650450937843!5m2!1sen!2sin" 
                  width="100%" 
                  height="200" 
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="KodeKalp Global Technologies Location Map"
                />
                <p className="text-xs text-center py-2 text-gray-400">
                  <a href="#" className="hover:text-blue-400">View larger map</a>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="w-full lg:w-1/2 bg-gray-800 p-8 rounded-lg">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Send a Message</h2>
              <p className="text-gray-400">Have questions? We are here to help! Reach out anytime.</p>
            </div>

            {/* Consultation Button */}
            <div className="mb-8">
              <button 
                className="w-full py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 font-bold"
              >
                Schedule a Free Consultation
              </button>
            </div>

            <div className="text-center text-gray-400 mb-8">OR</div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="fullName" className="block mb-2">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full p-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="w-full md:w-1/2">
                  <label htmlFor="email" className="block mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    className="w-full p-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label htmlFor="phone" className="block mb-2">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 12345 67890"
                    className="w-full p-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  rows={6}
                  className="w-full p-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors transform hover:scale-105 font-bold"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1">
              <div className="flex items-center mb-4">
                <div className="text-2xl font-bold">
                  
                  <span className="text-blue-500">SniperCoders</span>

                </div>
              </div>
              <p className="text-gray-400">
                At KodeKalp Global Technologies, we specialize in turning visionary ideas into reality. Our expertise in consulting helps businesses transform aspirations into tangible solutions, paving the way for future growth.
              </p>
            </div>

            {/* Our Service */}
            <div className="col-span-1">
              <h3 className="text-xl font-bold mb-4">Our Service</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Custom Software Development</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Website Development</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Mobile App Development</a></li>
              </ul>
            </div>

            {/* Useful Links */}
            <div className="col-span-1">
              <h3 className="text-xl font-bold mb-4">UseFull Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Refund Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Careers</a></li>
              </ul>
            </div>

            {/* Know More */}
            <div className="col-span-1">
              <h3 className="text-xl font-bold mb-4">Know More</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">What We Offer</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Our Team</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">FAQs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Testimonials</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;