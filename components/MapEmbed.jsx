export default function MapEmbed({ embedUrl, mapsLink, namaUmkm, lokasi }) {
  // Auto-generate embed from lokasi if no embed URL is given
  const effectiveEmbedUrl =
    embedUrl ||
    (lokasi
      ? `https://maps.google.com/maps?q=${encodeURIComponent(lokasi)}&output=embed`
      : null);

  // If we have neither embed URL nor lokasi, show fallback
  if (!effectiveEmbedUrl && !mapsLink) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center text-text-muted">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8 mb-2 text-gray-300">
          <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433a19.695 19.695 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.695 19.695 0 002.682 2.282 16.67 16.67 0 001.038.573l.018.008.006.003zM12 10.5a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
        </svg>
        <p className="text-sm">Lokasi belum tersedia</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {effectiveEmbedUrl && (
        <div className="rounded-2xl overflow-hidden border border-border shadow-sm">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={effectiveEmbedUrl}
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Lokasi ${namaUmkm} di Google Maps`}
            />
          </div>
        </div>
      )}

      {mapsLink && (
        <a
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 w-full px-6 py-3.5 maps-gradient text-white font-semibold text-base rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
          Buka di Maps
        </a>
      )}
    </div>
  );
}

