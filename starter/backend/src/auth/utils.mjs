import { decode } from 'jsonwebtoken'
import commonObject from '../utils/dynamodbConnection.mjs'
/**
 * Parse a JWT token and return a user id
 * @param jwtToken JWT token to parse
 * @returns a user id from the JWT token
 */
export function parseUserId(jwtToken) {
  const { infoLogInstance } = commonObject.loggerInstance
  const decodedJwt = decode(jwtToken)
  infoLogInstance.info('parse userId successfully', decodedJwt)
  return decodedJwt.sub
}
