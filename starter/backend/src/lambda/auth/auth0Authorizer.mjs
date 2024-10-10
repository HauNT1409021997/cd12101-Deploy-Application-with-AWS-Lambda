import Axios from 'axios'
import createLogger from '../../utils/logger.mjs'
import pkg from 'jsonwebtoken' // Default import
const { verify } = pkg // Destructure to get 'verify'
import commonObject from '../../utils/dynamodbConnection.mjs'

const logger = createLogger('auth')
const jwksUrl = `https://${commonObject.environmentVariable.auth0Domain}/.well-known/jwks.json`

export async function handler(event) {
  try {
    const jwtToken = await verifyToken(event.authorizationToken)
    logger.info('User was authorized', jwtToken)

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*' // Consider customizing this
          }
        ]
      }
    }
  } catch (e) {
    logger.error('User not authorized', { error: e.message })

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

async function verifyToken(authHeader) {
  const token = getToken(authHeader)
  console.log('verifyToken getToken', token)
  // TODO: Implement token verification
  const res = await Axios.get(jwksUrl)
  const signKeys = res['data']['keys'][0]['x5c'][0]
  if (!signKeys.length) throw new Error('error')
  const certificate = `-----BEGIN CERTIFICATE-----\n${signKeys}\n-----END CERTIFICATE-----`
  console.log('certificate', certificate)
  return verify(token, certificate, { algorithms: ['RS256'] })
}

function getToken(authHeader) {
  console.log('getToken authHeader', authHeader)
  if (!authHeader) throw new Error('No authentication header')
  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')
  const split = authHeader.split(' ')
  const token = split[1]
  console.log('const token = split[1]', token)
  return token
}
