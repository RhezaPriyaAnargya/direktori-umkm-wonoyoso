"use client";

import Link from "next/link";
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
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                scrolled
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white/20 text-white backdrop-blur-sm"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625A1.875 1.875 0 013.75 19.875v-6.198a.75.75 0 01.091-.086L12 5.432z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className={`text-base font-bold leading-tight transition-colors duration-300 ${scrolled ? "text-text-primary" : "text-white"}`}>
                UMKM Wonoyoso
              </span>
              <span className={`text-[10px] font-medium leading-tight transition-colors duration-300 ${scrolled ? "text-text-muted" : "text-white/70"}`}>
                Direktori Usaha Dusun
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ${
                scrolled
                  ? "text-text-secondary hover:text-primary hover:bg-primary/5"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              Beranda
            </Link>
            <a
              href="#katalog"
              className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ${
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
