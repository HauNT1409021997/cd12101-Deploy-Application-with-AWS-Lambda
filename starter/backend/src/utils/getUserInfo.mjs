import { getUserId } from '../lambda/utils.mjs'

const userInfo = {}
const extractUserInfo = (authorization) => {
  const userId = getUserId(authorization)
  userInfo[userId] = userId
  return userInfo
}

export default extractUserInfo
