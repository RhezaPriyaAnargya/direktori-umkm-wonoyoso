import { supabaseAdmin } from "@/lib/supabase-server";

// Fetch all UMKM data (server-side)
export async function getAllUmkm() {
  const { data, error } = await supabaseAdmin
    .from("umkm")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching UMKM:", error);
    return [];
  }
  return data;
}

// Fetch single UMKM by ID (server-side)
export async function getUmkmById(id) {
  const { data, error } = await supabaseAdmin
    .from("umkm")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching UMKM by ID:", error);
    return null;
  }
  return data;
}

// Get all UMKM IDs for generateStaticParams
export async function getAllUmkmIds() {
  const { data, error } = await supabaseAdmin
    .from("umkm")
    .select("id");

  if (error) {
    console.error("Error fetching UMKM IDs:", error);
    return [];
  }
  return data.map((u) => ({ id: u.id }));
}
