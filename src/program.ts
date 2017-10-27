import { Client, QueryResult } from 'pg'
import {cfrCliConfig,
  createDbDdl,
  createItemDml,
  dropDbDdl,
  schemaDdl } from './sql'
import { getConn } from './connection'
import { scan } from './scanner'
import aws from './aws-setup'
import { omit } from 'lodash'

const createSchema = async (cl: Client): Promise<void> => {
  console.log('Creating schema...')
  await cl.query(schemaDdl)
  // await cl.end()
}

const createDb = async (cl: Client): Promise<void> => {
  console.log('Creating database...')
  await cl.query(dropDbDdl)
  await cl.query(createDbDdl)
  await cl.end()
}

const insertPgRecords = (cl: Client) => async (items: any[]): Promise<any> => {
  return Promise.all(
    items
    .filter(i => i.SiteId.length >= 36 && (i.ParentSiteId.length === 3 || i.ParentSiteId.length >= 36))
    .map(async (item) => {
      await cl.query(createItemDml, [
        item.SiteId,
        item.ParentSiteId === 'N/A'  ? undefined : item.ParentSiteId,
        item.SiteType,
        item.SiteStatus,
        omit(item, ['SiteId', 'ParentSiteId', 'SiteType', 'SiteStatus']),
      ])
  }))
}

const transfer = async (cl: Client): Promise<any[]> => {
  const db = new aws.DynamoDB.DocumentClient()
  
  const cfrItems = await scan(insertPgRecords(cl))
  await cl.end()

  return cfrItems
}

export const init = async () : Promise<void> => {
  let cl, sResult, dbResult

  try {
    const cldb = await getConn()
    await createDb(cldb)

    cl = await getConn(cfrCliConfig)
    await createSchema(cl)
    const items = await transfer(cl)    
  } catch (error) {
    console.log(error.stack)
  } 
}