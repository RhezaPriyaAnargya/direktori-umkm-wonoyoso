import { supabaseAdmin } from "@/lib/supabase-server";

// Fetch all berita (server-side), terbaru di atas
export async function getAllBerita() {
  const { data, error } = await supabaseAdmin
    .from("berita")
    .select("*, umkm:umkm_id(id, nama)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching berita:", error);
    return [];
  }
  return data;
}

// Fetch single berita by ID (server-side)
export async function getBeritaById(id) {
  const { data, error } = await supabaseAdmin
    .from("berita")
    .select("*, umkm:umkm_id(id, nama, foto, kategori)")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching berita by ID:", error);
    return null;
  }
  return data;
}

// Fetch latest N berita (server-side, untuk homepage)
export async function getLatestBerita(limit = 3) {
  const { data, error } = await supabaseAdmin
    .from("berita")
    .select("*, umkm:umkm_id(id, nama)")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching latest berita:", error);
    return [];
  }
  return data;
}
