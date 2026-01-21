"use client";

import Container from "@/components/layout/container";
import {
  ARCHIVE_DATA,
  IArchiveItem,
} from "@/feat/archive/constants/realdata";
import { useMemo, useState } from "react";
import ArchiveList from "@/feat/archive/components/archive-list";
import ArchiveModal from "@/feat/archive/components/archive-modal";

// 카테고리 타입 정의 (realdata.ts의 카테고리 기반)
type TArchiveCategory = "Full" | string;

const ArchivePage = () => {
  // 카테고리 목록 추출
  const categories = useMemo<TArchiveCategory[]>(
    () => ["Full", ...ARCHIVE_DATA.categories.map((c) => c.categoryName)],
    []
  );

  const [activeCategory, setActiveCategory] = useState<TArchiveCategory>("Full");
  const [selectedItem, setSelectedItem] = useState<IArchiveItem | null>(null);

  // 정렬 및 필터링 로직
  const filteredItems = useMemo(() => {
    let items: IArchiveItem[] = [];

    if (activeCategory === "Full") {
      items = ARCHIVE_DATA.categories.flatMap((c) => c.items);
    } else {
      const category = ARCHIVE_DATA.categories.find(
        (c) => c.categoryName === activeCategory
      );
      items = category ? [...category.items] : [];
    }

    // 우선순위 정렬: star(0) > green(1) > null(2)
    return items.sort((a, b) => {
      const priority = { star: 0, green: 1, null: 2 };
      const aPriority = priority[a.badge || "null"];
      const bPriority = priority[b.badge || "null"];
      return aPriority - bPriority;
    });
  }, [activeCategory]);

  return (
    <section className="w-full py-12 bg-white">
      <Container>
        {/* Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm text-gray-500 font-cormorant italic mb-12 border-b border-gray-100 pb-4">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`pb-2 transition-all text-base md:text-lg whitespace-nowrap ${activeCategory === category
                ? "text-gray-900 border-b-2 border-gray-900 font-bold"
                : "border-b-2 border-transparent hover:text-gray-700"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* List 컴포넌트 */}
        <ArchiveList items={filteredItems} onItemClick={setSelectedItem} />
      </Container>

      {/* Modal 컴포넌트 */}
      {selectedItem && (
        <ArchiveModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </section>
  );
};

export default ArchivePage;
