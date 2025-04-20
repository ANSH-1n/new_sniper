'use client';

import { motion } from 'framer-motion';
import TestimonialCard from '../../components/TestimonialCard';

export default function Testimonials() {
  const testimonials = [
    {
      quote: 'SniperCoders helped us bring our vision to life with a flawless website.',
      name: 'Digamber',
      title: 'Shopkeeper',
      phone: '6006329552',
      gradient: 'from-yellow-400 to-red-500',
    },
    {
      quote: 'Outstanding digital marketing strategies with expert guidance.',
      name: 'Vikram',
      title: 'Gym',
      phone: '8492988024',
      gradient: 'from-green-400 to-blue-500',
    },
    {
      quote: 'Our business has grown exponentially thanks to innovative solutions.',
      name: 'Danish',
      title: 'School',
      phone: '7006563635',
      gradient: 'from-pink-400 to-indigo-500',
    },
    {
      quote: 'Flawless website and responsive team.',
      name: 'Aman',
      title: 'Company',
      phone: '9797185673',
      gradient: 'from-yellow-400 to-red-500',
    },
    {
      quote: 'Highly recommend their digital marketing services.',
      name: 'Shubam',
      title: 'Food Business',
      phone: '8806765348',
      gradient: 'from-green-400 to-blue-500',
    },
    {
      quote: 'Innovative solutions that exceed expectations.',
      name: 'Sonika',
      title: 'Travel',
      phone: '8809748903',
      gradient: 'from-pink-400 to-indigo-500',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-16 px-4 sm:px-8 bg-black">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-text-color">What Our Clients Say</h1>
        <p className="text-lg md:text-2xl mb-6 animate-text-color">We take pride in providing exceptional solutions.</p>
      </motion.section>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="container mx-auto py-16 px-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </motion.section>
    </div>
  );
}