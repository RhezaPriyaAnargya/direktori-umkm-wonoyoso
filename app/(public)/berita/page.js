import Link from "next/link";
import BeritaCard from "@/components/BeritaCard";
import { getAllBerita } from "@/lib/berita";

export const revalidate = 60;

export const metadata = {
  title: "Berita & Kabar UMKM - Direktori UMKM Wonoyoso",
  description:
    "Kabar terbaru seputar UMKM Dusun Wonoyoso. Info promo, menu baru, event, dan perkembangan usaha lokal.",
};

export default async function BeritaPage() {
  const beritaList = await getAllBerita();

  return (
    <>
      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-green-900 pt-24 pb-12 sm:pt-28 sm:pb-16">
        <div className="absolute inset-0 bg-[url('/images/pattern-dot.svg')] opacity-5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 text-white"
            >
              <path
                fillRule="evenodd"
                d="M2 3.5A1.5 1.5 0 013.5 2h9A1.5 1.5 0 0114 3.5v11.75A2.75 2.75 0 0016.75 18h-12A2.75 2.75 0 012 15.25V3.5zm3.75 7a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zm0 3a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zM5 5.75A.75.75 0 015.75 5h4.5a.75.75 0 01.75.75v2.5a.75.75 0 01-.75.75h-4.5A.75.75 0 015 8.25v-2.5z"
                clipRule="evenodd"
              />
              <path d="M16.5 6.5h-1v8.75a1.25 1.25 0 102.5 0V8a1.5 1.5 0 00-1.5-1.5z" />
            </svg>
            <span className="text-xs font-semibold text-white tracking-wide uppercase">
              Kabar & Berita
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Berita UMKM Wonoyoso
          </h1>
          <p className="text-white/70 text-sm sm:text-base max-w-lg mx-auto">
            Info terbaru seputar promo, menu baru, event, dan perkembangan usaha
            lokal Dusun Wonoyoso
          </p>
        </div>
      </section>

      {/* Berita List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {beritaList.length === 0 ? (
          <div className="text-center py-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-16 h-16 text-gray-200 mx-auto mb-4"
            >
              <path
                fillRule="evenodd"
                d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 003 3h12.75a3 3 0 003-3V4.875C21 3.839 20.16 3 19.125 3H4.125zM12 9.75a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5H12zm-5.625 3.75a.75.75 0 000 1.5h9.75a.75.75 0 000-1.5h-9.75zM6.375 18a.75.75 0 000 1.5h9.75a.75.75 0 000-1.5h-9.75z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-text-muted text-lg font-medium">
              Belum ada berita
            </p>
            <p className="text-text-muted text-sm mt-1">
              Nantikan kabar terbaru dari UMKM Wonoyoso!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {beritaList.map((berita) => (
              <BeritaCard key={berita.id} berita={berita} />
            ))}
          </div>
        )}

        {/* Back to Home */}
        <div className="text-center mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-primary transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                clipRule="evenodd"
              />
            </svg>
            Kembali ke Beranda
          </Link>
        </div>
      </section>
    </>
  );
}
