import moment from "moment";

export default function dateFormat(
  date: Date,
  outputFormat: string = "MMMM Do, YYYY"
) {
  return moment(date).format(outputFormat);
}
