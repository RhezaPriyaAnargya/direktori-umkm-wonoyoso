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

export default function UmkmCard({ umkm }) {
  return (
    <div className="group bg-surface-card rounded-2xl overflow-hidden shadow-sm border border-border card-hover">
      <div className="relative h-48 sm:h-52 overflow-hidden">
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
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      <div className="p-4 sm:p-5 space-y-3">
        <h3 className="font-bold text-base sm:text-lg text-text-primary leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {umkm.nama}
        </h3>
        <p className="text-sm text-text-muted leading-relaxed line-clamp-2">
          {umkm.deskripsi}
        </p>
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-primary flex-shrink-0">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
          </svg>
          <span className="truncate">{umkm.jam_buka}</span>
        </div>
        <Link
          href={`/umkm/${umkm.id}`}
          className="inline-flex items-center justify-center w-full gap-2 px-4 py-2.5 mt-1 bg-primary/5 text-primary font-semibold text-sm rounded-xl hover:bg-primary hover:text-white transition-all duration-300 group/btn"
        >
          Lihat Detail
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1">
            <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
