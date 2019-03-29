const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const currentDay = new Date().getDay();
document.getElementById('day').textContent = WEEK_DAYS[currentDay - 1];