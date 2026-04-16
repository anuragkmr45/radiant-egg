import { networkInterfaces } from "node:os";

import type { NextConfig } from "next";

const allowedDevOrigins = Array.from(
  new Set(
    [
      "localhost",
      "127.0.0.1",
      ...Object.values(networkInterfaces())
        .flat()
        .filter((address): address is NonNullable<typeof address> => {
          return Boolean(address && address.family === "IPv4" && !address.internal);
        })
        .map((address) => address.address),
    ].filter(Boolean),
  ),
);

const nextConfig: NextConfig = {
  allowedDevOrigins,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/msgsndr/**",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/download/storage/v1/b/prd-storytodesign.appspot.com/o/**",
      },
    ],
  },
};

export default nextConfig;
