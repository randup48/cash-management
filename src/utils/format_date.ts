import moment from "moment";

export const convertEpoch = (dateEpoch: number): string => {
  return moment(dateEpoch ?? 0).format("MMMM, YYYY ");
};
