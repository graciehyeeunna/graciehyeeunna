"use client";

import Container from "@/components/layout/container";
import { Download, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { useState } from "react";

/**
 * ResumePage 컴포넌트
 * 이력서를 이미지 또는 PDF 형식으로 보여주는 페이지입니다.
 * 2장의 페이지를 슬라이드 형태로 제공하며, 크게 보기 기능을 포함합니다.
 */
const ResumePage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const totalPages = 2;

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };

  return (
    <section className="w-full">
      <Container>
        <div className="flex flex-col items-center max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-2 animate-slide-up">
            <h1 className="font-cormorant font-bold text-gray-900" style={{ fontSize: "30px" }}>
              Resume
            </h1>
          </div>

          {/* Resume Content (Slider) */}
          <div className="w-full flex justify-center relative animate-slide-up group" style={{ animationDelay: "0.1s" }}>
            <div className="relative w-fit">
              {/* Header Info: Page Indicator & Download Link & Zoom */}
              <div className="absolute -top-10 left-0 right-0 flex items-center justify-between text-xs font-inter text-gray-400">
                <span>{currentPage + 1} / {totalPages}</span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsZoomed(true)}
                    className="flex items-center gap-1.5 hover:text-black transition-colors"
                  >
                    <Maximize2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>View Larger</span>
                  </button>
                  <a
                    href="/resume.pdf"
                    download
                    className="flex items-center gap-1.5 hover:text-black transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>Download</span>
                  </a>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 md:-mx-16 z-10 pointer-events-none">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                  className={`p-2 rounded-full bg-white/80 shadow-sm border border-gray-100 transition-all pointer-events-auto ${currentPage === 0 ? "opacity-0 cursor-default" : "opacity-100 hover:bg-gray-50"
                    }`}
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages - 1}
                  className={`p-2 rounded-full bg-white/80 shadow-sm border border-gray-100 transition-all pointer-events-auto ${currentPage === totalPages - 1 ? "opacity-0 cursor-default" : "opacity-100 hover:bg-gray-50"
                    }`}
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
                </button>
              </div>

              {/* Resume Image / Placeholder */}
              <div className="h-[660px] aspect-[1/1.414] bg-gray-50 border border-gray-100 rounded-sm shadow-sm flex items-center justify-center overflow-hidden transition-all duration-300">
                {currentPage === 0 ? (
                  <div className="w-full h-full flex items-center justify-center fade-in">
                    <span className="text-gray-400 font-inter text-sm italic">Resume Page 1 (Image/PDF Placeholder)</span>
                    {/* 
                  <Image 
                    src={ResumeImg1} 
                    alt="Resume Page 1" 
                    fill
                    className="object-contain"
                    priority
                  /> 
                  */}
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center fade-in">
                    <span className="text-gray-400 font-inter text-sm italic">Resume Page 2 (Image/PDF Placeholder)</span>
                    {/* 
                  <Image 
                    src={ResumeImg2} 
                    alt="Resume Page 2" 
                    fill
                    className="object-contain"
                  /> 
                  */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ResumePage;
