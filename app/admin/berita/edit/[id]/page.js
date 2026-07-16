"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import BeritaForm from "@/components/admin/BeritaForm";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/admin/Toast";

export default function EditBeritaPage() {
  const router = useRouter();
  const params = useParams();
  const [berita, setBerita] = useState(null);
  const [umkmList, setUmkmList] = useState([]);
  const [loading, setLoading] = useState(true);
  const showToast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const [beritaRes, umkmRes] = await Promise.all([
        supabase.from("berita").select("*").eq("id", params.id).single(),
        supabase.from("umkm").select("id, nama, kategori").order("nama"),
      ]);

      if (beritaRes.error) {
        showToast("Berita tidak ditemukan", "error");
        router.push("/admin/berita");
        return;
      }

      setBerita(beritaRes.data);
      setUmkmList(umkmRes.data || []);
      setLoading(false);
    };
    fetchData();
  }, [params.id, router, showToast]);

  const handleSubmit = async (data) => {
    const { error } = await supabase
      .from("berita")
      .update(data)
      .eq("id", params.id);

    if (error) {
      showToast("Gagal mengupdate berita: " + error.message, "error");
      throw error;
    }

    showToast("Berita berhasil diperbarui! ✅", "success");
    setTimeout(() => router.push("/admin/berita"), 1500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <svg className="animate-spin w-8 h-8 text-primary" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/berita"
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-primary transition-colors mb-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
          </svg>
          Kembali
        </Link>
        <h1 className="text-2xl font-bold text-text-primary">Edit Berita</h1>
        <p className="text-sm text-text-muted mt-1">Perbarui informasi berita</p>
      </div>

      <BeritaForm initialData={berita} umkmList={umkmList} onSubmit={handleSubmit} />
    </div>
  );
}
