export function convertToReadableDate(dateString: string): string {
  const date: Date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const readableDate: string = date.toLocaleDateString("en-US", options);

  return readableDate;
}
