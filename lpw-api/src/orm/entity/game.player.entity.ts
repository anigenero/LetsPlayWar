import { isNil } from 'lodash';
import { BaseEntity, Column, DeepPartial, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GameEntity } from './game.entity';
import { PlayerEntity } from './player.entity';

@Entity('game_player')
export class GamePlayerEntity extends BaseEntity {

	@PrimaryGeneratedColumn('increment', {
		name: 'id'
	})
	public id: number;

	@ManyToOne(() => GameEntity)
	@JoinColumn({
		name: 'game',
		referencedColumnName: 'uuid'
	})
	public game: GameEntity;

	@ManyToOne(() => PlayerEntity)
	@JoinColumn({
		name: 'player',
		referencedColumnName: 'id'
	})
	public player: PlayerEntity;

	@Column({
		name: 'score',
		type: 'int'
	})
	public score: number;

	@Column({
		name: 'created',
		readonly: true,
		type: 'datetime'
	})
	public created: Date;

	@Column({
		name: 'modified',
		readonly: true,
		type: 'datetime'
	})
	public modified: Date;

	constructor(gamePlayer?: DeepPartial<GamePlayerEntity>) {

		super();

		if (!isNil(gamePlayer)) {

			if (!isNil(gamePlayer.game)) {
				this.game = new GameEntity(gamePlayer.game);
			}

			if (!isNil(gamePlayer.player)) {
				this.player = new PlayerEntity(gamePlayer.player);
			}

			this.id = gamePlayer.id;
			this.score = gamePlayer.score;

			this.created = gamePlayer.created as Date;
			this.modified = gamePlayer.modified as Date;

		}

	}

}
