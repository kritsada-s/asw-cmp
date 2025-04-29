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
    basePath: '/readytoMOVE-readytoMATCH',
    assetPrefix: '/readytoMOVE-readytoMATCH/',
  };
  
  export default nextConfig;