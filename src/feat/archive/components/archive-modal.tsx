"use client";

import React from "react";
import { X } from "lucide-react";
import { IArchiveItem } from "@/feat/archive/constants/realdata";
import { getEmbedUrl } from "@/feat/archive/utils/video-utils";

/**
 * @interface IProps
 * @description ArchiveModal 컴포넌트의 Props 인터페이스
 */
interface IProps {
  item: IArchiveItem;
  onClose: () => void;
}

/**
 * @function ArchiveModal
 * @description 아카이브 항목의 상세 정보와 비디오를 보여주는 모달 컴포넌트
 */
export default function ArchiveModal({ item, onClose }: IProps) {
  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-4 md:p-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl md:max-w-4xl bg-black border border-white/10 shadow-2xl overflow-y-auto max-h-[90vh] flex flex-col custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Content Area (Title & Info) */}
        <div className="relative p-4 md:p-6 bg-[#0a0a0a] text-white shrink-0">
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 z-20 text-white hover:text-black hover:bg-white transition-colors cursor-pointer p-1 rounded-sm"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2} />
          </button>

          <h3 className="text-lg md:text-xl font-medium mb-1 pr-10">
            {item.title}
          </h3>
          
          <p className="text-xs md:text-sm text-white/60 leading-normal font-light whitespace-pre-line">
            {item.description || item.rawText}
          </p>
          
          {item.notes && (
            <p className="text-[10px] md:text-[11px] text-yellow-500/80 mt-1 italic">
              Note: {item.notes}
            </p>
          )}
        </div>

        {/* Video Area */}
        <div className="w-full aspect-video flex items-center justify-center bg-black shrink-0">
          {getEmbedUrl(item.links) ? (
            <iframe
              src={getEmbedUrl(item.links)!}
              title={item.title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="text-white/50 font-cormorant italic text-lg px-4 text-center">
              No preview video available for this item.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
