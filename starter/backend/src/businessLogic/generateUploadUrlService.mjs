import { updateAndAddNewColumn } from '../dataLayer/todoDynamodbAccessLayer.mjs'
import { getS3SignUrl } from '../dataLayer/todoS3AccessLayer.mjs'
import { getUserId } from '../lambda/utils.mjs'
import commonObject from '../utils/dynamodbConnection.mjs'

const generateImageUploadUrl = async (event) => {
  const userId = getUserId(event)
  const todoId = event.pathParameters.todoId // Extracting todoId correctly
  const { infoLogInstance } = commonObject.loggerInstance

  // Logging for debugging
  infoLogInstance.info('event', event)
  infoLogInstance.info('userId', userId)
  infoLogInstance.info('todoId', todoId)
  let imageId = `${userId}${todoId}`
  // Generate signed URL for S3 upload
  const imageUrl = await getS3SignUrl(
    imageId, // Ensure the path format is correct
    commonObject.environmentVariable.urlExpiration
  )

  infoLogInstance.info('imageUrl', imageUrl)

  // Update DynamoDB item
  const todo = await updateAndAddNewColumn({
    TableName: commonObject.environmentVariable.todosTableName,
    Key: {
      todoId,
      userId
    },
    UpdateExpression:
      'SET attachmentUrl = :attachmentUrl, createAt = :createAt',
    ExpressionAttributeValues: {
      ':attachmentUrl': imageUrl.split('?')[0],
      ':createAt': new Date().toISOString()
    },
    ReturnValues: 'UPDATED_NEW'
  })

  infoLogInstance.info('dynamoDb.update todo', todo)

  return imageUrl // Returning the signed URL
}

export default generateImageUploadUrl
