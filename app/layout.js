import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

export const metadata = {
  title: "Direktori UMKM Dusun Wonoyoso | Kec. Mojotengah, Wonosobo",
  description:
    "Temukan dan dukung UMKM lokal di Dusun Wonoyoso, Desa Mojosari, Kecamatan Mojotengah, Kabupaten Wonosobo. Direktori lengkap usaha mikro kecil menengah meliputi kuliner, kerajinan, jasa, dan pertanian.",
  keywords: [
    "UMKM Wonoyoso",
    "UMKM Wonosobo",
    "Dusun Wonoyoso",
    "Direktori UMKM",
    "Kuliner Wonosobo",
    "Kerajinan Wonosobo",
    "Mojotengah",
    "Mojosari",
  ],
  authors: [{ name: "Rheza Priya Anargya" }],
  openGraph: {
    title: "Direktori UMKM Dusun Wonoyoso",
    description:
      "Temukan dan dukung UMKM lokal di Dusun Wonoyoso, Kec. Mojotengah, Wonosobo.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="h-full" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased pb-20 md:pb-0" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
