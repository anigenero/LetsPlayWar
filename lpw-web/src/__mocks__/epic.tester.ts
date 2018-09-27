import { Action } from 'redux';
import { Observable } from 'rxjs';

/**
 * Tests the epic and its action output
 *
 * @param {Observable<Action>} observable
 * @returns {Promise<Action[]>}
 */
export const epicTester = (observable: Observable<Action>): Promise<Action[]> => {

	return new Promise<Action[]>((resolve) => {
		const actions: Action[] = [];
		observable.subscribe((action) => actions.push(action))
			.add(() => resolve(actions));
	});

};
