"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import { IArchiveItem } from "@/feat/archive/constants/realdata";
import {
  getPreviewEmbedUrl,
  getVideoThumbnail,
} from "@/feat/archive/utils/video-utils";

/** 비디오 재생 전 대기 시간 (ms) */
const HOVER_DELAY_MS = 3000;

/**
 * @interface IProps
 * @description ArchiveList 컴포넌트의 Props 인터페이스
 */
interface IProps {
  items: IArchiveItem[];
  onItemClick: (item: IArchiveItem) => void;
}

/**
 * @function ArchiveList
 * @description 아카이브 항목들을 리스트 형태로 렌더링하는 컴포넌트
 */
export default function ArchiveList({ items, onItemClick }: IProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [failedThumbnails, setFailedThumbnails] = useState<Set<string>>(
    new Set()
  );

  // 3초 후 비디오 재생 시작
  useEffect(() => {
    if (!hoveredId) {
      setPlayingId(null);
      return;
    }

    const timer = setTimeout(() => {
      setPlayingId(hoveredId);
    }, HOVER_DELAY_MS);

    return () => clearTimeout(timer);
  }, [hoveredId]);

  // 썸네일 로드 실패 핸들러
  const handleThumbnailError = useCallback((itemId: string) => {
    setFailedThumbnails((prev) => new Set(prev).add(itemId));
  }, []);

  if (items.length === 0) {
    return (
      <div className="py-20 text-center text-gray-400 font-cormorant italic">
        No records in this category yet.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col">
        {items.map((item, index) => {
          const previewUrl = getPreviewEmbedUrl(item.links);
          const thumbnailUrl = getVideoThumbnail(item.links);
          const isHovered = hoveredId === item.id;
          const isPlaying = playingId === item.id;
          const isThumbnailFailed = failedThumbnails.has(item.id);

          return (
            <div
              key={item.id}
              onClick={() => onItemClick(item)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group w-full flex flex-col md:flex-row items-stretch justify-between border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors px-4"
            >
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10 w-full">
                {/* Index Number */}
                <span className="text-[10px] text-gray-300 font-mono tracking-tighter min-w-[30px] hidden md:block py-5">
                  {(index + 1).toString().padStart(2, "0")}
                </span>

                {/* Role / Preview Wrapper */}
                <div className="md:w-[160px] self-stretch flex items-center shrink-0 relative">
                  {/* Role (Visible by default, hidden on hover) */}
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold group-hover:opacity-0 transition-opacity duration-300">
                    {item.role}
                  </span>

                  {/* Preview (Hidden by default, visible on hover) */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-start group-hover:scale-105">
                    <div className="relative w-full h-full overflow-hidden shadow-sm border-x border-gray-100 bg-black">
                      {/* 3초 이상 호버 시 비디오 재생 */}
                      {isPlaying && previewUrl ? (
                        <iframe
                          src={previewUrl}
                          title={`Preview: ${item.title}`}
                          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                          allow="autoplay; fullscreen"
                          loading="lazy"
                        />
                      ) : thumbnailUrl && !isThumbnailFailed ? (
                        /* 호버 시 썸네일 이미지 표시 */
                        <Image
                          src={thumbnailUrl}
                          alt={item.title}
                          fill
                          className="object-cover"
                          unoptimized
                          onError={() => handleThumbnailError(item.id)}
                        />
                      ) : (
                        /* 썸네일 없거나 로드 실패 시 */
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-[8px] text-gray-400 italic">
                          No Preview
                        </div>
                      )}

                      {/* 호버 중 비디오 로딩 인디케이터 (3초 대기 중) */}
                      {isHovered &&
                        !isPlaying &&
                        previewUrl &&
                        thumbnailUrl &&
                        !isThumbnailFailed && (
                          <div className="absolute bottom-1 right-1 flex items-center gap-1 bg-black/60 rounded px-1.5 py-0.5">
                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                            <span className="text-[8px] text-white font-mono">
                              Loading...
                            </span>
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                {/* Info Container */}
                <div className="flex flex-col text-center md:text-left flex-1 py-5">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <span className="text-sm md:text-base font-medium text-gray-800 group-hover:text-black transition-colors">
                      {item.title}
                    </span>

                    {/* Badge - 'star'인 경우에만 노출 (green은 정렬 순위용으로만 사용) */}
                    {item.badge === "star" && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider shrink-0 bg-black text-white">
                        <Star className="w-2.5 h-2.5 fill-white" />
                      </span>
                    )}
                  </div>

                  {/* Venue & Room */}
                  {item.venue && (
                    <span className="text-[11px] text-gray-400 mt-0.5">
                      {item.venue} {item.room ? `(${item.room})` : ""}
                    </span>
                  )}
                </div>

                {/* Date */}
                <span className="text-[11px] text-gray-400 md:ml-auto font-mono py-5">
                  {item.date || "N/A"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
