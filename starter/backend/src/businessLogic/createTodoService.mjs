import {
  createRecord,
  getRecord
} from '../dataLayer/todoDynamodbAccessLayer.mjs'
import { getUserId } from '../lambda/utils.mjs'
import { v4 as uuidv4 } from 'uuid'
import commonObject from '../utils/dynamodbConnection.mjs'

const createTodoService = async (event) => {
  const { infoLogInstance } = commonObject.loggerInstance
  const newTodo = JSON.parse(event.body)

  infoLogInstance.info('Create New Todo event:', event)

  newTodo.userId = getUserId(event)
  newTodo.todoId = uuidv4()

  infoLogInstance.info('Create New Todo:', newTodo)

  await createRecord({
    TableName: commonObject.environmentVariable.todosTableName,
    Item: newTodo,
    ReturnValues: 'ALL_OLD'
  })

  const result = await getRecord({
    TableName: commonObject.environmentVariable.todosTableName,
    KeyConditionExpression: 'userId = :userId AND todoId = :todoId',
    ExpressionAttributeValues: {
      ':userId': newTodo.userId,
      ':todoId': newTodo.todoId
    },
    Limit: 1,
    ScanIndexForward: false
  })
  infoLogInstance.info('Create Todo Success result', result)
  return result
}

export default createTodoService
