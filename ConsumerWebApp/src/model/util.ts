
export function objToGrahqlStr(obj: any): string {
  const str = JSON.stringify(obj);
  return str.replace(/\"([^(\")"]+)\":/g, '$1:');
}
