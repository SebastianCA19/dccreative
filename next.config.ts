import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["http://localhost:3000", "192.168.1.14"],

  // Sin esta raíz, Turbopack toma C:\Users\savid (por el package-lock de
  // puppeteer) como workspace y falla al resolver Tailwind.
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
