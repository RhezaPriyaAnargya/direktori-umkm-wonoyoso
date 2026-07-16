"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BeritaForm from "@/components/admin/BeritaForm";
import { supabase } from "@/lib/supabase";

export default function TambahBeritaPage() {
  const router = useRouter();
  const [umkmList, setUmkmList] = useState([]);

  useEffect(() => {
    const fetchUmkm = async () => {
      const { data } = await supabase
        .from("umkm")
        .select("id, nama, kategori")
        .order("nama");
      setUmkmList(data || []);
    };
    fetchUmkm();
  }, []);

  const handleSubmit = async (data) => {
    const { error } = await supabase.from("berita").insert([data]);

    if (error) throw error;

    router.push("/admin/berita");
  };

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
        <h1 className="text-2xl font-bold text-text-primary">Tambah Berita Baru</h1>
        <p className="text-sm text-text-muted mt-1">Publikasikan berita atau kabar terbaru UMKM</p>
      </div>

      <BeritaForm umkmList={umkmList} onSubmit={handleSubmit} />
    </div>
  );
}
