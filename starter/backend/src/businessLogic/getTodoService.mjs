import { getRecord } from '../dataLayer/todoDynamodbAccessLayer.mjs'
import { getUserId } from '../lambda/utils.mjs'
import commonObject from '../utils/dynamodbConnection.mjs'

const getAllTodosService = async (event) => {
  const { infoLogInstance, errorLogInstance } = commonObject.loggerInstance
  infoLogInstance.info('event.headers', event.headers)

  let userId = getUserId(event)
  infoLogInstance.info('userId', userId)

  const result = await getRecord({
    TableName: commonObject.environmentVariable.todosTableName,
    // IndexName: commonObject.environmentVariable.userIdIndex,
    KeyConditionExpression: 'userId = :userId', // The partition key
    ExpressionAttributeValues: {
      ':userId': userId // The actual value for the partition key
    }
  })

  infoLogInstance.info('Get Todos Succeeded')
  return result
}

export default getAllTodosService
