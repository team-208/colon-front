/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rlwvcjygwndaidplsnnk.supabase.co',
        pathname: '/storage/v1/object/public/images/**',
      },
    ],
  },
};

module.exports = nextConfig;
