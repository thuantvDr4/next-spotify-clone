/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xwcjzikhrkmsrljhiwyz.supabase.co",
      },
    ],
  },
};

export default nextConfig;
