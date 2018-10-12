import { isNil } from 'lodash';
import { GraphQLQuery } from '../../../types/graphql.types';
import { transactional } from '../../orm';
import { GameRepository } from '../../orm/repository/game.repository';
import IGameTurn = GQL.IGameTurn;

interface INextTurnMutatorParams {
	gameId: string;
}

/**
 * Handles the next turn of a game
 *
 * @param {any} root
 * @param {string} gameId
 */
export const nextTurnMutator: GraphQLQuery<IGameTurn, INextTurnMutatorParams> = (root, { gameId }) =>
	transactional(async (connection) => {

		const gameRepository = connection.getCustomRepository(GameRepository);
		const game = await gameRepository.getGameByUUID(gameId);

		if (isNil(game)) {
			throw new Error('Game does not exist');
		} else if (game.turn === 10) {
			throw new Error('Game out of turns');
		}

		return {
			dealerCard: null,
			game,
			playerCards: null,
			players: game.players,
			turn: game.turn,
			winner: null
		};

	});
