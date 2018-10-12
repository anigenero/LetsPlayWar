import { isNil } from 'lodash';
import { BaseEntity, Column, DeepPartial, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('player')
export class PlayerEntity extends BaseEntity {

	@PrimaryGeneratedColumn('increment', {
		name: 'id'
	})
	public id: number;

	@Column({
		name: 'username',
		type: 'varchar',
		length: 25
	})
	public username: string;

	@Column({
		name: 'created',
		readonly: true,
		type: 'datetime'
	})
	public created: Date;

	constructor(player?: DeepPartial<PlayerEntity>) {

		super();

		if (!isNil(player)) {

			this.id = player.id;

			this.username = player.username;
			this.created = player.created as Date;

		}

	}

}
