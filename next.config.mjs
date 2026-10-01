/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei", "@react-three/rapier", "meshline"],
  images: { unoptimized: false, remotePatterns: [{ protocol: "https", hostname: "**" }] },
  experimental: { optimizePackageImports: ["lucide-react", "framer-motion"] },
  webpack(config) {
    config.module.rules.push({ test: /\.svg$/i, issuer: /\.[tj]sx?$/, use: ["@svgr/webpack"] });
    // .glb — biar bisa di-import kalau diperlukan nanti
    config.module.rules.push({ test: /\.glb$/i, type: "asset/resource" });
    return config;
  },
};
export default nextConfig;
