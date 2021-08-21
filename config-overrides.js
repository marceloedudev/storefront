const { alias, configPaths } = require('react-app-rewire-alias');

const path = require('path');

const dotenv = require('dotenv');

const aliasResolve = Object.entries(configPaths('tsconfig.paths.json')).reduce(
    (acc, [context, local]) => {
        return {
            ...acc,
            [context]: path.resolve(__dirname, local),
        };
    }, [],
);

const currentEnv = process.env.NODE_ENV || 'development';

const { parsed: envConfig } = dotenv.config({
    path: path.resolve(__dirname, `.env.${currentEnv}`),
});

const version = JSON.stringify(require('./package.json').version);

module.exports = function override(config) {
    alias({
        ...aliasResolve,
    })(config);

    config.plugins.some((p) => {
        if (p.definitions && p.definitions['process.env']) {
            p.definitions['process.env'] = JSON.stringify({
                ...envConfig,
                NODE_ENV: currentEnv,
                version,
            });
            return true;
        }
    });

    return config;
};