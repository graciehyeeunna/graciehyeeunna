/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // GitHub Pages 하위 경로 배포를 위한 설정
  basePath: "/graciehyeeunna",
  assetPrefix: "/graciehyeeunna",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
