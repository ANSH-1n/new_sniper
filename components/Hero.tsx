'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  const letters = 'Welcome to SniperCoders'.split('');

  return (
    <section className="hero min-h-screen flex flex-col justify-center items-center text-center py-32 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
      <motion.h1
        className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold whitespace-nowrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className={index % 2 === 0 ? 'text-black' : 'text-white'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.h1>
      <motion.p
        className="text-lg md:text-2xl mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        Your one-stop solution for web development, digital marketing, and innovative software solutions.
      </motion.p>
      <motion.a
        href="/services"
        className="mt-6 bg-yellow-500 text-gray-900 py-3 px-6 rounded-full text-lg hover:bg-yellow-400 transition-all transform hover:scale-105"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        Get Started
      </motion.a>
      <motion.div
        className="mt-10 w-full max-w-4xl overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        <div className="flex animate-slide">
          {['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg'].map((img, index) => (
            <Image
              key={index}
              src={`/images/${img}`}
              alt={`Slide ${index + 1}`}
              width={1200}
              height={500}
              className="w-full h-[500px] object-cover flex-shrink-0"
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}