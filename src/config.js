const ENV_CONFIG = {
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
export default ENV_CONFIG[process.env.REACT_APP_ENV] ||
	ENV_CONFIG[Object.keys(ENV_CONFIG)[0]];
