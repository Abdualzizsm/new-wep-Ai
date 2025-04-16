/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // إعدادات لتحسين الأداء في بيئة الإنتاج
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;