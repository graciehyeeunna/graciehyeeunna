'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface IHeaderProps {
  className?: string;
}

interface INavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: INavItem[] = [
  { label: 'Archive', href: '/archive' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/contact' },
];

/**
 * 80px 높이의 공용 헤더 컴포넌트입니다.
 * 왼쪽: 이메일, 중앙: 이름(로고), 오른쪽: 메뉴 구조를 가집니다.
 * 반응형 대응: 모바일에서는 이메일 숨김 및 로고/메뉴 배치 최적화.
 * 현재 경로에 따라 활성화된 메뉴의 스타일을 변경하여 UX를 개선했습니다.
 */
const Header = ({ className = "" }: IHeaderProps) => {
  const pathname = usePathname();

  return (
    <header className={`h-[80px] w-full border-b border-gray-100 flex items-center px-6 md:px-[120px] bg-white sticky top-0 z-50 ${className}`}>
      <div className="grid grid-cols-2 md:grid-cols-3 items-center w-full max-w-[1920px] mx-auto">
        {/* Left: Email - Hidden on mobile, shown on md and up */}
        <div className="hidden md:flex justify-start">
          <a
            href="mailto:gracie.hna@gmail.com"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors no-underline font-inter"
          >
            gracie.hna@gmail.com
          </a>
        </div>

        {/* Center: Name (Logo) - Left aligned on mobile, center on md */}
        <div className="flex justify-start md:justify-center">
          <Link href="/" className="text-lg md:text-xl font-bold italic tracking-tight text-gray-900 no-underline font-cormorant">
            Hyeeun Gracie Na
          </Link>
        </div>

        {/* Right: Navigation */}
        <nav className="flex justify-end">
          <ul className="flex items-center gap-6 md:gap-10 text-xs md:text-sm font-medium list-none m-0 p-0">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`transition-colors no-underline font-inter ${isActive
                      ? 'text-gray-800'
                      : 'text-gray-400 hover:text-gray-900'
                      }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
