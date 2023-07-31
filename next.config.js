/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  compiler: { styledComponents: true },
  images: {
    domains: ["flowbite.s3.amazonaws.com", "firebasestorage.googleapis.com"],
  },
  async redirects() {
    return [
      {
        source: '/smartshare/:id',
        destination: '/api/smartshare/:id',
        permanent: false,
      },
    ]
  },
};

module.exports = nextConfig;
