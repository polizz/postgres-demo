import { getPingToken, getPingTokenPassword } from './pingHelper'

const ONE_SECOND_MS = 1000

const CURRENT_TOKEN: BearerToken = {
  token: '',
  expiresOn: 0,
}

const update = async (getTokenStrategy: () => Promise<any>): Promise<BearerToken> => {
  try {
    const now = (new Date()).getTime()
    
    if (CURRENT_TOKEN.expiresOn < now) {
      const { body } = await getTokenStrategy()
  
      CURRENT_TOKEN.token = body.access_token
      CURRENT_TOKEN.expiresOn = now + (body.expires_in * ONE_SECOND_MS)
      return CURRENT_TOKEN
    }
    return Promise.resolve(CURRENT_TOKEN)
  } catch (error) {
    console.log(error.stack)
  }
}

export const cachedTokenCC = () =>
  update(getPingToken)

export const cachedTokenPass = () =>
  update(getPingTokenPassword)
