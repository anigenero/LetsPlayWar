import { Disposer, Promise as BluebirdPromise, using } from 'bluebird';
import 'reflect-metadata';
import { Connection, getConnectionManager } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { v4 } from 'uuid';
import { getDatabaseConfiguration } from '../util/environment.util';
import { GameEntity } from './entity/game.entity';
import { GamePlayerEntity } from './entity/game.player.entity';
import { PlayerEntity } from './entity/player.entity';

Promise = BluebirdPromise as any;

/**
 * Creates a transactional execution
 *
 * @param {(connection: Connection) => Promise<any>} callback
 * @returns {Bluebird<any>}
 */
export const transactional = <T>(callback: (connection: Connection) => Promise<T>): Promise<T> =>
	using(getDBConnection(getDatabaseConfiguration()), callback) as any;

/**
 * Gets the database connection using the specified configuration
 *
 * @param {ISQLConfiguration} sqlConfig
 * @returns {Bluebird.Disposer<Connection>}
 */
export const getDBConnection = (sqlConfig: ISQLConfiguration): Disposer<Connection> => {
	try {
		return getConnectionManager().get();
	} catch (e) {
		return _configureDBConnection(sqlConfig);
	}
};

/**
 * Configures a unique DB connection for the specified connection
 *
 * @private
 *
 * @param {ISQLConfiguration} dbConfig
 * @returns {Bluebird.Disposer<Connection>}
 */
function _configureDBConnection(dbConfig: ISQLConfiguration): Disposer<Connection> {

	return (getConnectionManager().create({
		...dbConfig,
		type: 'mysql',
		ssl: false,
		name: v4(),
		entities: [
			GameEntity,
			GamePlayerEntity,
			PlayerEntity
		],
		synchronize: false
	} as MysqlConnectionOptions).connect().then((connection) => {
		return connection;
	}) as any).disposer(async (connection: Connection) => {
		try {
			await connection.close();
		} catch (e) {
			// don't do anything
		}
	});

}
