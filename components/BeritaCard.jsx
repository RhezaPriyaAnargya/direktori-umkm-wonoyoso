import Link from "next/link";
import Image from "next/image";

export default function BeritaCard({ berita }) {
  const tanggal = new Date(berita.created_at).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Truncate konten untuk preview
  const preview =
    berita.konten.length > 120
      ? berita.konten.substring(0, 120) + "..."
      : berita.konten;

  return (
    <Link
      href={`/berita/${berita.id}`}
      className="group block bg-white rounded-2xl border border-border/60 shadow-sm hover:shadow-lg hover:border-primary/30 overflow-hidden transition-all duration-300 hover:-translate-y-1"
    >
      {/* Gambar */}
      <div className="relative w-full aspect-[16/9] bg-gray-100 overflow-hidden">
        {berita.gambar ? (
          <Image
            src={berita.gambar}
            alt={berita.judul}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-10 h-10 text-primary/30"
            >
              <path
                fillRule="evenodd"
                d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 003 3h12.75a3 3 0 003-3V4.875C21 3.839 20.16 3 19.125 3H4.125zM12 9.75a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5H12zm-5.625 3.75a.75.75 0 000 1.5h9.75a.75.75 0 000-1.5h-9.75zM6.375 18a.75.75 0 000 1.5h9.75a.75.75 0 000-1.5h-9.75z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}

        {/* Badge tanggal */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-medium text-text-secondary px-3 py-1.5 rounded-full shadow-sm">
          {tanggal}
        </div>
      </div>

      {/* Konten */}
      <div className="p-4 sm:p-5">
        <h3 className="text-base font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-2 mb-2">
          {berita.judul}
        </h3>
        <p className="text-sm text-text-muted leading-relaxed line-clamp-3">
          {preview}
        </p>

        {/* UMKM Terkait */}
        {berita.umkm && (
          <div className="mt-3 flex items-center gap-1.5 text-xs text-primary font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-3.5 h-3.5"
            >
              <path
                fillRule="evenodd"
                d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                clipRule="evenodd"
              />
            </svg>
            {berita.umkm.nama}
          </div>
        )}
      </div>
    </Link>
  );
}
