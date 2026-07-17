"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/admin/Toast";

export default function AdminDashboard() {
  const [umkmList, setUmkmList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const showToast = useToast();

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("umkm")
      .select("*")
      .order("created_at", { ascending: true });

    if (!error) setUmkmList(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id, nama) => {
    if (!confirm(`Yakin ingin menghapus "${nama}"?`)) return;
    setDeleting(id);

    const { error } = await supabase.from("umkm").delete().eq("id", id);

    if (error) {
      showToast("Gagal menghapus: " + error.message, "error");
    } else {
      setUmkmList((prev) => prev.filter((u) => u.id !== id));
      showToast(`UMKM "${nama}" berhasil dihapus`, "success");
    }
    setDeleting(null);
  };

  const categories = [...new Set(umkmList.flatMap((u) => {
    if (u.kategori.includes("&")) return u.kategori.split("&").map((k) => k.trim());
    return [u.kategori];
  }))];

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
          <p className="text-sm text-text-muted mt-1">Kelola data UMKM Dusun Wonoyoso</p>
        </div>
        <Link
          href="/admin/tambah"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold text-sm rounded-xl shadow-md shadow-primary/20 transition-all duration-300 hover:scale-[1.02]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" /></svg>
          Tambah UMKM
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-border p-4 shadow-sm">
          <p className="text-3xl font-extrabold text-primary">{umkmList.length}</p>
          <p className="text-xs text-text-muted mt-1">Total UMKM</p>
        </div>
        {categories.map((cat) => (
          <div key={cat} className="bg-white rounded-2xl border border-border p-4 shadow-sm">
            <p className="text-3xl font-extrabold text-accent">
              {umkmList.filter((u) => u.kategori.toLowerCase().includes(cat.toLowerCase())).length}
            </p>
            <p className="text-xs text-text-muted mt-1">{cat}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="font-bold text-text-primary">Daftar UMKM</h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <svg className="animate-spin w-6 h-6 text-primary" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
          </div>
        ) : umkmList.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-text-muted">Belum ada data UMKM</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-text-muted text-xs uppercase tracking-wider">
                  <th className="px-5 py-3 text-left">UMKM</th>
                  <th className="px-5 py-3 text-left hidden sm:table-cell">Kategori</th>
                  <th className="px-5 py-3 text-left hidden md:table-cell">WhatsApp</th>
                  <th className="px-5 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {umkmList.map((umkm) => (
                  <tr key={umkm.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 relative">
                          <Image
                            src={umkm.foto}
                            alt={umkm.nama}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-text-primary line-clamp-1">{umkm.nama}</p>
                          <p className="text-xs text-text-muted sm:hidden">{umkm.kategori}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 hidden sm:table-cell">
                      <span className="text-xs font-medium text-text-secondary">{umkm.kategori}</span>
                    </td>
                    <td className="px-5 py-3 hidden md:table-cell">
                      <span className="text-xs text-text-muted">{umkm.wa || "-"}</span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/edit/${umkm.id}`}
                          className="px-3 py-1.5 text-xs font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(umkm.id, umkm.nama)}
                          disabled={deleting === umkm.id}
                          className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
                        >
                          {deleting === umkm.id ? "..." : "Hapus"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
