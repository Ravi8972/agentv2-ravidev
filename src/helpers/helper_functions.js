export const makeServerDate = (date) => {
  return new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
  ).toLocaleString("en-US");
};

export const addCommasToNumber = (val) => {
  if (val) {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return 0;
  }
};

export function convertUTCToLocalTime(dateTimeString) {
  if (!dateTimeString) {
    return;
  }

  let d;
  if (dateTimeString?.includes("T")) {
    d = new Date(dateTimeString);
  } else {
    const parts = dateTimeString?.split(" ");
    const datePart = parts[0];
    const timePart = parts[1];
    const [year, month, day] = datePart.split("-");
    const [hours, minutes, seconds] = timePart.split(":");
    d = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));
  }

  const year = d.getFullYear();
  const month = ("0" + (d.getMonth() + 1)).slice(-2); // Months are 0-based
  const day = ("0" + d.getDate()).slice(-2);
  const hours = ("0" + d.getHours()).slice(-2);
  const minutes = ("0" + d.getMinutes()).slice(-2);
  const seconds = ("0" + d.getSeconds()).slice(-2);

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
