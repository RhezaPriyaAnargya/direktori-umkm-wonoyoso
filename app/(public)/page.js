import Link from "next/link";
import SearchFilter from "@/components/SearchFilter";
import HeroCarousel from "@/components/HeroCarousel";
import KategoriUmkm from "@/components/KategoriUmkm";
import BeritaCard from "@/components/BeritaCard";
import { getAllUmkm } from "@/lib/umkm";
import { getLatestBerita } from "@/lib/berita";

export const revalidate = 60; // Revalidate data setiap 60 detik

export default async function HomePage() {
  const [umkmData, latestBerita] = await Promise.all([
    getAllUmkm(),
    getLatestBerita(3),
  ]);

  const uniqueCategories = new Set();
  umkmData.forEach((u) => {
    if (u.kategori.includes("&")) {
      u.kategori.split("&").forEach((k) => uniqueCategories.add(k.trim()));
    } else {
      uniqueCategories.add(u.kategori);
    }
  });
  const categories = [...uniqueCategories];

  return (
    <>
      {/* ============ HERO CAROUSEL ============ */}
      <HeroCarousel umkmData={umkmData} />

      {/* ============ STATS SECTION ============ */}
      <section className="relative z-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-8 sm:py-10">
        <div className="bg-white rounded-2xl shadow-xl border border-border/50 p-5 sm:p-6 grid grid-cols-2 gap-4 sm:gap-6">
          <div className="text-center border-r border-border">
            <p className="text-2xl sm:text-3xl font-extrabold text-primary">{umkmData.length}</p>
            <p className="text-xs sm:text-sm text-text-muted mt-0.5">Unit Usaha</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-extrabold text-accent">{categories.length}</p>
            <p className="text-xs sm:text-sm text-text-muted mt-0.5">Kategori</p>
          </div>
        </div>
      </section>

      {/* ============ KATEGORI UMKM ============ */}
      <KategoriUmkm umkmData={umkmData} />

      {/* ============ KABAR TERBARU ============ */}
      {latestBerita.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14" id="berita">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                  <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h9A1.5 1.5 0 0114 3.5v11.75A2.75 2.75 0 0016.75 18h-12A2.75 2.75 0 012 15.25V3.5zm3.75 7a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zm0 3a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zM5 5.75A.75.75 0 015.75 5h4.5a.75.75 0 01.75.75v2.5a.75.75 0 01-.75.75h-4.5A.75.75 0 015 8.25v-2.5z" clipRule="evenodd" />
                  <path d="M16.5 6.5h-1v8.75a1.25 1.25 0 102.5 0V8a1.5 1.5 0 00-1.5-1.5z" />
                </svg>
                Kabar Terbaru
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary">
                Berita UMKM
              </h2>
            </div>
            <Link
              href="/berita"
              className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors hidden sm:inline-flex items-center gap-1"
            >
              Lihat Semua
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638l-3.96-4.158a.75.75 0 111.08-1.04l5.25 5.5a.75.75 0 010 1.08l-5.25 5.5a.75.75 0 11-1.08-1.04l3.96-4.158H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestBerita.map((berita) => (
              <BeritaCard key={berita.id} berita={berita} />
            ))}
          </div>

          <div className="text-center mt-6 sm:hidden">
            <Link
              href="/berita"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
            >
              Lihat Semua Berita
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638l-3.96-4.158a.75.75 0 111.08-1.04l5.25 5.5a.75.75 0 010 1.08l-5.25 5.5a.75.75 0 11-1.08-1.04l3.96-4.158H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </section>
      )}

      {/* ============ KATALOG SECTION ============ */}
      <SearchFilter data={umkmData} />
    </>
  );
}
