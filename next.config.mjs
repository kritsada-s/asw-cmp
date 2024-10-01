/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    basePath: '/promotion-campaign',
    assetPrefix: '/promotion-campaign/',
    images: {
        unoptimized: true,
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'assetwise.co.th',
            }
        ]
    },
};

export default nextConfig;
