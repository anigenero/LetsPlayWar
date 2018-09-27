import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from '../App';

describe('App', () => {

	test('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render((
			<App initialize={jest.fn()} addTranslation={jest.fn()} classes={{}} />
		), div);
	});

});
