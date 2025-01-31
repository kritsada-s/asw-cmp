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
    // Conditionally apply trailingSlash, basePath, and assetPrefix
    ...(process.env.IS_EXPORT === 'true' ? {
      trailingSlash: true,
      basePath: '/easylife',
      assetPrefix: '/easylife/',
    } : {}),
  };
  
  export default nextConfig;