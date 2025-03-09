import moment from "moment";

export default function dateFormat(date, outputFormat = "MMMM Do, YYYY") {
  return moment().format(outputFormat);
}
