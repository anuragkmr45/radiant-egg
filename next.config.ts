import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/download/storage/v1/b/prd-storytodesign.appspot.com/o/**",
      },
    ],
  },
};

export default nextConfig;
