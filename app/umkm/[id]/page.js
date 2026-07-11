import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import umkmData from "@/data/umkm.json";
import ButtonWA from "@/components/ButtonWA";
import MapEmbed from "@/components/MapEmbed";
import ImageCarousel from "@/components/ImageCarousel";
import RelatedUmkm from "@/components/RelatedUmkm";

// Generate static params for SSG
export async function generateStaticParams() {
  return umkmData.map((umkm) => ({
    id: umkm.id,
  }));
}

// Generate metadata per page
export async function generateMetadata({ params }) {
  const { id } = await params;
  const umkm = umkmData.find((u) => u.id === id);

  if (!umkm) {
    return { title: "UMKM Tidak Ditemukan" };
  }

  return {
    title: `${umkm.nama} | Direktori UMKM Wonoyoso`,
    description: umkm.deskripsi,
    openGraph: {
      title: umkm.nama,
      description: umkm.deskripsi,
      images: [{ url: umkm.foto }],
      type: "article",
      locale: "id_ID",
    },
  };
}

function getCategoryBadgeClass(kategori) {
  const cat = kategori.toLowerCase();
  if (cat.includes("kuliner")) return "badge-kuliner";
  if (cat.includes("kerajinan")) return "badge-kerajinan";
  if (cat.includes("jasa")) return "badge-jasa";
  if (cat.includes("pertanian")) return "badge-pertanian";
  return "badge-kuliner";
}

export default async function UmkmDetailPage({ params }) {
  const { id } = await params;
  const umkm = umkmData.find((u) => u.id === id);

  if (!umkm) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero Image */}
      <div className="relative h-[45vh] sm:h-[55vh] overflow-hidden">
        <Image
          src={umkm.foto}
          alt={`Foto ${umkm.nama}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Back button */}
        <div className="absolute top-20 sm:top-24 left-4 sm:left-6 z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass text-white text-sm font-medium hover:bg-white/25 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
            </svg>
            Kembali
          </Link>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 inset-x-0 p-5 sm:p-8">
          <div className="max-w-4xl mx-auto">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-3 ${getCategoryBadgeClass(umkm.kategori)}`}>
              {umkm.kategori}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              {umkm.nama}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main — Left */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-2xl shadow-sm border border-border p-5 sm:p-7 animate-fade-in-up opacity-0">
              <h2 className="text-lg font-bold text-text-primary mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-primary">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                </svg>
                Tentang Usaha
              </h2>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                {umkm.deskripsi}
              </p>
            </div>

            {/* Image Carousel / Gallery */}
            {umkm.galeri && umkm.galeri.length > 0 && (
              <ImageCarousel images={umkm.galeri} altText={umkm.nama} />
            )}

            {/* Operating Hours */}
            <div className="bg-white rounded-2xl shadow-sm border border-border p-5 sm:p-7 animate-fade-in-up opacity-0 animation-delay-100">
              <h2 className="text-lg font-bold text-text-primary mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-accent">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                </svg>
                Jam Operasional
              </h2>
              <div className="flex items-center gap-3 p-3 bg-accent/5 rounded-xl border border-accent/10">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-accent-dark">
                    <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm sm:text-base font-medium text-text-primary">
                  {umkm.jam_buka}
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl shadow-sm border border-border p-5 sm:p-7 animate-fade-in-up opacity-0 animation-delay-200">
              <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-blue-500">
                  <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433a19.695 19.695 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.695 19.695 0 002.682 2.282 16.67 16.67 0 001.038.573l.018.008.006.003zM12 10.5a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
                </svg>
                Lokasi
              </h2>
              <MapEmbed
                embedUrl={umkm.gmaps_embed}
                mapsLink={umkm.gmaps_link}
                namaUmkm={umkm.nama}
              />
            </div>
          </div>

          {/* Sidebar — Right */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl shadow-sm border border-border p-5 sm:p-7 animate-fade-in-up opacity-0 animation-delay-100 sticky top-24">
              <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-primary">
                  <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
                </svg>
                Hubungi Penjual
              </h2>

              <div className="space-y-4">
                <ButtonWA phoneNumber={umkm.wa} />
                <p className="text-xs text-text-muted text-center leading-relaxed">
                  Klik tombol di atas untuk langsung terhubung dengan penjual melalui WhatsApp
                </p>

                {/* Media Sosial */}
                <div className="pt-2 flex flex-col gap-3">
                  {umkm.instagram && (
                    <a href={`https://instagram.com/${umkm.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-2.5 bg-surface hover:bg-white text-text-muted hover:text-[#E1306C] rounded-xl border border-border hover:border-[#E1306C]/30 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden">
                      <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                      <span className="font-medium text-sm text-text-primary group-hover:text-[#E1306C] transition-colors truncate">{umkm.instagram}</span>
                    </a>
                  )}
                  {umkm.tiktok && (
                    <a href={`https://tiktok.com/@${umkm.tiktok.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-2.5 bg-surface hover:bg-white text-text-muted hover:text-black rounded-xl border border-border hover:border-black/30 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden">
                      <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0 scale-90"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.78-1.15 5.54-3.33 7.39-1.92 1.64-4.59 2.1-6.98 1.4-2.58-.76-4.75-2.82-5.45-5.36-.63-2.31-.19-4.84 1.16-6.85 1.45-2.14 3.94-3.46 6.55-3.53.03 1.34.01 2.68.02 4.02-1.37.07-2.73.54-3.76 1.47-1.28 1.15-1.78 3.12-1.21 4.74.56 1.6 2.06 2.82 3.73 3.01 1.63.19 3.32-.41 4.31-1.69 1.12-1.46 1.36-3.43 1.25-5.21-.11-4.76-.03-9.53-.06-14.29z"/></svg>
                      <span className="font-medium text-sm text-text-primary group-hover:text-black transition-colors truncate">{umkm.tiktok}</span>
                    </a>
                  )}
                  {umkm.facebook && (
                    <a href={`https://facebook.com/search/top?q=${encodeURIComponent(umkm.facebook)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-2.5 bg-surface hover:bg-white text-text-muted hover:text-[#1877F2] rounded-xl border border-border hover:border-[#1877F2]/30 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden">
                      <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                      <span className="font-medium text-sm text-text-primary group-hover:text-[#1877F2] transition-colors truncate">{umkm.facebook}</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="my-5 border-t border-border" />

              {/* Quick Info */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-primary">
                      <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Kategori</p>
                    <p className="text-sm font-semibold text-text-primary">{umkm.kategori}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-accent-dark">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Jam Buka</p>
                    <p className="text-sm font-semibold text-text-primary">{umkm.jam_buka}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-500">
                      <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433a19.695 19.695 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.695 19.695 0 002.682 2.282 16.67 16.67 0 001.038.573l.018.008.006.003zM12 10.5a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Lokasi</p>
                    <p className="text-sm font-semibold text-text-primary">{umkm.lokasi || "Dsn. Wonoyoso, Wonosobo"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related UMKM Section */}
      <RelatedUmkm
        currentId={umkm.id}
        kategori={umkm.kategori}
        allData={umkmData}
      />
    </div>
  );
}
