import SearchFilter from "@/components/SearchFilter";
import HeroCarousel from "@/components/HeroCarousel";
import KategoriUmkm from "@/components/KategoriUmkm";
import umkmData from "@/data/umkm.json";

const categories = [...new Set(umkmData.map((u) => u.kategori))];

export default function HomePage() {
  return (
    <>
      {/* ============ HERO CAROUSEL ============ */}
      <HeroCarousel />

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
      <KategoriUmkm />

      {/* ============ KATALOG SECTION ============ */}
      <SearchFilter data={umkmData} />
    </>
  );
}
