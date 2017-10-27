import * as agent from 'superagent'

import { cachedTokenCC } from './token'

export const PostIt = async (url: string,
  body: any,
  bodyType = 'application/json',
  accept = 'application/json',
  bufferText = false,
  tokenStrat = cachedTokenCC) => {
    try {
      const { token } = await tokenStrat()

      return await agent.post(url)
        .buffer(bufferText)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', accept)
        .type(bodyType)
        .send(body)
    } catch (error) {
      console.log(error.stack)
    }
  }

export const GetIt = async (url: string,
  params: string,
  tokenStrat = cachedTokenCC) => {
    try {
      const { token } = await tokenStrat()
      return agent.get(url)
        .query(params)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
    } catch (error) {
      console.log(error.stack)
    }
}

export { cachedTokenCC }
export { cachedTokenPass } from './token'
