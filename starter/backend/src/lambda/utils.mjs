import { parseUserId } from '../auth/utils.mjs'

export function getUserId(event) {
  console.log('event.headers', event.headers)
  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1]

  return parseUserId(jwtToken)
}
