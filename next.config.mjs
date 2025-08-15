/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: "export",
  reactStrictMode: true,
  basePath: process.env.NODE_ENV === 'production' ? '/svghub' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/svghub' : '',
}

export default nextConfig
