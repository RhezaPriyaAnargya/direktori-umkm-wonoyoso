import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-text-primary text-white">
      <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5">
              <div className="w-14 h-14 flex items-center justify-center drop-shadow-md">
                <Image 
                  src="/images/logo-wonosobo.png" 
                  alt="Logo Wonosobo" 
                  width={64} 
                  height={64} 
                  style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
                />
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
