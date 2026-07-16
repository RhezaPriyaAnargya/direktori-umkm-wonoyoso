"use client";

export default function CaraPakaiPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">Cara Pakai Admin Panel</h1>
        <p className="text-sm text-text-muted mt-1">Panduan lengkap mengelola data website Direktori UMKM Wonoyoso</p>
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden mb-8">
        {/* Video Container - Classic Responsive Hack */}
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }} className="bg-black">
          <iframe 
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1&rel=0&modestbranding=0" 
            title="Panduan Penggunaan Website UMKM Wonoyoso" 
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
          ></iframe>
        </div>
        
        {/* Fallback Link YouTube */}
        <div className="bg-gray-50 border-b border-border px-6 py-3 flex items-center justify-between flex-wrap gap-2">
          <p className="text-sm text-text-muted flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-red-500">
              <path fillRule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm9-3.75a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" clipRule="evenodd" />
            </svg>
            Video error atau tidak bisa diputar?
          </p>
          <a 
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg"
          >
            Tonton langsung di YouTube
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
            </svg>
          </a>
        </div>

        <div className="p-6 sm:p-8">
          <h2 className="text-xl font-bold text-text-primary mb-6">Langkah-Langkah Penggunaan</h2>
          
          <div className="space-y-6">
            {/* Langkah 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">Login ke Admin Panel</h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  Buka halaman <code className="bg-gray-100 px-1.5 py-0.5 rounded text-primary">/admin/login</code> dan masukkan email serta password yang telah diberikan.
                </p>
              </div>
            </div>

            {/* Langkah 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">Menambah UMKM Baru</h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  Pilih menu <strong>"Tambah UMKM"</strong> di menu samping. Isi semua data yang diperlukan seperti nama, kategori, nomor WhatsApp, foto, dan lokasi. Setelah selesai, klik tombol <strong>"Simpan UMKM"</strong> di bagian bawah form.
                </p>
              </div>
            </div>

            {/* Langkah 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">Mengedit atau Menghapus Data UMKM</h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  Di halaman <strong>Dashboard</strong>, kamu bisa melihat semua daftar UMKM. Klik tombol <strong>"Edit"</strong> warna hijau untuk mengubah data (misalnya mengubah foto atau jam buka). Jika usaha sudah tidak aktif, kamu bisa klik <strong>"Hapus"</strong> warna merah.
                </p>
              </div>
            </div>

            {/* Langkah 4 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-sm">
                4
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">Menulis Berita / Promo</h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  Buka menu <strong>"Berita"</strong> dan klik tombol "Tambah Berita". Kamu bisa menuliskan pengumuman diskon, produk baru, atau kabar lainnya. Jangan lupa pilih "UMKM Terkait" agar berita tersebut terhubung langsung ke halaman profil UMKM-mu.
                </p>
              </div>
            </div>
          </div>

          <hr className="my-8 border-border" />

          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5">
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
              </svg>
              Tips Menambah Lokasi Map (Peta)
            </h4>
            <p className="text-sm text-blue-900/80 leading-relaxed mb-3">
              Cukup isi kolom <strong>"Google Maps Link"</strong> dengan link yang kamu dapatkan saat klik tombol Share/Bagikan di aplikasi Google Maps (contoh: <code>https://maps.app.goo.gl/...</code>). Peta otomatis akan muncul.
            </p>
            <p className="text-sm text-blue-900/80 leading-relaxed">
              Jika kamu tetap ingin mengisi <strong>"Google Maps Embed URL"</strong> secara manual, kamu bisa langsung mem-paste seluruh kode HTML yang didapat dari Google Maps (contoh: <code>&lt;iframe src="..."&gt;&lt;/iframe&gt;</code>) ke dalam kotaknya.
            </p>
          </div>
          
          <div className="mt-8 p-5 bg-green-50 border border-green-100 rounded-xl flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-green-900 mb-1">Butuh Bantuan Lebih Lanjut?</h4>
              <p className="text-sm text-green-800/80 mb-2">Jika ada error atau ada bagian yang membingungkan, silakan hubungi developer (Rheza KKN UPN Veteran YK):</p>
              <a 
                href="https://wa.me/6282133760034" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                Chat WhatsApp (0821-3376-0034)
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
