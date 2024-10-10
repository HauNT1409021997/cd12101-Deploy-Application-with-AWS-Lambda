import { S3Client } from '@aws-sdk/client-s3'
import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import AWSXRay from 'aws-xray-sdk-core'
import commonObject from '../utils/dynamodbConnection.mjs'

const s3Client = AWSXRay.captureAWSv3Client(
  new S3Client({
    region: commonObject.environmentVariable.region,
    signatureVersion: 'v4'
  })
)
const bucketName = commonObject.environmentVariable.bucketName

export const getS3SignUrl = async (keyName, expiresIn = 3600) => {
  const { infoLogInstance } = commonObject.loggerInstance
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: keyName,
    ContentType: 'image/png'
  })
  infoLogInstance.info('PutObjectCommand command', command)
  let signedUrl = ''
  signedUrl = await getSignedUrl(s3Client, command, { expiresIn })
  console.log('signedUrl', signedUrl)
  return signedUrl
}
