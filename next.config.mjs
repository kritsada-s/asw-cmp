/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'assetwise.co.th',
            }
        ]
    },
};

export default nextConfig;
