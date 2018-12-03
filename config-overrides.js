/* eslint-disable no-param-reassign */
const { injectBabelPlugin } = require('react-app-rewired');
const { paths } = require('react-app-rewired');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
// const rewireSass = require('react-app-rewire-scss');
const rewireLess = require('react-app-rewire-less');
const antTheme = require('./src/assets/AntTheme/Theme');

module.exports = function override(config, env) {
    config = injectBabelPlugin(
        ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
        config,
    );

    config = rewireLess.withLoaderOptions({
        modifyVars: antTheme,
        javascriptEnabled: true,
    })(config, env);
    config.module.rules = [
        ...config.module.rules,
        {
            test: /\.(js|jsx|mjs)$/,
            enforce: 'pre',
            use: [
                {
                    options: {
                        formatter: eslintFormatter,
                        eslintPath: require.resolve('eslint'),

                    },
                    loader: require.resolve('eslint-loader'),
                },
            ],
            include: paths.appSrc,
        },
    ];

    // create-react-app disallows us to import files outside ./src folder.
    // We need to turn this rule off to import files from ./bower_components
    // see: https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/config/webpack.config.dev.js#L112-L119
    if (process.env.NODE_ENV === 'development') {
        config.resolve.plugins = [];
    }
    return config;
};
/* eslint-enable no-param-reassign */
