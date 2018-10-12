import { GraphQLQuery } from '../../../types/graphql.types';
import { transactional } from '../../orm';
import { GamePlayerEntity } from '../../orm/entity/game.player.entity';
import { GamePlayerRepository } from '../../orm/repository/game.player.repository';

interface ITopScoresQueryParams {
	limit: number;
}

/**
 * Queries the top scores
 *
 * @param {any} root
 * @param {number} limit
 */
export const topScoresQuery: GraphQLQuery<GamePlayerEntity, ITopScoresQueryParams> = (root, { limit }) =>
	transactional(async (connection) =>
		connection.getCustomRepository(GamePlayerRepository).findTopScores(limit)
	);
