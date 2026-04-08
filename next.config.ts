import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Add any legacy URL redirects here
      // { source: '/old-path', destination: '/new-path', permanent: true },
    ];
  },
};

export default nextConfig;
