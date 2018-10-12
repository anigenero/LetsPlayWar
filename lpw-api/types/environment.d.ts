declare interface ISQLConfiguration {

	host: string;
	password: string;
	schema: string;
	username: string;

}

declare interface IEnvironment {

	production: boolean;

	database: ISQLConfiguration;

}

declare let environment: IEnvironment;
