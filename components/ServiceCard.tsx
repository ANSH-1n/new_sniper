import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  description: string;
  gradient: string;
  details?: string[];
  isActive?: boolean;
  onClick?: () => void;
}

export default function ServiceCard({ title, description, gradient, details, isActive, onClick }: ServiceCardProps) {
  return (
    <motion.div
      className={`service-card p-6 rounded-lg shadow-lg text-center bg-gradient-to-r ${gradient} hover:scale-105 transition-all cursor-pointer`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
    >
      <h3 className="text-3xl font-semibold mb-4">{title}</h3>
      <p className="text-lg">{description}</p>
      {details && isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-4 space-y-4 text-left"
        >
          <p>Our {title.toLowerCase()} services include:</p>
          <ul className="list-disc pl-5">
            {details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
}