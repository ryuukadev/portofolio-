/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei", "@react-three/rapier", "meshline"],
  images: { unoptimized: false, remotePatterns: [{ protocol: "https", hostname: "**" }] },
  experimental: { optimizePackageImports: ["lucide-react", "framer-motion"] },
};
export default nextConfig;
