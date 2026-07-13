"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import UmkmForm from "@/components/admin/UmkmForm";
import Link from "next/link";

export default function EditUmkmPage() {
  const [umkm, setUmkm] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetchUmkm = async () => {
      const { data, error } = await supabase
        .from("umkm")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error || !data) {
        alert("Data UMKM tidak ditemukan");
        router.push("/admin");
        return;
      }

      setUmkm(data);
      setLoading(false);
    };

    fetchUmkm();
  }, [params.id, router]);

  const handleSubmit = async (data) => {
    const { error } = await supabase
      .from("umkm")
      .update(data)
      .eq("id", params.id);

    if (error) {
      throw new Error("Gagal mengupdate UMKM: " + error.message);
    }

    router.push("/admin");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <svg className="animate-spin w-8 h-8 text-primary" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin" className="text-sm text-text-muted hover:text-primary transition-colors inline-flex items-center gap-1 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" /></svg>
          Kembali
        </Link>
        <h1 className="text-2xl font-bold text-text-primary">Edit: {umkm?.nama}</h1>
        <p className="text-sm text-text-muted mt-1">Ubah data UMKM yang sudah ada</p>
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm p-5 sm:p-7">
        <UmkmForm initialData={umkm} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
