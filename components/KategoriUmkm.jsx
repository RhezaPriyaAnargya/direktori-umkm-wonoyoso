"use client";

const CATEGORY_CONFIG = [
  { name: "Kuliner", icon: "🍽️", color: "#ef4444", bgColor: "#fef2f2" },
  { name: "Kerajinan", icon: "🎨", color: "#3b82f6", bgColor: "#eff6ff" },
  { name: "Jasa", icon: "🔧", color: "#8b5cf6", bgColor: "#f5f3ff" },
  { name: "Pertanian", icon: "🌿", color: "#16a34a", bgColor: "#f0fdf4" },
  { name: "Peternakan", icon: "🐄", color: "#b45309", bgColor: "#fffbeb" },
];

export default function KategoriUmkm({ umkmData = [] }) {
  const categoryCounts = CATEGORY_CONFIG.map((cat) => ({
    ...cat,
    count: umkmData.filter((u) => u.kategori.toLowerCase().includes(cat.name.toLowerCase())).length,
  }));

  const handleCategoryClick = (categoryName) => {
    const katalog = document.getElementById("katalog");
    if (katalog) {
      katalog.scrollIntoView({ behavior: "smooth" });
    }
    window.dispatchEvent(
      new CustomEvent("bottomNavSearch", {
        detail: { query: "", category: categoryName },
      })
    );
  };

  return (
    <section id="kategori" className="py-10 sm:py-14 bg-gray-50/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-xl sm:text-2xl lg:text-3xl font-extrabold text-primary mb-8 sm:mb-10">
          Kategori UMKM
        </h2>

        <div className="flex justify-center gap-6 sm:gap-8 lg:gap-12 flex-wrap">
          {categoryCounts.map((cat) => (
            <button
              key={cat.name}
              onClick={() => handleCategoryClick(cat.name)}
              className="flex flex-col items-center gap-2.5 group cursor-pointer transition-transform hover:scale-105 active:scale-95"
            >
              <div
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shadow-md border-2 transition-all duration-300 group-hover:shadow-lg"
                style={{
                  backgroundColor: cat.bgColor,
                  borderColor: `${cat.color}30`,
                }}
              >
                <span className="text-3xl sm:text-4xl">{cat.icon}</span>
              </div>
              <div className="text-center">
                <p className="text-xs sm:text-sm font-bold text-text-primary uppercase tracking-wide">
                  {cat.name}
                </p>
                <p className="text-[10px] sm:text-xs text-text-muted">
                  {cat.count} produk
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
