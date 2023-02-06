/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/posts",
        permanent: false,
      },
      {
        source: "/my-account",
        destination: "/posts",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
