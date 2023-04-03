function isThisWeek(date) {
  const monday = getMonday(new Date());
  const sunday = getSunday(new Date());
  return date >= monday && date <= sunday;
}

function isWithin24Hours(in_24_hours) {
  return in_24_hours == "Yes" ? true : false;
}

function isWithinNextWeek(date) {
  const today = new Date();
  const nextWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 7
  );
  return date >= today && date < nextWeek;
}

function getMonday(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}

function getSunday(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? 0 : 7);
  return new Date(d.setDate(diff));
}

module.exports = {
  isWithinNextWeek: isWithinNextWeek,
  isThisWeek: isThisWeek,
  isWithin24Hours: isWithin24Hours,
  getSunday: getSunday,
  getMonday: getMonday,
};
