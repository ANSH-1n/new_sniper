
import { useState, useEffect, useRef, FC } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import Link from "next/link";

// 3D Image component
interface ThreeDImageProps {
  imageUrl: string;
}

const ThreeDImage: FC<ThreeDImageProps> = ({ imageUrl }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    if (!mountRef.current) return;
    
    const currentMount = mountRef.current; // Store ref value in a variable

    renderer.setSize(320, 320);
    currentMount.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    const texture = loader.load(imageUrl);
    const geometry = new THREE.PlaneGeometry(3, 3, 20, 20);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    camera.position.z = 4;

    let time = 0;
    let animationFrameId: number;

    const animate = () => {
      time += 0.01;

      if (isHovered) {
        const positions = geometry.attributes.position;

        for (let i = 0; i < positions.count; i++) {
          const x = positions.getX(i);
          const y = positions.getY(i);

          const waveX = 0.1 * Math.sin(x * 2 + time * 3);
          const waveY = 0.1 * Math.sin(y * 2 + time * 2);

          positions.setZ(i, waveX + waveY);
        }

        positions.needsUpdate = true;
      } else {
        plane.rotation.x = Math.sin(time * 0.5) * 0.05;
        plane.rotation.y = Math.sin(time * 0.3) * 0.05;
      }

      renderer.render(scene, camera);
      animationFrameId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
    };
  }, [imageUrl, isHovered]);

  return (
    <div
      ref={mountRef}
      className="w-80 h-80 rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
};

// Star Field component
const StarField: FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    if (!mountRef.current) return;
    
    const currentMount = mountRef.current; // Store ref value in a variable

    renderer.setSize(window.innerWidth, window.innerHeight);
    currentMount.appendChild(renderer.domElement);

    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5,
      transparent: true,
      opacity: 0.8,
    });

    const starsCount = 1500;
    const starsPositions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i += 3) {
      starsPositions[i] = (Math.random() - 0.5) * 100;
      starsPositions[i + 1] = (Math.random() - 0.5) * 100;
      starsPositions[i + 2] = (Math.random() - 0.5) * 100;
    }

    starsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starsPositions, 3)
    );
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    camera.position.z = 20;

    let animationFrameId: number;
    const animate = () => {
      stars.rotation.y += 0.0003;
      stars.rotation.x += 0.0001;

      renderer.render(scene, camera);
      animationFrameId = window.requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(animationFrameId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      starsGeometry.dispose();
      starsMaterial.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
};

// Main Section: The Trending Service
const TheTrendingService: FC = () => {
  return (
    <section className="py-20 px-4 sm:px-8 bg-gradient-to-b from-[#0a0a2a] to-[#0f0f40] text-white relative z-10 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <StarField />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <ThreeDImage imageUrl="/images/background[1].jpg" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <h2 className="text-4xl sm:text-4xl font-extrabold mb-4 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 bg-clip-text text-transparent uppercase tracking-wide drop-shadow-lg">
            THE TRENDING SERVICE
          </h2>

          <div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-800 
              p-6 rounded-xl shadow-2xl 
              hover:shadow-purple-400/60 
              hover:ring-4 hover:ring-purple-400/40 
              transition-all duration-500 ease-in-out mb-6 backdrop-blur-sm bg-opacity-80"
            >
              <h3 className="text-2xl font-bold mb-2 text-white flex justify-center hover:text-pink-500">
                AI Agent Creation
              </h3>
              <p className="text-gray-100">
                We build intelligent AI agents tailored for your business — automating support, generating leads, and boosting productivity with smart, real-time decisions.
              </p>
            </motion.div>

            <Link href="/agents">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold rounded-full shadow-lg transition-all duration-300"
              >
                Get your AI Agent now
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TheTrendingService;