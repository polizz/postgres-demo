import * as agent from 'superagent'

const getPingToken = (): agent.SuperAgentRequest => 
  agent
    .post(process.env.OAUTH_AUTHORITY)
    .set('Cache-Control', 'no-cache')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({
      client_id: process.env.OAUTH_CLIENT_ID,
      client_secret: process.env.OAUTH_CLIENT_SECRET,
      grant_type: 'client_credentials',
    })

const getPingTokenPassword = (): agent.SuperAgentRequest =>
  agent
    .post(process.env.OAUTH_AUTHORITY)
    .set('Cache-Control', 'no-cache')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({
      client_id: process.env.OAUTH_CLIENT_ID,
      client_secret: process.env.OAUTH_CLIENT_SECRET,
      grant_type: 'password',
      username: process.env.OAUTH_USERNAME_GEO,
      password: process.env.OAUTH_PASSWORD_GEO,
    })

export { getPingToken, getPingTokenPassword }