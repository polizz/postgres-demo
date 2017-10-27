export const paramsScanAll = (nextKey?: AWS.DynamoDB.Key): AWS.DynamoDB.DocumentClient.QueryInput =>
({
  TableName: process.env.AWS_SITES_DYNAMODB_NAME,
  ConsistentRead: false,
  // ProjectionExpression: 'SiteId, ParentSiteId, SiteExternalContacts, SiteInternalContacts',
  // FilterExpression: 'size(SiteExternalContacts) > :zero OR size(SiteInternalContacts) > :zero',
  // ExpressionAttributeValues: {
  //   ':zero': 0,
  // },
  ExclusiveStartKey: nextKey,
  ReturnConsumedCapacity: 'NONE',
})