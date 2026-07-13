"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default function UmkmForm({ initialData = null, onSubmit }) {
  const [form, setForm] = useState({
    nama: initialData?.nama || "",
    kategori: initialData?.kategori || "Kuliner",
    deskripsi: initialData?.deskripsi || "",
    jam_buka: initialData?.jam_buka || "",
    lokasi: initialData?.lokasi || "Dsn. Wonoyoso, Wonosobo",
    wa: initialData?.wa || "",
    instagram: initialData?.instagram || "",
    tiktok: initialData?.tiktok || "",
    facebook: initialData?.facebook || "",
    gmaps_embed: initialData?.gmaps_embed || "",
    gmaps_link: initialData?.gmaps_link || "",
  });

  const [fotoFile, setFotoFile] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(initialData?.foto || "");
  const [galeriFiles, setGaleriFiles] = useState([]);
  const [galeriPreviews, setGaleriPreviews] = useState(initialData?.galeri || []);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const fotoRef = useRef(null);
  const galeriRef = useRef(null);

  const CATEGORIES = ["Kuliner", "Kerajinan", "Jasa", "Pertanian", "Kerajinan & Jasa"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("File Foto Utama harus berupa gambar (JPEG, PNG, WebP, dll).");
        return;
      }
      setError("");
      setFotoFile(file);
      setFotoPreview(URL.createObjectURL(file));
    }
  };

  const handleGaleriChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((f) => f.type.startsWith("image/"));
    
    if (validFiles.length !== files.length) {
      setError("Beberapa file ditolak karena bukan format gambar.");
    } else {
      setError("");
    }

    if (validFiles.length > 0) {
      setGaleriFiles((prev) => [...prev, ...validFiles]);
      setGaleriPreviews((prev) => [
        ...prev,
        ...validFiles.map((f) => URL.createObjectURL(f)),
      ]);
    }
  };

  const removeGaleriItem = (index) => {
    setGaleriPreviews((prev) => prev.filter((_, i) => i !== index));
    // Only remove from files if it's a new upload (not existing URL)
    const existingCount = initialData?.galeri?.length || 0;
    if (index >= existingCount) {
      const fileIndex = index - existingCount;
      setGaleriFiles((prev) => prev.filter((_, i) => i !== fileIndex));
    }
  };

  const uploadFile = async (file, path) => {
    if (!file.type.startsWith("image/")) {
      throw new Error(`File ${file.name} bukan format gambar yang valid.`);
    }

    const ext = file.name.split(".").pop();
    const fileName = `${path}/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;

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
      let fotoUrl = fotoPreview;
      let galeriUrls = [...galeriPreviews];

      // Upload main photo if new
      if (fotoFile) {
        fotoUrl = await uploadFile(fotoFile, "foto");
      }

      // Upload new gallery images
      if (galeriFiles.length > 0) {
        const existingCount = initialData?.galeri?.length || 0;
        const existingUrls = galeriUrls.slice(0, existingCount);
        const newUploads = await Promise.all(
          galeriFiles.map((f) => uploadFile(f, "galeri"))
        );
        galeriUrls = [...existingUrls, ...newUploads];
      }

      // Filter out blob URLs (only keep real URLs)
      galeriUrls = galeriUrls.filter((url) => !url.startsWith("blob:"));

      const data = {
        ...form,
        foto: fotoUrl,
        galeri: galeriUrls,
        instagram: form.instagram || null,
        tiktok: form.tiktok || null,
        facebook: form.facebook || null,
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

      {/* Nama */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2">Nama Usaha *</label>
        <input
          name="nama"
          value={form.nama}
          onChange={handleChange}
          required
          placeholder="Contoh: Warung Makan Sederhana"
          className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
        />
      </div>

      {/* Kategori */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2">Kategori *</label>
        <select
          name="kategori"
          value={form.kategori}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Deskripsi */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2">Deskripsi *</label>
        <textarea
          name="deskripsi"
          value={form.deskripsi}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Deskripsikan usaha secara detail..."
          className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-y"
        />
      </div>

      {/* Foto Utama */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2">Foto Utama {!initialData && "*"}</label>
        <input ref={fotoRef} type="file" accept="image/*" onChange={handleFotoChange} className="hidden" />
        <div className="flex items-start gap-4">
          {fotoPreview && (
            <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-100 relative flex-shrink-0">
              <Image src={fotoPreview} alt="Preview" fill sizes="128px" className="object-cover" />
            </div>
          )}
          <button
            type="button"
            onClick={() => fotoRef.current?.click()}
            className="px-4 py-2.5 border-2 border-dashed border-border rounded-xl text-sm text-text-muted hover:border-primary hover:text-primary transition-colors"
          >
            {fotoPreview ? "Ganti Foto" : "Upload Foto"}
          </button>
        </div>
      </div>

      {/* Galeri */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2">Galeri Foto</label>
        <input ref={galeriRef} type="file" accept="image/*" multiple onChange={handleGaleriChange} className="hidden" />
        <div className="flex flex-wrap gap-3 mb-3">
          {galeriPreviews.map((url, i) => (
            <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 group">
              <Image src={url} alt={`Galeri ${i + 1}`} fill sizes="96px" className="object-cover" />
              <button
                type="button"
                onClick={() => removeGaleriItem(i)}
                className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => galeriRef.current?.click()}
          className="px-4 py-2.5 border-2 border-dashed border-border rounded-xl text-sm text-text-muted hover:border-primary hover:text-primary transition-colors"
        >
          + Tambah Foto Galeri
        </button>
      </div>

      <hr className="border-border" />

      {/* Jam Buka */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2">Jam Buka</label>
        <input
          name="jam_buka"
          value={form.jam_buka}
          onChange={handleChange}
          placeholder="Contoh: Senin - Minggu (08.00 - 17.00 WIB)"
          className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
        />
      </div>

      {/* Lokasi */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2">Lokasi</label>
        <input
          name="lokasi"
          value={form.lokasi}
          onChange={handleChange}
          placeholder="Contoh: Dsn. Wonoyoso, Wonosobo"
          className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
        />
      </div>

      {/* WhatsApp */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2">Nomor WhatsApp</label>
        <input
          name="wa"
          value={form.wa}
          onChange={handleChange}
          placeholder="Contoh: 6281234567890"
          className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
        />
      </div>

      {/* Social Media */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">Instagram</label>
          <input
            name="instagram"
            value={form.instagram}
            onChange={handleChange}
            placeholder="@username"
            className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">TikTok</label>
          <input
            name="tiktok"
            value={form.tiktok}
            onChange={handleChange}
            placeholder="@username"
            className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">Facebook</label>
          <input
            name="facebook"
            value={form.facebook}
            onChange={handleChange}
            placeholder="Nama Facebook"
            className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>
      </div>

      {/* Google Maps */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2">Google Maps Embed URL</label>
        <input
          name="gmaps_embed"
          value={form.gmaps_embed}
          onChange={handleChange}
          placeholder="https://www.google.com/maps/embed?pb=..."
          className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2">Google Maps Link</label>
        <input
          name="gmaps_link"
          value={form.gmaps_link}
          onChange={handleChange}
          placeholder="https://maps.app.goo.gl/..."
          className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
        />
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
          ) : initialData ? "Simpan Perubahan" : "Tambah UMKM"}
        </button>
      </div>
    </form>
  );
}
