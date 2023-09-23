/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["assets.coingecko.com", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
