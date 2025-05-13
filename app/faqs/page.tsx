

// "use client";

// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import * as THREE from "three";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faChevronDown,
//   faChevronUp,
//   faSearch,
//   faHome,
// } from "@fortawesome/free-solid-svg-icons";

// interface FAQ {
//   question: string;
//   answer: string;
//   isOpen: boolean;
// }

// const FAQsPage = () => {
//   // State for FAQs
//   const [generalQuestions, setGeneralQuestions] = useState<FAQ[]>([
//     {
//       question: "What is SniperCoders Global Technologies?",
//       answer:
//         "SniperCoders Global Technologies is a technology firm specializing in web design and development, mobile application development, digital marketing, and IoT integration services",
//       isOpen: true,
//     },
//     {
//       question: 'What does "SniperCoders" mean?',
//       answer:
//         "SniperCoders represents our precision and accuracy in coding solutions. Just as a sniper hits targets with precision, we develop code that precisely meets client requirements and business objectives.",
//       isOpen: false,
//     },
//     {
//       question: "What areas do you serve?",
//       answer:
//         "We serve clients globally with a focus on delivering digital solutions that transcend geographical boundaries. Our team works remotely with businesses of all sizes across various industries.",
//       isOpen: false,
//     },
//     {
//       question: "How experienced is your team?",
//       answer:
//         "Our team consists of experienced developers, designers, and digital marketing specialists with an average of 4+ years of industry experience. We continuously update our skills to stay current with the latest technologies and trends.",
//       isOpen: false,
//     },
//     {
//       question:
//         "What makes SniperCoders different from other technology companies?",
//       answer:
//         "Our unique approach combines technical expertise with business understanding. We don't just build technologies; we create solutions that align with your business goals and provide measurable results. Our focus on transparent communication and collaborative development sets us apart.",
//       isOpen: false,
//     },
//   ]);

//   const [serviceQuestions, setServiceQuestions] = useState<FAQ[]>([
//     {
//       question: "What services does SniperCoders offer?",
//       answer:
//         "We offer custom software development, website development, mobile app development, IT consulting, digital marketing, and IoT integration services. Each service is tailored to meet the specific needs of our clients.",
//       isOpen: false,
//     },
//     {
//       question: "Do you offer website maintenance services?",
//       answer:
//         "Yes, we provide comprehensive website maintenance services including security updates, content updates, performance optimization, and technical support to ensure your website remains secure, up-to-date, and performing optimally.",
//       isOpen: false,
//     },
//     {
//       question:
//         "Can you help with both the design and development aspects of a website?",
//       answer:
//         "Absolutely! We offer end-to-end website solutions, handling everything from UI/UX design to frontend and backend development. Our integrated approach ensures a cohesive and seamless website experience.",
//       isOpen: false,
//     },
//     {
//       question: "Do you develop mobile apps for both iOS and Android?",
//       answer:
//         "Yes, we develop cross-platform mobile applications that work seamlessly on both iOS and Android platforms. We use technologies like React Native and Flutter to create native-like experiences on all devices.",
//       isOpen: false,
//     },
//   ]);

//   const [gettingStartedQuestions, setGettingStartedQuestions] = useState<FAQ[]>(
//     [
//       {
//         question: "How do I start a project with SniperCoders?",
//         answer:
//           "Starting a project with us is simple. You can contact us through our website and email{  snipercoders25@gmail.com  }, schedule an initial consultation, discuss your requirements, and we'll provide you with a proposal. Once approved, we'll begin the development process with clear milestones and deliverables.",
//         isOpen: false,
//       },
//       {
//         question: "What information should I prepare for our first meeting?",
//         answer:
//           "For our first meeting, it's helpful to prepare a brief overview of your project goals, target audience, any design preferences, desired features, timeline expectations, and budget considerations. The more information you provide, the better we can understand your vision.",
//         isOpen: false,
//       },
//       {
//         question: "Do you sign NDAs (Non-Disclosure Agreements)?",
//         answer:
//           "Yes, we respect the confidentiality of your ideas and business information. We're happy to sign NDAs before discussing detailed project requirements to ensure your intellectual property is protected.",
//         isOpen: false,
//       },
//       {
//         question: "Can I see examples of your previous work?",
//         answer:
//           "Certainly! We have a portfolio of completed projects across various industries. During our initial conversation, we can share relevant case studies and examples that align with your project requirements.",
//         isOpen: false,
//       },
//       {
//         question: "How can I contact SniperCoders?",
//         answer:
//           "You can reach us through the contact form on our website, email us at  snipercoders25@gmail.com,  or connect with us on our social media channels. We typically respond within 24 hours.",
//         isOpen: false,
//       },
//     ]
//   );

//   const [projectProcessQuestions, setProjectProcessQuestions] = useState<FAQ[]>(
//     [
//       {
//         question: "What is your typical project process?",
//         answer:
//           "Our project process follows a structured approach: 1) Discovery & Requirements Gathering, 2) Planning & Design, 3) Development, 4) Testing & Quality Assurance, 5) Deployment, and 6) Post-launch Support. We maintain transparent communication throughout each phase.",
//         isOpen: false,
//       },
//       {
//         question: "How long does it take to complete a website?",
//         answer:
//           "The timeframe for website development depends on the complexity of the project. A basic informational website typically takes 2–4 weeks, while more advanced e-commerce platforms or custom web applications can require 2–4 months. However, we understand that some projects may need to be completed on a tighter schedule—our team is equipped to accelerate timelines when needed. Once we understand your specific requirements, we'll provide a clear and realistic project timeline tailored to your goals",
//         isOpen: false,
//       },
//       {
//         question: "How long does it take to develop a mobile app?",
//         answer:
//           "The timeline for mobile app development varies based on the app’s complexity, features, and target platforms. Simple applications can be completed within 2–3 months, while more advanced apps with complex functionality may take 3–6 months or longer. If you're working with a tight deadline, we can explore options to accelerate the process. After understanding your specific needs, we'll provide a detailed and realistic development timeline",
//         isOpen: false,
//       },
//       {
//         question: "How do you handle project communication?",
//         answer:
//           "We use a combination of tools like Slack, Trello/Jira, and regular video calls to maintain clear communication. You'll have a dedicated project manager, and we provide weekly progress updates and milestone reviews throughout the project.",
//         isOpen: false,
//       },
//       {
//         question: "Will I be able to make updates to my website myself?",
//         answer:
//           "Yes, we develop websites with user-friendly content management systems (CMS) like WordPress that allow you to easily update content, images, and basic information. We also provide training sessions to ensure you're comfortable making these updates.",
//         isOpen: false,
//       },
//     ]
//   );

//   const [technologyQuestions, setTechnologyQuestions] = useState<FAQ[]>([
//     {
//       question: "What technologies do you use for web development?",
//       answer:
//         "We use a wide range of modern web technologies to build high-performance, scalable websites tailored to your needs. Our stack includes front-end technologies like HTML5, CSS3, JavaScript, React, Next.js, Vue.js, and Tailwind CSS; back-end technologies such as Node.js, PHP (Laravel), Python (Django, Flask), and Express.js; and database systems including MySQL, PostgreSQL, and MongoDB. We also work with APIs, cloud services (AWS, Firebase, Vercel), and content management systems like WordPress or Strapi when needed. The technology stack is carefully chosen based on your project goals, performance needs, and scalability requirements.",
//       isOpen: false,
//     },
//     {
//       question:
//         "What programming languages do you use for mobile app development?",
//       answer:
//         "For mobile app development, we utilize a wide range of technologies to deliver high-performance and scalable applications tailored to your needs. For cross-platform development, we use React Native, Flutter, and Ionic. For native development, we use Swift and Objective-C for iOS, and Kotlin and Java for Android. Our backend integrations are supported by technologies like Node.js, Django, Firebase, and GraphQL, while tools such as Redux, Bloc, and GetX are used for state management. We also leverage cloud platforms like AWS, Google Cloud, and Azure for scalable infrastructure. The choice of technology is based on your project’s complexity, platform targets, performance requirements, and long-term goals.",
//       isOpen: false,
//     },
//   ]);

//   const [pricingQuestions, setPricingQuestions] = useState<FAQ[]>([
//     {
//       question: "How much does a website cost?",
//       answer:
//         "Website development costs vary based on the complexity, features, and design requirements of the project. Whether you're looking for a basic informational site, a business website with custom functionality, or an advanced web application or e-commerce platform, pricing is always tailored to your specific needs and scope. We're also open to negotiation to ensure the best value within your budget",
//       isOpen: false,
//     },
//     {
//       question: "How much does mobile app development cost?",
//       answer:
//         "Mobile app development costs vary depending on the complexity, supported platforms (iOS/Android), features, and design requirements. We provide detailed quotes after thoroughly understanding your specific app needs to ensure the best solution for your goals and budget.",
//       isOpen: false,
//     },
//     {
//       question: "What is your payment structure?",
//       answer:
//         "We typically follow a milestone-based payment structure: 30% upfront to initiate the project, 30% at the halfway point, and 40% upon completion. For larger projects, we may break this down into additional milestones aligned with key deliverables.",
//       isOpen: false,
//     },
//     {
//       question: "Do you offer any payment plans?",
//       answer:
//         "Yes, we offer flexible payment plans for larger projects. These can be arranged during the contract negotiation phase and are tailored to accommodate your budget constraints while ensuring project progress.",
//       isOpen: false,
//     },
//     {
//       question: "Do you charge for initial consultations?",
//       answer:
//         "No, initial consultations are completely free. We believe in understanding your requirements thoroughly before providing a quote, and there's no obligation to proceed after the consultation.",
//       isOpen: false,
//     },
//   ]);

//   const [supportQuestions, setSupportQuestions] = useState<FAQ[]>([
//     {
//       question: "What kind of support do you provide after project completion?",
//       answer:
//         "We offer 30 days of free support after project completion to address any issues. Beyond that, we provide various maintenance packages that include regular updates, security patches, performance monitoring, and technical support.",
//       isOpen: false,
//     },
//     {
//       question: "Do you offer website hosting services?",
//       answer:
//         "Yes, we offer reliable website hosting services with 99.9% uptime guarantee, regular backups, security monitoring, and technical support. Our hosting plans are scalable to accommodate growing traffic and resource needs.",
//       isOpen: false,
//     },
//   ]);

//   // State for active category
//   const [activeCategory, setActiveCategory] = useState("All");
//   const categories = [
//     { id: "All", label: "All" },
//     { id: "GeneralQuestions", label: "General Questions" },
//     { id: "Services", label: "Services" },
//     { id: "ProjectProcess", label: "Project Process" },
//     { id: "Technology", label: "Technology" },
//     { id: "PricingPayments", label: "Pricing & Payments" },
//     { id: "SupportMaintenance", label: "Support & Maintenance" },
//     { id: "GettingStarted", label: "Getting Started" },
//   ];

//   // Three.js animation
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const animationRef = useRef<number | null>(null);

//   useEffect(() => {
//     if (!canvasRef.current) return;

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     const renderer = new THREE.WebGLRenderer({
//       canvas: canvasRef.current,
//       alpha: true,
//     });
//     renderer.setSize(window.innerWidth, window.innerHeight);

//     // Create particles
//     const particlesGeometry = new THREE.BufferGeometry();
//     const particlesCount = 1000;

//     const posArray = new Float32Array(particlesCount * 3);
//     for (let i = 0; i < particlesCount * 3; i++) {
//       posArray[i] = (Math.random() - 0.5) * 5;
//     }

//     particlesGeometry.setAttribute(
//       "position",
//       new THREE.BufferAttribute(posArray, 3)
//     );

//     const particlesMaterial = new THREE.PointsMaterial({
//       size: 0.005,
//       color: "#4B9CE2",
//       transparent: true,
//       opacity: 0.5,
//     });

//     const particlesMesh = new THREE.Points(
//       particlesGeometry,
//       particlesMaterial
//     );
//     scene.add(particlesMesh);

//     camera.position.z = 2;

//     // Mouse movement effect
//     const mouse = {
//       x: 0,
//       y: 0,
//     };

//     window.addEventListener("mousemove", (event) => {
//       mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//       mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//     });

//     // Animation loop
//     const animate = () => {
//       particlesMesh.rotation.y += 0.002;
//       particlesMesh.rotation.x += 0.001;

//       // Responsive to mouse movement (subtle effect)
//       particlesMesh.rotation.x += mouse.y * 0.0003;
//       particlesMesh.rotation.y += mouse.x * 0.0003;

//       renderer.render(scene, camera);
//       animationRef.current = requestAnimationFrame(animate);
//     };

//     animate();

//     // Handle window resize
//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };

//     window.addEventListener("resize", handleResize);

//     // Cleanup
//     return () => {
//       window.removeEventListener("resize", handleResize);
//       window.removeEventListener("mousemove", () => {});
//       if (animationRef.current !== null) {
//         cancelAnimationFrame(animationRef.current);
//       }
//       scene.remove(particlesMesh);
//       particlesGeometry.dispose();
//       particlesMaterial.dispose();
//     };
//   }, []);

//   // Toggle FAQ function
//   const toggleFAQ = (category: string, index: number) => {
//     switch (category) {
//       case "general":
//         setGeneralQuestions(
//           generalQuestions.map((q, i) =>
//             i === index ? { ...q, isOpen: !q.isOpen } : q
//           )
//         );
//         break;
//       case "services":
//         setServiceQuestions(
//           serviceQuestions.map((q, i) =>
//             i === index ? { ...q, isOpen: !q.isOpen } : q
//           )
//         );
//         break;
//       case "gettingStarted":
//         setGettingStartedQuestions(
//           gettingStartedQuestions.map((q, i) =>
//             i === index ? { ...q, isOpen: !q.isOpen } : q
//           )
//         );
//         break;
//       case "projectProcess":
//         setProjectProcessQuestions(
//           projectProcessQuestions.map((q, i) =>
//             i === index ? { ...q, isOpen: !q.isOpen } : q
//           )
//         );
//         break;
//       case "technology":
//         setTechnologyQuestions(
//           technologyQuestions.map((q, i) =>
//             i === index ? { ...q, isOpen: !q.isOpen } : q
//           )
//         );
//         break;
//       case "pricing":
//         setPricingQuestions(
//           pricingQuestions.map((q, i) =>
//             i === index ? { ...q, isOpen: !q.isOpen } : q
//           )
//         );
//         break;
//       case "support":
//         setSupportQuestions(
//           supportQuestions.map((q, i) =>
//             i === index ? { ...q, isOpen: !q.isOpen } : q
//           )
//         );
//         break;
//       default:
//         break;
//     }
//   };

//   // Render FAQ Item
//   const renderFAQItem = (question: FAQ, index: number, category: string) => {
//     return (
//       <motion.div
//         key={index}
//         className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: index * 0.1 }}
//       >
//         <div
//           className={`flex justify-between items-center p-4 cursor-pointer ${
//             question.isOpen
//               ? "bg-blue-500 text-white"
//               : "bg-white text-gray-800"
//           }`}
//           onClick={() => toggleFAQ(category, index)}
//         >
//           <h3 className="text-lg font-medium">{question.question}</h3>
//           <FontAwesomeIcon
//             icon={question.isOpen ? faChevronUp : faChevronDown}
//           />
//         </div>
//         {question.isOpen && (
//           <motion.div
//             className="p-4 bg-white"
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             transition={{ duration: 0.3 }}
//           >
//             <p className="text-gray-700">{question.answer}</p>
//           </motion.div>
//         )}
//       </motion.div>
//     );
//   };

//   const textVariants = {
//     initial: { opacity: 0, y: 30 },
//     animate: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.8, ease: "easeOut" },
//     },
//   };

//   // Filter FAQs based on active category
//   const getFilteredFAQs = () => {
//     if (activeCategory === "All") {
//       return (
//         <>
//           <section className="mb-8">
//             <motion.h2
//               className="text-xl font-bold mb-4 text-blue-500 flex items-center"
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.2 }}
//             >
//               <span className="mr-2">─</span> General Questions
//             </motion.h2>
//             {generalQuestions.map((q, i) => renderFAQItem(q, i, "general"))}
//           </section>

//           <section className="mb-8">
//             <motion.h2
//               className="text-xl font-bold mb-4 text-blue-500 flex items-center"
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.3 }}
//             >
//               <span className="mr-2">─</span> Services
//             </motion.h2>
//             {serviceQuestions.map((q, i) => renderFAQItem(q, i, "services"))}
//           </section>

//           <section className="mb-8">
//             <motion.h2
//               className="text-xl font-bold mb-4 text-blue-500 flex items-center"
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.4 }}
//             >
//               <span className="mr-2">─</span> Getting Started
//             </motion.h2>
//             {gettingStartedQuestions.map((q, i) =>
//               renderFAQItem(q, i, "gettingStarted")
//             )}
//           </section>

//           <section className="mb-8">
//             <motion.h2
//               className="text-xl font-bold mb-4 text-blue-500 flex items-center"
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.5 }}
//             >
//               <span className="mr-2">─</span> Project Process
//             </motion.h2>
//             {projectProcessQuestions.map((q, i) =>
//               renderFAQItem(q, i, "projectProcess")
//             )}
//           </section>

//           <section className="mb-8">
//             <motion.h2
//               className="text-xl font-bold mb-4 text-blue-500 flex items-center"
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.6 }}
//             >
//               <span className="mr-2">─</span> Technology
//             </motion.h2>
//             {technologyQuestions.map((q, i) =>
//               renderFAQItem(q, i, "technology")
//             )}
//           </section>

//           <section className="mb-8">
//             <motion.h2
//               className="text-xl font-bold mb-4 text-blue-500 flex items-center"
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.7 }}
//             >
//               <span className="mr-2">─</span> Pricing & Payments
//             </motion.h2>
//             {pricingQuestions.map((q, i) => renderFAQItem(q, i, "pricing"))}
//           </section>

//           <section className="mb-8">
//             <motion.h2
//               className="text-xl font-bold mb-4 text-blue-500 flex items-center"
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.8 }}
//             >
//               <span className="mr-2">─</span> Support & Maintenance
//             </motion.h2>
//             {supportQuestions.map((q, i) => renderFAQItem(q, i, "support"))}
//           </section>
//         </>
//       );
//     }

//     if (activeCategory === "GeneralQuestions") {
//       return (
//         <section>
//           <motion.h2
//             className="text-xl font-bold mb-4 text-blue-500 flex items-center"
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//           >
//             <span className="mr-2">─</span> General Questions
//           </motion.h2>
//           {generalQuestions.map((q, i) => renderFAQItem(q, i, "general"))}
//         </section>
//       );
//     }

//     if (activeCategory === "Services") {
//       return (
//         <section>
//           <motion.h2
//             className="text-xl font-bold mb-4 text-blue-500 flex items-center"
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//           >
//             <span className="mr-2">─</span> Services
//           </motion.h2>
//           {serviceQuestions.map((q, i) => renderFAQItem(q, i, "services"))}
//         </section>
//       );
//     }

//     if (activeCategory === "GettingStarted") {
//       return (
//         <section>
//           <motion.h2
//             className="text-xl font-bold mb-4 text-blue-500 flex items-center"
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//           >
//             <span className="mr-2">─</span> Getting Started
//           </motion.h2>
//           {gettingStartedQuestions.map((q, i) =>
//             renderFAQItem(q, i, "gettingStarted")
//           )}
//         </section>
//       );
//     }

//     if (activeCategory === "ProjectProcess") {
//       return (
//         <section>
//           <motion.h2
//             className="text-xl font-bold mb-4 text-blue-500 flex items-center"
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//           >
//             <span className="mr-2">─</span> Project Process
//           </motion.h2>
//           {projectProcessQuestions.map((q, i) =>
//             renderFAQItem(q, i, "projectProcess")
//           )}
//         </section>
//       );
//     }

//     if (activeCategory === "Technology") {
//       return (
//         <section>
//           <motion.h2
//             className="text-xl font-bold mb-4 text-blue-500 flex items-center"
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//           >
//             <span className="mr-2">─</span> Technology
//           </motion.h2>
//           {technologyQuestions.map((q, i) => renderFAQItem(q, i, "technology"))}
//         </section>
//       );
//     }

//     if (activeCategory === "PricingPayments") {
//       return (
//         <section>
//           <motion.h2
//             className="text-xl font-bold mb-4 text-blue-500 flex items-center"
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//           >
//             <span className="mr-2">─</span> Pricing & Payments
//           </motion.h2>
//           {pricingQuestions.map((q, i) => renderFAQItem(q, i, "pricing"))}
//         </section>
//       );
//     }

//     if (activeCategory === "SupportMaintenance") {
//       return (
//         <section>
//           <motion.h2
//             className="text-xl font-bold mb-4 text-blue-500 flex items-center"
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//           >
//             <span className="mr-2">─</span> Support & Maintenance
//           </motion.h2>
//           {supportQuestions.map((q, i) => renderFAQItem(q, i, "support"))}
//         </section>
//       );
//     }

//     return null;
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
//       {/* Background animation */}
//       <canvas ref={canvasRef} className="absolute inset-0 z-0" />

//       {/* Header */}
//       <header className="relative z-10 pt-8 pb-4 px-6 md:px-12">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center space-x-2">
//             <Link
//               href="/"
//               className="text-blue-500 hover:text-blue-400 flex items-center"
//             >
//               <FontAwesomeIcon icon={faHome} className="mr-1" />
//               <span>Home</span>
//             </Link>
//             <span>/</span>
//             <span>FAQs</span>
//           </div>
//         </div>
//       </header>

//       {/* Main content */}
//       <main className="relative z-10 px-6 md:px-12 py-8">
//         <motion.div
//           className="mb-8"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h1 className="text-3xl font-bold mb-2">FAQs</h1>
//           <p className="text-gray-300">
//             Find answers to common questions about our services, processes, and
//             technologies. Explore our FAQs to learn how SniperCoders Global
//             Technologies can help your business succeed.
//           </p>
//         </motion.div>

//         <div className="max-w-4xl mx-auto mt-12">
//           <motion.div
//             className="bg-white rounded-lg shadow-lg p-8"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//           >
//             <motion.h2
//               className="text-2xl font-bold mb-4 text-gray-800"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               Frequently Asked Questions
//             </motion.h2>
//             <motion.p
//               className="text-gray-600 mb-6"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5, delay: 0.3 }}
//             >
//               Find answers to common questions about our services and solutions.
//             </motion.p>

//             {/* Search bar */}
//             <motion.div
//               className="mb-6 relative"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//             >
//               <div className="relative">
//                 <FontAwesomeIcon
//                   icon={faSearch}
//                   className="absolute left-3 top-3 text-gray-400"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Search for answers..."
//                   className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </motion.div>

//             {/* Category filters */}
//             <motion.div
//               className="mb-8 flex flex-wrap gap-2"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5, delay: 0.5 }}
//             >
//               {categories.map((category, _) => (
//                 <button
//                   key={category.id}
//                   className={`px-4 py-2 rounded-full text-sm ${
//                     activeCategory === category.id
//                       ? "bg-blue-500 text-white"
//                       : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                   }`}
//                   onClick={() => setActiveCategory(category.id)}
//                 >
//                   {category.label}
//                 </button>
//               ))}
//             </motion.div>

//             {/* FAQ Items */}
//             <div className="text-gray-800">{getFilteredFAQs()}</div>
//           </motion.div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="relative z-20 bg-gray-950/70 backdrop-blur-lg border-t border-gray-800/50 text-white py-16 mt-20">
//         <div className="container mx-auto px-6">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
//             <motion.div
//               variants={textVariants}
//               initial="initial"
//               animate="animate"
//             >
//               <div className="flex items-center mb-6">
//                 <div className="text-3xl font-extrabold">
//                   <span className="bg-clip-text bg-gradient-to-r text-white animate-gradient">
//                     SniperCoders
//                   </span>
//                 </div>
//               </div>
//               <p className="text-gray-300 text-sm leading-relaxed">
//                 We specialize in turning visionary ideas into reality. Our
//                 expertise helps businesses transform aspirations into tangible
//                 solutions, paving the way for future growth.
//               </p>
//             </motion.div>

//             {[
//               {
//                 title: "Our Services",
//                 items: [
//                   {
//                     label: "Custom Software Dev",
//                     href: "/services/custom-software-development",
//                   },
//                   {
//                     label: "Website Development",
//                     href: "/services/web-development",
//                   },
//                   {
//                     label: "Mobile App Development",
//                     href: "/services/mobile-development",
//                   },
//                   { label: "IT Consulting", href: "/services/it-consulting" },
//                 ],
//               },
//               {
//                 title: "Useful Links",
//                 items: [
//                   { label: "Terms of Service", href: "/terms" },
//                   { label: "Privacy Policy", href: "/privacy" },
//                   { label: "Refund Policy", href: "/refund" },
//                 ],
//               },
//               {
//                 title: "Get In Touch",
//                 items: [
//                   { label: "About Us", href: "/about" },
//                   { label: "Contact Us", href: "/contact" },
//                   { label: "FAQs", href: "/faqs" },
//                   { label: "Testimonials", href: "/showcase" },
//                 ],
//               },
//             ].map((section, idx) => (
//               <motion.div
//                 key={idx}
//                 variants={textVariants}
//                 initial="initial"
//                 animate="animate"
//               >
//                 <h3 className="text-lg font-semibold mb-6 text-gray-200">
//                   {section.title}
//                 </h3>
//                 <ul className="space-y-3">
//                   {section.items.map((item, i) => (
//                     <motion.li
//                       key={i}
//                       whileHover={{ x: 8 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <a
//                         href={item.href}
//                         className="text-gray-300 hover:text-cyan-400 transition-colors text-sm"
//                       >
//                         {item.label}
//                       </a>
//                     </motion.li>
//                   ))}
//                 </ul>
//               </motion.div>
//             ))}
//           </div>
//           <motion.div
//             className="mt-12 pt-10 border-t border-gray-800/50 text-center text-gray-400 text-sm"
//             variants={textVariants}
//             initial="initial"
//             animate="animate"
//           >
//             © {new Date().getFullYear()} SniperCoders Global Technologies. All
//             rights reserved.
//           </motion.div>
//         </div>
//       </footer>
//       {/* Back to top button */}
//       <motion.button
//         className="fixed bottom-8 right-8 bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-20 hover:bg-blue-600 transition-colors"
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//         onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M5 15l7-7 7 7"
//           />
//         </svg>
//       </motion.button>
//     </div>
//   );
// };

// export default FAQsPage;
















"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import * as THREE from "three";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faSearch,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

interface FAQ {
  question: string;
  answer: string;
  isOpen: boolean;
}

const FAQsPage = () => {
  // State for FAQs
  const [generalQuestions, setGeneralQuestions] = useState<FAQ[]>([
    {
      question: "What is SniperCoders Global Technologies?",
      answer:
        "SniperCoders Global Technologies is a technology firm specializing in web design and development, mobile application development, digital marketing, and IoT integration services",
      isOpen: true,
    },
    {
      question: 'What does "SniperCoders" mean?',
      answer:
        "SniperCoders represents our precision and accuracy in coding solutions. Just as a sniper hits targets with precision, we develop code that precisely meets client requirements and business objectives.",
      isOpen: false,
    },
    {
      question: "What areas do you serve?",
      answer:
        "We serve clients globally with a focus on delivering digital solutions that transcend geographical boundaries. Our team works remotely with businesses of all sizes across various industries.",
      isOpen: false,
    },
    {
      question: "How experienced is your team?",
      answer:
        "Our team consists of experienced developers, designers, and digital marketing specialists with an average of 4+ years of industry experience. We continuously update our skills to stay current with the latest technologies and trends.",
      isOpen: false,
    },
    {
      question:
        "What makes SniperCoders different from other technology companies?",
      answer:
        "Our unique approach combines technical expertise with business understanding. We don't just build technologies; we create solutions that align with your business goals and provide measurable results. Our focus on transparent communication and collaborative development sets us apart.",
      isOpen: false,
    },
  ]);

  const [serviceQuestions, setServiceQuestions] = useState<FAQ[]>([
    {
      question: "What services does SniperCoders offer?",
      answer:
        "We offer custom software development, website development, mobile app development, IT consulting, digital marketing, and IoT integration services. Each service is tailored to meet the specific needs of our clients.",
      isOpen: false,
    },
    {
      question: "Do you offer website maintenance services?",
      answer:
        "Yes, we provide comprehensive website maintenance services including security updates, content updates, performance optimization, and technical support to ensure your website remains secure, up-to-date, and performing optimally.",
      isOpen: false,
    },
    {
      question:
        "Can you help with both the design and development aspects of a website?",
      answer:
        "Absolutely! We offer end-to-end website solutions, handling everything from UI/UX design to frontend and backend development. Our integrated approach ensures a cohesive and seamless website experience.",
      isOpen: false,
    },
    {
      question: "Do you develop mobile apps for both iOS and Android?",
      answer:
        "Yes, we develop cross-platform mobile applications that work seamlessly on both iOS and Android platforms. We use technologies like React Native and Flutter to create native-like experiences on all devices.",
      isOpen: false,
    },
  ]);

  const [gettingStartedQuestions, setGettingStartedQuestions] = useState<FAQ[]>(
    [
      {
        question: "How do I start a project with SniperCoders?",
        answer:
          "Starting a project with us is simple. You can contact us through our website and email{  snipercoders25@gmail.com  }, schedule an initial consultation, discuss your requirements, and we'll provide you with a proposal. Once approved, we'll begin the development process with clear milestones and deliverables.",
        isOpen: false,
      },
      {
        question: "What information should I prepare for our first meeting?",
        answer:
          "For our first meeting, it's helpful to prepare a brief overview of your project goals, target audience, any design preferences, desired features, timeline expectations, and budget considerations. The more information you provide, the better we can understand your vision.",
        isOpen: false,
      },
      {
        question: "Do you sign NDAs (Non-Disclosure Agreements)?",
        answer:
          "Yes, we respect the confidentiality of your ideas and business information. We're happy to sign NDAs before discussing detailed project requirements to ensure your intellectual property is protected.",
        isOpen: false,
      },
      {
        question: "Can I see examples of your previous work?",
        answer:
          "Certainly! We have a portfolio of completed projects across various industries. During our initial conversation, we can share relevant case studies and examples that align with your project requirements.",
        isOpen: false,
      },
      {
        question: "How can I contact SniperCoders?",
        answer:
          "You can reach us through the contact form on our website, email us at  snipercoders25@gmail.com,  or connect with us on our social media channels. We typically respond within 24 hours.",
        isOpen: false,
      },
    ]
  );

  const [projectProcessQuestions, setProjectProcessQuestions] = useState<FAQ[]>(
    [
      {
        question: "What is your typical project process?",
        answer:
          "Our project process follows a structured approach: 1) Discovery & Requirements Gathering, 2) Planning & Design, 3) Development, 4) Testing & Quality Assurance, 5) Deployment, and 6) Post-launch Support. We maintain transparent communication throughout each phase.",
        isOpen: false,
      },
      {
        question: "How long does it take to complete a website?",
        answer:
          "The timeframe for website development depends on the complexity of the project. A basic informational website typically takes 2–4 weeks, while more advanced e-commerce platforms or custom web applications can require 2–4 months. However, we understand that some projects may need to be completed on a tighter schedule—our team is equipped to accelerate timelines when needed. Once we understand your specific requirements, we'll provide a clear and realistic project timeline tailored to your goals",
        isOpen: false,
      },
      {
        question: "How long does it take to develop a mobile app?",
        answer:
          "The timeline for mobile app development varies based on the app’s complexity, features, and target platforms. Simple applications can be completed within 2–3 months, while more advanced apps with complex functionality may take 3–6 months or longer. If you're working with a tight deadline, we can explore options to accelerate the process. After understanding your specific needs, we'll provide a detailed and realistic development timeline",
        isOpen: false,
      },
      {
        question: "How do you handle project communication?",
        answer:
          "We use a combination of tools like Slack, Trello/Jira, and regular video calls to maintain clear communication. You'll have a dedicated project manager, and we provide weekly progress updates and milestone reviews throughout the project.",
        isOpen: false,
      },
      {
        question: "Will I be able to make updates to my website myself?",
        answer:
          "Yes, we develop websites with user-friendly content management systems (CMS) like WordPress that allow you to easily update content, images, and basic information. We also provide training sessions to ensure you're comfortable making these updates.",
        isOpen: false,
      },
    ]
  );

  const [technologyQuestions, setTechnologyQuestions] = useState<FAQ[]>([
    {
      question: "What technologies do you use for web development?",
      answer:
        "We use a wide range of modern web technologies to build high-performance, scalable websites tailored to your needs. Our stack includes front-end technologies like HTML5, CSS3, JavaScript, React, Next.js, Vue.js, and Tailwind CSS; back-end technologies such as Node.js, PHP (Laravel), Python (Django, Flask), and Express.js; and database systems including MySQL, PostgreSQL, and MongoDB. We also work with APIs, cloud services (AWS, Firebase, Vercel), and content management systems like WordPress or Strapi when needed. The technology stack is carefully chosen based on your project goals, performance needs, and scalability requirements.",
      isOpen: false,
    },
    {
      question:
        "What programming languages do you use for mobile app development?",
      answer:
        "For mobile app development, we utilize a wide range of technologies to deliver high-performance and scalable applications tailored to your needs. For cross-platform development, we use React Native, Flutter, and Ionic. For native development, we use Swift and Objective-C for iOS, and Kotlin and Java for Android. Our backend integrations are supported by technologies like Node.js, Django, Firebase, and GraphQL, while tools such as Redux, Bloc, and GetX are used for state management. We also leverage cloud platforms like AWS, Google Cloud, and Azure for scalable infrastructure. The choice of technology is based on your project’s complexity, platform targets, performance requirements, and long-term goals.",
      isOpen: false,
    },
  ]);

  const [pricingQuestions, setPricingQuestions] = useState<FAQ[]>([
    {
      question: "How much does a website cost?",
      answer:
        "Website development costs vary based on the complexity, features, and design requirements of the project. Whether you're looking for a basic informational site, a business website with custom functionality, or an advanced web application or e-commerce platform, pricing is always tailored to your specific needs and scope. We're also open to negotiation to ensure the best value within your budget",
      isOpen: false,
    },
    {
      question: "How much does mobile app development cost?",
      answer:
        "Mobile app development costs vary depending on the complexity, supported platforms (iOS/Android), features, and design requirements. We provide detailed quotes after thoroughly understanding your specific app needs to ensure the best solution for your goals and budget.",
      isOpen: false,
    },
    {
      question: "What is your payment structure?",
      answer:
        "We typically follow a milestone-based payment structure: 30% upfront to initiate the project, 30% at the halfway point, and 40% upon completion. For larger projects, we may break this down into additional milestones aligned with key deliverables.",
      isOpen: false,
    },
    {
      question: "Do you offer any payment plans?",
      answer:
        "Yes, we offer flexible payment plans for larger projects. These can be arranged during the contract negotiation phase and are tailored to accommodate your budget constraints while ensuring project progress.",
      isOpen: false,
    },
    {
      question: "Do you charge for initial consultations?",
      answer:
        "No, initial consultations are completely free. We believe in understanding your requirements thoroughly before providing a quote, and there's no obligation to proceed after the consultation.",
      isOpen: false,
    },
  ]);

  const [supportQuestions, setSupportQuestions] = useState<FAQ[]>([
    {
      question: "What kind of support do you provide after project completion?",
      answer:
        "We offer 30 days of free support after project completion to address any issues. Beyond that, we provide various maintenance packages that include regular updates, security patches, performance monitoring, and technical support.",
      isOpen: false,
    },
    {
      question: "Do you offer website hosting services?",
      answer:
        "Yes, we offer reliable website hosting services with 99.9% uptime guarantee, regular backups, security monitoring, and technical support. Our hosting plans are scalable to accommodate growing traffic and resource needs.",
      isOpen: false,
    },
  ]);

  // State for active category
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = [
    { id: "All", label: "All" },
    { id: "GeneralQuestions", label: "General Questions" },
    { id: "Services", label: "Services" },
    { id: "ProjectProcess", label: "Project Process" },
    { id: "Technology", label: "Technology" },
    { id: "PricingPayments", label: "Pricing & Payments" },
    { id: "SupportMaintenance", label: "Support & Maintenance" },
    { id: "GettingStarted", label: "Getting Started" },
  ];

  // Three.js animation
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;

    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: "#4B9CE2",
      transparent: true,
      opacity: 0.5,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    camera.position.z = 2;

    // Mouse movement effect
    const mouse = {
      x: 0,
      y: 0,
    };

    window.addEventListener("mousemove", (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation loop
    const animate = () => {
      particlesMesh.rotation.y += 0.002;
      particlesMesh.rotation.x += 0.001;

      // Responsive to mouse movement (subtle effect)
      particlesMesh.rotation.x += mouse.y * 0.0003;
      particlesMesh.rotation.y += mouse.x * 0.0003;

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", () => {});
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      scene.remove(particlesMesh);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  // Toggle FAQ function
  const toggleFAQ = (category: string, index: number) => {
    switch (category) {
      case "general":
        setGeneralQuestions(
          generalQuestions.map((q, i) =>
            i === index ? { ...q, isOpen: !q.isOpen } : q
          )
        );
        break;
      case "services":
        setServiceQuestions(
          serviceQuestions.map((q, i) =>
            i === index ? { ...q, isOpen: !q.isOpen } : q
          )
        );
        break;
      case "gettingStarted":
        setGettingStartedQuestions(
          gettingStartedQuestions.map((q, i) =>
            i === index ? { ...q, isOpen: !q.isOpen } : q
          )
        );
        break;
      case "projectProcess":
        setProjectProcessQuestions(
          projectProcessQuestions.map((q, i) =>
            i === index ? { ...q, isOpen: !q.isOpen } : q
          )
        );
        break;
      case "technology":
        setTechnologyQuestions(
          technologyQuestions.map((q, i) =>
            i === index ? { ...q, isOpen: !q.isOpen } : q
          )
        );
        break;
      case "pricing":
        setPricingQuestions(
          pricingQuestions.map((q, i) =>
            i === index ? { ...q, isOpen: !q.isOpen } : q
          )
        );
        break;
      case "support":
        setSupportQuestions(
          supportQuestions.map((q, i) =>
            i === index ? { ...q, isOpen: !q.isOpen } : q
          )
        );
        break;
      default:
        break;
    }
  };

  // Render FAQ Item
  const renderFAQItem = (question: FAQ, index: number, category: string) => {
    return (
      <motion.div
        key={index}
        className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <div
          className={`flex justify-between items-center p-4 cursor-pointer ${
            question.isOpen
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-800"
          }`}
          onClick={() => toggleFAQ(category, index)}
        >
          <h3 className="text-lg font-medium">{question.question}</h3>
          <FontAwesomeIcon
            icon={question.isOpen ? faChevronUp : faChevronDown}
          />
        </div>
        {question.isOpen && (
          <motion.div
            className="p-4 bg-white"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-700">{question.answer}</p>
          </motion.div>
        )}
      </motion.div>
    );
  };

  const textVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Filter FAQs based on active category
  const getFilteredFAQs = () => {
    if (activeCategory === "All") {
      return (
        <>
          <section className="mb-8">
            <motion.h2
              className="text-xl font-bold mb-4 text-blue-500 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="mr-2">─</span> General Questions
            </motion.h2>
            {generalQuestions.map((q, i) => renderFAQItem(q, i, "general"))}
          </section>

          <section className="mb-8">
            <motion.h2
              className="text-xl font-bold mb-4 text-blue-500 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="mr-2">─</span> Services
            </motion.h2>
            {serviceQuestions.map((q, i) => renderFAQItem(q, i, "services"))}
          </section>

          <section className="mb-8">
            <motion.h2
              className="text-xl font-bold mb-4 text-blue-500 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="mr-2">─</span> Getting Started
            </motion.h2>
            {gettingStartedQuestions.map((q, i) =>
              renderFAQItem(q, i, "gettingStarted")
            )}
          </section>

          <section className="mb-8">
            <motion.h2
              className="text-xl font-bold mb-4 text-blue-500 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="mr-2">─</span> Project Process
            </motion.h2>
            {projectProcessQuestions.map((q, i) =>
              renderFAQItem(q, i, "projectProcess")
            )}
          </section>

          <section className="mb-8">
            <motion.h2
              className="text-xl font-bold mb-4 text-blue-500 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <span className="mr-2">─</span> Technology
            </motion.h2>
            {technologyQuestions.map((q, i) =>
              renderFAQItem(q, i, "technology")
            )}
          </section>

          <section className="mb-8">
            <motion.h2
              className="text-xl font-bold mb-4 text-blue-500 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <span className="mr-2">─</span> Pricing & Payments
            </motion.h2>
            {pricingQuestions.map((q, i) => renderFAQItem(q, i, "pricing"))}
          </section>

          <section className="mb-8">
            <motion.h2
              className="text-xl font-bold mb-4 text-blue-500 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <span className="mr-2">─</span> Support & Maintenance
            </motion.h2>
            {supportQuestions.map((q, i) => renderFAQItem(q, i, "support"))}
          </section>
        </>
      );
    }

    if (activeCategory === "GeneralQuestions") {
      return (
        <section>
          <motion.h2
            className="text-xl font-bold mb-4 text-blue-500 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="mr-2">─</span> General Questions
          </motion.h2>
          {generalQuestions.map((q, i) => renderFAQItem(q, i, "general"))}
        </section>
      );
    }

    if (activeCategory === "Services") {
      return (
        <section>
          <motion.h2
            className="text-xl font-bold mb-4 text-blue-500 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="mr-2">─</span> Services
          </motion.h2>
          {serviceQuestions.map((q, i) => renderFAQItem(q, i, "services"))}
        </section>
      );
    }

    if (activeCategory === "GettingStarted") {
      return (
        <section>
          <motion.h2
            className="text-xl font-bold mb-4 text-blue-500 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="mr-2">─</span> Getting Started
          </motion.h2>
          {gettingStartedQuestions.map((q, i) =>
            renderFAQItem(q, i, "gettingStarted")
          )}
        </section>
      );
    }

    if (activeCategory === "ProjectProcess") {
      return (
        <section>
          <motion.h2
            className="text-xl font-bold mb-4 text-blue-500 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="mr-2">─</span> Project Process
          </motion.h2>
          {projectProcessQuestions.map((q, i) =>
            renderFAQItem(q, i, "projectProcess")
          )}
        </section>
      );
    }

    if (activeCategory === "Technology") {
      return (
        <section>
          <motion.h2
            className="text-xl font-bold mb-4 text-blue-500 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="mr-2">─</span> Technology
          </motion.h2>
          {technologyQuestions.map((q, i) => renderFAQItem(q, i, "technology"))}
        </section>
      );
    }

    if (activeCategory === "PricingPayments") {
      return (
        <section>
          <motion.h2
            className="text-xl font-bold mb-4 text-blue-500 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="mr-2">─</span> Pricing & Payments
          </motion.h2>
          {pricingQuestions.map((q, i) => renderFAQItem(q, i, "pricing"))}
        </section>
      );
    }

    if (activeCategory === "SupportMaintenance") {
      return (
        <section>
          <motion.h2
            className="text-xl font-bold mb-4 text-blue-500 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="mr-2">─</span> Support & Maintenance
          </motion.h2>
          {supportQuestions.map((q, i) => renderFAQItem(q, i, "support"))}
        </section>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Background animation */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Header */}
      <header className="relative z-10 pt-8 pb-4 px-6 md:px-12">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link
              href="/"
              className="text-blue-500 hover:text-blue-400 flex items-center"
            >
              <FontAwesomeIcon icon={faHome} className="mr-1" />
              <span>Home</span>
            </Link>
            <span>/</span>
            <span>FAQs</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 px-6 md:px-12 py-8">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">FAQs</h1>
          <p className="text-gray-300">
            Find answers to common questions about our services, processes, and
            technologies. Explore our FAQs to learn how SniperCoders Global
            Technologies can help your business succeed.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto mt-12">
          <motion.div
            className="bg-white rounded-lg shadow-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.h2
              className="text-2xl font-bold mb-4 text-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              className="text-gray-600 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Find answers to common questions about our services and solutions.
            </motion.p>

            {/* Search bar */}
            <motion.div
              className="mb-6 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="relative">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </motion.div>

            {/* Category filters */}
            <motion.div
              className="mb-8 flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-full text-sm ${
                    activeCategory === category.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </motion.div>

            {/* FAQ Items */}
            <div className="text-gray-800">{getFilteredFAQs()}</div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 bg-gray-950/70 backdrop-blur-lg border-t border-gray-800/50 text-white py-16 mt-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <motion.div
              variants={textVariants}
              initial="initial"
              animate="animate"
            >
              <div className="flex items-center mb-6">
                <div className="text-3xl font-extrabold">
                  <span className="bg-clip-text bg-gradient-to-r text-white animate-gradient">
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
      {/* Back to top button */}
      <motion.button
        className="fixed bottom-8 right-8 bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-20 hover:bg-blue-600 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </motion.button>
    </div>
  );
};

export default FAQsPage;

