import { IResolvers, ITypeDefinitions } from 'graphql-tools';

const typeDefs: ITypeDefinitions = require('./schema');
const resolvers: IResolvers = {};

export const graphqlSchema = {
	resolvers,
	typeDefs
};
