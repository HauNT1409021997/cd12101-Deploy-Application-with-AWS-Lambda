import createTodoService from '../../businessLogic/createTodoService.mjs'
import commonObject from '../../utils/dynamodbConnection.mjs'
import httpStatus from '../../utils/httpStatusObj.mjs'

export const handler = async (event) => {
  const { errorLogInstance } = commonObject.loggerInstance
  let httpResponse = { ...httpStatus }
  try {
    const { Items } = await createTodoService(event)
    httpResponse = {
      statusCode: 200,
      body: JSON.stringify({
        item: Items[0]
      }),
      ...httpResponse
    }
  } catch (err) {
    errorLogInstance.error('Create Todo Failed:', err)
    httpResponse = {
      statusCode: 500,
      body: JSON.stringify({
        item: {}
      }),
      status: 'error',
      message: err.message,
      ...httpResponse
    }
  }
  return httpResponse
}
