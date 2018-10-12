import { GraphQLQuery } from '../../../types/graphql.types';
import { GameEntity } from '../../orm/entity/game.entity';
import { transactional } from '../../orm';
import { Connection } from 'typeorm';
import { GameRepository } from '../../orm/repository/game.repository';

interface IGetGameQueryParams {
	uuid: string;
}

/**
 * Gets a game by the specifed UUID
 *
 * @param {any} root
 * @param {string} uuid
 */
export const getGameQuery: GraphQLQuery<GameEntity, IGetGameQueryParams> = (root, { uuid }) =>
	transactional(async (connection: Connection) =>
		connection.getCustomRepository(GameRepository).getGameByUUID(uuid)
	);
