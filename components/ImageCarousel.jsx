"use client";

import Image from "next/image";
import { useState, useCallback } from "react";

export default function ImageCarousel({ images, altText }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  if (!images || images.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-border p-5 sm:p-7 animate-fade-in-up opacity-0">
      <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-primary">
          <path fillRule="evenodd" d="M1 5.25A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25v9.5A2.25 2.25 0 0116.75 17H3.25A2.25 2.25 0 011 14.75v-9.5zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 00.75-.75v-2.69l-2.22-2.219a.75.75 0 00-1.06 0l-1.91 1.909-4.72-4.719a.75.75 0 00-1.06 0L2.5 11.06zm6.5-3.31a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z" clipRule="evenodd" />
        </svg>
        Galeri Produk
        <span className="ml-auto text-xs font-normal text-text-muted">
          {currentIndex + 1} / {images.length}
        </span>
      </h2>

      {/* Main Image */}
      <div className="relative group">
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-surface">
          <Image
            src={images[currentIndex]}
            alt={`${altText} - Foto ${currentIndex + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover transition-opacity duration-300"
          />
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center text-text-primary hover:bg-white hover:scale-110 transition-all duration-200 opacity-0 group-hover:opacity-100 cursor-pointer"
              aria-label="Foto sebelumnya"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center text-text-primary hover:bg-white hover:scale-110 transition-all duration-200 opacity-0 group-hover:opacity-100 cursor-pointer"
              aria-label="Foto selanjutnya"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden transition-all duration-200 cursor-pointer ${
                currentIndex === index
                  ? "ring-2 ring-primary ring-offset-2 opacity-100"
                  : "opacity-50 hover:opacity-80"
              }`}
              aria-label={`Lihat foto ${index + 1}`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
