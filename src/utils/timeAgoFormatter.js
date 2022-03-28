import moment from "moment";

export const timeAgoFormatter = date => {
  let dateInArray = moment(date).toArray();
  return moment(dateInArray).fromNow();
};
