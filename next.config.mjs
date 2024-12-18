/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        esmExternals: "loose"
    },
    i18n: {
        defaultLocale: "ru",
        locales: ["en", "ru"]
    },
};

export default nextConfig;