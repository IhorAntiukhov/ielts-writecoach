import { Database } from "@/src/types/supabase";

type EssayReview =
  Database["public"]["Functions"]["get_essay_reviews"]["Returns"][number];

export default EssayReview;
