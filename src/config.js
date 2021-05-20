const ENV_CONFIG = {
	development: {
		PORT: 3001,
		BASE_URL: 'https://auc.bitcoinpizza.com'
	},
	staging: {
		PORT: 3001,
		BASE_URL: 'https://auc.bitcoinpizza.com',
	},
	main: {
		PORT: 3001,
		BASE_URL: 'https://auc.bitcoinpizza.com',
	},
};
export default ENV_CONFIG[process.env.REACT_APP_ENV] ||
	ENV_CONFIG[Object.keys(ENV_CONFIG)[0]];
