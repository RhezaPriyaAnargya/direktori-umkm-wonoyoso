import Image from "next/image";
import SearchFilter from "@/components/SearchFilter";
import umkmData from "@/data/umkm.json";

const categories = [...new Set(umkmData.map((u) => u.kategori))];

export default function HomePage() {
  return (
    <>
      {/* ============ HERO SECTION ============ */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero-wonoyoso.png"
          alt="Pemandangan Dusun Wonoyoso, Wonosobo"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />

        {/* Decorative blurs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <div className="animate-fade-in-up opacity-0 mb-5">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-white text-xs sm:text-sm font-medium">
              <span className="w-2 h-2 bg-primary-light rounded-full animate-pulse" />
              Dusun Wonoyoso, Kec. Mojotengah, Wonosobo
            </span>
          </div>

          <h1 className="animate-fade-in-up opacity-0 animation-delay-100 text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Direktori{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-400">
              UMKM
            </span>
            <br />
            Dusun Wonoyoso
          </h1>

          <p className="animate-fade-in-up opacity-0 animation-delay-200 mt-4 sm:mt-6 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Temukan dan dukung usaha mikro, kecil, dan menengah dari warga lokal
            Dusun Wonoyoso. Dari kuliner khas hingga kerajinan tradisional.
          </p>

          <div className="animate-fade-in-up opacity-0 animation-delay-300 mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#katalog"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold text-base rounded-2xl shadow-lg shadow-primary/30 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Jelajahi UMKM
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* ============ STATS SECTION ============ */}
      <section className="relative -mt-10 sm:-mt-12 z-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-border/50 p-5 sm:p-6 grid grid-cols-3 gap-4 sm:gap-6">
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-extrabold text-primary">{umkmData.length}</p>
            <p className="text-xs sm:text-sm text-text-muted mt-0.5">Unit Usaha</p>
          </div>
          <div className="text-center border-x border-border">
            <p className="text-2xl sm:text-3xl font-extrabold text-accent">{categories.length}</p>
            <p className="text-xs sm:text-sm text-text-muted mt-0.5">Kategori</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-extrabold text-primary-dark">1</p>
            <p className="text-xs sm:text-sm text-text-muted mt-0.5">Dusun</p>
          </div>
        </div>
      </section>

      {/* ============ KATALOG SECTION ============ */}
      <SearchFilter data={umkmData} />
    </>
  );
}
