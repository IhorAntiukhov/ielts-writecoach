export default function formatGlobalReport(globalReport: string) {
  try {
    return JSON.parse(globalReport);
  } catch (error) {
    console.error(error);

    return undefined;
  }
}
