// icloud
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     serverActions: true,
//   },
//   images: {
//     domains: ["gfmdyluzjbwwvigwndyo.supabase.co"],
//   },
// };

// export default nextConfig;

// gmail
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fcnnpyjnziffzzhzhxte.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
