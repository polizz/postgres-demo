import { Client, ClientConfig } from 'pg'

export const getConn = async (clConfig: ClientConfig = {}): Promise<Client> => {
  const client = new Client(clConfig)
  await client.connect()
  return client
}