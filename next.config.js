// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ['localhost','stogly.com'],
//   },
//   reactStrictMode: true,
//   async redirects() {
//     return [
//       {
//         source: '/',
//         has: [
//           {
//             type: 'host',
//             value: 'localhost:3000',
//           },
//         ],
//         permanent: true,
//         destination: '/index',
//       },
//       {
//         source: '/',
//         has: [
//           {
//             type: 'host',
//             value: 'localhost:8080',
//           },
//         ],
//         permanent: true,
//         destination: '/index',
//       },
//       {
//         source: '/',
//         has: [
//           {
//             type: 'host',
//             value: 'stogly.com',
//           },
//         ],
//         permanent: true,
//         destination: '/home',
//       },
//       {
//         source: '/',
//         has: [
//           {
//             type: 'host',
//             value: 'www.stogly.com',
//           },
//         ],
//         permanent: true,
//         destination: 'https://stogly.com/home',
//       },
//       {
//         source: '/home',
//         has: [
//           {
//             type: 'host',
//             value: 'www.stogly.com',
//           },
//         ],
//         permanent: true,
//         destination: 'https://stogly.com/home',
//       }
//     ]
// }
// }

// module.exports = nextConfig

