import NepaliDate from "nepali-date-converter";

export default function getFormattedDateTime(date: Date) {
  const nepaliDate = new NepaliDate(date);

  const nepaliDateString = nepaliDate.format("ddd, DD MMMM YYYY");

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);

  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);

  return `${nepaliDateString} (${formattedDate}) at ${time}`;
}
