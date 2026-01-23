"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Container from '@/components/layout/container';
import { ABOUT_ME_DATA } from '@/../data/home/data';
import { getEmbedUrl, getVideoThumbnail } from '@/feat/archive/utils/video-utils';

const AboutMe = () => {
  const [selectedId, setSelectedId] = useState<string>(ABOUT_ME_DATA[0].id);

  const selectedItem = ABOUT_ME_DATA.find(item => item.id === selectedId) || ABOUT_ME_DATA[0];

  return (
    <section className="w-full py-24 bg-white">
      <Container>
        <h2 className="text-center font-cormorant text-2xl italic mb-12 text-gray-800">
          About me
        </h2>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {ABOUT_ME_DATA.map((item) => {
            const embedUrl = item.videoUrl ? getEmbedUrl([item.videoUrl]) : null;
            const thumbnailUrl = item.videoUrl ? getVideoThumbnail([item.videoUrl]) : null;
            const isSelected = selectedId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`relative aspect-[16/9] bg-gray-100 overflow-hidden cursor-pointer transition-all duration-500 ${isSelected ? 'ring-2 ring-black ring-offset-4 opacity-100' : 'opacity-70 hover:opacity-100'
                  }`}
              >
                {/* 선택된 비디오만 재생 */}
                {isSelected && embedUrl ? (
                  <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
                    <iframe
                      src={`${embedUrl}?autoplay=1&muted=1&loop=1&background=1`}
                      title={item.title}
                      className="absolute border-0 pointer-events-none"
                      style={{
                        top: '50%',
                        left: '50%',
                        width: '300%',
                        height: '300%',
                        transform: 'translate(-50%, -50%)',
                      }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    {/* 클릭 이벤트를 위한 투명 오버레이 */}
                    <div className="absolute inset-0 w-full h-full bg-transparent cursor-pointer" />
                  </div>
                ) : thumbnailUrl ? (
                  /* 선택 안 된 비디오는 썸네일 표시 */
                  <div className="absolute inset-0 w-full h-full bg-black">
                    <Image
                      src={thumbnailUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    {/* 재생 아이콘 오버레이 */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/10 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-black border-b-[8px] border-b-transparent ml-1" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400 bg-gray-200">
                    [ Image: {item.id} ]
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Content Box */}
        <div className="bg-[#f8f8f8] py-20 px-8 text-center min-h-[400px] flex flex-col justify-center">
          <div className="inline-flex w-fit max-w-full items-center justify-center bg-black text-white px-5 py-2.5 mb-8 mx-auto">
            <h3 className="text-lg md:text-xl font-bold tracking-[0.2em] uppercase font-inter">
              {selectedItem.title}
            </h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-2">
            {selectedItem.description.map((line, index) => (
              <p
                key={index}
                className="text-gray-800 leading-relaxed font-cormorant text-lg md:text-xl"
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutMe;
