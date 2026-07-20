"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 sm:h-16">
          {/* Logo — compact on mobile */}
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2 group shrink-0 min-w-0">
            <div className="w-7 h-7 sm:w-12 sm:h-12 flex-shrink-0 flex items-center justify-center transition-all duration-300 drop-shadow-md">
              <Image 
                src="/images/logo-wonosobo.png" 
                alt="Logo Wonosobo" 
                width={56} 
                height={56} 
                style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className={`text-xs sm:text-base font-bold leading-tight transition-colors duration-300 truncate ${scrolled ? "text-text-primary" : "text-white"}`}>
                <span className="sm:hidden">Wonoyoso</span>
                <span className="hidden sm:inline">UMKM Wonoyoso</span>
              </span>
              {/* Hide subtitle on mobile to save space */}
              <span className={`hidden sm:block text-[10px] font-medium leading-tight transition-colors duration-300 ${scrolled ? "text-text-muted" : "text-white/70"}`}>
                Direktori Usaha Dusun
              </span>
            </div>
          </Link>

          {/* Nav links — compact on mobile, full on desktop */}
          <div className="flex items-center gap-0.5 sm:gap-3">
            <Link
              href="/"
              className={`text-[11px] sm:text-sm font-medium px-2 py-1 sm:px-4 sm:py-2 rounded-full transition-all duration-300 ${
                scrolled
                  ? "text-text-secondary hover:text-primary hover:bg-primary/5"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              Beranda
            </Link>
            <Link
              href="/berita"
              className={`text-[11px] sm:text-sm font-medium px-2 py-1 sm:px-4 sm:py-2 rounded-full transition-all duration-300 ${
                scrolled
                  ? "text-text-secondary hover:text-primary hover:bg-primary/5"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              Berita
            </Link>
            <a
              href="#katalog"
              className={`text-[11px] sm:text-sm font-semibold px-2 py-1 sm:px-4 sm:py-2 rounded-full transition-all duration-300 whitespace-nowrap ${
                scrolled
                  ? "bg-primary text-white hover:bg-primary-dark shadow-sm"
                  : "bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm"
              }`}
            >
              Jelajahi
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
