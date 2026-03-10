export default function formatJSON(text: string) {
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error(error);

    return undefined;
  }
}
