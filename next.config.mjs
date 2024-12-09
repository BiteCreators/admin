import {NextFederationPlugin} from '@module-federation/nextjs-mf'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false,
  },
  i18n: {
    defaultLocale: "ru",
    locales: ["en", "ru"]
  },
  reactStrictMode: true,
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
  transpilePackages: ["@packages/shared"],
  webpack: (config, options) => {
    const {isServer} = options

    config.plugins.push(
      new NextFederationPlugin({
        exposes: {
          './payments-page': './src/pages/payments/PaymentsPage.tsx',
          './posts-page': './src/pages/posts/PostsPage.tsx',
          './providers': './src/application/providers/Providers.tsx',
          './sign-in-page': './src/pages/auth/sign-in/SingIn.tsx',
          './single-user-page': './src/pages/users/[id]/SingleUserPage.tsx',
          './statistics-page': './src/pages/statistics/StatisticsPage.tsx',
          './users-page': './src/pages/users/UsersPage.tsx',
        },
        filename: 'static/chunks/remoteEntry.js',
        name: 'admin',
        remotes: {
          host: `host@http://localhost:3000/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`
        },
      })
    )

    return config
  },
};

export default nextConfig;
