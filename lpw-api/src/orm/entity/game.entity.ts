import { isArray, isNil } from 'lodash';
import { BaseEntity, Column, DeepPartial, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { fromDeepPartialArray } from '../util/entity.util';
import { GamePlayerEntity } from './game.player.entity';

@Entity('game')
export class GameEntity extends BaseEntity {

	@PrimaryGeneratedColumn('uuid', {
		name: 'uuid'
	})
	public uuid: string;

	@OneToMany(() => GamePlayerEntity, (entity) => entity.game)
	public players: GamePlayerEntity[];

	@Column({
		name: 'deck',
		type: 'blob'
	})
	public deck: string;

	@Column({
		name: 'turn',
		type: 'int'
	})
	public turn: number;

	@Column({
		name: 'created',
		readonly: true,
		type: 'datetime'
	})
	public created: Date;

	constructor(game?: DeepPartial<GameEntity>) {

		super();

		if (!isNil(game)) {

			if (isArray(this.players)) {
				this.players = fromDeepPartialArray(game.players, GamePlayerEntity);
			}

			this.uuid = game.uuid;

			this.deck = game.deck;
			this.turn = game.turn;

			this.created = game.created as Date;

		}

	}

}
