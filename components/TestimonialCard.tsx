import { motion } from 'framer-motion';

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  phone: string;
  gradient: string;
}

export default function TestimonialCard({ quote, name, title, phone, gradient }: TestimonialCardProps) {
  return (
    <motion.div
      className={`testimonial-card p-8 rounded-lg shadow-lg bg-gradient-to-r ${gradient}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <p className="text-lg italic mb-4">"{quote}"</p>
      <p className="font-semibold text-xl">{name}</p>
      <p className="text-gray-500">{title}</p>
      <p className="text-gray-500">Phone: {phone}</p>
    </motion.div>
  );
}