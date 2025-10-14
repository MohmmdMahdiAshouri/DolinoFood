/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode : false,
    images : {
        remotePatterns : [
            {
                protocol : "https",
                hostname : "dolino.storage.c2.liara.space",
                port : "",
                pathname : "./**"
            }
        ]
    }
};

export default nextConfig;
