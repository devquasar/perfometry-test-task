import { usersMapWithPage } from './dateHelpers'

const BATCH_SIZE = 20;
const USERS_LIMIT = 50;
const MAX_PAGE = Math.ceil(USERS_LIMIT / BATCH_SIZE)

export async function getUsers(page) {
  let neededUsers = page * BATCH_SIZE - USERS_LIMIT

  const userMapFn = usersMapWithPage(page)

  const res = await fetch(
    `https://randomuser.me/api/?page=${page}&results=${page === MAX_PAGE ? neededUsers : BATCH_SIZE
    }`
  );
  const parsed = await res.json();
  const mapped = parsed.results.map(userMapFn).sort((a, b) => {
    return new Date(b.dateAdded) - new Date(a.dateAdded);
  })
  return mapped
}
