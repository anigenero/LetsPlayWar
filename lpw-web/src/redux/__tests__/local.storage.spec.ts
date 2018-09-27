import { IAppState } from '../app.state';
import { loadState, saveState } from '../local.storage';

const KEY = 'state';

describe('local state storage', () => {

	test('should save to local storage', () => {

		const state: IAppState = {
			auth: {
				token: 'anigenero'
			}
		};

		const VALUE = JSON.stringify(state);

		saveState(state);

		expect(localStorage.setItem).toHaveBeenLastCalledWith(KEY, VALUE);
		expect(localStorage.__STORE__[KEY]).toEqual(VALUE);
		expect(Object.keys(localStorage.__STORE__).length).toBe(1);

		const storedState = loadState();

		expect(localStorage.getItem).toHaveBeenLastCalledWith(KEY);
		expect(storedState).toEqual(state);

	});

	test('should return undefined on invalid reduxStore value', () => {

		localStorage.__STORE__[KEY] = '{&&^:""}';

		const storedState = loadState();

		expect(localStorage.getItem).toHaveBeenLastCalledWith(KEY);
		expect(storedState).toBeUndefined();

	});

	test('should return undefined on null reduxStore value', () => {

		localStorage.__STORE__[KEY] = null;

		const storedState = loadState();

		expect(localStorage.getItem).toHaveBeenLastCalledWith(KEY);
		expect(storedState).toBeUndefined();

	});

});
