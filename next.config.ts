import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jhqfcngfejromiayacau.supabase.co",
      },
    ],
  },
};

export default nextConfig;