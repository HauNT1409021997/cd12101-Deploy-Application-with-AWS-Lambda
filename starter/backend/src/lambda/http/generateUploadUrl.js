import generateImageUploadUrl from '../../businessLogic/generateUploadUrlService.mjs'
import httpStatus from '../../utils/httpStatusObj.mjs'
import commonObject from '../../utils/dynamodbConnection.mjs'

export const handler = async (event) => {
  const { infoLogInstance, errorLogInstance } = commonObject.loggerInstance

  try {
    const url = await generateImageUploadUrl(event)
    infoLogInstance.info('Generate image upload URL succeeded', url)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, GET, POST, PUT, DELETE'
      },
      body: JSON.stringify({ uploadUrl: url })
    }
  } catch (error) {
    errorLogInstance.error('Generate image upload URL failed', error)
    console.log('error', error)
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, GET, POST, PUT, DELETE'
      },
      body: JSON.stringify({ error: 'Internal Server Error' })
    }
  }
}
