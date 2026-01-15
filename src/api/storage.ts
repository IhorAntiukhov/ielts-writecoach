import supabase from "./supabaseClient";

export async function uploadImage(
  path: string,
  file: ArrayBuffer,
  contentType?: string,
  upsert?: boolean,
) {
  const { error } = await supabase.storage.from("avatars").upload(path, file, {
    contentType: contentType,
    upsert,
  });

  if (error) throw error;
}

export async function getPublicUrl(path: string) {
  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(path);

  return publicUrl;
}
