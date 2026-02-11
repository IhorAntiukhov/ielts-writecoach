export default function formatFeedback(feedback: string) {
  let formatedFeedback = feedback;

  const index1 = feedback.indexOf("Weakness");
  const index2 = feedback.indexOf("Improvement");

  if (index1 !== -1) {
    formatedFeedback = `${feedback.slice(0, index1 - 1)}\n${feedback.slice(index1)}`;
  }
  if (index2 !== -1) {
    formatedFeedback = `${formatedFeedback.slice(0, index2 - 1)}\n${formatedFeedback.slice(index2)}`;
  }

  return formatedFeedback;
}
