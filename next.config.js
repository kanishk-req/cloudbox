/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["flowbite.s3.amazonaws.com","firebasestorage.googleapis.com"],
  },
}

module.exports = nextConfig
