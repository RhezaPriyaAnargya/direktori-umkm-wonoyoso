"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroCarousel({ umkmData = [] }) {
  const defaultSlides = umkmData.slice(0, 5).map(u => ({
    image: u.foto,
    title: u.nama,
    highlight: u.kategori,
    subtitle: u.deskripsi,
    id: u.id
  }));

  const [slides, setSlides] = useState(defaultSlides);
  const [cur, setCur] = useState(0);
  const [busy, setBusy] = useState(false);
  const startX = useRef(0);
  const endX = useRef(0);
  const timer = useRef(null);

  useEffect(() => {
    // Randomize slides on the client side after hydration
    if (umkmData.length === 0) return;
    const shuffled = [...umkmData].sort(() => Math.random() - 0.5);
    setSlides(shuffled.slice(0, 5).map(u => ({
      image: u.foto,
      title: u.nama,
      highlight: u.kategori,
      subtitle: u.deskripsi,
      id: u.id
    })));
  }, [umkmData]);

  const go = useCallback((i) => { if (busy || slides.length === 0) return; setBusy(true); setCur(i); setTimeout(() => setBusy(false), 600); }, [busy, slides.length]);
  const next = useCallback(() => { if (slides.length > 0) go((cur + 1) % slides.length); }, [cur, go, slides.length]);
  const prev = useCallback(() => { if (slides.length > 0) go((cur - 1 + slides.length) % slides.length); }, [cur, go, slides.length]);

  useEffect(() => { timer.current = setInterval(next, 5000); return () => clearInterval(timer.current); }, [next]);
  const reset = useCallback(() => { clearInterval(timer.current); timer.current = setInterval(next, 5000); }, [next]);

  const onTS = (e) => { startX.current = e.touches[0].clientX; };
  const onTM = (e) => { endX.current = e.touches[0].clientX; };
  const onTE = () => { const d = startX.current - endX.current; if (Math.abs(d) > 50) { d > 0 ? next() : prev(); reset(); } };

  if (slides.length === 0) return null;

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden" onTouchStart={onTS} onTouchMove={onTM} onTouchEnd={onTE}>
      {slides.map((s, i) => (
        <div key={`${s.id}-${i}`} className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === cur ? "opacity-100 z-[1]" : "opacity-0 z-0"}`}>
          <Image src={s.image} alt={s.title} fill priority={true} sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 hero-overlay" />
        </div>
      ))}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl z-[2]" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl z-[2]" />
      <div className="relative z-10 text-center px-6 sm:px-8 max-w-5xl mx-auto">
        <div className="relative h-[200px] sm:h-[240px] lg:h-[280px] flex items-center justify-center">
          {slides.map((s, i) => (
            <div key={`${s.id}-text-${i}`} className={`absolute inset-x-0 top-0 bottom-0 flex flex-col items-center justify-center transition-all duration-500 ${i === cur ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
              <h1 className="text-2xl sm:text-4xl lg:text-[3.2rem] font-extrabold text-white leading-snug px-2">
                {s.title}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-400">{s.highlight}</span>
              </h1>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-white/80 max-w-lg mx-auto leading-relaxed line-clamp-2">{s.subtitle}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 relative z-20">
          <a href="#katalog" className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold text-sm sm:text-base rounded-2xl shadow-lg shadow-primary/30 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
            Jelajahi UMKM
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
          </a>
          {slides[cur] && (
            <Link href={`/umkm/${slides[cur].id}`} className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold text-sm sm:text-base rounded-2xl backdrop-blur-sm border border-white/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
              Lihat Detail
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" /></svg>
            </Link>
          )}
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2.5">
        {slides.map((_, i) => (
          <button key={i} onClick={() => { go(i); reset(); }} className={`transition-all duration-300 rounded-full ${i === cur ? "w-8 h-3 bg-primary shadow-md shadow-primary/40" : "w-3 h-3 bg-white/50 hover:bg-white/80"}`} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
      <button onClick={() => { prev(); reset(); }} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex w-12 h-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/25 transition-all" aria-label="Previous">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" /></svg>
      </button>
      <button onClick={() => { next(); reset(); }} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex w-12 h-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/25 transition-all" aria-label="Next">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" /></svg>
      </button>
    </section>
  );
}
