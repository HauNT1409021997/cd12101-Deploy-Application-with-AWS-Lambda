import {
  DeleteCommand,
  PutCommand,
  QueryCommand,
  UpdateCommand
} from '@aws-sdk/lib-dynamodb'
import commonObject from '../utils/dynamodbConnection.mjs'
import AWS from 'aws-sdk'

const dynamoDb = new AWS.DynamoDB.DocumentClient()
const { infoLogInstance } = commonObject.loggerInstance
export const createRecord = async (paramsConfig = {}) => {
  const params = { ...paramsConfig }
  infoLogInstance.info('create todo params', params)
  await commonObject.dynamodbInstance.send(new PutCommand(params))
}

export const getRecord = async (paramsConfig = {}) => {
  const params = { ...paramsConfig }
  infoLogInstance.info('get todo params', params)
  return commonObject.dynamodbInstance.send(new QueryCommand(params))
}

export const deleteRecord = async (paramsConfig = {}) => {
  const params = { ...paramsConfig }
  infoLogInstance.info('delete todo params', params)
  return await commonObject.dynamodbInstance.send(new DeleteCommand(params))
}

export const updateRecord = async (paramsConfig = {}) => {
  const params = { ...paramsConfig }
  infoLogInstance.info('update todo params', params)
  const result = await commonObject.dynamodbInstance.send(
    new UpdateCommand(params)
  )
  return result
}

export const updateAndAddNewColumn = async (paramsConfig = {}) => {
  infoLogInstance.info('updateAndAddNewColumn', paramsConfig)
  return await dynamoDb.update(paramsConfig).promise()
}
