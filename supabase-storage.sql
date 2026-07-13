-- ============================================
-- Jalankan ini SETELAH menjalankan supabase-setup.sql
-- Script ini membuat Storage Bucket untuk upload gambar
-- ============================================

-- Buat bucket untuk gambar UMKM (public agar bisa diakses semua orang)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('umkm-images', 'umkm-images', true)
ON CONFLICT (id) DO NOTHING;

-- Policy: Semua orang bisa melihat/download gambar
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'umkm-images');

-- Policy: User yang sudah login bisa upload gambar
CREATE POLICY "Authenticated Upload" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'umkm-images');

-- Policy: User yang sudah login bisa update/replace gambar
CREATE POLICY "Authenticated Update" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'umkm-images');

-- Policy: User yang sudah login bisa hapus gambar
CREATE POLICY "Authenticated Delete" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'umkm-images');
