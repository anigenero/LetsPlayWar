import * as React from 'react';

import { appStyles } from './App.style';

import { WithStyles, withStyles } from '@material-ui/core';
import { getLogger, Logger } from 'log4js2';
import { LocalizeContextProps, MissingTranslationOptions, Translate, withLocalize } from 'react-localize-redux';
import { RouteComponentProps, withRouter } from 'react-router';

const globalTranslation = require('../../assets/locale/en-US.json');
const spanishTranslation = require('../../assets/locale/es.json');

type AppProps = WithStyles & LocalizeContextProps & RouteComponentProps<{}>;

export class App extends React.Component<AppProps> {

	private static readonly _log: Logger = getLogger('App');

	constructor(props: AppProps, context: any) {

		super(props, context);

		const {addTranslationForLanguage, initialize} = this.props;

		initialize({
			languages: [{
				code: 'en-US',
				name: 'English (US)'
			}],
			options: {

				defaultLanguage: 'en-US',
				ignoreTranslateChildren: false,
				renderInnerHtml: true,
				renderToStaticMarkup: false,
				onMissingTranslation: (options: MissingTranslationOptions) => {

					const {translationId, languageCode} = options;
					App._log.warn('Could not find translation for {} of {}', translationId, languageCode);

					return translationId;

				}

			}
		});

		addTranslationForLanguage(globalTranslation, 'en-US');
		addTranslationForLanguage(spanishTranslation, 'es');

	}

	public render() {

		const {classes} = this.props;

		return (
			<div className={classes.app}>
				<Translate id="app.name"/>
			</div>
		);

	}

}

export default withStyles(appStyles)(withRouter(withLocalize(App)));
