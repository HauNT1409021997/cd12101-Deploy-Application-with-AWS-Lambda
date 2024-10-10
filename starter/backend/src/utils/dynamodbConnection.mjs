import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import AWSXRay from 'aws-xray-sdk-core'
import createLogger from './logger.mjs'

const dynamoDbClient = AWSXRay.captureAWSv3Client(
  new DynamoDBClient({
    region: 'us-east-1'
  })
)
const documentClient = DynamoDBDocumentClient.from(dynamoDbClient)

console.log('initialize dynamoDB successfully', documentClient)
const commonObject = {
  dynamodbInstance: documentClient,
  environmentVariable: {
    todosTableName: process.env.TODOS_TABLE,
    imagesTableName: process.env.IMAGES_TABLE,
    bucketName: process.env.IMAGES_S3_BUCKET,
    userIdIndex: process.env.TODOS_CREATED_AT_INDEX,
    urlExpiration: parseInt(process.env.SIGNED_URL_EXPIRATION),
    region: process.env.REGION,
    auth0Domain: process.env.AUTH0_DOMAIN
  },
  loggerInstance: {
    infoLogInstance: createLogger(process.env.LOGGER_NAME, 'info'),
    errorLogInstance: createLogger(process.env.LOGGER_NAME, 'error')
  }
}
console.log('initialize common info successfully', commonObject)
export default commonObject
