/** @type {import('next').NextConfig} */
const nextConfig = {
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
            value: 'contenhub.com',
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
            value: 'www.contenhub.com',
          },
        ],
        permanent: true,
        destination: '/home',
      },
    ]
}
}

module.exports = nextConfig

