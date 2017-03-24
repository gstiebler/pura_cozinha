
export function removeJSONQuotes(input: any): string {
  const str = JSON.stringify(input);
  return str.replace(/\"([^(\")"]+)\":/g, '$1:');
}