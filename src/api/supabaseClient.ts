import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";
import { Database } from "../types/supabase";

const supabaseUrl = "https://bcxsyqcdgqroskrqbuej.supabase.co";
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_API_KEY || "";
const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    ...(Platform.OS !== "web" ? { storage: AsyncStorage } : {}),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default supabase;
