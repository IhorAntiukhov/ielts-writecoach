import { generateGlobalReport } from "@/src/api/gemini";
import { saveGlobalReport } from "@/src/api/globalReportRepo";
import supabase from "@/src/api/supabaseClient";
import EssayAndAllType from "../types/essayAndAllType";
import TimeIntervalType from "../types/timeInterval";

export default async function getGlobalReport(
  userId: string,
  timeInterval: TimeIntervalType,
  essayType: EssayAndAllType,
) {
  const { data: essayReviews, error: essayReviewsError } = await supabase.rpc(
    "get_essay_reviews",
    {
      p_user_id: userId,
      time_interval: Number(timeInterval),
      essay_type: essayType === "all" ? undefined : essayType,
    },
  );

  if (essayReviewsError) return essayReviewsError;

  if (!essayReviews) return;

  const response = await generateGlobalReport(essayReviews);

  const feedback = response.candidates?.[0].content?.parts?.[0].text;

  if (!feedback) throw Error("Failed to generate global report");

  const endDate = new Date();
  const startDate = new Date(0);

  if (timeInterval !== "999999")
    startDate.setTime(
      endDate.getTime() - Number(timeInterval) * 1000 * 60 * 60 * 24,
    );

  await saveGlobalReport(startDate, endDate, feedback, userId);
}
