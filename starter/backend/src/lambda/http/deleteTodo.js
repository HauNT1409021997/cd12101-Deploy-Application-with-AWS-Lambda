import deleteTodoService from '../../businessLogic/deleteTodoService.mjs'
import commonObject from '../../utils/dynamodbConnection.mjs'
import httpStatus from '../../utils/httpStatusObj.mjs'

export const handler = async (event) => {
  let httpResponse = { ...httpStatus }
  const { infoLogInstance } = commonObject.loggerInstance
  try {
    await deleteTodoService(event)
    httpResponse = {
      statusCode: 200,
      body: JSON.stringify({
        isDeleted: true
      }),
      ...httpResponse
    }
  } catch (e) {
    infoLogInstance.error('Cannot delete todo:', e)
    httpResponse = {
      statusCode: 500,
      status: 'error',
      body: JSON.stringify({
        isDeleted: false,
        message: e.message
      }),
      ...httpResponse
    }
  }
  return httpResponse
}
