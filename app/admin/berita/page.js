"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default function AdminBeritaPage() {
  const [beritaList, setBeritaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("berita")
      .select("*, umkm:umkm_id(id, nama)")
      .order("created_at", { ascending: false });

    if (!error) setBeritaList(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id, judul) => {
    if (!confirm(`Yakin ingin menghapus berita "${judul}"?`)) return;
    setDeleting(id);

    const { error } = await supabase.from("berita").delete().eq("id", id);

    if (error) {
      alert("Gagal menghapus: " + error.message);
    } else {
      setBeritaList((prev) => prev.filter((b) => b.id !== id));
    }
    setDeleting(null);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Kelola Berita</h1>
          <p className="text-sm text-text-muted mt-1">Tambah, edit, atau hapus berita UMKM</p>
        </div>
        <Link
          href="/admin/berita/tambah"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold text-sm rounded-xl shadow-md shadow-primary/20 transition-all duration-300 hover:scale-[1.02]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" /></svg>
          Tambah Berita
        </Link>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-2xl border border-border p-5 shadow-sm mb-8">
        <p className="text-3xl font-extrabold text-primary">{beritaList.length}</p>
        <p className="text-xs text-text-muted mt-1">Total Berita</p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="font-bold text-text-primary">Daftar Berita</h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <svg className="animate-spin w-6 h-6 text-primary" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
          </div>
        ) : beritaList.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-text-muted">Belum ada berita</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-text-muted text-xs uppercase tracking-wider">
                  <th className="px-5 py-3 text-left">Berita</th>
                  <th className="px-5 py-3 text-left hidden sm:table-cell">UMKM Terkait</th>
                  <th className="px-5 py-3 text-left hidden md:table-cell">Tanggal</th>
                  <th className="px-5 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {beritaList.map((berita) => (
                  <tr key={berita.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-8 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 relative">
                          {berita.gambar ? (
                            <Image
                              src={berita.gambar}
                              alt={berita.judul}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-primary/5">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-primary/30">
                                <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h9A1.5 1.5 0 0114 3.5v11.75A2.75 2.75 0 0016.75 18h-12A2.75 2.75 0 012 15.25V3.5zm3.75 7a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zm0 3a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zM5 5.75A.75.75 0 015.75 5h4.5a.75.75 0 01.75.75v2.5a.75.75 0 01-.75.75h-4.5A.75.75 0 015 8.25v-2.5z" clipRule="evenodd" />
                                <path d="M16.5 6.5h-1v8.75a1.25 1.25 0 102.5 0V8a1.5 1.5 0 00-1.5-1.5z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-text-primary line-clamp-1">{berita.judul}</p>
                          <p className="text-xs text-text-muted sm:hidden">
                            {formatDate(berita.created_at)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 hidden sm:table-cell">
                      <span className="text-xs text-text-muted">
                        {berita.umkm?.nama || "-"}
                      </span>
                    </td>
                    <td className="px-5 py-3 hidden md:table-cell">
                      <span className="text-xs text-text-muted">{formatDate(berita.created_at)}</span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/berita/edit/${berita.id}`}
                          className="px-3 py-1.5 text-xs font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(berita.id, berita.judul)}
                          disabled={deleting === berita.id}
                          className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
                        >
                          {deleting === berita.id ? "..." : "Hapus"}
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
