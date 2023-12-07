const date = new Date();

const dateDay = date.getDate();
const dateMonth = date.getMonth();
const dateYear = date.getFullYear();

document.getElementById("date").innerHTML =
  "DATE:  " + dateDay + "/ " + dateMonth + "/ " + dateYear;
