import { isNil } from 'lodash';
import { GraphQLQuery } from '../../../types/graphql.types';
import { transactional } from '../../orm';
import { GameEntity } from '../../orm/entity/game.entity';
import { GamePlayerEntity } from '../../orm/entity/game.player.entity';
import { PlayerEntity } from '../../orm/entity/player.entity';
import { GamePlayerRepository } from '../../orm/repository/game.player.repository';
import { GameRepository } from '../../orm/repository/game.repository';
import { PlayerRepository } from '../../orm/repository/player.repository';
import { CardSuit } from '../../constant/card.suit';
import ICard = GQL.ICard;

interface IAddPlayerMutatorParams {
	gameId: string;
	username: string;
}

export const addPlayerMutator: GraphQLQuery<GameEntity, IAddPlayerMutatorParams> = (root, { gameId, username }) =>
	transactional(async (connection) => {

		const gameRepository = connection.getCustomRepository(GameRepository);
		const game = await gameRepository.getGameByUUID(gameId);

		if (isNil(game)) {
			throw new Error('Game not found');
		} else if (game.turn > 0) {
			throw new Error('Game has already started');
		} else if (game.players.length === 5) {
			throw new Error('Max amount of players have already joined');
		}

		const gamePlayerRepository = connection.getCustomRepository(GamePlayerRepository);
		const playerRepository = connection.getCustomRepository(PlayerRepository);

		let player = await playerRepository.findPlayerByUsername(username);

		if (isNil(player)) {

			player = await playerRepository.save(new PlayerEntity({
				username
			}));

			await gamePlayerRepository.save(new GamePlayerEntity({
				player,
				game
			}));

		} else {

			const existingGamePlayer = await gamePlayerRepository.findByGameIdAndUsername(gameId, username);
			if (!isNil(existingGamePlayer)) {
				throw new Error('Player already assigned to game');
			}

			await gamePlayerRepository.save(new GamePlayerEntity({
				player,
				game
			}));

		}

		return gameRepository.getGameByUUID(gameId);

	});
