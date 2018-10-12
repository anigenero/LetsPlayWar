import { EntityRepository, Repository } from 'typeorm';
import { GameEntity } from '../entity/game.entity';

@EntityRepository(GameEntity)
export class GameRepository extends Repository<GameEntity> {

	/**
	 * Gets the game by the specified UUID
	 * @param {string} uuid
	 */
	public getGameByUUID(uuid: string): Promise<GameEntity> {
		return this.findOne(uuid, {
			relations: ['players', 'players.player'],
			where: {
				uuid
			}
		});
	}

}