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
      basePath: '/promotion-campaign-demo',
      assetPrefix: '/promotion-campaign-demo/',
    } : {}),
  };
  
  export default nextConfig;