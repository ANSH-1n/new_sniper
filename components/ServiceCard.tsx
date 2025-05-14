

import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  description: string;
  gradient: string;
}

export default function ServiceCard({ title, description, gradient }: ServiceCardProps) {
  return (
    <motion.div
      className={`service-card p-6 rounded-lg shadow-lg text-center bg-gradient-to-r ${gradient} hover:scale-105 transition-all cursor-pointer`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-3xl font-semibold mb-4">{title}</h3>
      <p className="text-lg">{description}</p>
    </motion.div>
  );
}
