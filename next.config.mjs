/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'assetwise.co.th',
        }
      ]
    },
    trailingSlash: true,
    basePath: '/big-match-big-move',
    assetPrefix: '/big-match-big-move/',
  };
  
  export default nextConfig;