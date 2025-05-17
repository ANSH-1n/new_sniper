

// import { motion } from 'framer-motion';

// interface ServiceCardProps {
//   title: string;
//   description: string;
//   gradient: string;
// }

// export default function ServiceCard({ title, description, gradient }: ServiceCardProps) {
//   return (
//     <motion.div
//       className={`service-card p-6 rounded-lg shadow-lg text-center bg-gradient-to-r ${gradient} hover:scale-105 transition-all cursor-pointer`}
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <h3 className="text-3xl font-semibold mb-4">{title}</h3>
//       <p className="text-lg">{description}</p>
//     </motion.div>
//   );
// }
















import React from "react";
import { motion } from "framer-motion";

interface ServiceCardProps {
  title: string;
  description: string;
  gradient: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, gradient }) => {
  return (
    <motion.div
      className={`bg-gradient-to-br ${gradient} p-1 rounded-xl shadow-lg`}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 0 25px rgba(255, 0, 255, 0.4)",
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="bg-[#0a0a2a] h-full rounded-lg p-6 flex flex-col justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h3 
            className="text-xl font-bold mb-3"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {title}
          </motion.h3>
          <motion.p 
            className="text-gray-300"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {description}
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="mt-6 flex justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <motion.button
            className="text-white font-medium flex items-center group"
            whileHover={{ scale: 1.05 }}
          >
            <span>Learn more</span>
            <motion.span
              className="ml-2 transform group-hover:translate-x-1 transition-transform"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            >
              →
            </motion.span>
          </motion.button>
          
          <motion.div 
            className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;