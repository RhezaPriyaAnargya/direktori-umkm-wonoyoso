import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-text-primary text-white">
      <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625A1.875 1.875 0 013.75 19.875v-6.198a.75.75 0 01.091-.086L12 5.432z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-base">UMKM Wonoyoso</h3>
                <p className="text-xs text-white/50">Direktori Usaha Dusun</p>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Platform digital untuk mempromosikan dan memperkenalkan UMKM lokal Dusun Wonoyoso kepada masyarakat luas.
            </p>
          </div>

          {/* Location */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-white/90 uppercase tracking-wider">Lokasi</h4>
            <div className="space-y-2 text-sm text-white/60">
              <p>Dusun Wonoyoso</p>
              <p>Desa Mojosari, Kec. Mojotengah</p>
              <p>Kab. Wonosobo, Jawa Tengah</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-white/90 uppercase tracking-wider">Navigasi</h4>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-white/60 hover:text-primary transition-colors w-fit">
                Beranda
              </Link>
              <a href="#katalog" className="text-sm text-white/60 hover:text-primary transition-colors w-fit">
                Katalog UMKM
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col items-center justify-center gap-3">
          <p className="text-xs text-white/40 text-center">
            © {new Date().getFullYear()} Direktori UMKM Wonoyoso. Sobowomo 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
