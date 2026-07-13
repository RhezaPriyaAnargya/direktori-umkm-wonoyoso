"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import UmkmForm from "@/components/admin/UmkmForm";
import Link from "next/link";

export default function TambahUmkmPage() {
  const router = useRouter();

  const handleSubmit = async (data) => {
    // Generate ID
    const { data: existing } = await supabase
      .from("umkm")
      .select("id")
      .order("id", { ascending: false })
      .limit(1);

    let nextNum = 1;
    if (existing && existing.length > 0) {
      const lastId = existing[0].id;
      const num = parseInt(lastId.split("-")[1]);
      nextNum = num + 1;
    }
    const newId = `umkm-${String(nextNum).padStart(3, "0")}`;

    const { error } = await supabase.from("umkm").insert({
      id: newId,
      ...data,
    });

    if (error) {
      throw new Error("Gagal menambah UMKM: " + error.message);
    }

    router.push("/admin");
  };

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin" className="text-sm text-text-muted hover:text-primary transition-colors inline-flex items-center gap-1 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" /></svg>
          Kembali
        </Link>
        <h1 className="text-2xl font-bold text-text-primary">Tambah UMKM Baru</h1>
        <p className="text-sm text-text-muted mt-1">Isi data lengkap UMKM yang akan ditambahkan</p>
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm p-5 sm:p-7">
        <UmkmForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
