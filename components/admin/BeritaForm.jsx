"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { processImageToWebp } from "@/lib/imageUtils";

export default function BeritaForm({ initialData = null, umkmList = [], onSubmit }) {
  const [form, setForm] = useState({
    judul: initialData?.judul || "",
    konten: initialData?.konten || "",
    umkm_id: initialData?.umkm_id || "",
  });

  const [gambarFile, setGambarFile] = useState(null);
  const [gambarPreview, setGambarPreview] = useState(initialData?.gambar || "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [processingHeic, setProcessingHeic] = useState(false);
  const gambarRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGambarChange = async (e) => {
    const rawFile = e.target.files[0];
    if (rawFile) {
      const isImage = rawFile.type.startsWith("image/") || rawFile.name.toLowerCase().endsWith(".heic") || rawFile.name.toLowerCase().endsWith(".heif");
      if (!isImage) {
        setError("File harus berupa gambar (JPEG, PNG, WebP, HEIC, dll).");
        return;
      }
      setError("");
      setProcessingHeic(true);
      
      try {
        const webpFile = await processImageToWebp(rawFile);
        setGambarFile(webpFile);
        setGambarPreview(URL.createObjectURL(webpFile));
      } catch (err) {
        console.error("Image processing error:", err);
        setError("Gagal memproses gambar. Pastikan file valid.");
      } finally {
        setProcessingHeic(false);
        e.target.value = "";
      }
    }
  };

  const uploadFile = async (file) => {
    if (!file.type.startsWith("image/")) {
      throw new Error(`File ${file.name} bukan format gambar yang valid.`);
    }

    const ext = file.name.split(".").pop();
    const fileName = `berita/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;

    const { error } = await supabase.storage
      .from("umkm-images")
      .upload(fileName, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from("umkm-images")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      let gambarUrl = gambarPreview;

      if (gambarFile) {
        gambarUrl = await uploadFile(gambarFile);
      }

      const data = {
        judul: form.judul,
        konten: form.konten,
        gambar: gambarUrl || null,
        umkm_id: form.umkm_id || null,
      };

      await onSubmit(data);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Overlay Loading HEIC */}
      {processingHeic && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl flex flex-col items-center shadow-xl">
            <svg className="animate-spin w-8 h-8 text-primary mb-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-sm font-medium text-gray-700">Memproses gambar...</p>
          </div>
        </div>
      )}

      {/* Judul */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2">Judul Berita *</label>
        <input
          name="judul"
          value={form.judul}
          onChange={handleChange}
          required
          placeholder="Contoh: Menu Baru Ghanim Snack - Keripik Rasa Balado!"
          className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
        />
      </div>

      {/* Gambar */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2">Gambar Berita</label>
        <p className="text-xs text-text-muted mb-3">Format yang didukung: JPG, PNG, WebP, HEIC (Otomatis dikonversi ke WebP).</p>
        <input ref={gambarRef} type="file" accept="image/jpeg, image/png, image/webp, .heic, .heif" onChange={handleGambarChange} className="hidden" />
        <div className="flex items-start gap-4">
          {gambarPreview && (
            <div className="w-40 h-24 rounded-xl overflow-hidden bg-gray-100 relative flex-shrink-0">
              <Image src={gambarPreview} alt="Preview" fill sizes="160px" className="object-cover" />
            </div>
          )}
          <button
            type="button"
            onClick={() => gambarRef.current?.click()}
            className="px-4 py-2.5 border-2 border-dashed border-border rounded-xl text-sm text-text-muted hover:border-primary hover:text-primary transition-colors"
          >
            {gambarPreview ? "Ganti Gambar" : "Upload Gambar"}
          </button>
        </div>
      </div>

      {/* Konten */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2">Isi Berita *</label>
        <textarea
          name="konten"
          value={form.konten}
          onChange={handleChange}
          required
          rows={10}
          placeholder="Tulis isi berita di sini... Gunakan enter untuk paragraf baru."
          className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-y"
        />
      </div>

      <hr className="border-border" />

      {/* UMKM Terkait (Opsional) */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2">
          UMKM Terkait <span className="text-text-muted font-normal">(Opsional)</span>
        </label>
        <select
          name="umkm_id"
          value={form.umkm_id}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
        >
          <option value="">-- Tidak ada UMKM terkait --</option>
          {umkmList.map((umkm) => (
            <option key={umkm.id} value={umkm.id}>
              {umkm.nama} ({umkm.kategori})
            </option>
          ))}
        </select>
        <p className="text-xs text-text-muted mt-1.5">
          Jika berita ini berkaitan langsung dengan UMKM tertentu, pilih UMKM-nya di atas.
        </p>
      </div>

      {/* Submit */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={submitting}
          className="w-full sm:w-auto px-8 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl shadow-md shadow-primary/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <span className="inline-flex items-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              Menyimpan...
            </span>
          ) : initialData ? "Simpan Perubahan" : "Publikasikan Berita"}
        </button>
      </div>
    </form>
  );
}
