/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // GitHub Pages 루트 도메인(https://graciehyeeunna.github.io/) 배포를 위해 경로 설정을 제거합니다.
  basePath: "",
  assetPrefix: "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
