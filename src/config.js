const ENVIRONMENTS = {
	development: {
		PORT: 3001,
		BASE_URL: 'http://65.2.79.23:3003',
	},
	staging: {
		PORT: 3001,
		BASE_URL: 'http://65.2.79.23:3003',
	},
	main: {
		PORT: 3001,
		BASE_URL: 'http://65.2.79.23:3003',
	},
};

export const ENV_CONFIG = ENVIRONMENTS[process.env.REACT_APP_ENV];
