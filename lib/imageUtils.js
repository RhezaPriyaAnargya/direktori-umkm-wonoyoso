export const processImageToWebp = async (file) => {
  let currentFile = file;

  // 1. Jika file adalah HEIC/HEIF, konversi dulu ke JPEG agar bisa dibaca browser
  const isHeic = file.name.toLowerCase().endsWith(".heic") || 
                 file.name.toLowerCase().endsWith(".heif") || 
                 file.type === "image/heic" || 
                 file.type === "image/heif";
                 
  if (isHeic) {
    const heic2any = (await import("heic2any")).default;
    const convertedBlob = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.8 });
    const blob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
    currentFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpeg", { type: "image/jpeg" });
  }

  // 2. Konversi gambar ke format WebP menggunakan Canvas (berlaku untuk semua gambar, termasuk yang aslinya JPG/PNG)
  return new Promise((resolve, reject) => {
    // Jika file aslinya sudah webp, kembalikan saja langsung
    if (currentFile.type === "image/webp") {
      resolve(currentFile);
      return;
    }

    const url = URL.createObjectURL(currentFile);
    const img = new Image();
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      
      const canvas = document.createElement("canvas");
      // Batasi dimensi maksimum jika diperlukan (misalnya 1200px) untuk hemat ruang
      const MAX_DIMENSION = 1200;
      let { width, height } = img;
      
      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        if (width > height) {
          height = Math.round((MAX_DIMENSION / width) * height);
          width = MAX_DIMENSION;
        } else {
          width = Math.round((MAX_DIMENSION / height) * width);
          height = MAX_DIMENSION;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        if (blob) {
          const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
          const webpFile = new File([blob], newFileName, { type: "image/webp" });
          resolve(webpFile);
        } else {
          reject(new Error("Gagal mengonversi gambar ke WebP"));
        }
      }, "image/webp", 0.8);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Gagal memuat gambar untuk dikonversi"));
    };

    img.src = url;
  });
};
