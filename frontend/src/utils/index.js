const showFormattedDate = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("id-ID", options);
};

const formatDate = (date) => {
  let currentDate = date;
  currentDate = currentDate.split(" ");
  let newDate = currentDate[0];

  return newDate;
};

export { showFormattedDate, formatDate };
