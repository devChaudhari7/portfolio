import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // live profile avatars pulled from the GitHub / LeetCode APIs
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "assets.leetcode.com" },
    ],
  },
};

export default nextConfig;
