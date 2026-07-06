import Image from "next/image";
import Link from "next/link";

function getCategoryBadgeClass(kategori) {
  switch (kategori.toLowerCase()) {
    case "kuliner": return "badge-kuliner";
    case "kerajinan": return "badge-kerajinan";
    case "jasa": return "badge-jasa";
    case "pertanian": return "badge-pertanian";
    default: return "badge-kuliner";
  }
}

export default function RelatedUmkm({ currentId, kategori, allData }) {
  // Filter UMKM with same category, excluding current
  let related = allData.filter(
    (u) => u.kategori === kategori && u.id !== currentId
  );

  // If less than 2 from same category, fill with others
  if (related.length < 2) {
    const others = allData.filter(
      (u) => u.id !== currentId && !related.find((r) => r.id === u.id)
    );
    related = [...related, ...others].slice(0, 3);
  }

  if (related.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-surface to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-3 uppercase tracking-wider">
            Rekomendasi
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary">
            UMKM Serupa Lainnya
          </h2>
          <p className="mt-2 text-text-muted text-sm sm:text-base">
            Temukan usaha lain yang mungkin kamu suka
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {related.map((umkm, index) => (
            <div
              key={umkm.id}
              className="animate-fade-in-up opacity-0"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link href={`/umkm/${umkm.id}`} className="block group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border card-hover">
                  <div className="relative h-44 sm:h-48 overflow-hidden">
                    <Image
                      src={umkm.foto}
                      alt={`Foto ${umkm.nama}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getCategoryBadgeClass(umkm.kategori)}`}>
                        {umkm.kategori}
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/25 to-transparent" />
                  </div>

                  <div className="p-4 sm:p-5 space-y-2">
                    <h3 className="font-bold text-base text-text-primary leading-snug line-clamp-1 group-hover:text-primary transition-colors duration-300">
                      {umkm.nama}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed line-clamp-2">
                      {umkm.deskripsi}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-text-muted pt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-primary flex-shrink-0">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                      </svg>
                      <span className="truncate">{umkm.jam_buka}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary/5 text-primary font-semibold text-sm rounded-2xl hover:bg-primary hover:text-white transition-all duration-300 group"
          >
            Lihat Semua UMKM
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
