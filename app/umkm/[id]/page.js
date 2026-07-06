import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import umkmData from "@/data/umkm.json";
import ButtonWA from "@/components/ButtonWA";
import MapEmbed from "@/components/MapEmbed";

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
  switch (kategori.toLowerCase()) {
    case "kuliner": return "badge-kuliner";
    case "kerajinan": return "badge-kerajinan";
    case "jasa": return "badge-jasa";
    case "pertanian": return "badge-pertanian";
    default: return "badge-kuliner";
  }
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
                    <p className="text-sm font-semibold text-text-primary">Dsn. Wonoyoso, Wonosobo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
