export default function isDateBeforeToday(date: any) {
  console.log(date);
  return new Date(date.toDateString()) < new Date(new Date().toDateString());
}
