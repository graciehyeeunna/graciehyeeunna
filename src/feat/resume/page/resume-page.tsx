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
        <div className="flex flex-col items-center max-w-4xl mx-auto space-y-10">
          {/* Page Header */}
          <div className="text-center animate-slide-up">
            <h1 className="font-cormorant font-bold text-gray-900 text-[30px] leading-tight">
              Resume
            </h1>
          </div>

          {/* Resume Slider Section */}
          <div className="w-full max-w-fit mx-auto flex flex-col gap-4 animate-slide-up relative" style={{ animationDelay: "0.1s" }}>

            {/* Toolbar: Page Indicator, Zoom, Download */}
            <div className="flex items-center justify-between text-xs font-inter text-gray-400 px-1">
              <span>{currentPage + 1} / {totalPages}</span>
              <div className="flex items-center gap-5">
                <button
                  onClick={() => setIsZoomed(true)}
                  className="flex items-center gap-1.5 cursor-pointer hover:text-black transition-colors"
                  title="View Larger"
                >
                  <Maximize2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>View Larger</span>
                </button>
                <a
                  href="/resume.pdf"
                  download
                  className="flex items-center gap-1.5 hover:text-black transition-colors"
                  title="Download PDF"
                >
                  <Download className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>Download</span>
                </a>
              </div>
            </div>

            {/* Resume Page Container with Navigation */}
            <div className="relative">
              {/* Navigation Buttons - Always Visible */}
              <div className="absolute inset-y-0 -left-4 -right-4 md:-left-16 md:-right-16 flex items-center justify-between z-10 pointer-events-none">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                  className={`p-2 rounded-full bg-white/80 shadow-sm border border-gray-100 transition-all pointer-events-auto
                    ${currentPage === 0 ? "opacity-30 cursor-not-allowed" : "opacity-100 hover:bg-gray-50"}`}
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages - 1}
                  className={`p-2 rounded-full bg-white/80 shadow-sm border border-gray-100 transition-all pointer-events-auto
                    ${currentPage === totalPages - 1 ? "opacity-30 cursor-not-allowed" : "opacity-100 hover:bg-gray-50"}`}
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
                </button>
              </div>

              {/* Page Content */}
              <div className="h-[660px] aspect-[1/1.414] bg-gray-50 border border-gray-100 rounded-sm shadow-sm flex items-center justify-center overflow-hidden transition-all duration-300">
                <div key={currentPage} className="w-full h-full flex items-center justify-center fade-in">
                  <span className="text-gray-400 font-inter text-sm italic">
                    Resume Page {currentPage + 1} (Placeholder)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Zoomed Modal Overlay */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 md:p-10 backdrop-blur-sm animate-fade-in cursor-zoom-out"
          onClick={() => setIsZoomed(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110] p-2"
            aria-label="Close zoomed view"
          >
            <X className="w-8 h-8" strokeWidth={1.2} />
          </button>

          {/* Zoomed Content Container */}
          <div
            className="relative h-full aspect-[1/1.414] bg-white shadow-2xl overflow-hidden flex items-center justify-center cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div key={currentPage} className="w-full h-full flex items-center justify-center fade-in">
              <span className="text-gray-400 font-inter text-lg italic px-10 text-center">
                Resume Page {currentPage + 1} (Large Preview)
              </span>
              {/* 
              <Image 
                src={currentPage === 0 ? ResumeImg1 : ResumeImg2} 
                alt={`Resume Page ${currentPage + 1} Full`}
                fill
                className="object-contain"
                priority
              /> 
              */}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ResumePage;
