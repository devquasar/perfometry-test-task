import { differenceInSeconds, format, subSeconds, subMinutes, subHours, subMonths, subYears } from 'date-fns'

const MINUTES_IN_HOUR = 1440
const MINUTES_IN_DAY = 1440

export function countDown(countDownDate, cb) {
  const countDownTime = countDownDate.getTime();
  const x = setInterval(function () {
    const now = new Date().getTime();
    const distance = countDownTime - now;

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);


    if (distance <= 1) {
      clearInterval(x);
      cb("0H 0M 0S 🎁");
      return
    }
    cb(`${hours}H ${minutes}M ${seconds}S`);

  }, 1000);
}

export function formatDistanceToNow(date) {
  const seconds = differenceInSeconds(new Date(), date)
  const minutes = Math.round(seconds / 60)
  const currentYear = new Date().getFullYear()

  if (seconds < 60) return 'just now'
  else if (minutes < MINUTES_IN_HOUR) return `${minutes}m ago`
  else if (minutes < MINUTES_IN_DAY) return `${Math.floor(minutes / MINUTES_IN_HOUR)}h ago`
  else if (minutes < (MINUTES_IN_DAY * 2)) return 'yesterday'
  else if (date.getFullYear() == currentYear) return format(date, 'd MMM')
  else if (date.getFullYear() < currentYear) return format(date, 'd MMM yyyy')

}

const dateArr = []

function getRandomArbitrary(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}

function fillDates() {
  for (let i = 1; i < 10; i++) {
    dateArr.push(subSeconds(new Date(), getRandomArbitrary(1, 60)))
    dateArr.push(subMinutes(new Date(), getRandomArbitrary(1, 60)))
    dateArr.push(subHours(new Date(), getRandomArbitrary(20, 50)))
    dateArr.push(subMonths(new Date(), getRandomArbitrary(1, 4)))
    dateArr.push(subYears(new Date(), getRandomArbitrary(1, 4)))
  }
}

fillDates()

function shuffleDate(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function userMapFn(user) {
  shuffleDate(dateArr)
  return {
    ...user,
    dateAdded: dateArr[0]
  }
}
