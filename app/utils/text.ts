export const cutText = (text: string, length: number, replace: string): string => {
  return text.length > length ? text.substring(0, length) + replace : text;
};