import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  images: { unoptimized: true },
  async redirects() {
    return [
      { source: "/hairline-technique", destination: "/method", permanent: false },
      { source: "/services/hair-transplant", destination: "/care/hair-restoration", permanent: false },
      { source: "/services/skin-rejuvenation", destination: "/care/skin", permanent: false },
      { source: "/services/anti-aging", destination: "/care/face", permanent: false },
      { source: "/services/facials-spa", destination: "/care/skin", permanent: false },
      { source: "/services/semi-permanent-makeup", destination: "/care/colour", permanent: false },
      { source: "/services/skin-whitening", destination: "/services/acne-melasma", permanent: false },
    ];
  },
};

export default nextConfig;
