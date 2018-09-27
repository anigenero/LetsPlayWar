import { IAppState } from './app.state';

const _STATE_KEY = 'state';

/**
 * Loads the state from the local storage
 *
 * @returns {IAppState}
 */
export const loadState = (): IAppState => {

    try {
        const stateJson = localStorage.getItem(_STATE_KEY);
        if (stateJson === null) {
            return undefined;
        }

        return JSON.parse(stateJson);

    } catch (err) {
        return undefined;
    }

};

/**
 * Saves the state to the local storage
 *
 * @param {IAppState} state
 */
export const saveState = (state: Partial<IAppState>) => {

    try {
        const stateJson = JSON.stringify(state);
        localStorage.setItem(_STATE_KEY, stateJson);
    } catch (err) {
        // do nothing
    }

};
