import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/ddvc5vscj/**", // tu carpeta/ID en Cloudinary
      },
    ],
  },
};

export default nextConfig;
