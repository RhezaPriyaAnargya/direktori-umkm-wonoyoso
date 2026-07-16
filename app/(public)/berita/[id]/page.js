import Link from "next/link";
import Image from "next/image";
import { getBeritaById, getAllBerita } from "@/lib/berita";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { id } = await params;
  const berita = await getBeritaById(id);
  if (!berita) return { title: "Berita Tidak Ditemukan" };

  return {
    title: `${berita.judul} - Berita UMKM Wonoyoso`,
    description: berita.konten.substring(0, 160),
    openGraph: {
      title: berita.judul,
      description: berita.konten.substring(0, 160),
      images: berita.gambar ? [{ url: berita.gambar }] : [],
    },
  };
}

export default async function BeritaDetailPage({ params }) {
  const { id } = await params;
  const berita = await getBeritaById(id);

  if (!berita) notFound();

  const tanggal = new Date(berita.created_at).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Split konten by newlines for paragraph rendering
  const paragraphs = berita.konten
    .split("\n")
    .filter((p) => p.trim().length > 0);

  return (
    <>
      {/* Hero Image */}
      <section className="relative bg-gray-900 pt-16">
        <div className="relative w-full max-w-4xl mx-auto aspect-[4/3] sm:aspect-video">
          {berita.gambar ? (
            <Image
              src={berita.gambar}
              alt={berita.judul}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover object-center"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-20 h-20 text-white/20"
              >
                <path
                  fillRule="evenodd"
                  d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 003 3h12.75a3 3 0 003-3V4.875C21 3.839 20.16 3 19.125 3H4.125zM12 9.75a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5H12zm-5.625 3.75a.75.75 0 000 1.5h9.75a.75.75 0 000-1.5h-9.75zM6.375 18a.75.75 0 000 1.5h9.75a.75.75 0 000-1.5h-9.75z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      </section>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10 pb-16">
        <div className="bg-white rounded-2xl shadow-xl border border-border/50 p-6 sm:p-8 lg:p-10">
          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-text-muted mb-4">
            <time className="flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-3.5 h-3.5"
              >
                <path
                  fillRule="evenodd"
                  d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
                  clipRule="evenodd"
                />
              </svg>
              {tanggal}
            </time>
          </div>

          {/* Judul */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary leading-tight mb-6">
            {berita.judul}
          </h1>

          {/* Konten */}
          <div className="prose prose-sm sm:prose-base max-w-none text-text-secondary leading-relaxed space-y-4">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* UMKM Terkait */}
          {berita.umkm && (
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
                UMKM Terkait
              </p>
              <Link
                href={`/umkm/${berita.umkm.id}`}
                className="inline-flex items-center gap-3 bg-gray-50 hover:bg-primary/5 border border-border hover:border-primary/30 rounded-xl px-4 py-3 transition-all duration-300 group"
              >
                {berita.umkm.foto && (
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-200 relative flex-shrink-0">
                    <Image
                      src={berita.umkm.foto}
                      alt={berita.umkm.nama}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors">
                    {berita.umkm.nama}
                  </p>
                  <p className="text-xs text-text-muted">
                    {berita.umkm.kategori}
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4 text-text-muted group-hover:text-primary ml-auto transition-colors"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638l-3.96-4.158a.75.75 0 111.08-1.04l5.25 5.5a.75.75 0 010 1.08l-5.25 5.5a.75.75 0 11-1.08-1.04l3.96-4.158H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <Link
            href="/berita"
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
            Semua Berita
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-primary transition-colors"
          >
            Beranda
          </Link>
        </div>
      </article>
    </>
  );
}
