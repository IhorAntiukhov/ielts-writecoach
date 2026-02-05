import supabase from "./supabaseClient";

export async function uploadImage(
  bucket: string,
  path: string,
  file: ArrayBuffer,
  contentType: string,
  upsert?: boolean,
) {
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    contentType: contentType,
    upsert,
  });

  if (error) throw error;
}

export async function deleteImage(bucket: string, path: string) {
  const { error } = await supabase.storage.from(bucket).remove([path]);

  if (error) throw error;
}

export async function getPublicUrl(bucket: string, path: string) {
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(path);

  return publicUrl;
}
