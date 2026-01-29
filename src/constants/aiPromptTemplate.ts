import AiPromptEssayType from "../types/aiPromptEssayType";

export function getAiPromptTemplate(
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
