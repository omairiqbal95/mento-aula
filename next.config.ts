import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/",
        destination: "/digital-agency",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
