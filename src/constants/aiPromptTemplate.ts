import EssayReview from "../screens/analytics/types/essayReviewsType";
import AiPromptEssayType from "../types/aiPromptEssayType";
import formatAiPromptEssayType from "../utils/formatAiPromptEssayType";

export function getEssayAnalysisPrompt(
  taskType: AiPromptEssayType,
  isImageIncluded: boolean,
  instructions: string,
  essay: string,
) {
  return `
Evaluate the following IELTS ${taskType} essay.

For EACH criterion below:
- Assign a band score from 0–9
- Use HALF bands (x.5) whenever performance falls between two band levels
- Identify at least ONE clear strength and ONE clear weakness
- Provide 1–2 concrete examples of how the weakness could be improved (no full rewrites)

Criteria:
1. Task Response
2. Coherence and Cohesion
3. Lexical Resource
4. Grammatical Range and Accuracy

Essay instructions${isImageIncluded ? " (see image)" : ""}:
${instructions}

User essay:
${essay}

Rules:
- Unless the performance clearly meets Band 9, EVERY criterion must include both strengths and weaknesses
- Use Band 9 ONLY for near-perfect performance with no noticeable weaknesses
- Do NOT add or rename criteria
- Output ONLY valid JSON matching the required schema
- If uncertain between two bands, choose the lower or a half band
`;
}

export const systemInstruction =
  "You are an experienced IELTS Writing examiner. Evaluate essays strictly using official IELTS band descriptors." as const;

export function getFullEssayRewritePrompt(
  taskType: AiPromptEssayType,
  isImageIncluded: boolean,
  instructions: string,
  originalEssay: string,
) {
  return `
Rewrite the following IELTS ${taskType} essay to improve clarity, coherence, vocabulary, and grammatical accuracy while preserving the student's original ideas as much as possible.

Requirements:
- Fully address the task
- Keep the original meaning and arguments unless they are clearly incorrect
- Improve logical flow and paragraph structure
- Use natural, academic language appropriate for IELTS
- Do NOT make it unnecessarily complex
- Do NOT add completely new arguments
- Keep the length appropriate for ${taskType}

Essay instructions${isImageIncluded ? " (see image)" : ""}:
${instructions}

Original essay:
${originalEssay}

Output:
Provide only the improved full essay text.
Do not include explanations, comments, or analysis.
`;
}

export function getGlobalReportPrompt(essayReviews: EssayReview[]) {
  return `
You are analyzing a student's progress in IELTS writing.

Below are multiple past essay reviews. Each review contains feedback on:
- Task Response
- Coherence and Cohesion
- Lexical Resource
- Grammatical Range and Accuracy

Your task:

1. Identify recurring strengths (mentioned in at least TWO different essays).
2. Identify recurring weaknesses (mentioned in at least TWO different essays).
3. Identify the SINGLE most prominent weakness overall.
4. Provide 3 clear, prioritized improvement recommendations.
5. If no clear recurring patterns exist, state that explicitly.

Important rules:
- Base your analysis ONLY on the provided feedback.
- Do NOT invent issues that are mentioned only once.
- Focus on patterns, not isolated comments.
- Be concise but specific.
- Do NOT evaluate the essays again.

Student review history:
${essayReviews.map(
  (review, index) =>
    `
Essay #${index + 1} (${formatAiPromptEssayType(review.type)}):
Task Response: ${review.task_response_band}
${review.task_response_feedback}
Coherence & Cohesion: ${review.coherence_band}
${review.coherence_feedback}
Lexical Resource: ${review.vocabulary_band}
${review.vocabulary_feedback}
Grammatical range & Accuracy: ${review.grammar_band}
${review.grammar_feedback}

`,
)}
`;
}
