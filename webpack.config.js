/**
 * Webpack Configuration
 * =====================
 *
 * Workspace fills the whole Webpack configuration for you, 
 * still you can override every single option for both "dev" and "prod" scenario.
 *
 */

exports.dev = function() {
    return {
        output: {
            
            // exports each application entry points as universal modules
            // so the file name will be available in the global scope as it was a library
            libraryTarget: 'umd',
            library: ['[name]']
            
        },
        externals: {
            'firebase' : 'Firebase',
            'react' : 'React'
        },
        module: {
            loaders: [
                { test: /\.jsx$/, loaders: ['jsx?harmony'] },
                { test: /\.json$/, loaders: ['json'] }
            ]
        }
    };
};

exports.prod = function() {
    return {};
};
