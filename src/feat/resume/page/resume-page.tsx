"use client";

import Container from "@/components/layout/container";
import { Download, Maximize2, X } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { RESUME_IMAGES, type IResumeImage } from "@/../data/resume/data";

/**
 * ResumePage 컴포넌트
 * 이력서와 자격증을 나란히 양문형으로 보여주는 페이지입니다.
 * 2개의 이미지를 동시에 표시하며, 각각 크게 보기 기능을 포함합니다.
 */
const ResumePage = () => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<IResumeImage | null>(null);

  const handleDownload = async (imageData: IResumeImage) => {
    try {
      const response = await fetch(imageData.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `${imageData.title.toLowerCase()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the object URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleZoom = (imageData: IResumeImage) => {
    setZoomedImage(imageData);
    setIsZoomed(true);
  };

  // Handle keyboard events for zoomed modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isZoomed && event.key === 'Escape') {
        setIsZoomed(false);
      }
    };

    if (isZoomed) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isZoomed]);

  return (
    <section className="w-full py-4 md:py-0">
      <Container>
        <div className="flex flex-col items-center mx-auto px-2 sm:px-4">
          {/* Resume & Certificate Section */}
          <div className="w-full max-w-7xl mx-auto flex flex-col gap-4 md:gap-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>

            {/* Documents Container */}
            <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-stretch justify-center">

              {/* Resume Section */}
              <div className="flex flex-col gap-3 md:gap-4 flex-1 w-full lg:max-w-lg">
                {/* Resume Header & Controls */}
                <div className="flex items-center justify-between">
                  <h2 className="font-cormorant font-semibold text-gray-800 text-lg md:text-xl">Resume</h2>
                  <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-xs font-inter text-gray-400">
                    <button
                      onClick={() => handleZoom(RESUME_IMAGES[0])}
                      className="flex items-center gap-1 sm:gap-1.5 cursor-pointer hover:text-black transition-colors"
                      title="View Larger"
                    >
                      <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" strokeWidth={1.5} />
                      <span className="hidden xs:inline">View Larger</span>
                      <span className="xs:hidden">View</span>
                    </button>
                    <button
                      onClick={() => handleDownload(RESUME_IMAGES[0])}
                      className="flex items-center gap-1 sm:gap-1.5 hover:text-black transition-colors cursor-pointer"
                      title="Download Resume"
                    >
                      <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5" strokeWidth={1.5} />
                      <span>Download</span>
                    </button>
                  </div>
                </div>

                {/* Resume Image */}
                <div
                  className="w-full aspect-[1/1.414] bg-gray-50 border border-gray-100 rounded-sm shadow-sm flex items-center justify-center overflow-hidden transition-all duration-300 relative cursor-pointer hover:shadow-md"
                  onClick={() => handleZoom(RESUME_IMAGES[0])}
                >
                  <Image
                    src={RESUME_IMAGES[0].src}
                    alt={RESUME_IMAGES[0].alt}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Certificate Section */}
              <div className="flex flex-col gap-3 md:gap-4 flex-1 w-full lg:max-w-lg">
                {/* Certificate Header & Controls */}
                <div className="flex items-center justify-between">
                  <h2 className="font-cormorant font-semibold text-gray-800 text-lg md:text-xl">Certificate</h2>
                  <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-xs font-inter text-gray-400">
                    <button
                      onClick={() => handleZoom(RESUME_IMAGES[1])}
                      className="flex items-center gap-1 sm:gap-1.5 cursor-pointer hover:text-black transition-colors"
                      title="View Larger"
                    >
                      <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" strokeWidth={1.5} />
                      <span className="hidden xs:inline">View Larger</span>
                      <span className="xs:hidden">View</span>
                    </button>
                    <button
                      onClick={() => handleDownload(RESUME_IMAGES[1])}
                      className="flex items-center gap-1 sm:gap-1.5 hover:text-black transition-colors cursor-pointer"
                      title="Download Certificate"
                    >
                      <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5" strokeWidth={1.5} />
                      <span>Download</span>
                    </button>
                  </div>
                </div>

                {/* Certificate Image */}
                <div
                  className="w-full aspect-[1/1.414] bg-gray-50 border border-gray-100 rounded-sm shadow-sm flex items-center justify-center overflow-hidden transition-all duration-300 relative cursor-pointer hover:shadow-md"
                  onClick={() => handleZoom(RESUME_IMAGES[1])}
                >
                  <Image
                    src={RESUME_IMAGES[1].src}
                    alt={RESUME_IMAGES[1].alt}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </Container>

      {/* Zoomed Modal Overlay */}
      {isZoomed && zoomedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-2 sm:p-4 md:p-10 backdrop-blur-sm animate-fade-in cursor-zoom-out"
          onClick={() => setIsZoomed(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-3 right-3 sm:top-6 sm:right-6 text-white/50 hover:text-white transition-colors z-[110] p-2"
            aria-label="Close zoomed view"
          >
            <X className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.2} />
          </button>

          {/* Zoomed Content Container */}
          <div
            className="relative w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] h-auto max-h-[90vh] aspect-[1/1.414] bg-white shadow-2xl overflow-hidden flex items-center justify-center cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={zoomedImage.src}
              alt={`${zoomedImage.title} Full View`}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ResumePage;
