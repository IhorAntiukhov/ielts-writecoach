import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, processLock } from "@supabase/supabase-js";
import { Platform } from "react-native";

const supabaseUrl = "https://bcxsyqcdgqroskrqbuej.supabase.co";
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_API_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    ...(Platform.OS !== "web" ? { storage: AsyncStorage } : {}),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    lock: processLock,
  },
});

export default supabase;
