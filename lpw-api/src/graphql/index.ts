import { Config } from 'apollo-server-core';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import { IResolvers } from 'graphql-tools';
import { addPlayerMutator } from './mutation/add.player.mutator';
import { nextTurnMutator } from './mutation/next.turn.mutator';
import { createGameMutator } from './mutation/start.game.mutator';
import { getGameQuery } from './query/game.query';
import { topScoresQuery } from './query/top.scores.query';

const _graphQLSchema = require('./schema');

const typeDefs: DocumentNode = gql`${_graphQLSchema}`;
const resolvers: IResolvers = {
	Mutation: {
		addPlayer: addPlayerMutator,
		createGame: createGameMutator,
		nextTurn: nextTurnMutator
	},
	Query: {
		game: getGameQuery,
		topScores: topScoresQuery
	}
};

export const graphqlSchema: Config = {
	resolvers,
	typeDefs
};
