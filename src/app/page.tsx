"use client";

import Container from "@/components/layout/container";
import Link from "next/link";
import AboutMe from "@/feat/aboutMe/page/aboutMe";
import { useState } from "react";
import SplashScreen from "@/feat/landing/components/splash-screen";
import Image from "next/image";
import { getEmbedUrl } from "@/feat/archive/utils/video-utils";
import { ROLE_DATA, type TRole } from "@/../data/home/iam/data";

export default function Home() {
  const [activeRole, setActiveRole] = useState<TRole>("live-sound");
  const [showSplash, setShowSplash] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(false);

  const currentRole = ROLE_DATA.find(role => role.id === activeRole);
  const embedUrl = currentRole ? getEmbedUrl([currentRole.videoUrl]) : null;

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleCardHover = (hovered: boolean) => {
    setHoveredCard(hovered);
  };

  const handleRoleChange = (roleId: TRole) => {
    setActiveRole(roleId);
    setIsFlipped(false); // 역할 변경 시 카드를 앞면으로 리셋
  };

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <main className={`min-h-screen bg-white transition-opacity duration-700 ${showSplash ? "opacity-0" : "opacity-100"}`}>
        <Container className="flex flex-col items-center">
          {/* Job Roles Selector */}
          <section className="w-full mb-10 md:mb-20">
            <ul className="flex flex-wrap justify-center items-center gap-4 md:gap-12 text-xs md:text-sm text-gray-400 font-medium list-none p-0 m-0">
              <li className="text-gray-900 italic">I'm a</li>
              {ROLE_DATA.map((role) => (
                <li
                  key={role.id}
                  onClick={() => handleRoleChange(role.id)}
                  className={`transition-colors cursor-pointer italic ${activeRole === role.id
                    ? "text-gray-900 font-bold border-b-2 border-gray-900 pb-1"
                    : "hover:text-gray-600"
                    }`}
                >
                  {role.label}
                </li>
              ))}
            </ul>
          </section>

          {/* Main Visual Content */}
          <section className="relative w-full max-w-4xl flex flex-col items-center gap-16">
            <div
              className="relative w-full aspect-[3/4] max-w-md perspective-1000 cursor-pointer"
              onClick={handleCardClick}
              onMouseEnter={() => handleCardHover(true)}
              onMouseLeave={() => handleCardHover(false)}
            >
              <div className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* Front Side - Image/Placeholder */}
                <div className="absolute inset-0 w-full h-full bg-black rounded-sm backface-hidden flex items-center justify-center overflow-hidden">
                  {currentRole?.thumbnail ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={currentRole.thumbnail}
                        alt={currentRole.title}
                        fill
                        className="object-contain"
                      />
                      {hoveredCard && (
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300">
                          <span className="text-white text-sm font-medium">Click to see video</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center p-8">
                      <div className="w-24 h-24 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-gray-500 text-2xl">🎵</span>
                      </div>
                      <h3 className="text-lg font-medium text-gray-700 mb-2">
                        {currentRole?.label}
                      </h3>
                      <p className="text-sm text-gray-500 italic">
                        Click to see video
                      </p>
                      {hoveredCard && (
                        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center transition-opacity duration-300">
                          <span className="text-white text-sm font-medium">Click to flip</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Back Side - Video */}
                <div className="absolute inset-0 w-full h-full bg-black rounded-sm backface-hidden rotate-y-180 overflow-hidden">
                  {currentRole && (
                    <div className="relative w-full h-full">
                      {/* Video Title */}
                      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-4">
                        <h3 className="text-white text-lg font-medium">{currentRole.title}</h3>
                      </div>

                      {/* Video Content */}
                      <div className="w-full h-full">
                        {embedUrl && (
                          <iframe
                            src={embedUrl}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                            allowFullScreen
                            title={currentRole.title}
                          />
                        )}
                      </div>

                      {/* Close Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsFlipped(false);
                        }}
                        className="absolute top-4 right-4 z-20 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            {currentRole?.description && (
              <div className="w-full max-w-2xl text-center px-4">
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {currentRole.description}
                </p>
              </div>
            )}

            {/* Side Link */}
            <div className="absolute right-[-60px] top-[280px] -translate-y-1/2 rotate-0 hidden lg:block">
              <Link
                href="/archive"
                className="group flex items-center gap-2 text-sm text-gray-500 no-underline hover:text-gray-900 transition-colors italic"
              >
                see more Archive
                <span className="text-lg transition-transform group-hover:translate-x-1">›</span>
              </Link>
            </div>
          </section>

          {/* Bottom Slogan */}
          <footer className="mt-32 mb-10 text-center">
            <p className="text-2xl text-gray-700 font-light italic tracking-tight font-cormorant">
              "Sound is more than just noise, it's the art of making the world truly heard."
            </p>
          </footer>
        </Container>

        {/* About Me Section */}
        <AboutMe />
      </main>
    </>
  );
}
