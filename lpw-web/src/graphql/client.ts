import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import AWSAppSyncClient, { AUTH_TYPE, createAppSyncLink } from 'aws-appsync/lib';
import { AuthOptions } from 'aws-appsync/lib/link/auth-link';
import { getGraphQLEndpoint } from '../util/environment.util';

const AppSync: { [key: string]: string } = {
	graphqlEndpoint: getGraphQLEndpoint(),
	region: 'us-east-1'
};

const cache = new InMemoryCache();

const authConfig: AuthOptions = {
	type: AUTH_TYPE.NONE
};

const defaultOptions = {};

export const apolloClient = new AWSAppSyncClient({
	disableOffline: true,
	url: AppSync.graphqlEndpoint,
	region: AppSync.region,
	auth: authConfig
} as any, {
	cache,
	link: ApolloLink.from([
		createAppSyncLink({
			url: AppSync.graphqlEndpoint,
			region: AppSync.region,
			auth: authConfig
		} as any)
	]),
	defaultOptions
} as any);
