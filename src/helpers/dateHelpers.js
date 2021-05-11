import {
  differenceInSeconds,
  differenceInMinutes,
  format,
  subSeconds,
  subMinutes,
  subMonths,
  subYears,
  startOfToday,
  isYesterday
} from 'date-fns'

const MINUTES_IN_HOUR = 60
// const MINUTES_IN_DAY = 1440
const MS_IN_SEC = 1000 * 60

export function countDown(countDownDate, cb) {
  const countDownTime = countDownDate.getTime();
  const x = setInterval(function () {
    const now = new Date().getTime();
    const distance = countDownTime - now;

    const hours = Math.floor((distance % (MS_IN_SEC * 60 * 24)) / (MS_IN_SEC * 60));
    const minutes = Math.floor((distance % (MS_IN_SEC * 60)) / (MS_IN_SEC));
    const seconds = Math.floor((distance % MS_IN_SEC) / 1000);


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
  const minutesToday = Math.abs(differenceInMinutes(startOfToday(), date))
  const currentYear = new Date().getFullYear()

  if (seconds < 60) return 'just now'
  else if (minutes < MINUTES_IN_HOUR) return `${minutes}m ago`
  else if (minutes < minutesToday) return `${Math.floor(minutes / MINUTES_IN_HOUR)}h ago`
  else if (isYesterday(date)) return 'yesterday'
  else if (date.getFullYear() == currentYear) return format(date, 'd MMM')
  else if (date.getFullYear() < currentYear) return format(date, 'd MMM yyyy')

}

const times = function (n, iterator) {
  var accum = Array(Math.max(0, n));
  for (var i = 0; i < n; i++) accum[i] = iterator.call();
  return accum;
};

const dateArr = [
  ...times(10, () => subSeconds(new Date(), getRandomCeil(1, 60))),
  ...times(10, () => subMinutes(new Date(), getRandomCeil(1, 60))),
  new Date('2021-05-01T09:01:01'),
  new Date('2021-05-04T11:01:01'),
  new Date('2021-05-07T12:01:01'),
  new Date('2021-05-10T13:01:01'),
  new Date('2021-05-13T14:01:01'),
  new Date('2021-05-14T15:01:01'),
  new Date('2021-05-17T16:01:01'),
  new Date('2021-05-22T17:01:01'),
  new Date('2021-05-25T18:01:01'),
  new Date('2021-05-29T20:01:01'),
  ...times(10, () => subMonths(new Date(), getRandomCeil(1, 4))),
  ...times(10, () => subYears(new Date(), getRandomCeil(1, 4)))
]

function getRandomCeil(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}

export function usersMapWithPage(page) {
  return function (user, index) {
    const dateIndex = page === 1 ? index : page === 2 ? (page * 20) - (20 - index) : (page - 1) * 20 + index
    return {
      ...user,
      dateAdded: dateArr[dateIndex]
    }
  }
}
