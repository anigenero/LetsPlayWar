import { EntityRepository, Repository } from 'typeorm';
import { GamePlayerEntity } from '../entity/game.player.entity';

@EntityRepository(GamePlayerEntity)
export class GamePlayerRepository extends Repository<GamePlayerEntity> {

	/**
	 * Gets the player count for the specified game
	 * @param {string} uuid
	 */
	public getPlayerCountForGame(uuid: string): Promise<number> {
		return this.count({
			where: {
				game: {
					uuid
				}
			}
		});
	}

	/**
	 * Finds the top scores within the specified limit
	 *
	 * @param {number} limit
	 */
	public findTopScores(limit: number): Promise<GamePlayerEntity[]> {
		return this.createQueryBuilder('gamePlayer')
			.innerJoinAndSelect('gamePlayer.game', 'game')
			.innerJoinAndSelect('gamePlayer.player', 'player')
			.orderBy('gamePlayer.score', 'DESC')
			.limit(10)
			.getMany();
	}

	/**
	 * Find relation by the game UUID and the player username
	 *
	 * @param {string} uuid
	 * @param {string} username
	 */
	public findByGameIdAndUsername(uuid: string, username: string): Promise<GamePlayerEntity> {
		return this.findOne({
			relations: ['game', 'player'],
			where: {
				game: {
					uuid
				},
				player: {
					username
				}
			}
		});
	}

}
