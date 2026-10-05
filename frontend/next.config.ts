import type { NextConfig } from "next";

const backendUrl = process.env.BACKEND_URL || "http://localhost:4000";

const nextConfig: NextConfig = {
  // Proxy AI API calls to the separate backend server
  async rewrites() {
    return [
      {
        source: "/api/ai/:path*",
        destination: `${backendUrl}/api/ai/:path*`,
      },
    ];
  },
};

export default nextConfig;
