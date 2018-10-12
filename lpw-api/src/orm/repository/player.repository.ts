import { EntityRepository, Repository } from 'typeorm';
import { PlayerEntity } from '../entity/player.entity';

@EntityRepository(PlayerEntity)
export class PlayerRepository extends Repository<PlayerEntity> {

	/**
	 * Finds the player by the specified username
	 * @param {string} username
	 */
	public findPlayerByUsername(username: string): Promise<PlayerEntity> {
		return this.findOne({
			where: {
				username
			}
		});
	}

}
