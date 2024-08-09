/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "utfs.io",
            },
        ],
    },
};

export default nextConfig;

// PERMITINDO QUE IMAGENS QUE VENHAM DO SERVIDOR SEJAM REDENRIZADAS.