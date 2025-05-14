"use client";

import { FaRobot } from "react-icons/fa"; 
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaGlobe,
  FaMobile,
  FaChartLine,
  FaCode,
  FaChartPie,
} from "react-icons/fa";

export default function ServicesPage() {
  const services = [
    {
      name: "Web Development",
      href: "/services/web-development",
      description:
        "Create powerful web experiences with cutting-edge development and responsive design.",
      icon: FaGlobe,
      iconColor: "from-purple-500 to-pink-500",
    },
    {
      name: "Mobile App Development",
      href: "/services/mobile-development",
      description:
        "Build native and cross-platform mobile solutions that users love.",
      icon: FaMobile,
      iconColor: "from-green-400 to-blue-500",
    },
    {
      name: "Digital Marketing",
      href: "/services/digital-marketing",
      description:
        "Data-driven strategies to boost visibility and drive conversions.",
      icon: FaChartLine,
      iconColor: "from-pink-400 to-red-500",
    },
    {
      name: "Custom Software Development",
      href: "/services/custom-software-development",
      description:
        "Custom software solutions tailored to your business logic and growth goals.",
      icon: FaCode,
      iconColor: "from-yellow-400 to-orange-500",
    },
    {
      name: "IT Consulting & Digital Transformation",
      href: "/services/it-consulting",
      description: "Strategic technology guidance for digital transformation.",
      icon: FaChartPie,
      iconColor: "from-blue-400 to-indigo-500",
    },
    {
      name: "AI Agents",
      href: "/agents",
      description: "Custom-built AI agents that automate tasks, engage users, and boost efficiency — from lead generation to customer support.",
      icon: FaRobot,
      iconColor: "from-blue-400 to-indigo-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gray-900 mt-4 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl font-extrabold text-center mb-8 text-teal-300 drop-shadow-md"
        >
          Our Services
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-center text-gray-400 mb-12 max-w-3xl mx-auto text-lg sm:text-xl"
        >
          Comprehensive technology services to power your digital transformation
          journey.
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.98 }}
              className="group"
            >
              <Link
                href={service.href}
                className="relative flex flex-col justify-between bg-gray-800/50 backdrop-blur-md border border-gray-700 hover:border-teal-500 rounded-xl p-6 h-full transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-teal-700/30"
              >
                <div className="flex items-center mb-4">
                  <service.icon
                    className={`w-8 h-8 mr-4 text-white bg-gradient-to-br ${service.iconColor} p-1 rounded-full`}
                  />
                  <h4 className="text-xl font-semibold group-hover:text-teal-300 transition-colors duration-300">
                    {service.name}
                  </h4>
                </div>
                <p className="text-gray-300 text-base leading-relaxed mb-6 transition-colors duration-300">
                  {service.description}
                </p>
                <span className="text-teal-400 group-hover:text-white text-sm font-medium transition-colors duration-300">
                  Learn More →
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section from Screenshot */}
        <motion.section
          variants={ctaVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 py-12 px-6 sm:px-8 bg-gradient-to-r from-indigo-900 to-purple-900 rounded-xl shadow-lg backdrop-blur-md text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="text-3xl sm:text-4xl font-bold mb-4 text-white drop-shadow-md"
          >
            Need Custom Solutions?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg sm:text-xl"
          >
            {`Let's discuss how we can combine these services to create your perfect digital ecosystem.`}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Link
              href="/contact"
              className="inline-block bg-gray-800 text-cyan-300 py-3 px-8 rounded-full text-lg font-semibold hover:bg-gray-700 hover:text-white transition-all duration-300 shadow-md"
            >
              Schedule Free Consultation →
            </Link>
          </motion.div>
        </motion.section>
      </div>

      <footer className="relative z-20 w-full bg-gray-950/70 backdrop-blur-lg border-t border-gray-800/50 text-white py-16 mt-20">
        <div className="mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <motion.div
              variants={textVariants}
              initial="initial"
              animate="animate"
            >
              <div className="flex items-center mb-6">
                <div className="text-3xl font-extrabold">
                  <span className="bg-clip-text bg-gradient-to mockingbird-r text-white animate-gradient">
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
}