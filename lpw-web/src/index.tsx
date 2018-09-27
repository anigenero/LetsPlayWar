import * as React from 'react';

import 'typeface-roboto';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';
import { ApolloProvider } from 'react-apollo';
import { render } from 'react-dom';
import { LocalizeProvider } from 'react-localize-redux';
import { Provider } from 'react-redux';
import App from './component/App/App';
import { apolloClient } from './graphql/client';
import reduxStore, { browserHistory } from './redux';

const theme = createMuiTheme({});

render((
	<Provider store={reduxStore}>
		<ConnectedRouter history={browserHistory}>
			<MuiThemeProvider theme={theme}>
				<ApolloProvider client={apolloClient as any}>
					<LocalizeProvider store={reduxStore}>
						<App/>
					</LocalizeProvider>
				</ApolloProvider>
			</MuiThemeProvider>
		</ConnectedRouter>
	</Provider>
), document.getElementById('root'));
