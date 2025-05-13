



// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
// };

// export default nextConfig;















import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ❌ Don't ignore ESLint errors — they help catch hydration issues early
    ignoreDuringBuilds: false,
  },
  typescript: {
    // ❌ Don't ignore TypeScript build errors — they can indicate SSR/client mismatches
    ignoreBuildErrors: false,
  },
  reactStrictMode: true, // ✅ Helps surface hydration mismatches early
};

export default nextConfig;
