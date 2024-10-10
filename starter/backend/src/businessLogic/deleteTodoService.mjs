import { deleteRecord } from '../dataLayer/todoDynamodbAccessLayer.mjs'
import { getUserId } from '../lambda/utils.mjs'
import commonObject from '../utils/dynamodbConnection.mjs'

const deleteTodoService = async (event) => {
  const { infoLogInstance } = commonObject.loggerInstance
  const { todoId } = event.pathParameters // Assuming todoId is the partition key
  const userId = getUserId(event)
  await deleteRecord({
    TableName: commonObject.environmentVariable.todosTableName,
    Key: {
      todoId,
      userId
    }
  })
  infoLogInstance.info('Delete Todo succeeded')
}

export default deleteTodoService
