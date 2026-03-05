import { Database } from "./supabase";

type FeedbackAvailabilityType =
  Database["public"]["Enums"]["FeedbackAvailability"];

export default FeedbackAvailabilityType;
