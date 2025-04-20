'use client';

import { motion } from 'framer-motion';
import ServiceCard from '../../../components/ServiceCard';

export default function SeoOptimization() {
  const service = {
    title: 'SEO Optimization',
    description: 'Improve search engine rankings to drive traffic.',
    details: [
      'On-page and off-page SEO',
      'Keyword research and analysis',
      'SEO audits',
    ],
    gradient: 'from-indigo-500 via-blue-600 to-purple-700',
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-20 px-4 sm:px-8 bg-gradient-to-br from-teal-600 via-indigo-600 to-coral-600">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto text-center max-w-5xl"
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-coral-300">
          SEO Optimization
        </h2>
        <ServiceCard {...service} isActive={true} />
      </motion.section>
    </div>
  );
}