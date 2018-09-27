import { saveStore } from '../index';

const KEY = 'state';

describe('redux store', () => {

    test('save', () => {

        const VALUE = '{"auth":{"session":null},"solution":{},"contact":{"data":{}}}';

        saveStore();

        expect(localStorage.setItem).toHaveBeenLastCalledWith(KEY, VALUE);
        expect(localStorage.__STORE__[KEY]).toEqual(VALUE);
        expect(Object.keys(localStorage.__STORE__).length).toBe(1);

    });

});
