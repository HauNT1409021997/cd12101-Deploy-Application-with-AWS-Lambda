import updateTodoService from '../../businessLogic/updateTodoService.mjs'
import httpStatus from '../../utils/httpStatusObj.mjs'
import commonObject from '../../utils/dynamodbConnection.mjs'

export const handler = async (event) => {
  let httpResponse = { ...httpStatus }
  const { infoLogInstance, errorLogInstance } = commonObject.loggerInstance
  try {
    const { Items, Attributes } = await updateTodoService(event)
    httpResponse = {
      ...httpResponse,
      statusCode: 200,
      body: JSON.stringify({
        item: Items || Attributes // Return the updated attributes
      })
    }
  } catch (err) {
    errorLogInstance.error('Update Todo Failed:', err)
    httpResponse = {
      ...httpResponse,
      statusCode: 500,
      status: 'error',
      body: JSON.stringify({
        item: {}
      }),
      message: err.message
    }
  }
  return httpResponse
}
