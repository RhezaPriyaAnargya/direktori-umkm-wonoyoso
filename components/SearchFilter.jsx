"use client";

import { useState, useMemo, useEffect } from "react";
import UmkmCard from "./UmkmCard";

const CATEGORIES = ["Semua", "Kuliner", "Kerajinan", "Jasa", "Pertanian"];

export default function SearchFilter({ data }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  // Listen for search events from BottomNav and KategoriUmkm
  useEffect(() => {
    const handler = (e) => {
      const { query, category } = e.detail;
      if (query !== undefined) setSearchQuery(query);
      if (category) setActiveCategory(category);
    };
    window.addEventListener("bottomNavSearch", handler);
    return () => window.removeEventListener("bottomNavSearch", handler);
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((umkm) => {
      const matchesSearch =
        searchQuery === "" ||
        umkm.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        umkm.kategori.toLowerCase().includes(searchQuery.toLowerCase()) ||
        umkm.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        activeCategory === "Semua" || umkm.kategori === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [data, searchQuery, activeCategory]);

  return (
    <section id="katalog" className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-3 uppercase tracking-wider">
            Katalog Usaha
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-primary">
            Jelajahi UMKM Wonoyoso
          </h2>
          <p className="mt-2 text-text-muted text-sm sm:text-base max-w-lg mx-auto">
            Temukan berbagai produk dan jasa berkualitas dari pelaku usaha lokal
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-text-muted">
              <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            id="search-umkm"
            placeholder="Cari nama usaha atau produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white rounded-2xl border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-text-muted hover:text-text-primary transition-colors"
              aria-label="Hapus pencarian"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeCategory === category ? "pill-active" : "pill-inactive"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="mb-6 text-sm text-text-muted text-center">
          Menampilkan{" "}
          <span className="font-semibold text-primary">{filteredData.length}</span>{" "}
          usaha
          {activeCategory !== "Semua" && (
            <span> dalam kategori <span className="font-semibold">{activeCategory}</span></span>
          )}
        </div>

        {/* Grid */}
        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredData.map((umkm, index) => (
              <div
                key={umkm.id}
                className="animate-fade-in-up opacity-0"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <UmkmCard umkm={umkm} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 sm:py-20">
            <div className="w-20 h-20 mx-auto mb-4 bg-border/50 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-text-muted/50">
                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-1">Tidak ada hasil</h3>
            <p className="text-sm text-text-muted">Coba ubah kata kunci pencarian atau pilih kategori lain.</p>
          </div>
        )}
      </div>
    </section>
  );
}
