import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex-1" style={{ paddingBottom: 'calc(5rem + env(safe-area-inset-bottom, 0px))' }}>{children}</main>
      <Footer />
      <BottomNav />
    </>
  );
}
