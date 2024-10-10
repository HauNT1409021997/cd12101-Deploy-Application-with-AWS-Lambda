import { updateRecord } from '../dataLayer/todoDynamodbAccessLayer.mjs'
import { getUserId } from '../lambda/utils.mjs'
import commonObject from '../utils/dynamodbConnection.mjs'

const updateTodoService = async (event) => {
  const todoId = event.pathParameters.todoId
  const updatedTodo = JSON.parse(event.body)
  const { infoLogInstance } = commonObject.loggerInstance

  infoLogInstance.info('todoId', todoId)
  infoLogInstance.info('updatedTodo', updatedTodo)

  let userId = getUserId(event)
  const { name, dueDate, done } = updatedTodo

  const result = await updateRecord({
    TableName: commonObject.environmentVariable.todosTableName,
    Key: {
      todoId,
      userId
    },
    UpdateExpression:
      'SET #dueDate = :newDueDate, #name = :newName, #done = :newDone',
    ExpressionAttributeNames: {
      '#dueDate': 'dueDate',
      '#name': 'name',
      '#done': 'done'
    },
    ExpressionAttributeValues: {
      ':newDueDate': dueDate,
      ':newName': name,
      ':newDone': done
    },
    ReturnValues: 'ALL_NEW'
  })

  infoLogInstance.info('Update Todo Succeeded:', result)
  return result
}

export default updateTodoService
