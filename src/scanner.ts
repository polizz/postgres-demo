import aws from './aws-setup'
import { isEmpty } from 'lodash'
import { paramsScanAll } from './siteHelper'

const db = new aws.DynamoDB.DocumentClient()

export const scan = async (insertionCb: (data: any[]) => Promise<void>, nextId?: AWS.DynamoDB.Key): Promise<any[]> => {
  try {
    let ret: any[] = []
    const data = await db.scan(paramsScanAll(nextId)).promise()
    console.log(`Recieved ${data.Items.length} items`)

    await insertionCb(data.Items as any[])
    
    if (!isEmpty(data.LastEvaluatedKey)) {
      ret = await scan(insertionCb, data.LastEvaluatedKey)
    }
    return [...data.Items, ...ret]
  }
  catch (err) {
    console.log(JSON.stringify(err))
    throw err
  }
}