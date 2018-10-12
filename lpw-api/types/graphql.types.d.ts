import { GraphQLResolveInfo } from 'graphql';
import { MaybePromise } from 'graphql/jsutils/MaybePromise';

declare interface IGraphQLContext extends GraphQLResolveInfo {
	context: {
		identity: any
	};
	event: {
		headers: any
	};
}

declare type GraphQLQuery<TResult, TVars = { [key: string]: any }> =
	(root: any, vars: TVars, context: IGraphQLContext) =>
		MaybePromise<Partial<TResult>>;
