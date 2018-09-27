
interface ICognito {
	identity_pool_id: string;
	user_pool_id: string;
	user_pool_region: string;
	user_pool_web_client_id: string;
}

declare interface IEnvironment {

	production: boolean;
	graphEndpoint: string;

	cognito: ICognito;

}

declare let environment: IEnvironment;