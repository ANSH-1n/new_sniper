// // // SniperCodersPortfolio.tsx
// // "use client"

// // import React, { useState, useEffect } from 'react';
// // import { ExternalLink } from 'lucide-react';

// // // Define TypeScript interfaces
// // interface ProjectCategory {
// //   id: string;
// //   name: string;
// // }

// // interface Project {
// //   id: string;
// //   title: string;
// //   image: string;
// //   categories: string[];
// //   description: string;
// //   tags: string[];
// // }

// // const SniperCodersPortfolio: React.FC = () => {
// //   // State for active filter category
// //   const [activeCategory, setActiveCategory] = useState<string>("all");
// //   // State for projects to display
// //   const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
// //   // State for hover effects
// //   const [hoveredProject, setHoveredProject] = useState<string | null>(null);

// //   // Project categories
// //   const categories: ProjectCategory[] = [
// //     { id: "all", name: "All" },
// //     { id: "academy-website", name: "Academy Website" },
// //     { id: "agency-website", name: "Agency Website" },
// //     { id: "articles-website", name: "Articles Website" },
// //     { id: "blog-website", name: "Blog Website" },
// //     { id: "business-portfolio-website", name: "Business Portfolio Website" },
// //     { id: "clothing-brand", name: "Clothing Brand" },
// //     { id: "dental-website", name: "Dental Website" },
// //     { id: "driving-school", name: "Driving School" },
// //     { id: "ngo-website", name: "NGO Website" },
// //     { id: "news-website", name: "News Website" },
// //     { id: "portfolio-website", name: "Portfolio Website" },
// //     { id: "traveling-website", name: "Traveling Website" },
// //     { id: "web-application", name: "Web Application" },
// //     { id: "website", name: "Website" },
// //   ];

// //   // Sample projects data based on the screenshots (Replace with your actual images/data)
// //   const projects: Project[] = [
// //     {
// //       id: "brg-finery",
// //       title: "BRG Finery",
// //       image: "/api/placeholder/600/400", // Replace with actual image URL
// //       categories: ["clothing-brand", "web-application"],
// //       description: "Fashion e-commerce platform with a modern design and seamless user experience.",
// //       tags: ["Clothing Brand", "Web Application"]
// //     },
// //     {
// //       id: "karunadu-products",
// //       title: "Karunadu Products",
// //       image: "/api/placeholder/600/400", // Replace with actual image URL
// //       categories: ["website", "web-application"],
// //       description: "Empowering communities and enriching lives through sustainable products.",
// //       tags: ["Website", "Web Application"]
// //     },
// //     {
// //       id: "dr-sharad-dental",
// //       title: "Dr. Sharad Dental Clinic",
// //       image: "/api/placeholder/600/400", // Replace with actual image URL
// //       categories: ["dental-website", "website", "web-application"],
// //       description: "Professional dental care website with appointment booking system.",
// //       tags: ["Dental Website", "Website", "Web Application"]
// //     },
// //     {
// //       id: "ashirwad-driving",
// //       title: "Ashirwad Driving School",
// //       image: "/api/placeholder/600/400", // Replace with actual image URL
// //       categories: ["driving-school", "website", "web-application"],
// //       description: "Comprehensive driving school platform with course management.",
// //       tags: ["Driving School", "Website", "Web Application"]
// //     },
// //     {
// //       id: "chevox",
// //       title: "Chevox",
// //       image: "/api/placeholder/600/400", // Replace with actual image URL
// //       categories: ["clothing-brand", "website", "web-application"],
// //       description: "Crafted to seamlessly blend fashion with fashion.",
// //       tags: ["Clothing Brand", "Website", "Web Application"]
// //     },
// //     {
// //       id: "airborn-aviation",
// //       title: "Airborn Aviation Academy",
// //       image: "/api/placeholder/600/400", // Replace with actual image URL
// //       categories: ["academy-website", "web-application"],
// //       description: "Your gateway to a successful career in Aviation.",
// //       tags: ["Academy Website", "Web Application"]
// //     },
// //     {
// //       id: "kodevedic",
// //       title: "KodeVedic",
// //       image: "/api/placeholder/600/400", // Replace with actual image URL
// //       categories: ["web-application", "agency-website"],
// //       description: "Elevate Your Expertise with Coding Skills.",
// //       tags: ["Web Application", "Agency Website"]
// //     },
// //     {
// //       id: "your-project-code",
// //       title: "Your Project Code",
// //       image: "/api/placeholder/600/400", // Replace with actual image URL
// //       categories: ["articles-website", "blog-website"],
// //       description: "Science Adventures: Unleashing The Power Of Data.",
// //       tags: ["Articles Website", "Blog Website"]
// //     },
// //     {
// //       id: "omniminds-consulting",
// //       title: "Omniminds Consulting",
// //       image: "/api/placeholder/600/400", // Replace with actual image URL
// //       categories: ["agency-website", "web-application"],
// //       description: "We promise to bring the best solution for your business.",
// //       tags: ["Agency Website", "Web Application"]
// //     },
// //     {
// //       id: "renuka-world",
// //       title: "Renuka World",
// //       image: "/api/placeholder/600/400", // Replace with actual image URL
// //       categories: ["traveling-website", "web-application"],
// //       description: "Discover Goa: Your Ultimate Travel Destination.",
// //       tags: ["Traveling Website", "Web Application"]
// //     },
// //     {
// //       id: "jain-jaivik",
// //       title: "Jain Jaivik",
// //       image: "/api/placeholder/600/400", // Replace with actual image URL
// //       categories: ["portfolio-website", "agency-website"],
// //       description: "A New Way to Invest in Agriculture.",
// //       tags: ["Portfolio Website", "Agency Website"]
// //     },
// //     {
// //       id: "mash-digital",
// //       title: "Mash Digital",
// //       image: "/api/placeholder/600/400", // Replace with actual image URL
// //       categories: ["agency-website", "web-application"],
// //       description: "Elevate Your Expertise with Coding Skills.",
// //       tags: ["Agency Website", "Web Application"]
// //     },
// //     {
// //       id: "shakthi-nakshatra",
// //       title: "Shakthi Nakshatra-Book",
// //       image: "/api/placeholder/600/400", // Replace with actual image URL
// //       categories: ["portfolio-website", "web-application"],
// //       description: "Literary portfolio showcasing author's work with online ordering.",
// //       tags: ["Portfolio Website", "Web Application"]
// //     },
// //     {
// //       id: "super-women",
// //       title: "Super Women",
// //       image: "/api/placeholder/600/400", // Replace with actual image URL
// //       categories: ["news-website", "website", "web-application"],
// //       description: "News platform dedicated to women's achievements and stories.",
// //       tags: ["News Website", "Website", "Web Application"]
// //     },
// //     {
// //       id: "adflux-agency",
// //       title: "Adflux Agency",
// //       image: "/api/placeholder/600/400", // Replace with actual image URL
// //       categories: ["agency-website", "web-application"],
// //       description: "Unleash the Power of Digital Marketing.",
// //       tags: ["Agency Website", "Web Application"]
// //     },
// //   ];

// //   // Filter projects when category changes
// //   useEffect(() => {
// //     if (activeCategory === "all") {
// //       setFilteredProjects(projects);
// //     } else {
// //       setFilteredProjects(
// //         projects.filter(project => project.categories.includes(activeCategory))
// //       );
// //     }
// //   }, [activeCategory]);

// //   // Initialize with all projects
// //   useEffect(() => {
// //     setFilteredProjects(projects);
// //   }, []);

// //   // Animate in projects when loaded
// //   useEffect(() => {
// //     const projectElements = document.querySelectorAll('.project-card');
// //     projectElements.forEach((element, index) => {
// //       setTimeout(() => {
// //         element.classList.add('animate-in');
// //       }, 100 * index);
// //     });
// //   }, [filteredProjects]);

// //   return (
// //     <div className="bg-gray-900 min-h-screen text-white">
// //       {/* Header */}
// //       <div className="container mx-auto px-4 mt-10 py-12">
// //         <h2 className="text-4xl font-bold text-center mb-2">Case Studies</h2>
// //         <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12">
// //           At SniperCoders Global Technologies, we're proud of the digital solutions we've
// //           created. Explore our expertise in web development, mobile applications, and
// //           cutting-edge IoT integrations.
// //         </p>

// //         {/* Category Filter */}
// //         <div className="flex flex-wrap justify-center gap-3 mb-12">
// //           {categories.map((category) => (
// //             <button
// //               key={category.id}
// //               onClick={() => setActiveCategory(category.id)}
// //               className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group ${
// //                 activeCategory === category.id
// //                   ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
// //                   : "bg-gray-800 text-gray-400 hover:bg-gray-700"
// //               }`}
// //             >
// //               {category.name}
// //             </button>
// //           ))}
// //         </div>

// //         {/* Project Grid */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //           {filteredProjects.map((project) => (
// //             <div
// //               key={project.id}
// //               className="project-card opacity-0 transform translate-y-8 transition-all duration-500 ease-out"
// //               onMouseEnter={() => setHoveredProject(project.id)}
// //               onMouseLeave={() => setHoveredProject(null)}
// //             >
// //               <div className="bg-gray-800 rounded-lg overflow-hidden group cursor-pointer">
// //                 {/* Project Image */}
// //                 <div className="relative overflow-hidden h-60">
// //                   <img
// //                     src={project.image}
// //                     alt={project.title}
// //                     className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
// //                   />

// //                   {/* Overlay on Hover */}
// //                   <div
// //                     className={`absolute inset-0 bg-gradient-to-t from-cyan-600/80 to-blue-900/60 transition-opacity duration-300 flex items-center justify-center ${
// //                       hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
// //                     }`}
// //                   >
// //                     <button className="px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-md text-white border border-white border-opacity-30 flex items-center">
// //                       View Details <ExternalLink className="ml-2" size={16} />
// //                     </button>
// //                   </div>
// //                 </div>

// //                 {/* Project Info */}
// //                 <div className="p-6">
// //                   <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors duration-300">
// //                     {project.title}
// //                   </h3>

// //                   <div className="flex flex-wrap gap-2 mb-3">
// //                     {project.tags.map((tag, index) => (
// //                       <span
// //                         key={index}
// //                         className="text-xs text-gray-400 border border-gray-700 px-2 py-1 rounded-full"
// //                       >
// //                         {tag}
// //                       </span>
// //                     ))}
// //                   </div>

// //                   <div className="mt-4 flex items-center">
// //                     <button
// //                       className={`text-sm font-medium flex items-center text-cyan-400 transition-colors duration-300 group-hover:text-white`}
// //                     >
// //                       Know More <span className="ml-1">→</span>
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Stats Section */}
// //       <div className="container mx-auto px-4 py-24">
// //         <div className="max-w-4xl mx-auto text-center mb-16">
// //           <h2 className="text-4xl font-bold mb-4">Transforming Ideas into Digital Reality</h2>
// //           <p className="text-gray-400 text-lg">
// //             Explore 200+ successful projects where technology meets creativity. See how
// //             we've helped startups and enterprises achieve digital excellence.
// //           </p>
// //         </div>

// //         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
// //           <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-6 rounded-lg hover:bg-opacity-70 transition-all duration-300 transform hover:-translate-y-2 group">
// //             <div className="text-3xl font-bold text-cyan-400">18+</div>
// //             <div className="text-gray-400">Industries Served</div>
// //           </div>
// //           <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-6 rounded-lg hover:bg-opacity-70 transition-all duration-300 transform hover:-translate-y-2 group">
// //             <div className="text-3xl font-bold text-cyan-400">200+</div>
// //             <div className="text-gray-400">Projects Delivered</div>
// //           </div>
// //           <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-6 rounded-lg hover:bg-opacity-70 transition-all duration-300 transform hover:-translate-y-2 group">
// //             <div className="text-3xl font-bold text-cyan-400">98%</div>
// //             <div className="text-gray-400">Client Satisfaction</div>
// //           </div>
// //           <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-6 rounded-lg hover:bg-opacity-70 transition-all duration-300 transform hover:-translate-y-2 group">
// //             <div className="text-3xl font-bold text-cyan-400">4.9/5</div>
// //             <div className="text-gray-400">Average Rating</div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Footer */}
// //       <footer className="bg-gray-900 border-t border-gray-800">
// //         <div className="container mx-auto px-4 py-8">
// //           <div className="flex flex-col md:flex-row justify-between items-center">
// //             <div className="mb-6 md:mb-0">
// //               <div className="text-2xl font-bold text-white">
// //                 <span className="text-cyan-400">{`{`}</span>
// //                 <span>Sniper</span>
// //                 <span className="text-cyan-400">Coders</span>
// //                 <span className="text-cyan-400">{`}`}</span>
// //               </div>
// //               <p className="text-gray-400 text-sm">Global Technologies</p>
// //             </div>

// //             <div className="flex space-x-4">
// //               <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 group">
// //                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
// //                   <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.668.25 1.235.585 1.8 1.15.565.565.9 1.132 1.15 1.8.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.15 1.8c-.565.565-1.132.9-1.8 1.15-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.8-1.15 4.902 4.902 0 01-1.15-1.8c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.15-1.8A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
// //                 </svg>
// //               </a>
// //               <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 group">
// //                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
// //                   <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
// //                 </svg>
// //               </a>
// //               <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 group">
// //                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
// //                   <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
// //                 </svg>
// //               </a>
// //               <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 group">
// //                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
// //                   <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
// //                 </svg>
// //               </a>
// //             </div>
// //           </div>

// //           <div className="mt-8 pt-8 border-t border-gray-800 text-center">
// //             <p className="text-sm text-gray-400">
// //               ©2025 SniperCoders Global Technologies Private Limited. All rights reserved.
// //             </p>
// //             <p className="text-xs text-gray-600 mt-2">
// //               CIN: U6209MH2024PTC423542
// //             </p>
// //           </div>
// //         </div>
// //       </footer>

// //       {/* Add some CSS for animations */}
// //       <style jsx>{`
// //         .animate-in {
// //           opacity: 1;
// //           transform: translateY(0);
// //         }

// //         @keyframes floating {
// //           0% { transform: translateY(0px); }
// //           50% { transform: translateY(-10px); }
// //           100% { transform: translateY(0px); }
// //         }

// //         .project-card:hover {
// //           animation: floating 3s ease-in-out infinite;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };




// // export default SniperCodersPortfolio;





























// // SniperCodersPortfolio.tsx
// "use client"

// import React, { useState, useEffect } from 'react';
// import { ExternalLink } from 'lucide-react';

// // Define TypeScript interfaces
// interface ProjectCategory {
//   id: string;
//   name: string;
// }

// interface Project {
//   id: string;
//   title: string;
//   image: string;
//   categories: string[];
//   description: string; // Keep description even if not displayed prominently in this layout version
//   tags: string[];
// }

// const SniperCodersPortfolio: React.FC = () => {
//   // State for active filter category
//   const [activeCategory, setActiveCategory] = useState<string>("all");
//   // State for projects to display
//   const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
//   // State for hover effects
//   const [hoveredProject, setHoveredProject] = useState<string | null>(null);

//   // Project categories
//   const categories: ProjectCategory[] = [
//     { id: "all", name: "All" },
//     { id: "academy-website", name: "Academy Website" },
//     { id: "agency-website", name: "Agency Website" },
//     { id: "articles-website", name: "Articles Website" },
//     { id: "blog-website", name: "Blog Website" },
//     { id: "business-portfolio-website", name: "Business Portfolio Website" },
//     { id: "clothing-brand", name: "Clothing Brand" },
//     { id: "dental-website", name: "Dental Website" },
//     { id: "driving-school", name: "Driving School" },
//     { id: "ngo-website", name: "NGO Website" },
//     { id: "news-website", name: "News Website" },
//     { id: "portfolio-website", name: "Portfolio Website" },
//     { id: "traveling-website", name: "Traveling Website" },
//     { id: "web-application", name: "Web Application" },
//     { id: "website", name: "Website" },
//   ];

//   // Sample projects data (Using standard placeholders - replace with your actual images)
//   const projects: Project[] = [
//     {
//       id: "brg-finery",
//       title: "BRG Finery",
//       image: "https://via.placeholder.com/600x400/1E293B/FFFFFF?text=BRG+Finery", // Placeholder
//       categories: ["clothing-brand", "web-application"],
//       description: "Fashion e-commerce platform with a modern design and seamless user experience.",
//       tags: ["Clothing Brand", "Web Application"]
//     },
//     {
//       id: "karunadu-products",
//       title: "Karunadu Products",
//       image: "https://via.placeholder.com/600x400/1E293B/FFFFFF?text=Karunadu", // Placeholder
//       categories: ["website", "web-application"],
//       description: "Empowering communities and enriching lives through sustainable products.",
//       tags: ["Website", "Web Application"]
//     },
//     {
//       id: "dr-sharad-dental",
//       title: "Dr. Sharad Dental Clinic",
//       image: "https://via.placeholder.com/600x400/1E293B/FFFFFF?text=Dr+Sharad", // Placeholder
//       categories: ["dental-website", "website", "web-application"],
//       description: "Professional dental care website with appointment booking system.",
//       tags: ["Dental Website", "Website", "Web Application"]
//     },
//     {
//       id: "ashirwad-driving",
//       title: "Ashirwad Driving School",
//       image: "https://via.placeholder.com/600x400/1E293B/FFFFFF?text=Ashirwad", // Placeholder
//       categories: ["driving-school", "website", "web-application"],
//       description: "Comprehensive driving school platform with course management.",
//       tags: ["Driving School", "Website", "Web Application"]
//     },
//     {
//       id: "chevox",
//       title: "Chevox",
//       image: "https://via.placeholder.com/600x400/1E293B/FFFFFF?text=Chevox", // Placeholder
//       categories: ["clothing-brand", "website", "web-application"],
//       description: "Crafted to seamlessly blend fashion with fashion.",
//       tags: ["Clothing Brand", "Website", "Web Application"]
//     },
//     {
//       id: "airborn-aviation",
//       title: "Airborn Aviation Academy",
//       image: "https://via.placeholder.com/600x400/1E293B/FFFFFF?text=Airborn", // Placeholder
//       categories: ["academy-website", "web-application"],
//       description: "Your gateway to a successful career in Aviation.",
//       tags: ["Academy Website", "Web Application"]
//     },
//     {
//       id: "kodevedic",
//       title: "KodeVedic",
//       image: "https://via.placeholder.com/600x400/1E293B/FFFFFF?text=KodeVedic", // Placeholder
//       categories: ["web-application", "agency-website"],
//       description: "Elevate Your Expertise with Coding Skills.",
//       tags: ["Web Application", "Agency Website"]
//     },
//     {
//       id: "your-project-code",
//       title: "Your Project Code",
//       image: "https://via.placeholder.com/600x400/1E293B/FFFFFF?text=Your+Project", // Placeholder
//       categories: ["articles-website", "blog-website"],
//       description: "Science Adventures: Unleashing The Power Of Data.",
//       tags: ["Articles Website", "Blog Website"]
//     },
//     {
//       id: "omniminds-consulting",
//       title: "Omniminds Consulting",
//       image: "https://via.placeholder.com/600x400/1E293B/FFFFFF?text=Omniminds", // Placeholder
//       categories: ["agency-website", "web-application"],
//       description: "We promise to bring the best solution for your business.",
//       tags: ["Agency Website", "Web Application"]
//     },
//     {
//       id: "renuka-world",
//       title: "Renuka World",
//       image: "https://via.placeholder.com/600x400/1E293B/FFFFFF?text=Renuka", // Placeholder
//       categories: ["traveling-website", "web-application"],
//       description: "Discover Goa: Your Ultimate Travel Destination.",
//       tags: ["Traveling Website", "Web Application"]
//     },
//     {
//       id: "jain-jaivik",
//       title: "Jain Jaivik",
//       image: "https://via.placeholder.com/600x400/1E293B/FFFFFF?text=Jain+Jaivik", // Placeholder
//       categories: ["portfolio-website", "agency-website"],
//       description: "A New Way to Invest in Agriculture.",
//       tags: ["Portfolio Website", "Agency Website"]
//     },
//     {
//       id: "mash-digital",
//       title: "Mash Digital",
//       image: "https://via.placeholder.com/600x400/1E293B/FFFFFF?text=Mash+Digital", // Placeholder
//       categories: ["agency-website", "web-application"],
//       description: "Elevate Your Expertise with Coding Skills.",
//       tags: ["Agency Website", "Web Application"]
//     },
//     {
//       id: "shakthi-nakshatra",
//       title: "Shakthi Nakshatra-Book",
//       image: "https://via.placeholder.com/600x400/1E293B/FFFFFF?text=Shakthi", // Placeholder
//       categories: ["portfolio-website", "web-application"],
//       description: "Literary portfolio showcasing author's work with online ordering.",
//       tags: ["Portfolio Website", "Web Application"]
//     },
//     {
//       id: "super-women",
//       title: "Super Women",
//       image: "https://via.placeholder.com/600x400/1E293B/FFFFFF?text=Super+Women", // Placeholder
//       categories: ["news-website", "website", "web-application"],
//       description: "News platform dedicated to women's achievements and stories.",
//       tags: ["News Website", "Website", "Web Application"]
//     },
//     {
//       id: "adflux-agency",
//       title: "Adflux Agency",
//       image: "https://via.placeholder.com/600x400/1E293B/FFFFFF?text=Adflux", // Placeholder
//       categories: ["agency-website", "web-application"],
//       description: "Unleash the Power of Digital Marketing.",
//       tags: ["Agency Website", "Web Application"]
//     },
//   ];

//   // Initialize with all projects on mount
//   useEffect(() => {
//     setFilteredProjects(projects);
//   }, []); // Empty dependency array ensures this runs only once on mount

//   // Filter projects when activeCategory changes
//   useEffect(() => {
//     if (activeCategory === "all") {
//       setFilteredProjects(projects);
//     } else {
//       setFilteredProjects(
//         projects.filter(project => project.categories.includes(activeCategory))
//       );
//     }
//     // Reset hover state when filter changes
//     setHoveredProject(null);
//   }, [activeCategory]); // Dependency: re-run only when activeCategory changes

//   // Animate in projects when filteredProjects changes
//   useEffect(() => {
//     // Ensure elements exist before trying to manipulate them
//     const projectElements = document.querySelectorAll('.project-card');
//     if (projectElements.length > 0) {
//       projectElements.forEach((element) => {
//         // Reset animation classes before applying
//         element.classList.remove('animate-in');
//         // Force reflow to restart animation (optional but can help)
//         void element.offsetWidth;
//       });

//       projectElements.forEach((element, index) => {
//         // Apply animation with delay
//         const timer = setTimeout(() => {
//           element.classList.add('animate-in');
//         }, 100 * index);
//         // Cleanup timeout if component unmounts or filteredProjects changes again quickly
//         return () => clearTimeout(timer);
//       });
//     }
//   }, [filteredProjects]); // Dependency: re-run when filteredProjects updates


//   return (
//     // Main container div - ensures footer and style tag are included correctly
//     <div className="bg-gray-900 min-h-screen text-white">
//       {/* Header Section */}
//       <div className="container mx-auto px-4 pt-20 pb-12"> {/* Added more top padding */}
//         <h2 className="text-4xl font-bold text-center mb-4">Case Studies</h2>
//         <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12">
//           At SniperCoders Global Technologies, we're proud of the digital solutions we've
//           created. Explore our expertise in web development, mobile applications, and
//           cutting-edge IoT integrations.
//         </p>

//         {/* Category Filter */}
//         <div className="flex flex-wrap justify-center gap-3 mb-16"> {/* Increased bottom margin */}
//           {categories.map((category) => (
//             <button
//               key={category.id}
//               onClick={() => setActiveCategory(category.id)}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group ${
//                 activeCategory === category.id
//                   ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
//                   : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
//               }`}
//             >
//               {category.name}
//             </button>
//           ))}
//         </div>

//         {/* Project Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredProjects.map((project) => (
//             <div
//               key={project.id}
//               // Initial state for animation (set via Tailwind)
//               className="project-card opacity-0 transform translate-y-8 transition-all duration-700 ease-out"
//               onMouseEnter={() => setHoveredProject(project.id)}
//               onMouseLeave={() => setHoveredProject(null)}
//             >
//               {/* Added outer group for potential future hover effects on the whole card */}
//               <div className="bg-gray-800 rounded-lg overflow-hidden group/card cursor-pointer relative h-full flex flex-col">
//                 {/* Project Image Container */}
//                 <div className="relative overflow-hidden h-60 group/image"> {/* Added group/image */}
//                   <img
//                     src={project.image}
//                     alt={project.title} // Use project title for alt text
//                     className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover/image:scale-110" // Target specific group
//                   />

//                   {/* Overlay on Hover */}
//                   <div
//                     className={`absolute inset-0 bg-gradient-to-t from-cyan-600/70 via-blue-800/60 to-transparent transition-opacity duration-300 flex items-end justify-center pb-4 ${ // Adjusted gradient and position
//                       hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
//                     }`}
//                   >
//                     {/* Make the whole overlay clickable or add specific buttons */}
//                     <a href="#" // Replace with actual link to project details
//                        className="px-5 py-2.5 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg text-white border border-white border-opacity-30 flex items-center text-sm hover:bg-opacity-20 transition-colors duration-200">
//                       View Details <ExternalLink className="ml-2" size={16} />
//                     </a>
//                   </div>
//                 </div>

//                 {/* Project Info */}
//                 <div className="p-6 flex flex-col flex-grow"> {/* Use flex-grow to push footer content down if needed */}
//                   <h3 className="text-xl font-semibold mb-2 text-white group-hover/card:text-cyan-400 transition-colors duration-300">
//                     {project.title}
//                   </h3>
//                   <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow"> {/* Added description preview */}
//                       {project.description}
//                   </p>

//                   <div className="flex flex-wrap gap-2 mb-4">
//                     {project.tags.slice(0, 3).map((tag, index) => ( // Limit tags shown initially
//                       <span
//                         key={index}
//                         className="text-xs text-gray-400 bg-gray-700 px-2.5 py-1 rounded-full"
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                   </div>

//                   {/* Kept Know More separate for clarity */}
//                   <div className="mt-auto pt-2"> {/* mt-auto pushes this to bottom */}
//                     <a href="#" // Replace with actual link
//                        className={`text-sm font-medium flex items-center text-cyan-400 transition-colors duration-300 group-hover/card:text-white`}
//                     >
//                       Know More <span className="ml-1 transition-transform duration-300 group-hover/card:translate-x-1">→</span>
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//           {/* Handle case where no projects match filter */}
//            {filteredProjects.length === 0 && activeCategory !== "all" && (
//              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-gray-500 py-10">
//                 No projects found in the "{categories.find(c => c.id === activeCategory)?.name}" category.
//              </div>
//            )}
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div className="container mx-auto px-4 py-24">
//         <div className="max-w-4xl mx-auto text-center mb-16">
//           <h2 className="text-4xl font-bold mb-4">Transforming Ideas into Digital Reality</h2>
//           <p className="text-gray-400 text-lg">
//             Explore 200+ successful projects where technology meets creativity. See how
//             we've helped startups and enterprises achieve digital excellence.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//           {/* Stat Item 1 */}
//           <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-lg border border-gray-700/50 hover:bg-gray-700/60 transition-all duration-300 transform hover:-translate-y-1 group">
//             <div className="text-4xl font-bold text-cyan-400 mb-1">18+</div>
//             <div className="text-gray-400">Industries Served</div>
//           </div>
//           {/* Stat Item 2 */}
//           <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-lg border border-gray-700/50 hover:bg-gray-700/60 transition-all duration-300 transform hover:-translate-y-1 group">
//             <div className="text-4xl font-bold text-cyan-400 mb-1">200+</div>
//             <div className="text-gray-400">Projects Delivered</div>
//           </div>
//           {/* Stat Item 3 */}
//           <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-lg border border-gray-700/50 hover:bg-gray-700/60 transition-all duration-300 transform hover:-translate-y-1 group">
//             <div className="text-4xl font-bold text-cyan-400 mb-1">98%</div>
//             <div className="text-gray-400">Client Satisfaction</div>
//           </div>
//           {/* Stat Item 4 */}
//           <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-lg border border-gray-700/50 hover:bg-gray-700/60 transition-all duration-300 transform hover:-translate-y-1 group">
//             <div className="text-4xl font-bold text-cyan-400 mb-1">4.9/5</div>
//             <div className="text-gray-400">Average Rating</div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-gray-950/50 border-t border-gray-800 text-white py-12 mt-16"> {/* Slightly different bg, added border */}
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             {/* Company Info */}
//             <div className="col-span-1 md:col-span-1"> {/* Adjusted span for consistency */}
//               <div className="flex items-center mb-4">
//                  {/* Optional: Add Logo here */}
//                  {/* <img src="/logo.png" alt="SniperCoders Logo" className="h-8 mr-2" /> */}
//                 <div className="text-2xl font-bold">
//                   <span className="text-cyan-400">Sniper</span>Coders
//                 </div>
//               </div>
//               <p className="text-gray-400 text-sm leading-relaxed"> {/* Slightly smaller text */}
//                 We specialize in turning visionary ideas into reality. Our expertise helps businesses transform aspirations into tangible solutions, paving the way for future growth.
//               </p>
//             </div>

//             {/* Our Service */}
//             <div className="col-span-1">
//               <h3 className="text-lg font-semibold mb-4 text-gray-200">Our Services</h3> {/* Adjusted size/weight */}
//               <ul className="space-y-2">
//                 <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Custom Software Dev</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Website Development</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Mobile App Development</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">UI/UX Design</a></li> {/* Added item */}
//                 <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Cloud Solutions</a></li> {/* Added item */}
//               </ul>
//             </div>

//             {/* Useful Links */}
//             <div className="col-span-1">
//               <h3 className="text-lg font-semibold mb-4 text-gray-200">Useful Links</h3>
//               <ul className="space-y-2">
//                 <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Terms of Service</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Privacy Policy</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Refund Policy</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Careers</a></li>
//               </ul>
//             </div>

//             {/* Contact/Know More */}
//             <div className="col-span-1">
//               <h3 className="text-lg font-semibold mb-4 text-gray-200">Get In Touch</h3>
//               <ul className="space-y-2">
//                  <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">About Us</a></li>
//                  <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Contact Us</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">FAQs</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Testimonials</a></li>
//               </ul>
//               {/* Optional: Add Social Links */}
//               {/* <div className="flex space-x-4 mt-6">
//                   <a href="#" className="text-gray-500 hover:text-cyan-400"><Icon /></a>
//               </div> */}
//             </div>
//           </div>
//           <div className="mt-10 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
//              © {new Date().getFullYear()} SniperCoders Global Technologies. All rights reserved.
//           </div>
//         </div>
//       </footer>

//       {/* Add some CSS for animations (using <style jsx>) */}
//       {/* This style tag MUST be inside the main returned div */}
//       <style jsx>{`
//         .animate-in {
//           opacity: 1;
//           transform: translateY(0);
//         }

//         /* Optional: Subtle floating animation on hover for stats cards */
//         /* The project card floating animation was potentially excessive, removed it */
//         /* You can re-add it if desired:
//         @keyframes floating {
//           0% { transform: translateY(0px); }
//           50% { transform: translateY(-6px); } // Reduced intensity
//           100% { transform: translateY(0px); }
//         }
//         .project-card:hover .group\\/card { // Target the inner div
//           animation: floating 3s ease-in-out infinite;
//         }
//         */
//       `}</style>

//     </div> // <-- This is the closing tag for the main component div
//   );
// };

// export default SniperCodersPortfolio;

































// SniperCodersPortfolio.tsx
"use client"

import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';

// Define TypeScript interfaces
interface ProjectCategory {
  id: string;
  name: string;
}

interface Project {
  id: string;
  title: string;
  image: string;
  categories: string[];
  description: string;
  tags: string[];
}

interface BubbleProps {
  count: number;
}

// Separate Bubble Animation Component
const BubbleAnimation: React.FC<BubbleProps> = ({ count }) => {
  return (
    <div className="bubble-animation">
      {[...Array(count)].map((_, index) => (
        <div key={index} className="bubble" style={{
          '--size': `${Math.random() * 4 + 1}rem`,
          '--distance': `${Math.random() * 6 + 4}rem`,
          '--position': `${Math.random() * 100}%`,
          '--time': `${Math.random() * 2 + 2}s`,
          '--delay': `${Math.random() * 2}s`,
        } as React.CSSProperties} />
      ))}
    </div>
  );
};

const SniperCodersPortfolio: React.FC = () => {
  // State for active filter category
  const [activeCategory, setActiveCategory] = useState<string>("all");
  // State for projects to display
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  // State for hover effects
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  // State for animation visibility
  const [animationVisible, setAnimationVisible] = useState<boolean>(false);
  // Ref for header section for parallax effect
  const headerRef = useRef<HTMLDivElement>(null);
  // Ref for stats section for intersection observer
  const statsRef = useRef<HTMLDivElement>(null);
  
  // Project categories
  const categories: ProjectCategory[] = [
    { id: "all", name: "All" },
    { id: "academy-website", name: "Academy Website" },
    { id: "agency-website", name: "Agency Website" },
    { id: "articles-website", name: "Articles Website" },
    { id: "blog-website", name: "Blog Website" },
    { id: "business-portfolio-website", name: "Business Portfolio Website" },
    { id: "clothing-brand", name: "Clothing Brand" },
    { id: "dental-website", name: "Dental Website" },
    { id: "driving-school", name: "Driving School" },
    { id: "ngo-website", name: "NGO Website" },
    { id: "news-website", name: "News Website" },
    { id: "portfolio-website", name: "Portfolio Website" },
    { id: "traveling-website", name: "Traveling Website" },
    { id: "web-application", name: "Web Application" },
    { id: "website", name: "Website" },
  ];

  // Sample projects data (Using standard placeholders - replace with your actual images)
  const projects: Project[] = [
    {
      id: "brg-finery",
      title: "BRG Finery",
      image: "https://via.placeholder.com/600x400/1E293B/FFFFFF?text=BRG+Finery", // Placeholder
      categories: ["clothing-brand", "web-application"],
      description: "Fashion e-commerce platform with a modern design and seamless user experience.",
      tags: ["Clothing Brand", "Web Application"]
    },
    {
      id: "karunadu-products",
      title: "Karunadu Products",
      image: "https://via.placeholder.com/600x400/1E293B/FFFFFF?text=Karunadu", // Placeholder
      categories: ["website", "web-application"],
      description: "Empowering communities and enriching lives through sustainable products.",
      tags: ["Website", "Web Application"]
    },
    {
      id: "dr-sharad-dental",
      title: "Dr. Sharad Dental Clinic",
      image: "https://via.placeholder.com/600x400/1E293B/FFFFFF?text=Dr+Sharad", // Placeholder
      categories: ["dental-website", "website", "web-application"],
      description: "Professional dental care website with appointment booking system.",
      tags: ["Dental Website", "Website", "Web Application"]
    },
    {
      id: "ashirwad-driving",
      title: "Ashirwad Driving School",
      image: "https://via.placeholder.com/600x400/1E293B/FFFFFF?text=Ashirwad", // Placeholder
      categories: ["driving-school", "website", "web-application"],
      description: "Comprehensive driving school platform with course management.",
      tags: ["Driving School", "Website", "Web Application"]
    },
    {
      id: "chevox",
      title: "Chevox",
      image: "https://via.placeholder.com/600x400/1E293B/FFFFFF?text=Chevox", // Placeholder
      categories: ["clothing-brand", "website", "web-application"],
      description: "Crafted to seamlessly blend fashion with fashion.",
      tags: ["Clothing Brand", "Website", "Web Application"]
    },
    {
      id: "airborn-aviation",
      title: "Airborn Aviation Academy",
      image: "https://via.placeholder.com/600x400/1E293B/FFFFFF?text=Airborn", // Placeholder
      categories: ["academy-website", "web-application"],
      description: "Your gateway to a successful career in Aviation.",
      tags: ["Academy Website", "Web Application"]
    },
    {
      id: "kodevedic",
      title: "KodeVedic",
      image: "https://via.placeholder.com/600x400/1E293B/FFFFFF?text=KodeVedic", // Placeholder
      categories: ["web-application", "agency-website"],
      description: "Elevate Your Expertise with Coding Skills.",
      tags: ["Web Application", "Agency Website"]
    },
    {
      id: "your-project-code",
      title: "Your Project Code",
      image: "https://via.placeholder.com/600x400/1E293B/FFFFFF?text=Your+Project", // Placeholder
      categories: ["articles-website", "blog-website"],
      description: "Science Adventures: Unleashing The Power Of Data.",
      tags: ["Articles Website", "Blog Website"]
    },
    {
      id: "omniminds-consulting",
      title: "Omniminds Consulting",
      image: "https://via.placeholder.com/600x400/1E293B/FFFFFF?text=Omniminds", // Placeholder
      categories: ["agency-website", "web-application"],
      description: "We promise to bring the best solution for your business.",
      tags: ["Agency Website", "Web Application"]
    },
    {
      id: "renuka-world",
      title: "Renuka World",
      image: "https://via.placeholder.com/600x400/1E293B/FFFFFF?text=Renuka", // Placeholder
      categories: ["traveling-website", "web-application"],
      description: "Discover Goa: Your Ultimate Travel Destination.",
      tags: ["Traveling Website", "Web Application"]
    },
    {
      id: "jain-jaivik",
      title: "Jain Jaivik",
      image: "https://via.placeholder.com/600x400/1E293B/FFFFFF?text=Jain+Jaivik", // Placeholder
      categories: ["portfolio-website", "agency-website"],
      description: "A New Way to Invest in Agriculture.",
      tags: ["Portfolio Website", "Agency Website"]
    },
    {
      id: "mash-digital",
      title: "Mash Digital",
      image: "https://via.placeholder.com/600x400/1E293B/FFFFFF?text=Mash+Digital", // Placeholder
      categories: ["agency-website", "web-application"],
      description: "Elevate Your Expertise with Coding Skills.",
      tags: ["Agency Website", "Web Application"]
    },
    {
      id: "shakthi-nakshatra",
      title: "Shakthi Nakshatra-Book",
      image: "https://via.placeholder.com/600x400/1E293B/FFFFFF?text=Shakthi", // Placeholder
      categories: ["portfolio-website", "web-application"],
      description: "Literary portfolio showcasing author's work with online ordering.",
      tags: ["Portfolio Website", "Web Application"]
    },
    {
      id: "super-women",
      title: "Super Women",
      image: "https://via.placeholder.com/600x400/1E293B/FFFFFF?text=Super+Women", // Placeholder
      categories: ["news-website", "website", "web-application"],
      description: "News platform dedicated to women's achievements and stories.",
      tags: ["News Website", "Website", "Web Application"]
    },
    {
      id: "adflux-agency",
      title: "Adflux Agency",
      image: "https://via.placeholder.com/600x400/1E293B/FFFFFF?text=Adflux", // Placeholder
      categories: ["agency-website", "web-application"],
      description: "Unleash the Power of Digital Marketing.",
      tags: ["Agency Website", "Web Application"]
    },
  ];

  // Initialize with all projects on mount
  useEffect(() => {
    setFilteredProjects(projects);
    setAnimationVisible(true);
    
    // Setup scroll listener for parallax effect
    const handleScroll = () => {
      if (headerRef.current) {
        const scrollPosition = window.scrollY;
        headerRef.current.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
      }
    };
    
    // Setup Intersection Observer for stats section
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add animation class when stats section comes into view
          entry.target.classList.add('stats-animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // Filter projects when activeCategory changes
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter(project => project.categories.includes(activeCategory))
      );
    }
    // Reset hover state when filter changes
    setHoveredProject(null);
  }, [activeCategory]); // Dependency: re-run only when activeCategory changes

  // Animate in projects when filteredProjects changes
  useEffect(() => {
    // Ensure elements exist before trying to manipulate them
    const projectElements = document.querySelectorAll('.project-card');
    if (projectElements.length > 0) {
      projectElements.forEach((element) => {
        // Reset animation classes before applying
        element.classList.remove('animate-in');
        // Force reflow to restart animation (optional but can help)
        void element.offsetWidth;
      });

      projectElements.forEach((element, index) => {
        // Apply animation with delay
        const timer = setTimeout(() => {
          element.classList.add('animate-in');
        }, 100 * index);
        // Cleanup timeout if component unmounts or filteredProjects changes again quickly
        return () => clearTimeout(timer);
      });
    }
  }, [filteredProjects]); // Dependency: re-run when filteredProjects updates

  return (
    // Main container div with gradient background and bubble animation
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white relative overflow-hidden">
      {/* Bubble Animation Background */}
      {animationVisible && <BubbleAnimation count={15} />}
      
      {/* Glowing orbs in background */}
      <div className="glow-orb blue"></div>
      <div className="glow-orb purple"></div>
      
      {/* Header Section with Parallax Effect */}
      <div 
        ref={headerRef}
        className="relative z-10 container mx-auto px-4 pt-20 pb-12"
      >
        {/* Animated heading with glow effect */}
        <h2 className="text-5xl font-bold text-center mb-4 glow-text">
          <span className="text-gradient">Case Studies</span>
        </h2>
        <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12 animate-fade-in">
          At SniperCoders Global Technologies, we're proud of the digital solutions we've
          created. Explore our expertise in web development, mobile applications, and
          cutting-edge IoT integrations.
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 filter-container"> 
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 filter-btn ${
                activeCategory === category.id
                  ? "active-filter"
                  : "inactive-filter"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Project Grid with Glass Morphism Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card opacity-0 transform translate-y-8 transition-all duration-700 ease-out"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Added glass morphism effect */}
              <div className="glass-card bg-opacity-10 backdrop-filter backdrop-blur-md rounded-lg overflow-hidden group/card cursor-pointer relative h-full flex flex-col border border-white/10 shadow-xl hover:shadow-cyan-500/20 transition-all duration-500">
                {/* Project Image Container */}
                <div className="relative overflow-hidden h-60 group/image"> 
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover/image:scale-110"
                  />

                  {/* Overlay on Hover with improved gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-cyan-600/80 via-blue-800/60 to-transparent transition-all duration-300 flex items-end justify-center pb-4 ${
                      hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <a href="#" 
                       className="px-5 py-2.5 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg text-white border border-white border-opacity-30 flex items-center text-sm hover:bg-opacity-20 transition-colors duration-200 hover:scale-105">
                      View Details <ExternalLink className="ml-2" size={16} />
                    </a>
                  </div>
                </div>

                {/* Project Info with improved typography */}
                <div className="p-6 flex flex-col flex-grow"> 
                  <h3 className="text-xl font-semibold mb-2 text-white group-hover/card:text-cyan-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2 flex-grow"> 
                      {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs text-gray-300 bg-gray-700/50 border border-gray-600/30 px-2.5 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-2">
                    <a href="#"
                       className="text-sm font-medium flex items-center text-cyan-400 transition-all duration-300 group-hover/card:text-white"
                    >
                      Know More <span className="ml-1 transition-transform duration-300 group-hover/card:translate-x-1">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Handle case where no projects match filter */}
           {filteredProjects.length === 0 && activeCategory !== "all" && (
             <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-gray-400 py-10 glass-card p-10">
                No projects found in the "{categories.find(c => c.id === activeCategory)?.name}" category.
             </div>
           )}
        </div>
      </div>

      {/* Stats Section with Counter Animation */}
      <div ref={statsRef} className="container mx-auto px-4 py-24 stats-section">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gradient">Transforming Ideas into Digital Reality</h2>
          <p className="text-gray-300 text-lg">
            Explore 200+ successful projects where technology meets creativity. See how
            we've helped startups and enterprises achieve digital excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Stat Item 1 */}
          <div className="glass-card p-6 rounded-lg border border-white/10 hover:border-cyan-500/30 transition-all duration-500 transform hover:-translate-y-2 group">
            <div className="text-4xl font-bold text-cyan-400 mb-1 counter" data-target="18">0+</div>
            <div className="text-gray-300">Industries Served</div>
          </div>
          {/* Stat Item 2 */}
          <div className="glass-card p-6 rounded-lg border border-white/10 hover:border-cyan-500/30 transition-all duration-500 transform hover:-translate-y-2 group">
            <div className="text-4xl font-bold text-cyan-400 mb-1 counter" data-target="200">0+</div>
            <div className="text-gray-300">Projects Delivered</div>
          </div>
          {/* Stat Item 3 */}
          <div className="glass-card p-6 rounded-lg border border-white/10 hover:border-cyan-500/30 transition-all duration-500 transform hover:-translate-y-2 group">
            <div className="text-4xl font-bold text-cyan-400 mb-1 counter" data-target="98">0%</div>
            <div className="text-gray-300">Client Satisfaction</div>
          </div>
          {/* Stat Item 4 */}
          <div className="glass-card p-6 rounded-lg border border-white/10 hover:border-cyan-500/30 transition-all duration-500 transform hover:-translate-y-2 group">
            <div className="text-4xl font-bold text-cyan-400 mb-1 counter" data-target="4.9">0/5</div>
            <div className="text-gray-300">Average Rating</div>
          </div>
        </div>
      </div>

      {/* Footer with improved styling and glass effect */}
      <footer className="relative z-10 bg-gray-950/50 backdrop-filter backdrop-blur-lg border-t border-gray-800/50 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center mb-4">
                <div className="text-2xl font-bold">
                  <span className="text-cyan-400">Sniper</span>Coders
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                We specialize in turning visionary ideas into reality. Our expertise helps businesses transform aspirations into tangible solutions, paving the way for future growth.
              </p>
            </div>

            {/* Our Service */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4 text-gray-200">Our Services</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Custom Software Dev</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Website Development</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Mobile App Development</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">UI/UX Design</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Cloud Solutions</a></li>
              </ul>
            </div>

            {/* Useful Links */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4 text-gray-200">Useful Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Refund Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Careers</a></li>
              </ul>
            </div>

            {/* Contact/Know More */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4 text-gray-200">Get In Touch</h3>
              <ul className="space-y-2">
                 <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">About Us</a></li>
                 <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">FAQs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Testimonials</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-8 border-t border-gray-800/50 text-center text-gray-500 text-sm">
             © {new Date().getFullYear()} SniperCoders Global Technologies. All rights reserved.
          </div>
        </div>
      </footer>

      {/* CSS for animations and effects */}
      <style jsx>{`
        /* Card animations */
        .animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Fade in animation for text */
        .animate-fade-in {
          animation: fadeIn 1.5s ease-in-out forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        /* Bubble animation */
        .bubble-animation {
          position: fixed;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 0;
          overflow: hidden;
        }
        
        .bubble {
          position: absolute;
          bottom: -10%;
          background-color: rgba(0, 236, 255, 0.03);
          border: 1px solid rgba(0, 236, 255, 0.1);
          border-radius: 50%;
          width: var(--size);
          height: var(--size);
          animation: float var(--time) ease-in-out var(--delay) infinite;
          left: var(--position);
        }
        
        @keyframes float {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(calc(-100vh - var(--distance))) scale(0.8);
            opacity: 0;
          }
        }
        
        /* Glowing orbs */
        .glow-orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(80px);
          z-index: 0;
          opacity: 0.4;
        }
        
        .glow-orb.blue {
          width: 40vw;
          height: 40vw;
          background: rgba(56, 182, 255, 0.2);
          top: -10%;
          right: -10%;
          animation: orb-move 20s ease-in-out infinite alternate;
        }
        
        .glow-orb.purple {
          width: 35vw;
          height: 35vw;
          background: rgba(166, 56, 255, 0.15);
          bottom: -5%;
          left: -5%;
          animation: orb-move 15s ease-in-out infinite alternate-reverse;
        }
        
        @keyframes orb-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(5%, 5%);
          }
        }
        
        /* Text gradient effect */
        .text-gradient {
          background: linear-gradient(to right, #0ea5e9, #06b6d4, #14b8a6);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradient-shift 8s ease infinite;
          background-size: 200% auto;
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% center; }
          50% { background-position: 100% center; }
          100% { background-position: 0% center; }
        }
        
        /* Glow text effect */
        .glow-text {
          text-shadow: 0 0 10px rgba(6, 182, 212, 0.3);
        }
        
        /* Glass card effect */
        .glass-card {
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(12px);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.36);
        }
        
        /* Filter buttons */
        .filter-btn {
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
        }
        
        .active-filter {
          background: linear-gradient(90deg, #0ea5e9, #06b6d4);
          box-shadow: 0 4px 15px rgba(6, 182, 212, 0.3);
          color: white;
          transform: translateY(-2px);
        }
        
        .inactive-filter {
          background: rgba(31, 41, 55, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(156, 163, 175, 1);
        }
        
        .inactive-filter:hover {
          background: rgba(55, 65, 81, 0.7);
          transform: translateY(-1px);
          color: white;
        }
        
        /* Filter container animation */
        .filter-container {
          animation: slideDown 0.8s ease-out forwards;
        }
        
        @keyframes slideDown {
          from { 
            transform: translateY(-20px);
            opacity: 0;
          }
          to { 
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        /* Stats section animations */
        .stats-section {
          opacity: 0;
          transform: translateY(20px);
          transition: all 1s ease-out;
        }
        
        .stats-animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Counter animation will be handled via JS */
        
      `}</style>

      {/* Add scripts for counter animation */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // Function to animate counting up
          function animateCounters() {
            const counters = document.querySelectorAll('.counter');
            const speed = 200; // The lower the faster
            
            counters.forEach(counter => {
              const target = parseFloat(counter.getAttribute('data-target'));
              const isDecimal = target % 1 !== 0;
              const increment = target / speed;
              let count = 0;
              
              const updateCount = () => {
                if (count < target) {
                  count += increment;
                  // Format the display value
                  let displayValue = isDecimal ? count.toFixed(1) : Math.floor(count);
                  // Add the appropriate suffix
                  if (counter.textContent.includes('%')) {
                    displayValue += '%';
                  } else if (counter.textContent.includes('/')) {
                    displayValue += '/5';
                  } else {
                    displayValue += '+';
                  }

                  counter.textContent = displayValue;
                  requestAnimationFrame(updateCount);
                } else {
                  // Ensure we end with the exact target value
                  let finalValue = isDecimal ? target.toFixed(1) : target;
                  if (counter.textContent.includes('%')) {
                    finalValue += '%';
                  } else if (counter.textContent.includes('/')) {
                    finalValue += '/5';
                  } else {
                    finalValue += '+';
                  }
                  counter.textContent = finalValue;
                }
              };
              
              updateCount();
            });
          }
          
          // Use IntersectionObserver to trigger counter animation when visible
          document.addEventListener('DOMContentLoaded', () => {
            const statsSection = document.querySelector('.stats-section');
            
            if (statsSection) {
              const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                  if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                  }
                });
              }, { threshold: 0.2 });
              
              observer.observe(statsSection);
            }
            
            // Initialize hover effects for projects
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach(card => {
              card.addEventListener('mouseenter', () => {
                const cardElement = card.querySelector('.glass-card');
                if (cardElement) {
                  cardElement.style.transform = 'translateY(-8px)';
                  cardElement.style.boxShadow = '0 12px 28px rgba(6, 182, 212, 0.25)';
                }
              });
              
              card.addEventListener('mouseleave', () => {
                const cardElement = card.querySelector('.glass-card');
                if (cardElement) {
                  cardElement.style.transform = '';
                  cardElement.style.boxShadow = '';
                }
              });
            });
          });
        `
      }} />
    </div>
  );
};

export default SniperCodersPortfolio;