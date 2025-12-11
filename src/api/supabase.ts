import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bcxsyqcdgqroskrqbuej.supabase.co";
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_API_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
