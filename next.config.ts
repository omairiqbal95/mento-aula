import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/",
        destination: "/inicio",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
