/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost','stogly.com'],
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'localhost',
          },
        ],
        permanent: true,
        destination: '/home',
      },
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'stogly.com',
          },
        ],
        permanent: true,
        destination: '/home',
      },
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'www.stogly.com',
          },
        ],
        permanent: true,
        destination: '/home',
      },
    ]
}
}

module.exports = nextConfig

