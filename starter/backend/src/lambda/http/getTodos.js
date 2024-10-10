import getTodoService from '../../businessLogic/getTodoService.mjs'
import httpStatus from '../../utils/httpStatusObj.mjs'
import commonObject from '../../utils/dynamodbConnection.mjs'
export const handler = async (event) => {
  let httpResponse = { ...httpStatus }
  const { infoLogInstance, errorLogInstance } = commonObject.loggerInstance
  try {
    const result = await getTodoService(event)
    infoLogInstance.info('get todo result', result)

    httpResponse = {
      statusCode: 200,
      body: JSON.stringify({ items: result.Items || [] }),
      ...httpResponse
    }
  } catch (err) {
    errorLogInstance.info('Get all Todos Failed', err)

    httpResponse = {
      statusCode: 500,
      body: JSON.stringify({ items: [] }),
      ...httpResponse
    }
  }

  infoLogInstance.info('get todo response', httpResponse)
  return httpResponse
}
