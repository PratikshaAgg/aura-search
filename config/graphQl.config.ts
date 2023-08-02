import { GraphQLClient } from 'graphql-request';
import infoLogs, { LogTypes } from '../utils/logger.untils';

export let client = new GraphQLClient('');

export const graphqlInit = async () => {
  const { GRAPHQL_URL } = process.env;
  infoLogs({ message: '🚀 GraphQL Client Initialized'}, LogTypes.INFO);

  client = new GraphQLClient(GRAPHQL_URL!);
};
