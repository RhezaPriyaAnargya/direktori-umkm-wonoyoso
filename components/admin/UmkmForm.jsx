"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import ImageCropper from "./ImageCropper";

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
  const [galeriItems, setGaleriItems] = useState(() => {
    return (initialData?.galeri || []).map((url) => ({
      id: Math.random().toString(36).substring(7),
      url,
      file: null,
    }));
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const fotoRef = useRef(null);
  const galeriRef = useRef(null);

  const [processingHeic, setProcessingHeic] = useState(false);

  // State untuk antrean crop
  const [currentCrop, setCurrentCrop] = useState(null); 
  const [cropQueue, setCropQueue] = useState([]);

  // State untuk Drag and Drop (desktop)
  const [draggedIndex, setDraggedIndex] = useState(null);

  // State untuk Touch Drag and Drop (mobile)
  const [touchDragIndex, setTouchDragIndex] = useState(null);
  const [touchOverIndex, setTouchOverIndex] = useState(null);
  // State untuk tap-to-swap (mobile)
  const [selectedForSwap, setSelectedForSwap] = useState(null);
  
  const touchStartPos = useRef(null);
  const galeriContainerRef = useRef(null);
  const itemRefs = useRef([]);

  const CATEGORIES = ["Kuliner", "Kerajinan", "Jasa", "Pertanian", "Peternakan", "Kerajinan & Jasa"];

  const handleChange = (e) => {
    let value = e.target.value;
    
    // Auto-extract URL jika admin mem-paste seluruh kode <iframe>
    if (e.target.name === "gmaps_embed" && value.includes("<iframe")) {
      const match = value.match(/src="([^"]+)"/);
      if (match && match[1]) {
        value = match[1];
      }
    }
    
    setForm({ ...form, [e.target.name]: value });
  };

  const handleFotoChange = async (e) => {
    const rawFile = e.target.files[0];
    if (rawFile) {
      const isImage = rawFile.type.startsWith("image/") || rawFile.name.toLowerCase().endsWith(".heic") || rawFile.name.toLowerCase().endsWith(".heif");
      if (!isImage) {
        setError("File Foto Utama harus berupa gambar (JPEG, PNG, WebP, HEIC, dll).");
        return;
      }
      setError("");
      setProcessingHeic(true);
      
      try {
        let file = rawFile;
        const isHeic = file.name.toLowerCase().endsWith(".heic") || file.name.toLowerCase().endsWith(".heif") || file.type === "image/heic" || file.type === "image/heif";
        
        if (isHeic) {
          const heic2any = (await import("heic2any")).default;
          const convertedBlob = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.8 });
          const blob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
          file = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpeg", { type: "image/jpeg" });
        }

        // Jangan langsung simpan, masukkan ke state crop dulu
        setCurrentCrop({ type: 'foto', url: URL.createObjectURL(file), originalFile: file });
      } catch (err) {
        console.error("HEIC processing error:", err);
        setError("Gagal memproses gambar. Pastikan file valid.");
      } finally {
        setProcessingHeic(false);
        // Reset input agar bisa memilih file yang sama lagi jika batal
        e.target.value = "";
      }
    }
  };

  const handleGaleriChange = async (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(f => f.type.startsWith("image/") || f.name.toLowerCase().endsWith(".heic") || f.name.toLowerCase().endsWith(".heif"));
    
    if (validFiles.length !== files.length) {
      setError("Beberapa file ditolak karena bukan format gambar.");
    } else {
      setError("");
    }

    if (validFiles.length > 0) {
      setProcessingHeic(true);
      try {
        const processedFiles = [];
        for (let rawFile of validFiles) {
          let file = rawFile;
          const isHeic = file.name.toLowerCase().endsWith(".heic") || file.name.toLowerCase().endsWith(".heif") || file.type === "image/heic" || file.type === "image/heif";
          
          if (isHeic) {
            const heic2any = (await import("heic2any")).default;
            const convertedBlob = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.8 });
            const blob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
            file = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpeg", { type: "image/jpeg" });
          }
          processedFiles.push(file);
        }

        const newQueue = processedFiles.map(f => ({ type: 'galeri', url: URL.createObjectURL(f), originalFile: f }));
        
        if (!currentCrop) {
          setCurrentCrop(newQueue[0]);
          setCropQueue(prev => [...prev, ...newQueue.slice(1)]);
        } else {
          setCropQueue(prev => [...prev, ...newQueue]);
        }
      } catch (err) {
        console.error("HEIC processing error:", err);
        setError("Gagal memproses beberapa gambar. Pastikan file valid.");
      } finally {
        setProcessingHeic(false);
        e.target.value = "";
      }
    } else {
      e.target.value = "";
    }
  };

  const handleCropComplete = (croppedFile) => {
    if (currentCrop.type === 'foto') {
      setFotoFile(croppedFile);
      setFotoPreview(URL.createObjectURL(croppedFile));
    } else {
      setGaleriItems((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(7),
          url: URL.createObjectURL(croppedFile),
          file: croppedFile,
        },
      ]);
    }
    
    // Lanjut ke antrean berikutnya jika ada
    if (cropQueue.length > 0) {
      setCurrentCrop(cropQueue[0]);
      setCropQueue((prev) => prev.slice(1));
    } else {
      setCurrentCrop(null);
    }
  };

  const handleCropCancel = () => {
    // Lewati file ini, lanjut ke antrean berikutnya jika ada
    if (cropQueue.length > 0) {
      setCurrentCrop(cropQueue[0]);
      setCropQueue((prev) => prev.slice(1));
    } else {
      setCurrentCrop(null);
    }
  };

  const removeGaleriItem = (index) => {
    setGaleriItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    // Needed for Firefox
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, index) => {
    e.preventDefault(); // Allow drop
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newItems = [...galeriItems];
    const draggedItem = newItems[draggedIndex];
    newItems.splice(draggedIndex, 1);
    newItems.splice(index, 0, draggedItem);

    setGaleriItems(newItems);
    setDraggedIndex(null);
  };

  // ===== Touch Drag and Drop (Mobile) =====
  const handleTouchStart = useCallback((e, index) => {
    const touch = e.touches[0];
    touchStartPos.current = { x: touch.clientX, y: touch.clientY };
    // Use a timeout to differentiate tap from drag
    const timer = setTimeout(() => {
      setTouchDragIndex(index);
    }, 200);
    // Store timer so we can cancel it on quick taps
    touchStartPos.current.timer = timer;
  }, []);

  const handleTouchMove = useCallback((e, index) => {
    if (touchDragIndex === null && touchStartPos.current) {
      const touch = e.touches[0];
      const dx = Math.abs(touch.clientX - touchStartPos.current.x);
      const dy = Math.abs(touch.clientY - touchStartPos.current.y);
      // If moved enough, start dragging immediately
      if (dx > 10 || dy > 10) {
        clearTimeout(touchStartPos.current.timer);
        setTouchDragIndex(index);
        e.preventDefault();
      }
      return;
    }
    
    if (touchDragIndex === null) return;
    e.preventDefault(); // Prevent scrolling while dragging

    const touch = e.touches[0];
    const container = galeriContainerRef.current;
    if (!container) return;

    // Find which item the finger is over
    const items = container.children;
    let overIdx = null;
    for (let i = 0; i < items.length; i++) {
      const rect = items[i].getBoundingClientRect();
      if (
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom
      ) {
        overIdx = i;
        break;
      }
    }
    setTouchOverIndex(overIdx);
  }, [touchDragIndex]);

  const handleTouchEnd = useCallback(() => {
    if (touchStartPos.current?.timer) {
      clearTimeout(touchStartPos.current.timer);
    }
    
    if (touchDragIndex !== null && touchOverIndex !== null && touchDragIndex !== touchOverIndex) {
      setGaleriItems(prev => {
        const newItems = [...prev];
        const draggedItem = newItems[touchDragIndex];
        newItems.splice(touchDragIndex, 1);
        newItems.splice(touchOverIndex, 0, draggedItem);
        return newItems;
      });
    }
    setTouchDragIndex(null);
    setTouchOverIndex(null);
    touchStartPos.current = null;
  }, [touchDragIndex, touchOverIndex]);

  // ===== Tap to Swap (Mobile Alternative) =====
  const handleItemClick = (index) => {
    if (selectedForSwap === null) {
      setSelectedForSwap(index);
    } else if (selectedForSwap === index) {
      setSelectedForSwap(null); // Deselect
    } else {
      // Swap
      setGaleriItems((prev) => {
        const newItems = [...prev];
        const temp = newItems[selectedForSwap];
        newItems[selectedForSwap] = newItems[index];
        newItems[index] = temp;
        return newItems;
      });
      setSelectedForSwap(null);
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

      // Upload main photo if new
      if (fotoFile) {
        fotoUrl = await uploadFile(fotoFile, "foto");
      }

      // Upload gallery items sequentially to preserve order
      let galeriUrls = [];
      for (const item of galeriItems) {
        if (item.file) {
          const url = await uploadFile(item.file, "galeri");
          galeriUrls.push(url);
        } else {
          galeriUrls.push(item.url);
        }
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
      
      {/* Overlay Cropper */}
      {currentCrop && (
        <ImageCropper 
          imageSrc={currentCrop.url}
          aspectRatio={currentCrop.type === 'foto' ? 16/9 : 4/3}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
        />
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
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Nama */}
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-2">Nama Usaha <span className="text-red-500">*</span></label>
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
        <label className="block text-sm font-semibold text-text-primary mb-2">Kategori <span className="text-red-500">*</span></label>
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
        <label className="block text-sm font-semibold text-text-primary mb-1">Deskripsi <span className="text-red-500">*</span></label>
        <p className="text-xs text-text-muted mb-3 font-normal">Isi dengan produk/jasa apa yang dijual beserta keunggulannya.</p>
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
        <label className="block text-sm font-semibold text-text-primary mb-1">Foto Utama {!initialData && <span className="text-red-500">*</span>}</label>
        <p className="text-xs text-text-muted mb-3">Format yang didukung: JPG, PNG, WebP, HEIC (Maks. 5MB). Kamu bisa langsung mengambil dari kamera.</p>
        <input ref={fotoRef} type="file" accept="image/jpeg, image/png, image/webp, .heic, .heif" onChange={handleFotoChange} className="hidden" />
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
        <label className="block text-sm font-semibold text-text-primary mb-1">Galeri Foto</label>
        <p className="text-xs text-text-muted mb-3">Pilih beberapa foto sekaligus untuk menampilkan produk/suasana tempat. Drag and drop untuk mengubah urutan.</p>
        <input ref={galeriRef} type="file" accept="image/jpeg, image/png, image/webp, .heic, .heif" multiple onChange={handleGaleriChange} className="hidden" />
        <div ref={galeriContainerRef} className="flex flex-wrap gap-3 mb-3">
          {galeriItems.map((item, i) => {
            const isDragging = touchDragIndex === i || draggedIndex === i;
            const isDropTarget = touchDragIndex !== null && touchOverIndex === i && touchDragIndex !== i;
            const isSelectedForSwap = selectedForSwap === i;
            
            return (
              <div 
                key={item.id} 
                draggable
                onClick={() => handleItemClick(i)}
                onDragStart={(e) => handleDragStart(e, i)}
                onDragOver={(e) => handleDragOver(e, i)}
                onDrop={(e) => handleDrop(e, i)}
                onTouchStart={(e) => handleTouchStart(e, i)}
                onTouchMove={(e) => handleTouchMove(e, i)}
                onTouchEnd={handleTouchEnd}
                className={`relative w-24 h-24 rounded-lg overflow-visible bg-gray-100 group cursor-grab active:cursor-grabbing transition-all duration-150 select-none touch-none ${isDragging ? 'opacity-50 scale-95' : 'opacity-100'} ${isDropTarget ? 'ring-2 ring-primary ring-offset-2' : ''} ${isSelectedForSwap ? 'ring-4 ring-accent ring-offset-2 scale-105 z-10' : ''}`}
              >
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image src={item.url} alt={`Galeri ${i + 1}`} fill sizes="96px" className="object-cover pointer-events-none" />
                </div>
                
                {/* Drag Handle Overlay */}
                <div className={`absolute inset-0 rounded-lg transition-colors flex items-center justify-center ${isDragging || isSelectedForSwap ? 'bg-primary/20' : 'bg-black/0 group-hover:bg-black/10'}`}>
                  {isSelectedForSwap ? (
                    <svg className="w-8 h-8 text-white drop-shadow-md" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className={`w-6 h-6 text-white drop-shadow-md transition-opacity pointer-events-none ${isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  )}
                </div>

                {/* Order indicator */}
                <span className="absolute bottom-0.5 left-0.5 w-5 h-5 bg-black/60 text-white text-[10px] font-bold rounded-md flex items-center justify-center pointer-events-none">
                  {i + 1}
                </span>

                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeGaleriItem(i); }}
                  className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs flex items-center justify-center shadow-lg opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-20 touch-manipulation"
                >
                  ✕
                </button>
              </div>
            );
          })}
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
          <label className="block text-sm font-semibold text-text-primary mb-2">Instagram <span className="font-normal text-text-muted">(Opsional)</span></label>
          <input
            name="instagram"
            value={form.instagram}
            onChange={handleChange}
            placeholder="@username"
            className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">TikTok <span className="font-normal text-text-muted">(Opsional)</span></label>
          <input
            name="tiktok"
            value={form.tiktok}
            onChange={handleChange}
            placeholder="@username"
            className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">Facebook <span className="font-normal text-text-muted">(Opsional)</span></label>
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
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">
            Google Maps Embed URL <span className="text-text-muted font-normal">(Opsional untuk peta presisi)</span>
          </label>
          <input
            name="gmaps_embed"
            value={form.gmaps_embed || ""}
            onChange={handleChange}
            placeholder="Kutipan dari Google Maps > Share > Embed a map (src='https://www.google.com/maps/embed?pb=...')"
            className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
          <p className="text-xs text-text-muted mt-1.5">
            Jika diisi, peta akan muncul langsung di halaman UMKM sesuai titik. Jika kosong, peta embed akan menggunakan perkiraan lokasi atau disembunyikan.
          </p>
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
